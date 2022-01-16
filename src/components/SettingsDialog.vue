<template>
<md-dialog :md-active.sync="showDlg">
  <md-dialog-title>Edit Settings</md-dialog-title>
  <md-dialog-content>
        <form>
          <div class="md-layout">
            <div class="md-layout-item">
                <label>Running Mode</label>
                <md-radio v-model="settings.mode" name="mode" value="default" :checked="settings.mode === 'default'">Default</md-radio>
                <md-radio v-model="settings.mode" name="mode" value="time" :checked="settings.mode === 'time'">Time limit</md-radio>
                <md-radio v-model="settings.mode" name="mode" value="distance" :checked="settings.mode === 'distance'">Distance limit</md-radio>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item" :class="{ 'md-hide': settings.mode !== 'distance' }">
              <md-field>
                <label for="movie">Distance (km)</label>
                <md-select v-model="settings.distancelimit" name="distancelimit">
                  <md-option v-for="(dist, index) in validDistances" v-bind:key="index" :value="dist">{{ dist }}</md-option>
                </md-select>
              </md-field>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item" :class="{ 'md-hide': settings.mode !== 'time' }">
              <md-field>
                <label for="movie">Time (minutes)</label>
                <md-select v-model="settings.timelimit" name="timelimit">
                  <md-option v-for="(time, index) in validTimes" v-bind:key="index" :value="time">{{ time }}</md-option>
                </md-select>
              </md-field>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item">
              <md-field>
                <label>Loops</label>
                <md-select v-model="settings.loops" name="loops">
                  <md-option v-for="(n, index) in validLoops" :key="index" :value="n">{{ n }}</md-option>
                </md-select>
              </md-field>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item">
              <md-field>
                <label>Average Speed</label>
                <md-select v-model="settings.avgSpeed" name="avgSpeed">
                  <md-option v-for="(n, index) in validAverages" :key="index" :value="n">{{ n }}</md-option>
                </md-select>
              </md-field>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item">
              <md-field>
                <label>Program</label>
                <md-select v-model="settings.programId" name="programId">
                  <md-option @md-selected="selectProgram" v-for="(item, index) in programs" :key="index" :value="index">{{ item.title }}</md-option>
                </md-select>
                <md-button @click="randomizeProgram" class="md-mini md-primary" :class="{ 'md-hide': settings.programId !== 0 }">
                  <md-icon>refresh</md-icon>
                </md-button>
              </md-field>
            </div>
          </div>
        </form>
  </md-dialog-content>
  <md-dialog-actions>
    <md-button class="md-primary" @click="showDlg = false">Close</md-button>
    <md-button class="md-primary" @click="saveChanges">Save</md-button>
  </md-dialog-actions>
</md-dialog>
</template>

<script>
import {ProgramExecutor} from '@/services/ProgramExecutor'
import {EventBus} from '@/event-bus'

export default {
  name: 'SettingsDialog',
  data() {
    return {
      showDlg: false,
      programTitle: 'Select Program',
      programs: ProgramExecutor.getAllPrograms(),
      settings: ProgramExecutor.getSettings(),
      validLoops: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
      validDistances: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 21.1, 42.2 ],
      validTimes: [ 5, 10, 30, 45, 60, 90 ],
      validAverages: [ 'disabled', 5, 6, 7, 8, 9, 10, 11, 12 ]
    }
  },
  methods: {
    randomizeProgram() {
      ProgramExecutor.ensureRandom()
      ProgramExecutor.saveSettings(this.settings)
      ProgramExecutor.reinitProgram()
    },
    selectProgram(value) {
      let selectedProgram = ProgramExecutor.getAllPrograms()[value]
      this.programTitle = selectedProgram.title
    },
    saveChanges() {
      ProgramExecutor.saveSettings(this.settings)
      ProgramExecutor.reinitProgram()
      this.showDlg = false
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
  .md-radio {
    display: flex;
  }
</style>
