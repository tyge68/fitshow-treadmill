<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <button @click="backHome" type="button" class="btn btn-secondary"><i class="fas fa-arrow-left"></i></button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-2">
        <ProgramsNav :programs="programs" @selectProgram="selectProgram" @addProgram="addProgram" @deleteProgram="deleteProgram" />
      </div>
      <div class="col-md-10" v-if="$v.selectedProgram">
        <EditorFormPanel :selectedProgram="$v.selectedProgram" :isNew="isNew" @addStep="addStep" @removeStep="removeStep" @saveForm="save" @resetForm="reset" />
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
import ProgramsNav from '../components/ProgramsNav.vue'
import EditorFormPanel from '../components/EditorFormPanel.vue'
import { required, minLength, between } from 'vuelidate/lib/validators'

export default {
  name: 'ProgramEditor',
  data() {
    return {
      isNew: false,
      programs: ProgramExecutor.getAllPrograms(),
      selectedProgram: ProgramExecutor.getProgram(0) || false,
      selectedIdx: 0
    }
  },
  components: {
      ProgramsNav,
      EditorFormPanel
  },  
  methods: {
    selectProgram(index) {
      if (!this.$v.$anyDirty) {
          this.selectedIdx = index
          this.selectedProgram = ProgramExecutor.getProgram(this.selectedIdx)
      } else {
          window.jQuery(this.errorDialog).modal({ show: true })
      }
    },
    addProgram() {
      if (this.$v && this.$v.$anyDirty) {
          window.jQuery(this.errorDialog).modal({ show: true })
      } else {
          this.selectedIdx = ProgramExecutor.createNew()
          this.programs = ProgramExecutor.getAllPrograms()
          this.selectedProgram = ProgramExecutor.getProgram(this.selectedIdx)
          this.isNew = true
          if (this.$v) {
          this.$nextTick(() => { this.$v.$touch() })
          }
      }
    },
    backHome() {
      if (!this.$v.$anyDirty) {
        this.$router.push({ path: "/home" })
      } else {
        window.jQuery(this.errorDialog).modal({ show: true })
      }
    },
    deleteProgram(index) {
      if (!this.$v.$anyDirty) {
          let selectedIdx = index
          ProgramExecutor.deleteProgram(selectedIdx)
          this.programs = ProgramExecutor.getAllPrograms()
          let programsLength = this.programs.length
          if (this.selectedIdx >= programsLength) {
          this.selectedIdx = programsLength - 1
          }
          if (this.selectedIdx < 0) {
          this.selectedProgram = false
          } else {
          this.selectedProgram = ProgramExecutor.getProgram(this.selectedIdx)
          }
      } else {
          window.jQuery(this.errorDialog).modal({ show: true })
      }
    },
    save() {
      ProgramExecutor.updateProgram(this.selectedIdx, this.selectedProgram)
      this.programs = ProgramExecutor.getAllPrograms()
      this.isNew = false,
      this.$nextTick(() => { this.$v.$reset() })
    },
    addStep() {
      this.selectedProgram.steps.push({ s:2, i:0 })
    },
    reset() {
      this.selectedProgram = ProgramExecutor.getProgram(this.selectedIdx)
      this.$nextTick(() => { this.$v.$reset() })
    },
    removeStep(index) {
      let removedIndex = index //event.target.parentElement.parentElement.parentElement.dataset.index
      this.selectedProgram.steps.splice(removedIndex, 1)
      event.preventDefault()
    }
  },
  mounted() {
    if (this.selectedProgram) {
      this.$nextTick(() => {
        this.errorDialog = this.$el.getElementsByClassName("modal")[0]
      })
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
canvas {
 min-width: 383px; 
 min-height: 212px; 
}
</style>
