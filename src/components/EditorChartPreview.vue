<template>
    <canvas class="sticky-top"></canvas>
</template>

<script>
export default {
  name: 'EditorChartPreview',
  props: {
    steps: {
      type: Array,
      required: true
    },
    readOnly: {
      type: Boolean,
      required: true
    }
  },
  mounted() {
    if (this.steps) {
      this.$nextTick(() => {
        let canvas = this.$el
        this.chartContext = canvas.getContext('2d')
        this.drawChart()
        canvas.onpointerdown = this.downHandler
        canvas.onpointerup = this.upHandler
        canvas.onpointermove = null
        this.canvas = canvas
      })
    }
  },
  watch: {
    steps: {
      handler() {
          this.drawChart()
      },
      deep:true
    }
  },
  methods: {
    downHandler(event) {
        if (this.readOnly) {
            return
        }
        // check for data point near event location
        const points = this.chart.getElementAtEvent(event, {intersect: false});
        if (points.length > 0) {
           // grab nearest point, start dragging
           this.activePoint = points[0]
           this.canvas.onpointermove = this.moveHandler
        }
    },
    upHandler() {
        if (this.readOnly) {
            return
        }
        // release grabbed point, stop dragging
        this.activePoint = null
        this.canvas.onpointermove = null
    },
    map(value, start1, stop1, start2, stop2) {
        return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1))
    },
    moveHandler() {
        if (!this.readOnly && this.activePoint != null) {
            var data = this.activePoint._chart.data
            var datasetIndex = this.activePoint._datasetIndex

            // read mouse position
            const helpers = window.Chart.helpers
            var position = helpers.getRelativePosition(event, this.chart)

            // convert mouse position to chart y axis value 
            var chartArea = this.chart.chartArea
            var yAxis = this.chart.scales["y-axis-0"]
            var yValue = Math.round(this.map(position.y, chartArea.bottom, chartArea.top, yAxis.min, yAxis.max))
            if (datasetIndex === 0 && yValue < 0) {
                yValue = 0
            }
            if (datasetIndex === 1 && yValue < 1) {
                yValue = 1
            }
            if (yValue > 15) {
                yValue = 15
            }
            // update y value of active data point
            data.datasets[datasetIndex].data[this.activePoint._index] = yValue
            this.chart.update();
            this.$emit("stepsUpdated", this.toSteps(data))
        }
    },
    toSteps(data) {
        let steps = []
        data.datasets[0].data.forEach((incline, index) => {
            steps.push({ i: incline, s: data.datasets[1].data[index] })
        })
        return steps
    },
    drawChart() {
        let newLabels = []
        let dataSpeed = []
        let dataIncline = []
        this.steps.forEach((step, i) => {
            newLabels.push('' + i)
            dataSpeed.push(step.s)
            dataIncline.push(step.i)
        })
    
        if (this.chart) {
            this.chart.destroy()
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
        })     
    }
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
