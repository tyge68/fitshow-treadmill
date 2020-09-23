<template>
<md-tabs>
  <md-tab md-label="Properties" md-icon="settings">
    <form v-if="selectedProgram">
        <md-field>
          <label>Title</label>
          <md-input v-model="selectedProgram.$model.title" :disabled="readOnly" />
        </md-field>
        <md-field :class="selectedProgram.stepDuration.$invalid ? 'md-invalid' : ''">
          <label>Step Duration (seconds)</label>
          <md-input v-model="selectedProgram.$model.stepDuration" :disabled="readOnly" />
          <span class="md-error" v-if="selectedProgram.stepDuration.$invalid">Must be between 30 and 3600</span>
        </md-field>
        <label>Steps</label>
        <div class="md-layout">
            <div class="md-layout-item md-size-5">#</div>
            <div class="md-layout-item">Incline</div>
            <div class="md-layout-item">Speed</div>
            <div class="md-layout-item md-size-5"></div>
        </div>
        <div class="md-layout" v-for="(item, index) in selectedProgram.steps.$each.$iter" v-bind:key="index" :data-index="index">
            <div class="md-layout-item md-size-5 numbering">
              {{ index }}
            </div>
            <div class="md-layout-item">
              <md-field :class="!item.i.between ? 'md-invalid' : ''">
                <md-input v-model="item.i.$model" :disabled="readOnly" />
                <span class="md-error">Must be between -1 and 15</span>
              </md-field>
            </div>
            <div class="md-layout-item">
              <md-field :class="!item.s.between ? 'md-invalid' : ''">
                <md-input v-model="item.s.$model" :disabled="readOnly" />
                <span class="md-error">Must be between 2 and 15</span>
              </md-field>
            </div>
            <div class="md-layout-item md-size-5" v-if="!readOnly">
              <md-button @click="removeStep" class="md-primary"><md-icon>delete</md-icon></md-button>
            </div>
        </div>
        <div class="md-layout">
            <div class="md-layout-item" v-if="!selectedProgram.steps.minLength">
              <span class="error">Please make sure to have at least 5 steps.</span>
            </div>
        </div>
        <div class="md-layout" v-if="!readOnly">
            <div class="md-layout-item">
                <md-button @click="addStep" class="md-primary">Add</md-button>
            </div>
        </div>
        <div class="md-layout" v-if="!readOnly">
          <div class="md-layout-item">
              <span class="error" v-if="selectedProgram.$invalid">Please check for invalid inputs</span>
          </div>
        </div>
    </form>
  </md-tab>
  <md-tab md-label="Preview" md-icon="bar_chart">
    <div class="md-layout">
        <EditorChartPreview :steps="steps" />
    </div>
  </md-tab>
</md-tabs>
</template>

<script>
import EditorChartPreview from './EditorChartPreview.vue'

export default {
  name: 'EditorFormPanel',
  components: {
      EditorChartPreview
  },
  props: {
    isNew: {
      type: Boolean,
      required: true
    },
    selectedProgram: {
      type: Object,
      required: true
    }
  },
  computed: {
      readOnly() {
        return this.selectedProgram.$model.readOnly
      },
      steps() {
        return this.selectedProgram.$model.steps
      }
  },
  methods: {
      removeStep(event) {
        this.$emit('removeStep')
        event.preventDefault()
      },
      addStep(event) {
        this.$emit('addStep')
        event.preventDefault()
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "~vue-material/dist/theme/engine"; // Import the theme engine

.numbering {
  display: flex;
  justify-content:flex-start;
  align-items: center;
  font-weight: bold;
  height: auto;
}

.error {
  color: md-get-palette-color(red, A400)
}
</style>
