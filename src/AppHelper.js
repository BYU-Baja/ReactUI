import React from "react";
import "./App.css";
import bajaLogo from "../src/baja_logo_small.png";
import VehicleMap from "./components/Map/index";
// import DataComp from "./components/DataComponent/index.js";
import DataCompHolder from "./components/DataCompHolder/index.js";
import styled from "styled-components";

var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://localhost:8883");

let speed = 0.0;
let rpm = 0.0;
let milesRemaining = 0.0;
let throtle = 0.0;

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
//   var frrpm;
//   var flrpm;
var firstUpdate = 1;

//state = { frrpm : "0.0", flrpm: "0.0" }
class AppHelper extends React.Component {
  handleClick = () => {
    this.setState((state) => ({
      seconds: 0,
    }));
    milesRemaining = 0.0;
    // force a re-render
    this.forceUpdate();
  };

  onMessage(topic, message) {
    // console.log("topic: " + topic);
    if (topic === "baja/sensors/0xa1") {
      var buf = new ArrayBuffer(4);
      var view = new DataView(buf);
      view.setUint8(0, message[3]);
      view.setUint8(1, message[2]);
      view.setUint8(2, message[1]);
      view.setUint8(3, message[0]);
      this.frrpm = view.getFloat32(0);
      this.frrpm = this.frrpm.toFixed(1);
      this.setState({
        frrpm: this.frrpm,
      });
      console.log("frrpm: " + this.frrpm);
    } else if (topic === "baja/sensors/0xa2") {
      var buf = new ArrayBuffer(4);
      var view = new DataView(buf);
      view.setUint8(0, message[3]);
      view.setUint8(1, message[2]);
      view.setUint8(2, message[1]);
      view.setUint8(3, message[0]);
      this.flrpm = view.getFloat32(0);
      this.flrpm = this.flrpm.toFixed(1);
      this.setState({
        flrpm: this.flrpm,
      });
      console.log("flrpm: " + this.flrpm);
    } else if (topic === "baja/sensors/0xa3") {
      var buf = new ArrayBuffer(4);
      var view = new DataView(buf);
      view.setUint8(0, message[3]);
      view.setUint8(1, message[2]);
      view.setUint8(2, message[1]);
      view.setUint8(3, message[0]);
      this.engineRpm = view.getFloat32(0);
      this.engineRpm = this.engineRpm.toFixed(1);
      this.setState({
        engineRpm: this.engineRpm,
      });
      console.log("engineRpm: " + this.engineRpm);
    } else if (topic === "baja/sensors/0xa4") {
      var buf = new ArrayBuffer(4);
      var view = new DataView(buf);
      view.setUint8(0, message[3]);
      view.setUint8(1, message[2]);
      view.setUint8(2, message[1]);
      view.setUint8(3, message[0]);
      this.rearAxelRpm = view.getFloat32(0);
      this.rearAxelRpm = this.rearAxelRpm.toFixed(1);
      this.setState({
        rearAxelRpm: this.rearAxelRpm,
      });
      console.log("rearAxelRpm: " + this.rearAxelRpm);
    }
  }
  /////
  constructor(props) {
    super(props);
    this.state = {
      seconds: parseInt(props.startTimeInSeconds, 10) || 0,
    };

    this.state = {
      flrpm: 0.34,
      frrpm: 0.34,
      throtle: 78,
      speed: 16,
      engineRpm: 2.8,
      rearAxelRpm: 0.35,
      milesRemaining: 6,
    };

    client.on("connect", function () {
      console.log("Connected");
      // client.subscribe("#");
      client.subscribe("baja/sensors/0xa1"); //front right rpm
      client.subscribe("baja/sensors/0xa2"); //front right rpm
      client.subscribe("baja/sensors/0xa3"); //front right rpm
      client.subscribe("baja/sensors/0xa4"); //front left rpm
      client.subscribe("baja/sensors/0xa5"); //front left rpm
    });

    client.on("message", this.onMessage.bind(this));
  }

  // tick() {
  //   this.setState((state) => ({
  //     seconds: state.seconds + 1,
  //   }));
  // }

  componentDidMount() {
    // this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // formatTime(secs) {
  //   if (firstUpdate === 1) {
  //     this.frrpm = 0.0;
  //     this.flrpm = 0.0;
  //     firstUpdate = 0;
  //   } else {
  //     this.frrpm += 0.05;
  //     this.flrpm += 0.05;
  //     speed += 0.05;
  //     throtle += 0.05;
  //     rpm += 0.05;
  //     milesRemaining += 0.05;
  //   }

  //   let hours = Math.floor(secs / 3600);
  //   let minutes = Math.floor(secs / 60) % 60;
  //   let seconds = secs % 60;
  //   return [hours, minutes, seconds]
  //     .map((v) => ("" + v).padStart(2, "0"))
  //     .filter((v, i) => v !== "00" || i > 0)
  //     .join(":");
  // }

  /////

  render() {
    return (
      <ColorDiv>
        <AlightTop>
          <button onClick={this.handleClick}>Force Update</button>
          <img src={bajaLogo} className="App-logo" alt="logo" />
        </AlightTop>
        <DisplayStle>
          <AlignLeft>
            <div className="App">
              <header className="App-header2">
                <p></p>
                {/* <div>Timer: {this.formatTime(this.state.seconds)}</div> */}
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
                  <DataCompHolder
                    name="MPH"
                    data={this.state.speed}
                  ></DataCompHolder>
                  <DataCompHolder
                    name="RPM FR(x1000)"
                    data={this.state.frrpm}
                  ></DataCompHolder>
                  <DataCompHolder
                    name="Gallons Remain"
                    data={this.state.milesRemaining}
                  ></DataCompHolder>
                </CenterJustify>
              </AlightRight>
              <AlightRight2>
                <CenterJustify>
                  <DataCompHolder
                    name="Throttle (%)"
                    data={this.state.throtle}
                  ></DataCompHolder>
                  <DataCompHolder
                    name="RPM FL(x1000)"
                    data={this.state.flrpm}
                  ></DataCompHolder>
                  <DataCompHolder
                    name="RPM (x1000)"
                    data={this.state.rearAxelRpm}
                  ></DataCompHolder>
                </CenterJustify>
              </AlightRight2>
            </header>
          </div>
        </DisplayStle>
      </ColorDiv>
    );
  }
}

export default AppHelper;
