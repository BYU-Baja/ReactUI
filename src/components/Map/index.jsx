import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature, Image } from 'react-mapbox-gl';
import "./style.css";
import baja_vehicle from "../../assets/motorbike_32.png";
import antenna from "../../assets/antenna_32.png"

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoianVzdGJyZW5rbWFuIiwiYSI6ImNrYXI5ZXNhazBjbW8yem14ZDR5Y2p5a2wifQ.rVv3z5OQ8hrH61I4y9qDyw'
});

const lineLayout = {
  'line-cap': 'round',
  'line-join': 'round'
};

const linePaint = {
  'line-color': '#4790E5',
  'line-width': 2
};

// How to use
// <VehicleMap vehicleLocation={{lng: -111.6672998, lat: 40.2669074}} baseLocation={{lng: -111.6472998, lat: 40.2469074}} mapCenterStart={{lat: 40.2469074, lng: -111.6472998, zoom: 15}} vehicleHistory={[{lng: -111.6472998, lat: 40.2469074}, {lng: -111.6672998, lat: 40.2669074}]}></VehicleMap>
export default class VehicleMap extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.style = props.style;
    this.state = {
      centerMap: {
        lng: props.mapCenterStart.lng || 0,
        lat: props.mapCenterStart.lat || 0,
        zoom: props.mapCenterStart.zoom || 10
      }
    };
    
  }


  style_dark = "mapbox://styles/mapbox/dark-v10";
  style_streets = "mapbox://styles/mapbox/streets-v11";
  style_outdoors = "mapbox://styles/mapbox/outdoors-v11";
  style_satellite = 'mapbox://styles/mapbox/satellite-v9';
  style_blueprint = "mapbox://styles/justbrenkman/ckgbjgjuf055519oa5ybhx06g";

  defaultVehicleLocation = [this.props.vehicleLocation.lng, this.props.vehicleLocation.lat] || [0, 0];
  defaultBaseLocation = [this.props.baseLocation.lng, this.props.baseLocation.lat] || [0, 0];
  vehicleHistory = this.props.vehicleHistory?.map(loc => [loc.lng, loc.lat]) || [this.defaultBaseLocation, this.defaultVehicleLocation];

  render() {
    return <div className="map_container">
        <Map center={[this.state.centerMap.lng, this.state.centerMap.lat]} style={this.style_streets} containerStyle={{height: '50vh',width: '50vw', borderRadius: 64, boxShadow: '5px 5px 20px black'}} onMove={(map, _) => {this.setState({centerMap: {lat: map.getCenter().lat, lng: map.getCenter().lng, zoom: map.getZoom()}})}}>
          <div className='sidebarStyle'>
            <div>Longitude: {this.state.centerMap.lng} | Latitude: {this.state.centerMap.lat} | Zoom: {this.state.centerMap.zoom}</div>
          </div>
          <Image id={"baja_vehicle"} url={baja_vehicle}/>
          <Image id={"antenna"} url={antenna}/>
          <Layer
            type="symbol"
            layout={{ "icon-image": "baja_vehicle", 'icon-size': 1, 'icon-allow-overlap': true }}>
              <Feature coordinates={this.defaultVehicleLocation} />
          </Layer>
          <Layer
            type="symbol"
            layout={{ "icon-image": "antenna", 'icon-size': 1, 'icon-allow-overlap': true }}>
              <Feature coordinates={this.defaultBaseLocation} />
          </Layer>
          <Layer type="line" layout={lineLayout} paint={linePaint}>
              <Feature coordinates={this.vehicleHistory}/>
          </Layer>
        </Map>
      </div>;
  };
}
