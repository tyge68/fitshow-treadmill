import { EventBus } from '@/event-bus'
import { BTService, STOP_COMMAND } from './BTService'
import { ALL_PROGRAMS } from '@/constants/default_programs'
import { DEFAULT_SETTINGS } from '@/constants/default_settings'

import moment from 'moment'
import momentDuration from 'moment-duration-format'

momentDuration(moment)

class ProgramExecutorImpl {

    constructor() {
        this.loadPrograms()
        this.loadSettings()
        this.reinitProgram()
    }

    scaleForSettings() {
        this.initStepsWithAverageSpeed()
        switch(this.allSettings.mode) {
            case 'time': this.scaleForTime(); break
            case 'distance': this.scaleForDistance(); break
        }
    }

    scaleForDistance() {
        let math = window.math
        let targetDistance = this.getSettings().distancelimit
        let speedWeigths = this.getSteps().map(i => i.s)
        let speedScaledWeigths = math.divide(speedWeigths, 3600)
        let sumSpeedScaled = math.sum(speedScaledWeigths)
        console.log("sumSpeedScaled", sumSpeedScaled)
        let targetDuration = targetDistance / sumSpeedScaled
        console.log("optimized targetDuration = ", targetDuration)
        console.log("totalDuration = ", moment.duration(targetDuration * speedWeigths.length, 'seconds').format('H:mm:ss'))
        this.setStepDuration(math.round(targetDuration, 3))
    }

    scaleForTime() {
        let targetTotalDurationSeconds = this.getSettings().timelimit * 60
        let targetStepDurationSeconds = targetTotalDurationSeconds / this.getSteps().length
        this.setStepDuration(targetStepDurationSeconds)
    }

    setStepDuration(newDuration) {
        console.log("change step duration to " + newDuration)
        this.currentStepDuration = newDuration
    }

    setRandomSteps(nbSteps) {
        this.allPrograms[0].nbRandomSteps = nbSteps
    }

    importPrograms(programs) {
        // verify programs
        // then impports
        this.allPrograms = JSON.parse(JSON.stringify(ALL_PROGRAMS))
        programs.forEach(p => this.allPrograms.push(p))
        this.savePrograms()
    }

    loadPrograms() {
        let localStorage = window.localStorage
        let storedPrograms = localStorage.getItem('trainingPrograms')
        
        if (!storedPrograms) {
          // initialize with a deep copy of the default programs
          this.allPrograms = JSON.parse(JSON.stringify(ALL_PROGRAMS))
          this.savePrograms()
        } else {
          this.allPrograms = JSON.parse(storedPrograms)
        }
        this.ensureRandom()
    }

    ensureRandom() {
        if (!this.allPrograms[0].isRandom) {
            const randomProgram = JSON.parse(JSON.stringify(ALL_PROGRAMS[0]))
            randomProgram.steps = this.getRandomProgramSteps(randomProgram.nbRandomSteps)
            this.allPrograms.unshift(randomProgram)
        } else {
            const randomProgram = this.allPrograms[0]
            randomProgram.steps = this.getRandomProgramSteps(randomProgram.nbRandomSteps)
        }
    }

    getRandomProgramSteps(nbSteps) {
        function getRandomSpeed() {
            return Math.floor(Math.random() * 9) + 3;
        }
        function getRandomIncline() {
            return Math.floor(Math.random() * 14);
        }
        // generate random steps
        const newSteps = []
        for (let i=0; i < nbSteps; i++) {
            newSteps.push({ s: getRandomSpeed(), i: getRandomIncline()})
        }
        return newSteps
    }

    savePrograms() {
        let localStorage = window.localStorage
        localStorage.setItem('trainingPrograms', JSON.stringify(this.allPrograms))
    }

    deleteProgram(index) {
        this.allPrograms.splice(index, 1)
        this.savePrograms()
    }

