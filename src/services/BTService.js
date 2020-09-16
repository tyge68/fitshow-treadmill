"use strict";
import { EventBus } from '../event-bus';

const S_SERIAL_PORT = '0000fff0-0000-1000-8000-00805f9b34fb';
const C_SERIAL_PORT_READ = '0000fff1-0000-1000-8000-00805f9b34fb';
const C_SERIAL_PORT_WRITE = '0000fff2-0000-1000-8000-00805f9b34fb';

const STATUS_COMMAND = [2, 81];
export const START_COMMAND = [2, 83, 1];
const INC_SPEED_COMMAND = [2, 83, 2];
export const STOP_COMMAND = [2, 83, 3];
const SPEED_INFO_COMMAND = [2, 80, 2];
const INCLINE_INFO_COMMAND = [2, 80, 3];
const TOTAL_INFO_COMMAND = [2, 80, 4];
export const SPORT_DATA_COMMAND = [2, 82, 0];
export const EVENT_RUNNING = 'running';
export const EVENT_STARTING = 'starting';
export const EVENT_STOPPED = 'stopped';

const MESAGE_ENDING = [3];

let s_serialPort, c_serialPortRead, c_serialPortWrite;

class BTServiceImpl {

    constructor() {
        this._isRunning = false;
        this.lastMessage = null;
        this.status = 'Undefined';
        this.messageQueue = [];
        this.states = {};
        this.connected = false;
    }

    convertArray(value) {
        let a = [];
        // Convert raw data bytes to hex values just for the sake of showing something.
        // In the "real" world, you'd use data.getUint8, data.getUint16 or even
        // TextDecoder to process raw data bytes.
        for (let i = 0; i < value.length; i++) {
            if (value[i]) {
                a.push('0x' + ('00' + value[i].toString(16)).slice(-2));
            }
        }
        return a.join(' ');
    }

    convertDataView(value) {
        let a = [];
        // Convert raw data bytes to hex values just for the sake of showing something.
        // In the "real" world, you'd use data.getUint8, data.getUint16 or even
        // TextDecoder to process raw data bytes.
        for (let i = 0; i < value.byteLength; i++) {
            a.push('0x' + ('00' + value.getUint8(i).toString(16)).slice(-2));
        }
        return a.join(' ');
    }

    mergeTypedArraysUnsafe(a, b, c) {
        var d = new a.constructor(a.length + b.length + c.length);
        d.set(a);
        d.set(b, a.length);
        d.set(c, a.length + b.length);
        return d;
    }

    handleNotifications(event) {
        let value = event.target.value;
        let prevStatus = this.states.status;
        this.states.value = value;
        let valueLength = value.byteLength;
        if (this.lastMessage && valueLength > 0 && value.getUint8(0) === 2 && value.getUint8(valueLength - 1) === 3) {
            let success = this.isCommandResult(this.lastMessage, value);
            if (success) {
                console.log("valid response");
                if (this.lastMessage === SPEED_INFO_COMMAND) {
                    let maxSpeed = value.getUint8(3);
                    let minSpeed = value.getUint8(4);
                    let unitSpeed = value.getUint8(5);
                    EventBus.$emit('btSpeedInfo', maxSpeed, minSpeed, unitSpeed);
                /* } else if (this.lastMessage === INCLINE_INFO_COMMAND) {
                } else if (this.lastMessage === TOTAL_INFO_COMMAND) { */
                } else if (this.lastMessage === STATUS_COMMAND) {
                    if (valueLength === 5 && value.getUint8(2) === 0 && value.getUint8(3) === 81) {
                        this._isRunning = false;
                        this.states.status = 'Stopped';
                        this.states.currentSpeed = 0;
                        this.states.currentIncline = 0;

                        if (prevStatus !== this.states.status) {
                            EventBus.$emit('btStopped', this.states);
                            console.log("btStopped emit");
                        }
                    } else if (valueLength > 5 && valueLength < 17) {
                        this.states.status = 'Starting';
                        this.states.currentSpeed = 0;
                        this.states.currentIncline = 0;
                        if (prevStatus !== this.states.status) {
                            EventBus.$emit('btStarting', this.states);
                            console.log("btStarting emit");
                        }
                        //statusDiv.innerHTML = "Starting";
                    } else if (valueLength === 17) {
                        this.states.status = 'Running';
                        this._isRunning = true;

                        this.states.currentSpeed = value.getUint8(3) / 10;
                        this.states.currentIncline = value.getUint8(4);

                        EventBus.$emit('btRunning', this.states);
                        console.log("btRunning emit");
                    }
                }
                this.lastMessage = null;
            } else {
                console.log("invalid response");
            }
        } else {
            console.log("invalid response");
        }
    }

