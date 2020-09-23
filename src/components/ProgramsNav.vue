<template>
    <md-list>
        <md-list-item @click="selectProgram" v-for="(item, index) in _programs" v-bind:key="item.title" :data-index="index">
            {{ item.title }}
            <div class="col-sm-1" v-if="!item.readOnly">
                <md-button @click="deleteProgram" class="md-primary" :data-index="index"><md-icon>delete</md-icon></md-button>
            </div>
        </md-list-item>
    </md-list>
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
            console.log(event)
            this.$emit('selectProgram', event.currentTarget.dataset.index)
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
