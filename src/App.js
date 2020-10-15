import React, { useState, Fragment } from "react";
import "./App.css";
import bajaLogo from "../src/BajaLogo.png";
import VehicleMap from "./components/Map/index";

var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://127.0.0.1:8883");

// preciouschicken.com is the MQTT topic
client.subscribe("baja/sensors/#");

client.on("connect", function () {
  client.subscribe("presence", function (err) {
    if (!err) {
      client.publish("presence", "Hello mqtt");
      console.log("we did it!");
    }
    console.log(err);
  });
});

function App() {
  var note;
  client.on("message", function (topic, message) {
    note = message.toString();
    // Updates React state with message
    setMesg(note);
    console.log(note);
    client.end();
  });

  // Sets default React state
  const [mesg, setMesg] = useState(
    <Fragment>
      <em>nothing published</em>
    </Fragment>
  );

  return (
    <div className="App">
      <header className="App-header">
        <VehicleMap></VehicleMap>
        <img src={bajaLogo} className="App-logo" alt="logo" />
        <h1>BYU BAJA Base Station</h1>
        <p>Incoming Data: {mesg}</p>
        <p></p>
      </header>
    </div>
  );
}

export default App;
