import BTDevice, { EVENT_RUNNING, EVENT_STOPPED } from './bt_device.js';
import ProgramExecutor from './programExecutor.js';
import ALL_PROGRAMS from './default_programs.js';
import { START_COMMAND, STOP_COMMAND, SPORT_DATA_COMMAND } from './bt_device.js';
import moment from 'moment';

"use strict";

let btDevice = new BTDevice();

// Global settings for chart library
Chart.defaults.global.animation.duration = 0;

var allPrograms = ALL_PROGRAMS;
var selectedProgram = allPrograms[0];

class Main {

  constructor() {
    let thisObj = this;
    this.initTopNav();
    this.initDefaultIncline();
    this.initDefaultSpeed();
    this.initProgramList();
    btDevice.on(EVENT_RUNNING, (states) => { thisObj.onRunning(states) });
    btDevice.on(EVENT_STOPPED, (states) => { thisObj.onStopped(states) });
    this.chartContext = $('#programChart')[0].getContext('2d');
    this.programExecutor = new ProgramExecutor(btDevice, selectedProgram, this.chartContext);
    this.programExecutor.setOnStepChangedListener(() => { thisObj.onStepChanged() });
  }

  onRunning(states) {
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

  onStopped(states) {
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

    this.programExecutor.reinitProgram();
  }

  onStepChanged() {
    var a = [];
    this.programExecutor.getSteps().forEach(el => a.push("Speed:" + el[0] + "Incline:" + el[1]));
    $("#nextSteps").html(a.join('<br>'));
  }

  onSelectProgram(event) {
    let selectedProgramIdx = $(event.target).data('program-index');
    selectedProgram = allPrograms[selectedProgramIdx];
    $("#btnGroupDrop1").html(selectedProgram.title);
    this.programExecutor.stop();
    this.programExecutor.setSelectedProgram(selectedProgram);
  }

  initProgramList() {
    let thisObj = this;
    $("#btnGroupDrop1").html(selectedProgram.title);
    let plist = $("#programList");
    allPrograms.forEach( (prog, idx) => {
      let newMenuItem = $("<a class=\"dropdown-item\" href=\"#\"></a>");
      newMenuItem.text(prog.title);
      newMenuItem.data('program-index', idx);
      newMenuItem.on('click', (e) => { thisObj.onSelectProgram(e) });
      plist.append(newMenuItem)
    });

  }

  initDefaultIncline() {
    var elements = document.getElementsByClassName("default-incline");
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      el.addEventListener('pointerup', function (event) {
        var incline = parseInt(event.target.innerHTML);
        console.log("Set Incline", incline);
        btDevice.sendIncAndSpeed(incline, -1);
      });
    }
  }

  initDefaultSpeed() {
    var elements = document.getElementsByClassName("default-speed");
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      el.addEventListener('pointerup', function (event) {
        var speed = parseInt(event.target.innerHTML);
        console.log("Set Speed", speed);
        btDevice.sendIncAndSpeed(-1, speed);
      });
    }
  }

  initTopNav() {
    let thisObj = this;

    $('#connect').on('pointerup', function (event) {
      btDevice.initBTConnection(() => {
        $("#start").prop('disabled', false);
        $("#info").prop('disabled', false);
        $("#connection").toggleClass('d-none');
        $("#main").toggleClass('d-none');
      });
    });

    $("#program").on('pointerup', function (event) {
      console.log("Start Program");
      if (!thisObj.programExecutor.isExecuting() && btDevice.isRunning()) {
        thisObj.programExecutor.start();
      }
    });

    $("#start").on('pointerup', function (event) {
      console.log("Send start");
      btDevice.addMessage(START_COMMAND);
    });


    $("#stop").on('pointerup', function (event) {
      console.log("Send stop");
      btDevice.addMessage(STOP_COMMAND);
      btDevice.addMessage(SPORT_DATA_COMMAND);
    });

    $("#fullscreen").on('pointerup', function (event) {
      $("body")[0].requestFullscreen();
      $("#exit-fullscreen").toggleClass('d-none');
      $("#fullscreen").toggleClass('d-none');
    });

    $("#exit-fullscreen").on('pointerup', function (event) {
      document.exitFullscreen();
      $("#exit-fullscreen").toggleClass('d-none');
      $("#fullscreen").toggleClass('d-none');
    });

    $('[data-toggle="tooltip"]').tooltip();
  }
}

export default Main;



