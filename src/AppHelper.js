import React from "react";
import "./App.css";
import bajaLogo from "../src/baja_logo_small.png";
import VehicleMap from "./components/Map/index";
// import DataComp from "./components/DataComponent/index.js";
import DataCompHolder from "./components/DataCompHolder/index.js";
import styled from "styled-components";

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
    this.setState(state => ({
        seconds: 0
      }));
    this.frrpm = 0.0;
    this.flrpm = 0.0;
    speed = 0.0;
    throtle = 0.0;
    rpm = 0.0;
    milesRemaining = 0.0;
    // force a re-render
    this.forceUpdate();
  };

  /////
  constructor(props) {
    super(props);
    this.state = {
      seconds: parseInt(props.startTimeInSeconds, 10) || 0
    };
  }

  tick() {
    this.setState(state => ({
      seconds: state.seconds + 1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  formatTime(secs) {
    if(firstUpdate === 1){
    this.frrpm = 0.0;
    this.flrpm = 0.0;
    firstUpdate = 0;
    }
    else{
        this.frrpm += .05;
        this.flrpm += .05;
        speed += .05;
        throtle += .05;
        rpm += .05;
        milesRemaining += .05;
    }
    
    let hours   = Math.floor(secs / 3600);
    let minutes = Math.floor(secs / 60) % 60;
    let seconds = secs % 60;
    return [hours, minutes, seconds]
        .map(v => ('' + v).padStart(2, '0'))
        .filter((v,i) => v !== '00' || i > 0)
        .join(':');
  }

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
              <div>
        Timer: {this.formatTime(this.state.seconds)}
      </div>
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
                <DataCompHolder name="MPH" data={speed.toFixed(1)}></DataCompHolder>
                <DataCompHolder
                  name="RPM FR(x1000)"
                  data={this.frrpm.toFixed(1)}
                ></DataCompHolder>
                <DataCompHolder
                  name="Gallons Remain"
                  data={milesRemaining.toFixed(1)}
                ></DataCompHolder>
              </CenterJustify>
            </AlightRight>
            <AlightRight2>
              <CenterJustify>
                <DataCompHolder name="Throttle (%)" data={throtle.toFixed(1)}></DataCompHolder>
                <DataCompHolder
                  name="RPM FL(x1000)"
                  data={this.flrpm.toFixed(1)}
                ></DataCompHolder>
                <DataCompHolder name="RPM (x1000)" data={rpm.toFixed(1)}></DataCompHolder>
              </CenterJustify>
            </AlightRight2>
          </header>
        </div>
      </DisplayStle>
    </ColorDiv>
  );
}}

export default AppHelper;