    checksum(bytesArray) {
        var maxIndex = bytesArray.length;
        var currentIndex = 1;

        var checksum;
        for (checksum = 0; currentIndex < maxIndex; ++currentIndex) {
            checksum ^= bytesArray[currentIndex];
        }

        return new Uint8Array([checksum]);
    }

    intervalHandler() {
        // check queue
        if (this.lastMessage) {
            //lastMessageDiv.innerHTML = convertArray(lastMessage);
            this.sendMessage(this.lastMessage);
        } else {
            if (this.messageQueue.length > 0) {
                this.lastMessage = this.messageQueue.shift();
            } else {
                // request status info
                this.addMessage(STATUS_COMMAND);
            }
        }
        let a = [];
        this.messageQueue.forEach(i => a.push(this.convertArray(i)));
        //messageQueueDiv.innerHTML = a.join('<br>');
    }

    sendMessage(valueArray) {
        let command = new Uint8Array(valueArray);
        let ending = new Uint8Array(MESAGE_ENDING);
        let commandMerged = this.mergeTypedArraysUnsafe(command, this.checksum(command), ending);
        //console.log('>' + convertArray(commandMerged));
        return c_serialPortWrite.writeValue(commandMerged);
    }

    isCommandResult(command, result) {
        var success = true;
        var resultLength = result.byteLength;
        for (var i = 0; i < command.length; i++) {
            if (!success) {
                break;
            }
            if (i >= resultLength) {
                success = false;
            } else {
                success = success && command[i] === result.getUint8(i);
            }
        }
        return success;
    }

    sendIncAndSpeed(incline, speed) {
        if (this.isRunning()) {
            let newSpeed = speed === -1 ? this.states.currentSpeed : speed;
            let newIncline = incline === -1 ? this.states.currentIncline : incline;
            let customIncSpeed = this.mergeTypedArraysUnsafe(new Uint8Array(INC_SPEED_COMMAND), new Uint8Array([newSpeed * 10]), new Uint8Array([newIncline]));
            this.addMessage(customIncSpeed);
        }
    }

    isConnected() {
        return this.connected;
    }

    isRunning() {
        return this._isRunning;
    }

    addMessage(msg) {
        this.messageQueue.push(msg);
    }

    initBTConnection() {
        let thisObj = this;
        navigator.bluetooth.requestDevice({
            filters: [
                { namePrefix: "FS-" },
                { services: [S_SERIAL_PORT] }
            ]
        })
            .then(device => device.gatt.connect())
            .then(server => { return server.getPrimaryService(S_SERIAL_PORT); })
            .then(service => {
                s_serialPort = service;
                return s_serialPort.getCharacteristic(C_SERIAL_PORT_READ);
            })
            .then(characteristic => {
                c_serialPortRead = characteristic;
                return c_serialPortRead.startNotifications().then(() => {
                    console.log('> Notifications started for c_serialPortRead');
                    c_serialPortRead.addEventListener('characteristicvaluechanged',(e) =>
                    { thisObj.handleNotifications(e) });
                    c_serialPortRead.addEventListener('characteristicvalueread',(e) =>
                    { thisObj.handleNotifications(e) });
                    return s_serialPort.getCharacteristic(C_SERIAL_PORT_WRITE);
                });
            })
            .then(characteristic => {
                c_serialPortWrite = characteristic;
                thisObj.addMessage(SPEED_INFO_COMMAND);
                thisObj.addMessage(INCLINE_INFO_COMMAND);
                thisObj.addMessage(TOTAL_INFO_COMMAND);
                setInterval(() => { thisObj.intervalHandler() }, 200);
                EventBus.$emit("btConnected");
                thisObj.connected = true;
                console.log("btConnected emit");
            })
            .catch(error => { console.log(error); });
    }
}

export const BTService = new BTServiceImpl();