import React, { useState, Fragment } from "react";
import "./App.css";
import styled from "styled-components";
import Navbar from "./components/NavBar/navBar"
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './pages/Home';
import Reports from './pages/Reports';
import Products from './pages/Products';

var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://24.10.232.182:8883");

client.on("connect", function () {
  client.subscribe("#");
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
    note = message.toString("hex");
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

  let speed = 19;
  let rpm = 2.4;
  let milesRemaining = 17;

  function fuelClick(){
    milesRemaining = 100;
    alert("miles remaining: " + milesRemaining);
    //state.setState({ mssg: "Hi there!" });
  };

  return (
    <div>
      <Router>
        <Navbar/>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/reports' component={Reports} />
          <Route path='/products' component={Products} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