    loadSettings() {
        let localStorage = window.localStorage
        let storedSettings = localStorage.getItem('trainingSettings')
        let allSettings
        
        if (!storedSettings) {
          // initialize with a deep copy of the default programs
          allSettings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS))
          localStorage.setItem('trainingSettings', JSON.stringify(allSettings))
        } else {
            allSettings = JSON.parse(storedSettings)
        }
        // Just make sure to initialize "new" settings over existing saved one.
        Object.entries(DEFAULT_SETTINGS).forEach((key, value) => {
            if (typeof allSettings[key] === 'undefined') {
                allSettings[key] = value
            }
        })
        this.allSettings = allSettings
    }

    getSettings() {
        return JSON.parse(JSON.stringify(this.allSettings))
    }

    saveSettings(newSettings) {
        this.allSettings = newSettings
        let localStorage = window.localStorage
        localStorage.setItem('trainingSettings', JSON.stringify(this.allSettings))
    }

    createNew() {
        this.allPrograms.push({
            title: 'Untitled',
            stepDuration: 120,
            steps: [
              {s:2, i:0}, // warm up
              {s:4, i:0}, {s:5, i:0}, {s:6, i:0},
              {s:2, i:0} // calm down
            ]
        })
        return this.allPrograms.length - 1
    }

    getAllPrograms() {
        return JSON.parse(JSON.stringify(this.allPrograms))
    }

    getProgram(index) {
        return this.allPrograms && this.allPrograms.length > 0 ? JSON.parse(JSON.stringify(this.allPrograms[index])) : null
    }

    updateProgress() {
        let programProgressRatio = 0,
            programRemainingTime = 0,
            stepProgressRatio = 0,
            stepRemainingTime = 0

        if (BTService.isRunning() && this.isExecuting()) {
            let currentProgramDuration = Math.round((Date.now() - this.programStartTime) / 1000)
            programProgressRatio = Math.round( currentProgramDuration * 100 / this.programDuration)
            programRemainingTime = moment.duration(this.programDuration - currentProgramDuration, 'seconds').format('H:mm:ss')
            let currentDuration = (Date.now() - this.currentStepStartTime) / 1000
            stepProgressRatio = Math.round( currentDuration * 100 / this.currentStepDuration)
            stepRemainingTime = Math.round(this.currentStepDuration - currentDuration)
        } else {
            this.stop()
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
        })
    }

    isExecuting() {
        return this.programInterval
    }

    start() {
        let thisObj = this
        this.programStartTime = Date.now()
        this.currentStepStartTime = Date.now()
        this.execute() // now then with interval
        this.programInterval = setInterval(() => { thisObj.execute() }, this.currentStepDuration * 1000)
        this.progressInterval = setInterval(() => { thisObj.updateProgress() }, 1000)
        EventBus.$emit('trainingProgramStarted')
    }

    stop() {
        if (BTService.isRunning()) {
            BTService.addMessage(STOP_COMMAND)
        }
        clearInterval(this.programInterval)
        clearInterval(this.progressInterval)
        this.programInterval = null
        this.progressInterval = null
        EventBus.$emit('trainingProgramStopped')
        this.reinitProgram()
    }

    hasMoreSteps() {
        return this._steps && this._steps.length > 0
    }

    getSteps() {
        return this._steps
    }

    shiftSteps() {
        this.hasMoreSteps() && this._steps.shift()
    }

    initStepsWithAverageSpeed() {
        let _steps = JSON.parse(JSON.stringify(this.programQueue))
        if (!isNaN(this.allSettings.avgSpeed)) {
            // scale steps for avgSpeed
            let math = window.math
            let sumSpeedScaled = math.sum(_steps.map(i => i.s))
            let avgSpeedSteps = sumSpeedScaled / _steps.length
            let diffFactorTarget = avgSpeedSteps / this.allSettings.avgSpeed
            _steps.forEach(s => {
                let newSpeed = s.s / diffFactorTarget
                newSpeed = Math.round(newSpeed * 10) / 10
                s.s = Math.max(Math.min(newSpeed, 15), 1)
            })
        }
        this._steps = _steps
    }
    
    execute() {
      if (BTService.isRunning() && this.hasMoreSteps()) {
        let allSteps = this.getSteps()
        EventBus.$emit("trainingStepChanged", allSteps)
        this.currentStep = allSteps[0]
        this.currentStepStartTime = Date.now()
        BTService.sendIncAndSpeed(this.currentStep.i, this.currentStep.s)
        this.shiftSteps()
      } else {
          this.stop()
      }
    }

    updateProgram(idx, data) {
        this.allPrograms[idx] = data
        this.savePrograms()
    }
    
    reinitProgram() {        
        this.selectedProgram = this.getAllPrograms()[this.allSettings.programId]        

        this.programQueue = []

        this.currentSpeed = 0
        this.currentIncline = 0
        this.currentStep = 0

        let programQueue = this.programQueue
        if (this.selectedProgram) {
            this.currentStepDuration = this.selectedProgram.stepDuration
            for (var n = 0; n < this.allSettings.loops; n++) {
                // copy n time the program steps to make it a loop
                this.selectedProgram.steps.forEach(step => programQueue.push(step))
            }
            this.scaleForSettings()
            this.programDuration = this.selectedProgram ? this.currentStepDuration * this.programQueue.length : 0
        }

        EventBus.$emit("trainingProgramReInit")
    }
    
}

export const ProgramExecutor = new ProgramExecutorImpl()