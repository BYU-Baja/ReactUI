import React, { useState } from "react";
import "./App.css";
import AppHelper from "./AppHelper"

var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://localhost:8883");

client.on("connect", function () {
  // client.subscribe("#");
  client.subscribe("baja/sensors/0xa3"); //front right rpm
  client.subscribe("baja/sensors/0xa4"); //front left rpm
});

var frrpm = 0.0;
var flrpm = 0.0;

function FRRPM(data) {
  // console.log(data);
  var buf = new ArrayBuffer(4);
  var view = new DataView(buf);
  data.forEach(function (b, i) {
    view.setUint8(i, b);
  });
  frrpm = view.getFloat32(0);
  frrpm = frrpm.toFixed(1);
  // console.log(frrpm);
}

function FLRPM(data) {
  var buf = new ArrayBuffer(4);
  var view = new DataView(buf);
  data.forEach(function (b, i) {
    view.setUint8(i, b);
  });
  flrpm = view.getFloat32(0);
  flrpm = flrpm.toFixed(1);
}

function App() {
  //var note;
  client.on("message", function (topic, message) {
    // Updates React state with message
    if (topic === "baja/sensors/0xa4") {
      FRRPM(message);
      setfl(frrpm);
    } else if (topic === "baja/sensors/0xa3") {
      FLRPM(message);
      setfr(flrpm);
    }
  });

  // Sets default React state
  const [fr, setfr] = useState(0.0);  // Sets default React state
  const [fl, setfl] = useState(0.0);  // Sets default React state

  return (
    <AppHelper frrpm = {fr} flrpm = {fl}></AppHelper>
  );
}

export default App;
