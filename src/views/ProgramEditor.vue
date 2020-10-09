<template>
  <md-app md-mode="fixed">
    <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="showNavigation = true">
          <md-icon>menu</md-icon>
        </md-button>
        <md-button @click="backHome" class="md-icon-button md-primary"><md-icon>chevron_left</md-icon></md-button>
        <md-button @click="copyPrograms" class="md-icon-button md-primary"><md-icon>content_copy</md-icon></md-button>
        <md-button @click="pastePrograms" class="md-icon-button md-primary"><md-icon>content_paste</md-icon></md-button>
        <div class="md-toolbar-section-end" v-if="!readOnly">
          <md-button class="md-icon-button" @click="save">
            <md-icon>save</md-icon>
          </md-button>
          <md-button v-if="!isNew" class="md-icon-button" @click="reset">
            <md-icon>undo</md-icon>
          </md-button>
        </div>
        <span class="md-title">Training Programs Editor</span>
    </md-app-toolbar>
    <md-app-drawer :md-active.sync="showNavigation" md-swipeable>
        <md-toolbar class="md-primary" md-elevation="0">
          <span class="md-title">Training Programs</span>
        </md-toolbar>
        <ProgramsNav :programs="programs" @selectProgram="selectProgram" @addProgram="addProgram" @deleteProgram="deleteProgram" />
        <md-button @click="addProgram" class="md-primary">Add</md-button>
    </md-app-drawer>
    <md-app-content>
      <EditorFormPanel :selectedProgram="$v.selectedProgram" :isNew="isNew" @addStep="addStep" @removeStep="removeStep" @saveForm="save" @resetForm="reset" />
      <md-dialog-alert
        :md-active.sync="displayAlert"
        md-title="Operation Aborted"
        md-content="Please make sure to save or reset this program before switching to another one." />
    </md-app-content>
  </md-app>
</template>

<script>
import { ProgramExecutor } from '../services/ProgramExecutor'
import ProgramsNav from '../components/ProgramsNav.vue'
import EditorFormPanel from '../components/EditorFormPanel.vue'
import { required, minLength, between } from 'vuelidate/lib/validators'

function copyStringToClipboard (str) {
   // Create new element
   var el = document.createElement('textarea');
   // Set value (string to be copied)
   el.value = str;
   // Set non-editable to avoid focus and move outside of view
   el.setAttribute('readonly', '');
   el.style = {position: 'absolute', left: '-9999px'};
   document.body.appendChild(el);
   // Select text inside element
   el.select();
   // Copy text to clipboard
   document.execCommand('copy');
   // Remove temporary element
   document.body.removeChild(el);
}

export default {
  name: 'ProgramEditor',
  data() {
    return {
      isNew: false,
      displayAlert: false,
      showNavigation: false,
      programs: ProgramExecutor.getAllPrograms(),
      selectedProgram: ProgramExecutor.getProgram(0) || false,
      selectedIdx: 0
    }
  },
  components: {
      ProgramsNav,
      EditorFormPanel
  },  
  created() {
    if (!this.$store.state.connected) {
      this.$router.push({ path: "/" });
    }
  },
  computed: {
      readOnly() {
        return this.$v.selectedProgram.$model.readOnly
      }
  },
  methods: {
    selectProgram(index) {
      if (!this.$v.$anyDirty) {
          this.selectedIdx = index
          this.selectedProgram = ProgramExecutor.getProgram(this.selectedIdx)
          this.showNavigation = false
          this.$nextTick(() => { this.$v.$reset() })
      } else {
          this.displayAlert = true
      }
    },
    addProgram() {
      if (this.$v && this.$v.$anyDirty) {
          this.displayAlert = true
      } else {
          this.selectedIdx = ProgramExecutor.createNew()
          this.programs = ProgramExecutor.getAllPrograms()
          this.selectedProgram = ProgramExecutor.getProgram(this.selectedIdx)
          this.isNew = true
          this.showNavigation = false
          if (this.$v) {
          this.$nextTick(() => { this.$v.$touch() })
          }
      }
    },
    backHome() {
      if (!this.$v.$anyDirty) {
        this.$router.push({ path: "/home" })
      } else {
        this.displayAlert = true
      }
    },
    copyPrograms() {
      copyStringToClipboard(JSON.stringify(ProgramExecutor.getAllPrograms().filter( p => !p.readOnly),"",2))
    },
    async pastePrograms() {
      if (this.$v && this.$v.$anyDirty) {
          this.displayAlert = true
      } else {
        const text = await navigator.clipboard.readText();
        if (text && text.length > 0) {
          try {
            let customPrograms = JSON.parse(text)
            ProgramExecutor.importPrograms(customPrograms)
            this.programs = ProgramExecutor.getAllPrograms()
            this.selectProgram(0)
          } catch (err) {
            console.log("Cannot parse json from clipboard")
          }
        }
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
        this.displayAlert = true
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
.md-app {
  max-height: 100vh;
}

canvas {
 min-width: 383px; 
 min-height: 212px; 
}
</style>
