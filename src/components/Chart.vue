<template>
  <canvas></canvas>
</template>

<script>
import { ProgramExecutor } from '../services/ProgramExecutor';
import { EventBus } from '../event-bus';

class TrainingProgramChart {

    constructor(chartContext) {
      let thisObj = this;
      this.chartContext = chartContext;
      this.initChart();
      EventBus.$on('trainingProgramReInit', () => {
        thisObj.initChart();
      });
      EventBus.$on('trainingStepChanged', allSteps => {
        thisObj.updateChart(allSteps);
      });
    }

    updateChart(allStep) {
        console.log("Update Chart");
        let chart = this.chart;
        let dataSpeed = chart.data.datasets[1].data;
        let dataIncline = chart.data.datasets[0].data;

        allStep.forEach((step, i) => {
            dataSpeed[i]=step.s;
            dataIncline[i]=step.i;
        });
    
        // clear last data as it scroll left
        for(var i = allStep.length; i < dataSpeed.length; i++) {
            dataSpeed[i]=0;
            dataIncline[i]=0;
        }
        chart.update({
            duration: 0
        });
    }

    initChart() {
        let newLabels = [];
        let dataSpeed = [];
        let dataIncline = [];
        ProgramExecutor.getSteps().forEach((step, i) => {
            newLabels.push('' + i);
            dataSpeed.push(step.s);
            dataIncline.push(step.i);
        });
    
        if (this.chart) {
            this.chart.destroy();
        }
    
        this.chart = new window.Chart(this.chartContext, {
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
            options: {
              scales: {
                yAxes: [{
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 16
                    }
                }]
              }
            }
        });    
    }
}

export default {
  name: 'Chart',
  mounted: function () {
    let chartContext = this.$el.getContext("2d");
    new TrainingProgramChart(chartContext);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media (orientation: landscape) {
  canvas {
    height: 75vh !important;
  }
}
</style>
