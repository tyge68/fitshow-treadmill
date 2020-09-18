<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2">
        <div class="container-fluid">
          <div v-for="(item, index) in programs" v-bind:key="item.title" class="row">
            <div class="col">
              <a @click="selectProgram" class="nav-link" :data-index="index" href="#">{{ item.title }}</a>
            </div>
            <div class="col-sm-1">
              <button @click="deleteProgram" class="btn btn-primary" :data-index="index"><i class="far fa-trash-alt"></i></button>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-3">
              <center><button @click="addProgram" class="btn btn-primary">Add</button></center>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-10">
        <form role="form" class="ml-2" v-if="selectedProgram">
          <div class="form-group row">
            <legend class="col-form-label col-sm-2   pt-0">Program Title</legend>
            <div class="col-sm-8">
              <input v-model="selectedProgram.title" class="form-control" />
            </div>
          </div>
          <div class="form-group row">
            <legend class="col-form-label col-sm-2   pt-0">Step Duration (seconds)</legend>
            <div class="col-sm-8">
              <input v-model="$v.selectedProgram.stepDuration.$model" class="form-control" />
              <div class="invalid-feedback d-block" v-if="$v.selectedProgram.stepDuration.$invalid">Must be between 30 and 3600</div>
            </div>
          </div>
          <div class="form-group row">
            <legend class="col-form-label col-sm-2   pt-0">Steps</legend>
            <div class="col-sm-4">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-sm-2">
                    #
                  </div>
                  <div class="col-sm-2">
                    Incline
                  </div>
                  <div class="col-sm-2">
                    Speed
                  </div>
                </div>
                <div class="row" v-for="(item, index) in $v.selectedProgram.steps.$each.$iter" v-bind:key="index" :data-index="index">
                  <div class="col-sm-2">
                    <div class="form-control">{{ index }}</div>
                  </div>
                  <div class="col-sm-2">
                    <input v-model="item.i.$model" class="form-control" />
                    <div class="invalid-feedback d-block" v-if="!item.i.between">Must be between -1 and 15</div>
                  </div>
                  <div class="col-sm-2">
                    <input v-model="item.s.$model" class="form-control" />
                    <div class="invalid-feedback d-block" v-if="!item.s.between">Must be between 2 and 15</div>
                  </div>
                  <div class="col-sm-2">
                    <button @click="removeStep" class="btn btn-primary">
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-2 invalid-feedback d-block" v-if="!$v.selectedProgram.steps.minLength">
                    Please make sure to have at least 5 steps.
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-1">
                    <button @click="addStep" class="btn btn-primary">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <canvas class="sticky-top"></canvas>
            </div>
          </div>
          <div class="container-fluid">
            <div class="row">
              <div class="col-sm-1">
                <center><button @click="save" class="btn btn-primary" :disabled="$v.$invalid">Save</button></center>
              </div>
              <div class="col-sm-2 invalid-feedback d-block" v-if="$v.$invalid">Please check for invalid inputs</div>
              <div class="col-sm-1">
                <center><button @click="reset" class="btn btn-primary">Reset</button></center>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Error occurred</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Please make sure to save or reset this program before switching to another one.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ProgramExecutor } from '../services/ProgramExecutor'
import { required, minLength, between } from 'vuelidate/lib/validators'

export default {
  name: 'ProgramEditor',
  data() {
    return {
      programs: ProgramExecutor.getAllPrograms(),
      selectedProgram: ProgramExecutor.getProgram(0),
      selectedIdx: 0
    }
  },
  methods: {
    selectProgram(event) {
      if (!this.$v.$anyDirty) {
        this.selectedIdx = event.target.dataset.index
        this.selectedProgram = ProgramExecutor.getProgram(this.selectedIdx)
      } else {
        window.jQuery(this.errorDialog).modal({ show: true })
      }
    },
    addProgram() {
      if (!this.$v.$anyDirty) {
        this.selectedIdx = ProgramExecutor.createNew()
        this.programs = ProgramExecutor.getAllPrograms()
        this.selectedProgram = ProgramExecutor.getProgram(this.selectedIdx)
        this.$nextTick(() => { this.$v.$touch() })
    } else {
        window.jQuery(this.errorDialog).modal({ show: true })
      }
    },
    deleteProgram(event) {
      if (!this.$v.$anyDirty) {
        let selectedIdx = event.target.dataset.index
        ProgramExecutor.deleteProgram(selectedIdx)
        this.programs = ProgramExecutor.getAllPrograms()
        let programsLength = this.programs.length
        if (this.selectedIdx >= programsLength) {
          this.selectedIdx = programsLength - 1
        }
        if (this.selectedIdx < 0) {
          this.selectedProgram = null
        } else {
          this.selectedProgram = ProgramExecutor.getProgram(this.selectedIdx)
          this.$nextTick(() => { this.$v.$touch() })
        }
    } else {
        window.jQuery(this.errorDialog).modal({ show: true })
      }
    },
    save(event) {
      ProgramExecutor.updateProgram(this.selectedIdx, this.selectedProgram)
      this.programs = ProgramExecutor.getAllPrograms()
      this.$nextTick(() => { this.$v.$reset() })
      event.preventDefault()
    },
    addStep(event) {
      this.selectedProgram.steps.push({ s:2, i:0 })
      event.preventDefault()
    },
    reset() {
      this.selectedProgram = ProgramExecutor.getProgram(this.selectedIdx)
      this.$nextTick(() => { this.$v.$reset() })
    },
    removeStep(event) {
      let removedIndex = event.target.parentElement.parentElement.parentElement.dataset.index
      this.selectedProgram.steps.splice(removedIndex, 1)
      event.preventDefault()
    },
    drawChart() {
        let newLabels = [];
        let dataSpeed = [];
        let dataIncline = [];
        this.selectedProgram.steps.forEach((step, i) => {
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
            options: {}
        });    
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.errorDialog = this.$el.getElementsByClassName("modal")[0]
      this.chartContext = this.$el.getElementsByTagName("canvas")[0].getContext('2d')
      this.drawChart()
    })
  },
  watch: {
    selectedProgram: {
      handler() {
        if (!this.$v.$invalid) {
          this.drawChart()
        }
      },
      deep:true
    }
  },
  validations: {
    selectedProgram: {
      stepDuration: {
        required,
        between: between(30, 3600)
      },
      steps: {
        required,
        minLength: minLength(5),
        $each: {
          i: {
            required,
            between: between(-1, 15)
          },
          s: {
            required,
            between: between(2, 15)
          }
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
