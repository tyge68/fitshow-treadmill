(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a4c84e40"],{"009a":function(t,e,a){"use strict";var s=a("38cf"),i=a.n(s);i.a},2067:function(t,e,a){"use strict";var s=a("d343"),i=a.n(s);i.a},"21ea":function(t,e,a){"use strict";var s=a("258b"),i=a.n(s);i.a},"258b":function(t,e,a){},"38cf":function(t,e,a){},bb51:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("md-app",[a("md-app-toolbar",[a("TopNav")],1),a("md-app-content",[a("div",{staticClass:"md-layout"},[a("div",{staticClass:"md-layout-item"},[a("ProgressionInfo")],1)]),a("div",{staticClass:"md-layout"},[a("div",{staticClass:"md-layout-item"},[a("div",{class:t.showChartPanel()},[a("Chart")],1),a("div",{class:t.showStatusPanel()},[a("StatusInfo")],1)])]),a("div",{staticClass:"md-layout",class:t.$store.state.started&&!t.$store.state.running?"":"md-hide"},[a("div",{staticClass:"md-layout-item"},[a("CommandPanel",{attrs:{title:"Incline Level",iconName:"landscape",commandType:"incline"}})],1)]),a("div",{staticClass:"md-layout",class:t.$store.state.started&&!t.$store.state.running?"":"md-hide"},[a("div",{staticClass:"md-layout-item"},[a("CommandPanel",{attrs:{title:"Speed Level",iconName:"speed",commandType:"speed"}})],1)])])],1)},i=[],n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"md-toolbar-row"},[a("div",{staticClass:"md-toolbar-section-start"},[a("div",{class:t.$store.state.started?"md-hide":""},[a("md-menu",{attrs:{"md-size":"small"}},[a("md-button",{staticClass:"md-icon-button md-secondary",attrs:{"md-menu-trigger":""}},[a("md-icon",[t._v("menu")])],1),a("md-menu-content",[a("md-menu-item",{attrs:{to:"/programEditor"}},[t._v("Program Editor")])],1)],1),a("md-button",{staticClass:"md-icon-button md-primary",on:{click:t.showDialog}},[a("md-icon",[t._v("settings")])],1),a("SettingsDialog")],1),a("md-button",{staticClass:"md-icon-button md-primary",attrs:{disabled:t.$store.state.started},on:{click:t.startTreadmill}},[a("md-icon",[t._v("play_arrow")])],1),a("md-button",{staticClass:"md-icon-button md-accent",attrs:{disabled:!t.$store.state.started},on:{click:t.stopTreadmill}},[a("md-icon",[t._v("stop")])],1),a("md-button",{staticClass:"md-icon-button md-primary",class:t.$store.state.started?"":"md-hide",attrs:{disabled:t.$store.state.running},on:{click:t.startProgram}},[a("md-icon",[t._v("directions_run")])],1),a("md-button",{staticClass:"md-primary",class:t.showInfoSwitch(),on:{click:t.togglePanels}},[a("md-icon",[t._v("info")]),t._v(" / "),a("md-icon",[t._v("bar_chart")])],1)],1),a("div",{staticClass:"md-toolbar-section-end"},[a("md-button",{staticClass:"md-icon-button md-primary",class:t.fullscreen?"md-hide":"",on:{click:t.enterFullscreen}},[a("md-icon",[t._v("fullscreen")])],1),a("md-button",{staticClass:"md-icon-button md-primary",class:t.fullscreen?"":"md-hide",on:{click:t.exitFullscreen}},[a("md-icon",[t._v("fullscreen_exit")])],1)],1)])},o=[],d=a("5c33"),l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("md-dialog",{attrs:{"md-active":t.showDlg},on:{"update:mdActive":function(e){t.showDlg=e},"update:md-active":function(e){t.showDlg=e}}},[a("md-dialog-title",[t._v("Edit Settings")]),a("md-dialog-content",[a("form",[a("div",{staticClass:"md-layout"},[a("div",{staticClass:"md-layout-item"},[a("label",[t._v("Running Mode")]),a("md-radio",{attrs:{name:"mode",value:"default",checked:"default"===t.settings.mode},model:{value:t.settings.mode,callback:function(e){t.$set(t.settings,"mode",e)},expression:"settings.mode"}},[t._v("Default")]),a("md-radio",{attrs:{name:"mode",value:"time",checked:"time"===t.settings.mode},model:{value:t.settings.mode,callback:function(e){t.$set(t.settings,"mode",e)},expression:"settings.mode"}},[t._v("Time limit")]),a("md-radio",{attrs:{name:"mode",value:"distance",checked:"distance"===t.settings.mode},model:{value:t.settings.mode,callback:function(e){t.$set(t.settings,"mode",e)},expression:"settings.mode"}},[t._v("Distance limit")])],1)]),a("div",{staticClass:"md-layout"},[a("div",{staticClass:"md-layout-item",class:{"md-hide":"distance"!==t.settings.mode}},[a("md-field",[a("label",{attrs:{for:"movie"}},[t._v("Distance (km)")]),a("md-select",{attrs:{name:"distancelimit"},model:{value:t.settings.distancelimit,callback:function(e){t.$set(t.settings,"distancelimit",e)},expression:"settings.distancelimit"}},t._l(t.validDistances,(function(e,s){return a("md-option",{key:s,attrs:{value:e}},[t._v(t._s(e))])})),1)],1)],1)]),a("div",{staticClass:"md-layout"},[a("div",{staticClass:"md-layout-item",class:{"md-hide":"time"!==t.settings.mode}},[a("md-field",[a("label",{attrs:{for:"movie"}},[t._v("Time (minutes)")]),a("md-select",{attrs:{name:"timelimit"},model:{value:t.settings.timelimit,callback:function(e){t.$set(t.settings,"timelimit",e)},expression:"settings.timelimit"}},t._l(t.validTimes,(function(e,s){return a("md-option",{key:s,attrs:{value:e}},[t._v(t._s(e))])})),1)],1)],1)]),a("div",{staticClass:"md-layout"},[a("div",{staticClass:"md-layout-item"},[a("md-field",[a("label",[t._v("Loops")]),a("md-select",{attrs:{name:"loops"},model:{value:t.settings.loops,callback:function(e){t.$set(t.settings,"loops",e)},expression:"settings.loops"}},t._l(t.validLoops,(function(e,s){return a("md-option",{key:s,attrs:{value:e}},[t._v(t._s(e))])})),1)],1)],1)]),a("div",{staticClass:"md-layout"},[a("div",{staticClass:"md-layout-item"},[a("md-field",[a("label",[t._v("Average Speed")]),a("md-select",{attrs:{name:"avgSpeed"},model:{value:t.settings.avgSpeed,callback:function(e){t.$set(t.settings,"avgSpeed",e)},expression:"settings.avgSpeed"}},t._l(t.validAverages,(function(e,s){return a("md-option",{key:s,attrs:{value:e}},[t._v(t._s(e))])})),1)],1)],1)]),a("div",{staticClass:"md-layout"},[a("div",{staticClass:"md-layout-item"},[a("md-field",[a("label",[t._v("Program")]),a("md-select",{attrs:{name:"programId"},model:{value:t.settings.programId,callback:function(e){t.$set(t.settings,"programId",e)},expression:"settings.programId"}},t._l(t.programs,(function(e,s){return a("md-option",{key:s,attrs:{value:s},on:{"md-selected":t.selectProgram}},[t._v(t._s(e.title))])})),1)],1)],1)])])]),a("md-dialog-actions",[a("md-button",{staticClass:"md-primary",on:{click:function(e){t.showDlg=!1}}},[t._v("Close")]),a("md-button",{staticClass:"md-primary",on:{click:t.saveChanges}},[t._v("Save")])],1)],1)},r=[],c=a("81f6"),m={name:"SettingsDialog",data:function(){return{showDlg:!1,programTitle:"Select Program",programs:d["a"].getAllPrograms(),settings:d["a"].getSettings(),validLoops:[1,2,3,4,5,6,7,8,9,10],validDistances:[1,2,3,4,5,6,7,8,9,10,15,21.1,42.2],validTimes:[5,10,30,45,60,90],validAverages:["disabled",5,6,7,8,9,10,11,12]}},methods:{selectProgram:function(t){var e=t,a=d["a"].getAllPrograms()[e];this.programTitle=a.title},saveChanges:function(){d["a"].saveSettings(this.settings),d["a"].reinitProgram(),this.showDlg=!1}},mounted:function(){var t=this;this.programTitle=d["a"].selectedProgram.title,c["a"].$on("openDialog",(function(){t.showDlg=!0}))}},u=m,v=(a("21ea"),a("2877")),g=Object(v["a"])(u,l,r,!1,null,"32001818",null),p=g.exports,f=a("498e"),h={name:"TopNav",data:function(){return{fullscreen:!1}},components:{SettingsDialog:p},mounted:function(){window.addEventListener("orientationchange",this.handleOrientationChange)},methods:{handleOrientationChange:function(){this.$forceUpdate()},showInfoSwitch:function(){return"landscape-primary"===window.screen.orientation.type?"":"md-hide"},showDialog:function(){c["a"].$emit("openDialog")},startTreadmill:function(){f["a"].addMessage(f["b"])},stopTreadmill:function(){f["a"].addMessage(f["c"])},startProgram:function(){!d["a"].isExecuting()&&f["a"].isRunning()&&(d["a"].start(),this.running=!0)},togglePanels:function(){this.$store.commit("togglePanels")},enterFullscreen:function(){document.getElementsByTagName("body")[0].requestFullscreen(),this.fullscreen=!0},exitFullscreen:function(){document.exitFullscreen(),this.fullscreen=!1}}},C=h,_=Object(v["a"])(C,n,o,!1,null,"08108ba5",null),b=_.exports,y=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"md-layout"},[a("div",{staticClass:"md-layout-item"},[a("md-icon",[t._v("speed"),a("md-tooltip",{attrs:{"md-direction":"right"}},[t._v("Current Speed (km/h)")])],1)],1),a("div",{staticClass:"md-layout-item"},[a("md-icon",[t._v("landscape"),a("md-tooltip",{attrs:{"md-direction":"bottom"}},[t._v("Current Incline (%)")])],1)],1),a("div",{staticClass:"md-layout-item"},[t._v("△"),a("md-icon",[t._v("speed"),a("md-tooltip",{attrs:{"md-direction":"bottom"}},[t._v("Current Average Speed (km/h)")])],1)],1),a("div",{staticClass:"md-layout-item"},[a("md-icon",[t._v("add_road"),a("md-tooltip",{attrs:{"md-direction":"bottom"}},[t._v("Total Distance (km)")])],1)],1),a("div",{staticClass:"md-layout-item"},[a("md-icon",[t._v("more_time"),a("md-tooltip",{attrs:{"md-direction":"bottom"}},[t._v("Total Time (hh:mm:ss)")])],1)],1),a("div",{staticClass:"md-layout-item"},[a("md-icon",[t._v("local_fire_department"),a("md-tooltip",{attrs:{"md-direction":"left"}},[t._v("Total Calories")])],1)],1)]),a("div",{staticClass:"md-layout"},[a("div",{staticClass:"md-layout-item"},[t._v(t._s(t.speed))]),a("div",{staticClass:"md-layout-item"},[t._v(t._s(t.incline))]),a("div",{staticClass:"md-layout-item"},[t._v(t._s(t.avgSpeed))]),a("div",{staticClass:"md-layout-item"},[t._v(t._s(t.totalDistance))]),a("div",{staticClass:"md-layout-item"},[t._v(t._s(t.totalTime))]),a("div",{staticClass:"md-layout-item"},[t._v(t._s(t.totalCalories))])])])},w=[],$=a("c1df"),k=a.n($),S={name:"StatusInfo",data:function(){return{speed:0,incline:0,avgSpeed:0,totalDistance:"N/A",totalTime:"N/A",totalCalories:"N/A"}},created:function(){var t=this;c["a"].$on("btRunning",(function(e){var a=e.value,s=a.getUint8(7)+256*a.getUint8(8),i=a.getUint8(5)+256*a.getUint8(6);t.speed=e.currentSpeed,t.incline=e.currentIncline,t.avgSpeed=window.math.round(s/i*3.6,1),t.totalTime=k.a.duration(i,"seconds").format("H:mm:ss"),t.totalDistance=s,t.totalCalories=(a.getUint8(9)+256*a.getUint8(10))/10})),c["a"].$on("btStopped",(function(){t.speed=0,t.incline=0,t.avgSpeed=0,t.totalTime="N/A",t.totalDistance="N/A",t.totalCalories="N/A"}))}},T=S,x=Object(v["a"])(T,y,w,!1,null,"36301baf",null),P=x.exports,D=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"no-overflow",class:t.$store.state.running?"":"md-hide"},[a("div",[a("md-progress-bar",{staticClass:"progress-green",attrs:{"md-mode":"determinate","md-value":t.program.percent}}),a("div",{staticClass:"progress-text"},[t._v(t._s(t.program.remaining))])],1),a("div",[a("md-progress-bar",{staticClass:"progress-orange",attrs:{"md-mode":"determinate","md-value":t.step.percent}}),a("div",{staticClass:"progress-text"},[t._v(t._s(t.step.remaining))])],1)])},I=[],A={name:"ProgressionInfo",data:function(){return{program:{percent:0,remaining:""},step:{percent:0,remaining:""}}},created:function(){var t=this;c["a"].$on("trainingProgression",(function(e){t.program=e.program,t.step=e.step}))}},E=A,N=(a("009a"),Object(v["a"])(E,D,I,!1,null,null,null)),O=N.exports,L=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"md-layout"},[a("div",{staticClass:"md-layout-item"},[a("div",{staticClass:"labelled"},[a("md-icon",[t._v(t._s(t.iconName)),a("md-tooltip",{attrs:{"md-direction":"top"}},[t._v(t._s(t.title))])],1)],1)]),t._l(6,(function(e){return a("div",{key:e,staticClass:"md-layout-item"},[a("md-button",{staticClass:"md-primary",attrs:{disabled:!t.$store.state.started},on:{click:t.changeCommand}},[t._v(t._s(2*e))])],1)}))],2)},j=[],U={name:"CommandPanel",props:{title:{type:String,required:!0},iconName:{type:String,required:!0},commandType:{type:String,required:!0}},methods:{changeCommand:function(t){var e=parseInt(t.target.innerHTML);"speed"===this.commandType?f["a"].sendIncAndSpeed(-1,e):f["a"].sendIncAndSpeed(e,-1)}}},F=U,M=(a("e958"),Object(v["a"])(F,L,j,!1,null,"eb99a5a4",null)),q=M.exports,R=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("canvas")},H=[],J=(a("4160"),a("159b"),a("d4ec")),z=a("bee2"),B=function(){function t(e){Object(J["a"])(this,t);var a=this;this.chartContext=e,this.initChart(),c["a"].$on("trainingProgramReInit",(function(){a.initChart()})),c["a"].$on("trainingStepChanged",(function(t){a.updateChart(t)}))}return Object(z["a"])(t,[{key:"updateChart",value:function(t){console.log("Update Chart");var e=this.chart,a=e.data.datasets[1].data,s=e.data.datasets[0].data;t.forEach((function(t,e){a[e]=t.s,s[e]=t.i}));for(var i=t.length;i<a.length;i++)a[i]=0,s[i]=0;e.update({duration:0})}},{key:"initChart",value:function(){var t=[],e=[],a=[];d["a"].getSteps().forEach((function(s,i){t.push(""+i),e.push(s.s),a.push(s.i)})),this.chart&&this.chart.destroy(),this.chart=new window.Chart(this.chartContext,{type:"line",data:{labels:t,datasets:[{label:"Incline",data:a,borderColor:"rgb(0, 255, 0)",steppedLine:"before",type:"line"},{label:"Speed",backgroundColor:"rgb(255, 99, 132)",borderColor:"rgb(255, 99, 132)",data:e,steppedLine:"before"}]},options:{scales:{yAxes:[{ticks:{suggestedMin:0,suggestedMax:16}}]}}})}}]),t}(),G={name:"Chart",mounted:function(){var t=this.$el.getContext("2d");new B(t)}},K=G,Q=(a("2067"),Object(v["a"])(K,R,H,!1,null,"6afc5d41",null)),V=Q.exports,W={name:"Home",components:{TopNav:b,StatusInfo:P,ProgressionInfo:O,CommandPanel:q,Chart:V},mounted:function(){window.addEventListener("orientationchange",this.handleOrientationChange)},methods:{handleOrientationChange:function(){console.log("force update"),this.$forceUpdate()},showChartPanel:function(){var t=this.$store.state.toggleCount%2,e="portrait-primary"===window.screen.orientation.type;return e?"":0===t?"md-hide":""},showStatusPanel:function(){var t=this.$store.state.toggleCount%2,e="portrait-primary"===window.screen.orientation.type;return e?"":1===t?"md-hide":""}},created:function(){this.$store.state.connected||this.$router.push({path:"/"})}},X=W,Y=Object(v["a"])(X,s,i,!1,null,"3ffd5eec",null);e["default"]=Y.exports},c2f5:function(t,e,a){},d343:function(t,e,a){},e958:function(t,e,a){"use strict";var s=a("c2f5"),i=a.n(s);i.a}}]);
//# sourceMappingURL=chunk-a4c84e40.d159d970.js.map