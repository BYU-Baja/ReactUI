import React, { useState, Fragment } from "react";
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
  // console.log(frrpm);
}

function FLRPM(data) {
  var buf = new ArrayBuffer(4);
  var view = new DataView(buf);
  data.forEach(function (b, i) {
    view.setUint8(i, b);
  });
  flrpm = view.getFloat32(0);
}

function App() {
  var note;
  client.on("message", function (topic, message) {
    // Updates React state with message
    if (topic == "baja/sensors/0xa4") {
      FRRPM(message);
    } else if (topic === "baja/sensors/0xa3") {
      FLRPM(message);
    }
  });

  // Sets default React state
  const [mesg, setMesg] = useState(
    <Fragment>
      <em>nothing published</em>
    </Fragment>
  );

  return (
    <AppHelper frrpm = {frrpm.toFixed(1)} flrpm = {flrpm.toFixed(1)}></AppHelper>
  );
}

export default App;
