import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import "./style.css";

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoianVzdGJyZW5rbWFuIiwiYSI6ImNrYXI5ZXNhazBjbW8yem14ZDR5Y2p5a2wifQ.rVv3z5OQ8hrH61I4y9qDyw'
});

export default class VehicleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 10,
      lat: 10,
      zoom: 10
    };
  }

  render() {
    return <div className="map_container">
        <Map style="mapbox://styles/mapbox/streets-v9" containerStyle={{height: '50vh',width: '50vw', borderRadius: 64, boxShadow: '5px 5px 20px black'}}>
          <div className='sidebarStyle'>
            <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
          </div>
        </Map>
      </div>;
  };
}
