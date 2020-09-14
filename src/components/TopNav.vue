<template>
    <div class="container btn-group">
      <button @click="startTreadmill" id="start" type="button" class="btn btn-primary" disabled><i class="fas fa-play-circle"></i></button>
      <button @click="stopTreadmill" id="stop" type="button" class="btn btn-primary" disabled><i class="far fa-stop-circle"></i></button>
      <div class="btn-group" role="group" aria-label="program related">
        <button @click="startProgram" id="program" type="button" class="btn btn-primary" disabled><i class="fas fa-running"></i></button>
        <div id="listProgram" class="btn-group" role="group">
          <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
          <div id="programList" class="dropdown-menu" aria-labelledby="btnGroupDrop1">
            <a @click="selectProgram" v-for="(item, index) in programs" v-bind:key="item.title" class="dropdown-item" href="#" v-bind:data-program-index="index">{{ item.title }}</a>
          </div>
        </div>
        <button id="editProgram" type="button" class="btn btn-secondary" data-toggle="modal" data-target="#editSettingsDialog"><i class="fas fa-edit"></i></button>
      </div>
      <button id="info" aria-expanded="false" aria-controls="statusInfoPanel chartPanel" type="button" data-toggle="collapse" data-target=".multi-collapse" class="btn btn-primary"><i class="fas fa-info-circle"></i> / <i class="fas fa-chart-bar"></i></button>  
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
    $("#start").prop('disabled', true);
    $("#stop").prop('disabled', false);
    $("#inclinePanel button").prop('disabled', false);
    $("#speedPanel button").prop('disabled', false);
    $("#status").html("Running");
    $("#speed").html(states.currentSpeed);
    $("#incline").html(states.currentIncline);
    $("#totalTime").html(moment.duration(value.getUint8(5) + value.getUint8(6) * 256, 'seconds').format('H:mm:ss'));
    $("#totalDistance").html(value.getUint8(7) + value.getUint8(8) * 256);
    $("#totalCalories").html((value.getUint8(9) + value.getUint8(10) * 256) / 10);
  }

function onStarting(states) {
    console.log("starting", states);
    $("#listProgram").addClass("d-none");
    $("#editProgram").addClass("d-none");
}

function onStopped() {
    $("#status").html("Stopped");
    $("#start").prop('disabled', false);
    $("#stop").prop('disabled', true);
    $("#listProgram").removeClass("d-none");
    $("#editProgram").removeClass("d-none");
    $("#speed").html(0);
    $("#incline").html(0);
    $("#totalTime").html('N/A');
    $("#totalDistance").html('N/A');
    $("#totalCalories").html('N/A');
    $("#inclinePanel button").prop('disabled', true);
    $("#speedPanel button").prop('disabled', true);

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
      $("#start").prop('disabled', true);
      $("#program").prop('disabled', false);
      $("#stop").prop('disabled', false);
    },
    stopTreadmill() {
      BTService.addMessage(STOP_COMMAND);
      $("#start").prop('disabled', false);
      $("#stop").prop('disabled', true);
    },
    startProgram() {
      if (!ProgramExecutor.isExecuting() && BTService.isRunning()) {
        ProgramExecutor.start();
        $("#program").prop('disabled', true);
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
