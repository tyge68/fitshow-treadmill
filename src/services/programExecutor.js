import { EventBus } from '../event-bus';
import { BTService, STOP_COMMAND } from './BTService';
import { ALL_PROGRAMS } from '../constants/default_programs';
import { DEFAULT_SETTINGS } from '../constants/default_settings';

import moment from 'moment';
import momentDuration from 'moment-duration-format';

momentDuration(moment);

class ProgramExecutorImpl {

    constructor() {
        this.loadPrograms();
        this.loadSettings();
        this.reinitProgram();
    }

    scaleForSettings() {
        switch(this.allSettings.mode) {
            case 'time': this.scaleForTime(); break;
            case 'distance': this.scaleForDistance(); break;
        }
    }

    scaleForDistance() {
        console.log("scale for distance not implemented");       
    }

    scaleForTime() {
        console.log("scale for time");       
        let targetTotalDurationSeconds = this.getSettings().timelimit * 60;
        let targetStepDurationSeconds = targetTotalDurationSeconds / this.getSteps().length;
        this.setStepDuration(targetStepDurationSeconds);
    }

    setStepDuration(newDuration) {
        console.log("change step duration to " + newDuration);
        this.currentStepDuration = newDuration;
    }

    loadPrograms() {
        let localStorage = window.localStorage;
        let storedPrograms = localStorage.getItem('trainingPrograms');
        let allPrograms;
        
        if (!storedPrograms) {
          // initialize with a deep copy of the default programs
          allPrograms = JSON.parse(JSON.stringify(ALL_PROGRAMS));
          localStorage.setItem('trainingPrograms', JSON.stringify(allPrograms));
        } else {
          allPrograms = JSON.parse(storedPrograms);
        }
        this.allPrograms = allPrograms;
    }

    loadSettings() {
        let localStorage = window.localStorage;
        let storedSettings = localStorage.getItem('trainingSettings');
        let allSettings;
        
        if (!storedSettings) {
          // initialize with a deep copy of the default programs
          allSettings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
          localStorage.setItem('trainingSettings', JSON.stringify(allSettings));
        } else {
            allSettings = JSON.parse(storedSettings);
        }
        this.allSettings = allSettings;
    }

    getSettings() {
        return JSON.parse(JSON.stringify(this.allSettings));
    }

    saveSettings(newSettings) {
        this.allSettings = newSettings;
        let localStorage = window.localStorage;
        localStorage.setItem('trainingSettings', JSON.stringify(this.allSettings));
    }

    getAllPrograms() {
        return JSON.parse(JSON.stringify(this.allPrograms));
    }

    setSelectedProgram(selection) {
        this.selectedProgram = selection;
        this.reinitProgram();
    }    

    updateProgress() {
        let programProgressRatio = 0,
            programRemainingTime = 0,
            stepProgressRatio = 0,
            stepRemainingTime = 0;

        if (BTService.isRunning() && this.isExecuting()) {
            let currentProgramDuration = Math.round((Date.now() - this.programStartTime) / 1000);
            programProgressRatio = Math.round( currentProgramDuration * 100 / this.programDuration);
            programRemainingTime = moment.duration(this.programDuration - currentProgramDuration, 'seconds').format('H:mm:ss');
            let currentDuration = (Date.now() - this.currentStepStartTime) / 1000;
            stepProgressRatio = Math.round( currentDuration * 100 / this.currentStepDuration);
            stepRemainingTime = Math.round(this.currentStepDuration - currentDuration);
        }
        EventBus.$emit('trainingProgression', {
            program: {
                percent: programProgressRatio,
                remaining:  programRemainingTime
            },
            step: {
                percent: stepProgressRatio,
                remaining:  stepRemainingTime
            }
        });
    }

    isExecuting() {
        return this.programInterval && true;
    }

    start() {
        let thisObj = this;
        this.execute(); // now then with interval
        this.programInterval = setInterval(() => { thisObj.execute() }, this.currentStepDuration * 1000);
        this.progressInterval = setInterval(() => { thisObj.updateProgress(); }, 1000);
    }

    stop() {
        BTService.addMessage(STOP_COMMAND);
        clearInterval(this.programInterval);
        clearInterval(this.progressInterval);
        this.programInterval = null;
        this.progressInterval = null;
    }

    getSteps() {
        return JSON.parse(JSON.stringify(this.programQueue));
    }
    
    execute() {
      if (BTService.isRunning() && this.programQueue.length > 0) {
        let previousSteps = this.getSteps();
        this.currentStep = this.programQueue.shift();
        EventBus.$emit("trainingStepChanged", previousSteps, this.currentStep);
        this.currentStepStartTime = Date.now();
        BTService.sendIncAndSpeed(this.currentStep[1], this.currentStep[0]);
      } else {
          this.stop();
      }
    }
    
    reinitProgram() {        
        this.selectedProgram = this.selectedProgram || this.getAllPrograms()[0];        

        this.programQueue = [];
        this.programStartTime = Date.now();

        this.currentSpeed = 0;
        this.currentIncline = 0;
        this.currentStepStartTime = Date.now();
        this.currentStep = 0;

        let programQueue = this.programQueue;
        if (this.selectedProgram) {
            this.currentStepDuration = this.selectedProgram.stepDuration;
            this.selectedProgram.steps.forEach(step => programQueue.push(step));
            this.scaleForSettings();
            this.programDuration = this.selectedProgram ? this.currentStepDuration * this.selectedProgram.steps.length : 0;
        }

        EventBus.$emit("trainingProgramReInit");
    }
    
}

export const ProgramExecutor = new ProgramExecutorImpl();