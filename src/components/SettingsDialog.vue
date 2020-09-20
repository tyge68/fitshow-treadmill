<template>
<md-dialog :md-active.sync="showDlg">
  <md-dialog-title>Edit Settings</md-dialog-title>
  <md-content>
        <form>
          <div class="form-group row">
            <legend class="col-form-label col-sm-4 pt-0">Running Mode</legend>
            <div class="col-sm-4">
              <div class="form-check">
                <input class="form-check-input" type="radio" v-model="settings.mode" name="mode" id="runningDefault" value="default" :checked="settings.mode === 'default'">
                <label class="form-check-label" for="runningDefault">
                  Default
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" v-model="settings.mode" name="mode" id="runningTime" value="time" :checked="settings.mode === 'time'">
                <label class="form-check-label" for="runningTime">
                  Time limit
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" v-model="settings.mode" name="mode" id="runningDistance" value="distance" :checked="settings.mode === 'distance'">
                <label class="form-check-label" for="runningDistance">
                  Distance limit
                </label>
              </div>
            </div>
          </div>
          <div class="form-group row" :class="{ 'md-hide': settings.mode !== 'distance' }">
            <legend class="col-form-label col-sm-4 pt-0">Distance (km)</legend>
            <div class="col-sm-4">
              <select class="w-100 pl-2" v-model="settings.distancelimit" id="distanceSelect">
                <option v-for="dist in validDistances" v-bind:key="dist" :value="dist">{{ dist }}</option>
              </select>
            </div>
          </div>
          <div class="form-group row" :class="{ 'md-hide': settings.mode !== 'time' }">
            <legend class="col-form-label col-sm-4 pt-0">Time (minutes)</legend>
            <div class="col-sm-4">
              <select class="w-100 pl-2" v-model="settings.timelimit" id="timeSelect">
                <option v-for="time in validTimes" v-bind:key="time" :value="time">{{ time }}</option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <legend class="col-form-label col-sm-4 pt-0">Program</legend>
            <div class="col-sm-4">
              <div class="btn-group" role="group">
                <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ programTitle }}</button>
                <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                  <a @click="selectProgram" v-for="(item, index) in programs" v-bind:key="item.title" class="dropdown-item" href="#" v-bind:data-program-index="index">{{ item.title }}</a>
                </div>
              </div>
            </div>
          </div>
        </form>
  </md-content>
  <md-dialog-actions>
    <md-button class="md-primary" @click="showDlg = false">Close</md-button>
    <md-button class="md-primary" @click="saveChanges">Save</md-button>
  </md-dialog-actions>
</md-dialog>
</template>

<script>
import { ProgramExecutor } from '../services/ProgramExecutor'
import { EventBus } from '../event-bus'

export default {
  name: 'SettingsDialog',
  data() {
    return {
      showDlg: true,
      programTitle: 'Select Program',
      programs: ProgramExecutor.getAllPrograms(),
      settings: ProgramExecutor.getSettings(),
      validDistances: [ 1, 2, 3, 5, 10, 15, 30 ],
      validTimes: [ 5, 10, 30, 45, 60, 90 ]
    }
  },
  methods: {
    selectProgram(event) {
      let selectedProgramIdx = event.target.dataset.programIndex
      let selectedProgram = ProgramExecutor.getAllPrograms()[selectedProgramIdx]
      this.settings.programId = selectedProgramIdx
      this.programTitle = selectedProgram.title
    },
    saveChanges() {
      ProgramExecutor.saveSettings(this.settings)
      ProgramExecutor.reinitProgram()
    }
  },
  mounted() {
    this.programTitle = ProgramExecutor.selectedProgram.title
    EventBus.$on('openDialog', () => {
      this.showDlg = true
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
