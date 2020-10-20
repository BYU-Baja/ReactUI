import React, { useState, Fragment } from "react";
import "./App.css";
import bajaLogo from "../src/BajaLogo.png";
import VehicleMap from "./components/Map/index";

var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://24.10.232.182:8883");

client.on("connect", function () {
  client.subscribe("baja/sensors/#");
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
        <VehicleMap vehicleLocation={[-111.6672998, 40.2669074]} baseLocation={[-111.6472998, 40.2469074]} mapCenterStart={{lat: 40.2469074, lng: -111.6472998, zoom: 15}}></VehicleMap>
        <img src={bajaLogo} className="App-logo" alt="logo" />
        <h1>BYU BAJA Base Station</h1>
        <p>Incoming Data: {mesg}</p>
        <p></p>
      </header>
    </div>
  );
}

export default App;
