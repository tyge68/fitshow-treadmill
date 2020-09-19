<template>
    <form role="form" class="ml-2" v-if="selectedProgram">
        <div class="form-group row">
        <legend class="col-form-label col-sm-2   pt-0">Program Title</legend>
        <div class="col-sm-8">
            <input v-model="selectedProgram.$model.title" class="form-control" :disabled="readOnly" />
        </div>
        </div>
        <div class="form-group row">
        <legend class="col-form-label col-sm-2 pt-0">Step Duration (seconds)</legend>
        <div class="col-sm-8">
            <input v-model="selectedProgram.$model.stepDuration " class="form-control" :disabled="readOnly" />
            <div class="invalid-feedback d-block" v-if="selectedProgram.stepDuration.$invalid">Must be between 30 and 3600</div>
        </div>
        </div>
        <div class="form-group row w100">
        <legend class="col-form-label col-sm-2   pt-0">Steps</legend>
        <div class="col-sm-4">
            <div class="container-fluid">
            <div class="row">
                <div class="col-sm-1">
                #
                </div>
                <div class="col-4">
                Incline
                </div>
                <div class="col-4">
                Speed
                </div>
            </div>
            <div class="row" v-for="(item, index) in selectedProgram.steps.$each.$iter" v-bind:key="index" :data-index="index">
                <div class="col-sm-1">
                <div class="form-control">{{ index }}</div>
                </div>
                <div class="col-4">
                <input v-model="item.i.$model" class="form-control" :disabled="readOnly" />
                <div class="invalid-feedback d-block" v-if="!item.i.between">Must be between -1 and 15</div>
                </div>
                <div class="col-4">
                <input v-model="item.s.$model" class="form-control" :disabled="readOnly" />
                <div class="invalid-feedback d-block" v-if="!item.s.between">Must be between 2 and 15</div>
                </div>
                <div class="col-sm-1" v-if="!readOnly">
                <button @click="removeStep" class="btn btn-primary">
                    <i class="far fa-trash-alt"></i>
                </button>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-2 invalid-feedback d-block" v-if="!selectedProgram.steps.minLength">
                Please make sure to have at least 5 steps.
                </div>
            </div>
            <div class="row" v-if="!readOnly">
                <div class="col-sm-1">
                <button @click="addStep" class="btn btn-primary">
                    Add
                </button>
                </div>
            </div>
            </div>
        </div>
        <div class="col-sm-4">
            <EditorChartPreview :steps="steps" />
        </div>
        </div>
        <div class="container-fluid" v-if="!readOnly">
        <div class="row">
            <div class="col-sm-1">
            <center><button @click="save" class="btn btn-primary" :disabled="selectedProgram.$invalid">Save</button></center>
            </div>
            <div class="col-sm-2 invalid-feedback d-block" v-if="selectedProgram.$invalid">Please check for invalid inputs</div>
            <div class="col-sm-1" v-if="!isNew">
            <center><button @click="reset" class="btn btn-primary">Reset</button></center>
            </div>
        </div>
        </div>
    </form>
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
      },
      reset(event) {
        this.$emit('resetFrom')
        event.preventDefault()
      },
      save(event) {
        this.$emit('saveForm')
        event.preventDefault()
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
