import React from 'react';
import VehicleMap from ".././components/Map/index";
import {sidebar} from "../components/NavBar/navBar"

function Home() {
  return (
    <div className='home'>
      <h1>Home</h1>
      <VehicleMap style = {{ flexGrow: 1 }}vehicleLocation={{lng: -111.6672998, lat: 40.2669074}} baseLocation={{lng: -111.6472998, lat: 40.2469074}} mapCenterStart={{lat: 40.2469074, lng: -111.6472998, zoom: 15}} vehicleHistory={[{lng: -111.6472998, lat: 40.2469074}, {lng: -111.6672998, lat: 40.2669074}]}></VehicleMap>
    </div>
  );
}

export default Home;