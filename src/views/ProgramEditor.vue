<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2">
        <ul class="nav flex-column">
          <li v-for="(item, index) in programs" v-bind:key="item.title" class="nav-item">
            <a @click="selectProgram" class="nav-link" :data-index="index" href="#">{{ item.title }}</a>
          </li>
        </ul>
      </div>
      <div class="col-md-10">
        <form role="form">
          <div class="form-group row">
            <legend class="col-form-label col-sm-2   pt-0">Program Title</legend>
            <div class="col-sm-8">
              <input v-model="selectedProgram.title" class="form-control" />
            </div>
          </div>
          <div class="form-group row">
            <legend class="col-form-label col-sm-2   pt-0">Step Duration</legend>
            <div class="col-sm-8">
              <input v-model="selectedProgram.stepDuration" class="form-control" />
            </div>
          </div>
          <div class="form-group row">
            <legend class="col-form-label col-sm-2   pt-0">Steps</legend>
            <div class="col-sm-8">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-sm-1">
                    #
                  </div>
                  <div class="col-sm-3">
                    Incline
                  </div>
                  <div class="col-sm-3">
                    Speed
                  </div>
                </div>
                <div class="row" v-for="(item, index) in selectedProgram.steps" v-bind:key="index" :data-index="index">
                  <div class="col-sm-1">
                    <div class="form-control">{{ index }}</div>
                  </div>
                  <div class="col-sm-3">
                    <input v-model="item[1]" class="form-control" />
                  </div>
                  <div class="col-sm-3">
                    <input v-model="item[0]" class="form-control" />
                  </div>
                  <div class="col-sm-1">
                    <button @click="remove" class="btn btn-primary">
                      <i class="fas fa-minus-circle"></i>
                    </button>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-1">
                    <button @click="add" class="btn btn-primary">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button @click="save" class="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ProgramExecutor } from '../services/ProgramExecutor';

export default {
  name: 'ProgramEditor',
  data() {
    let allPrograms = ProgramExecutor.getAllPrograms();
    return {
      programs: allPrograms,
      selectedProgram: allPrograms[0],
      selectedIdx: 0
    }
  },
  methods: {
    selectProgram(event) {
      this.selectedIdx = event.target.dataset.index;
      this.selectedProgram = this.programs[this.selectedIdx];
    },
    save(event) {
      ProgramExecutor.updateProgram(this.selectedIdx, this.selectedProgram);
      event.preventDefault();
    },
    add(event) {
      this.selectedProgram.steps.push([[2], [0]]);
      event.preventDefault();
    },
    remove(event) {
      let removedIndex = event.target.parentElement.parentElement.parentElement.dataset.index;
      this.selectedProgram.steps.splice(removedIndex, 1);
      event.preventDefault();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
