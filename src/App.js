import React, { useState, Fragment } from "react";
import "./App.css";
import bajaLogo from "../src/baja_logo_small.png";
import VehicleMap from "./components/Map/index";
import DataComp from "./components/DataComponent/index.js";
import styled from "styled-components";

var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://localhost:8883");

client.on("connect", function () {
  // client.subscribe("#");
  client.subscribe("baja/sensors/a3"); //front right rpm
  client.subscribe("baja/sensors/a4"); //front left rpm
});

//var data =  [64, 226, 157, 10];
// var buf = new ArrayBuffer(4);
// var view = new DataView(buf);
// data.forEach(function (b, i) {
//     view.setUint8(i, b);
// });
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
    if (topic == "baja/sensors/a4") {
      FRRPM(message);
    } else if (topic === "baja/sensors/a3") {
      FLRPM(message);
    }
  });

  // Sets default React state
  const [mesg, setMesg] = useState(
    <Fragment>
      <em>nothing published</em>
    </Fragment>
  );

  let speed = 19;
  let rpm = 2.4;
  let milesRemaining = 4;
  let throtle = 65;

  const AlignLeft = styled.div`
    width: 60%;
    height: 75%;
    position: absolute;
    left: 0;
    bottom: 0;
  `;

  const AlightRight = styled.div`
    width: 23%;
    height: 78%;
    position: absolute;
    right: 0;
    bottom: 0;
  `;

  const AlightRight2 = styled.div`
    width: 67%;
    height: 78%;
    position: absolute;
    right: 0;
    bottom: 0;
  `;

  const AlightTop = styled.div`
    width: 100%;
    height: 17%;
    position: absolute;
    top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `;

  const CenterJustify = styled.div`
    //min-height: 120vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  `;

  const ButtonRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `;

  const DisplayStle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: left;
    background-color: #282c34;
  `;

  const ColorDiv = styled.div`
    background-color: #282c34;
  `;

  function clicked() {
    alert("You clicked me");
  }

  function fuelClick() {
    milesRemaining = 100;
    alert("miles remaining: " + milesRemaining);
    //state.setState({ mssg: "Hi there!" });
  }

  return (
    <ColorDiv>
      <AlightTop>
        <img src={bajaLogo} className="App-logo" alt="logo" />
      </AlightTop>
      <DisplayStle>
        <AlignLeft>
          <div className="App">
            <header className="App-header2">
              <p></p>
              <VehicleMap
                vehicleLocation={{ lng: -111.6672998, lat: 40.2669074 }}
                baseLocation={{ lng: -111.6472998, lat: 40.2469074 }}
                mapCenterStart={{
                  lat: 40.2469074,
                  lng: -111.6472998,
                  zoom: 15,
                }}
                vehicleHistory={[
                  { lng: -111.6472998, lat: 40.2469074 },
                  { lng: -111.6672998, lat: 40.2669074 },
                ]}
              ></VehicleMap>
              <p></p>
              <ButtonRow>
                <button onClick={clicked} style={{ margin: 20 }}>
                  Set Base Station Location
                </button>
                <button onClick={fuelClick} style={{ margin: 20 }}>
                  Fuel Tank Filled
                </button>
              </ButtonRow>
            </header>
          </div>
        </AlignLeft>
        <div className="App">
          <header className="App-header">
            <AlightRight>
              <CenterJustify>
                <DataComp dataType="MPH" dataNum={mesg.toString()}></DataComp>
                <DataComp
                  dataType="RPM FR(x1000)"
                  dataNum={frrpm.toFixed(1)}
                ></DataComp>
                <DataComp
                  dataType="Gallons Remain"
                  dataNum={milesRemaining}
                ></DataComp>
              </CenterJustify>
            </AlightRight>
            <AlightRight2>
              <CenterJustify>
                <DataComp dataType="Throttle (%)" dataNum={throtle}></DataComp>
                <DataComp
                  dataType="RPM FL(x1000)"
                  dataNum={flrpm.toFixed(1)}
                ></DataComp>
                <DataComp dataType="RPM (x1000)" dataNum={rpm}></DataComp>
              </CenterJustify>
            </AlightRight2>
          </header>
        </div>
      </DisplayStle>
    </ColorDiv>
  );
}

export default App;
