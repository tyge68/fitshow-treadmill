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
    }
  },
  mounted() {
    if (this.steps) {
      this.$nextTick(() => {
        this.chartContext = this.$el.getContext('2d')
        this.drawChart()
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
    drawChart() {
        let newLabels = [];
        let dataSpeed = [];
        let dataIncline = [];
        this.steps.forEach((step, i) => {
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
