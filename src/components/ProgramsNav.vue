<template>
    <div class="container-fluid">
        <div v-for="(item, index) in _programs" v-bind:key="item.title" class="row">
        <div class="col">
            <a @click="selectProgram" class="nav-link" :data-index="index" href="#">{{ item.title }}</a>
        </div>
        <div class="col-sm-1" v-if="!item.readOnly">
            <button @click="deleteProgram" class="btn btn-primary" :data-index="index"><i class="far fa-trash-alt"></i></button>
        </div>
        </div>
        <div class="row">
        <div class="col-sm-3">
            <center><button @click="addProgram" class="btn btn-primary">Add</button></center>
        </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ProgramsNav',
  props: {
    programs: {
      type: Array,
      required: true
    }
  },
  computed: {
    _programs() {
        return JSON.parse(JSON.stringify(this.programs)); 
    }
  },
  methods: {
        selectProgram(event) {
            this.$emit('selectProgram', event.target.dataset.index)
            event.preventDefault()
        },
        addProgram() {
            this.$emit('addProgram')
            event.preventDefault()
        },
        deleteProgram(event) {
            this.$emit('deleteProgram', event.target.parentElement.dataset.index)
            event.preventDefault()
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
