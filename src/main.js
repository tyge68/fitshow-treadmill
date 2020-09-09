import BTDevice, { EVENT_RUNNING, EVENT_STOPPED } from './bt_device.js';
import ProgramExecutor from './programExecutor.js';
import { SAMPLE_PROGRAM1, SAMPLE_PROGRAM2 } from './default_programs.js';
import { START_COMMAND, STOP_COMMAND, SPORT_DATA_COMMAND } from './bt_device.js';

"use strict";

let btDevice = new BTDevice();
let chartContext = document.getElementById('myChart').getContext('2d');

// Global settings for chart library
Chart.defaults.global.animation.duration = 0;

var selectedProgram = SAMPLE_PROGRAM1;
var allPrograms = [ SAMPLE_PROGRAM1, SAMPLE_PROGRAM2 ];
var programExecutor = new ProgramExecutor(btDevice, selectedProgram, chartContext);

class Main {

  constructor() {
    let thisObj = this;
    this.initTopNav();
    this.initDefaultIncline();
    this.initDefaultSpeed();
    this.initProgramList();
    btDevice.on(EVENT_RUNNING, (states) => { thisObj.onRunning(states) });
    btDevice.on(EVENT_STOPPED, (states) => { thisObj.onStopped(states) });
    programExecutor.setOnStepChangedListener(() => { thisObj.onStepChanged() });
  }

  onRunning(states) {
    let value = states.value;
    $("#status").html("Running");
    $("#start").prop('disabled', true);
    $("#stop").prop('disabled', false);
    $("#program").prop('disabled', false);
    $("#btnGroupDrop1").prop('disabled', true);
    $("#speed").html(states.currentSpeed);
    $("#incline").html(states.currentIncline);
    $("#totalTime").html(moment.duration(value.getUint8(5) + value.getUint8(6) * 256, 'seconds').format('H:mm:ss'));
    $("#totalDistance").html(value.getUint8(7) + value.getUint8(8) * 256);
    $("#totalCalories").html((value.getUint8(9) + value.getUint8(10) * 256) / 10);
  }

  onStopped(states) {
    $("#status").html("Stopped");
    $("#start").prop('disabled', false);
    $("#stop").prop('disabled', true);
    $("#program").prop('disabled', true);
    $("#btnGroupDrop1").prop('disabled', false);
    $("#speed").html(0);
    $("#incline").html(0);
    $("#totalTime").html('N/A');
    $("#totalDistance").html('N/A');
    $("#totalCalories").html('N/A');

    programExecutor.reinitProgram();
  }

  onStepChanged() {
    var a = [];
    programExecutor.getSteps().forEach(el => a.push("Speed:" + el[0] + "Incline:" + el[1]));
    $("#nextSteps").html(a.join('<br>'));
  }

  onSelectProgram(event) {
    let selectedProgramIdx = $(event.target).data('program-index');
    selectedProgram = allPrograms[selectedProgramIdx];
    $("#btnGroupDrop1").html(selectedProgram.title);
    programExecutor.stop();
    programExecutor.setSelectedProgram(selectedProgram);
  }

  initProgramList() {
    let thisObj = this;
    $("#btnGroupDrop1").html(selectedProgram.title);
    let plist = $("#programList");
    allPrograms.forEach( (prog, idx) => {
      let newMenuItem = $("<a class=\"dropdown-item\" href=\"#\"></a>");
      newMenuItem.text(prog.title);
      newMenuItem.data('program-index', idx);
      newMenuItem.on('click', (e) => { thisObj.onSelectProgram(e) });
      plist.append(newMenuItem)
    });

  }

  initDefaultIncline() {
    var elements = document.getElementsByClassName("default-incline");
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      el.addEventListener('pointerup', function (event) {
        var incline = parseInt(event.target.innerHTML);
        console.log("Set Incline", incline);
        btDevice.sendIncAndSpeed(incline, -1);
      });
    }
  }

  initDefaultSpeed() {
    var elements = document.getElementsByClassName("default-speed");
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      el.addEventListener('pointerup', function (event) {
        var speed = parseInt(event.target.innerHTML);
        console.log("Set Speed", speed);
        btDevice.sendIncAndSpeed(-1, speed);
      });
    }
  }

  initTopNav() {
    $('#connect').on('pointerup', function (event) {
      btDevice.initBTConnection(() => {
        $("#start").prop('disabled', false);
        $("#info").prop('disabled', false);
      });
    });

    $("#program").on('pointerup', function (event) {
      console.log("Start Program");
      if (!programExecutor.isExecuting() && btDevice.isRunning()) {
        programExecutor.start();
      }
    });

    $("#start").on('pointerup', function (event) {
      console.log("Send start");
      btDevice.addMessage(START_COMMAND);
    });


    $("#stop").on('pointerup', function (event) {
      console.log("Send stop");
      btDevice.addMessage(STOP_COMMAND);
      btDevice.addMessage(SPORT_DATA_COMMAND);
    });
  }
}

export default Main;



