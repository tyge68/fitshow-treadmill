<template>
    <div class="container btn-group">
      <button @click="startTreadmill" id="start" type="button" class="btn btn-primary" disabled><i class="fas fa-play-circle"></i></button>
      <button @click="stopTreadmill" id="stop" type="button" class="btn btn-primary" disabled><i class="far fa-stop-circle"></i></button>
      <div class="btn-group" role="group" aria-label="program related">
        <button @click="startProgram" id="program" type="button" class="btn btn-primary" disabled><i class="fas fa-running"></i></button>
        <div class="btn-group" role="group">
          <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
          <div id="programList" class="dropdown-menu" aria-labelledby="btnGroupDrop1">
            <a @click="selectProgram" v-for="(item, index) in programs" v-bind:key="item.title" class="dropdown-item" href="#" v-bind:data-program-index="index">{{ item.title }}</a>
          </div>
        </div>
        <button id="editProgram" type="button" class="btn btn-secondary" data-toggle="modal" data-target="#editSettingsDialog"><i class="fas fa-edit"></i></button>
      </div>
      <button id="info" aria-expanded="false" aria-controls="statusInfo" type="button" data-toggle="collapse" data-target="#statusInfo" class="btn btn-primary" disabled><i class="fas fa-info-circle"></i></button>  
      <button id="chart" aria-expanded="false" aria-controls="chartPanel" type="button" data-toggle="collapse" data-target="#chartPanel" class="btn btn-primary"><i class="fas fa-chart-bar"></i></button>  
      <button @click="enterFullscreen" id="fullscreen" type="button" class="btn btn-primary"><i class="fas fa-expand-arrows-alt"></i></button>
      <button @click="exitFullscreen" id="exit-fullscreen" type="button" class="btn btn-primary d-none"><i class="fas fa-compress"></i></button>
    </div>
</template>

<script>
import { ProgramExecutor } from '../services/ProgramExecutor';
import { EventBus } from '../event-bus';
import { BTService, START_COMMAND, STOP_COMMAND } from '../services/BTService';

import moment from 'moment';

let $ = window.jQuery;

function onRunning(states) {
    let value = states.value;
    $("#status").html("Running");
    $("#start").prop('disabled', true);
    $("#stop").prop('disabled', false);
    $("#program").prop('disabled', false);
    $("#btnGroupDrop1").prop('disabled', true);
    $("#speed").html(states.currentSpeed);
    $("#incline").html(states.currentIncline);
    $("#totalTime").html(moment.duration(value.getUint8(5) + value.getUint8(6) * 256, 'seconds').format('H:mm:ss'));
    $("#totalDistance").html(value.getUint8(7) + value.getUint8(8) * 256);
    $("#totalCalories").html((value.getUint8(9) + value.getUint8(10) * 256) / 10);
  }

function onStarting(states) {
    console.log("starting", states);
}

function onStopped() {
    $("#status").html("Stopped");
    $("#start").prop('disabled', false);
    $("#stop").prop('disabled', true);
    $("#program").prop('disabled', true);
    $("#btnGroupDrop1").prop('disabled', false);
    $("#speed").html(0);
    $("#incline").html(0);
    $("#totalTime").html('N/A');
    $("#totalDistance").html('N/A');
    $("#totalCalories").html('N/A');

    ProgramExecutor.reinitProgram();
  }

function onConnected() {
  $("#start").prop('disabled', false);
  $("#info").prop('disabled', false);
}

function onStepChanged(newStep) {
    console.log("newStep", newStep);
  }

EventBus.$on('btRunning', onRunning);
EventBus.$on('btStarting', onStarting);
EventBus.$on('btStopped', onStopped);
EventBus.$once('btConnected', onConnected);
EventBus.$on('trainingStepChanged', onStepChanged);

export default {
  name: 'TopNav',
  data() {
    return { programs: ProgramExecutor.getAllPrograms() };
  },
  methods: {
    startTreadmill() {
      BTService.addMessage(START_COMMAND);
    },
    stopTreadmill() {
      BTService.addMessage(STOP_COMMAND);
    },
    startProgram() {
      if (!ProgramExecutor.isExecuting() && BTService.isRunning()) {
        ProgramExecutor.start();
      }
    },
    selectProgram(event) {
      let selectedProgramIdx = $(event.target).data('program-index');
      let selectedProgram = ProgramExecutor.getAllPrograms()[selectedProgramIdx];
      $("#btnGroupDrop1").html(selectedProgram.title);
      ProgramExecutor.stop();
      ProgramExecutor.setSelectedProgram(selectedProgram);
    },
    enterFullscreen() {
      $("body")[0].requestFullscreen();
      $("#exit-fullscreen").toggleClass('d-none');
      $("#fullscreen").toggleClass('d-none');
    },
    exitFullscreen() {
      document.exitFullscreen();
      $("#exit-fullscreen").toggleClass('d-none');
      $("#fullscreen").toggleClass('d-none');
    }
  },
  mounted() {
      $("#btnGroupDrop1").html(ProgramExecutor.selectedProgram.title);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
