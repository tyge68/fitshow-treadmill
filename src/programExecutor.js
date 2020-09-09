import { STOP_COMMAND } from './bt_device.js';
import moment from 'moment';
import momentDuration from 'moment-duration-format';

momentDuration(moment);

class ProgramExecutor {

    constructor(device, selectedProgram, chartContext) {
        this.device = device;
        this.selectedProgram = selectedProgram;
        this.chartContext = chartContext;
        this.reinitProgram();
        let thisObj = this;
        setInterval(() => { thisObj.updateProgress(); }, 1000);
    }

    setSelectedProgram(selection) {
        this.selectedProgram = selection;
        this.reinitProgram();
    }

    initChart() {
        let newLabels = [];
        let dataSpeed = [];
        let dataIncline = [];
        this.programQueue.forEach((step, i) => {
            newLabels.push('' + i);
            dataSpeed.push(step[0]);
            dataIncline.push(step[1]);
        });
    
        if (this.chart) {
            this.chart.destroy();
        }
    
        this.chart = new Chart(this.chartContext, {
            // The type of chart we want to create
            type: 'line',
        
            // The data for our dataset
            data: {
                labels: newLabels,
                datasets: [{
                    label: 'Incline',
                    data: dataIncline,
                    // Changes this dataset to become a line
                    borderColor: 'rgb(0, 255, 0)',
                    steppedLine: 'before',
                    type: 'line'
                },{
                    label: 'Speed',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: dataSpeed,
                    steppedLine: 'before',
                }]
            },
        
            // Configuration options go here
            options: {}
        });    
    }
    
    updateProgress() {
        if (this.device.isRunning() && this.isExecuting()) {
            let currentProgramDuration = Math.round((Date.now() - this.programStartTime) / 1000);
            let programProgressRatio = Math.round( currentProgramDuration * 100 / this.programDuration);
            let programRemainingTime = moment.duration(this.programDuration - currentProgramDuration, 'seconds').format('H:mm:ss');
            $('#programProgress')
                .css('width', programProgressRatio+'%')
                .attr('aria-valuenow', programProgressRatio)
                .html(programRemainingTime);
    
            let currentDuration = (Date.now() - this.currentStepStartTime) / 1000;
            let stepProgressRatio = Math.round( currentDuration * 100 / this.currentStepDuration);
            let stepRemainingTime = Math.round(this.currentStepDuration - currentDuration);
            $('#stepProgress')
                .css('width', stepProgressRatio+'%')
                .attr('aria-valuenow', stepProgressRatio)
                .html(stepRemainingTime);
        } else {
            $('#programProgress').css('width', '0%').attr('aria-valuenow', 0);        
            $('#stepProgress').css('width', '0%').attr('aria-valuenow', 0);        
        }
    }

    isExecuting() {
        return this.programInterval && true;
    }

    start() {
        let thisObj = this;
        this.execute(); // now then with interval
        this.programInterval = setInterval(() => { thisObj.execute() }, this.selectedProgram.stepDuration * 1000);
    }

    stop() {
        this.device.addMessage(STOP_COMMAND);
        clearInterval(this.programInterval);
        this.programInterval = null;
    }

    setOnStepChangedListener(callback) {
        this.onStepChanged = callback;
    }

    getSteps() {
        return JSON.parse(JSON.stringify(this.programQueue));
    }
    
    execute() {
      if (this.device.isRunning() && this.programQueue.length > 0) {
        this.updateChart();
        this.currentStep = this.programQueue.shift();
        this.currentStepDuration = this.currentStep.length === 3 ? this.currentStep[2] : this.selectedProgram.stepDuration;
        this.currentStepStartTime = Date.now();
        this.device.sendIncAndSpeed(this.currentStep[1], this.currentStep[0]);
        if (this.onStepChanged) {
            this.onStepChanged();
        }
      } else {
          this.stop();
      }
    }

    updateChart() {
        console.log("Update Chart");
        let chart = this.chart;
        let dataSpeed = chart.data.datasets[1].data;
        let dataIncline = chart.data.datasets[0].data;
    
        this.programQueue.forEach((step, i) => {
            dataSpeed[i]=step[0];
            dataIncline[i]=step[1];
        });
    
        // clear last data as it scroll left
        for(var i = this.programQueue.length; i < dataSpeed.length; i++) {
            dataSpeed[i]=0;
            dataIncline[i]=0;
        }
        chart.update({
            duration: 0
        });
    }
    
    reinitProgram() {
        this.programQueue = [];
        this.programStartTime = Date.now();
        this.programDuration = this.selectedProgram.stepDuration * this.selectedProgram.steps.length;
        this.currentSpeed = 0;
        this.currentIncline = 0;
        this.currentStepDuration = 0;
        this.currentStepStartTime = 0;
        this.currentStep = 0;

        let programQueue = this.programQueue;
        this.selectedProgram.steps.forEach(step => programQueue.push(step));
        this.initChart();
    }
    
}

export default ProgramExecutor;