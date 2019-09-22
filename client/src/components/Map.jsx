import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./map-atoms/Marker.tsx";

const markerText = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 25.757225,
      lng: -80.375464
    },
    zoom: 15,
    maxDist: 500,
    markerLat: Number,
    markerLng: Number,
    // hazard: this.defaultProps.any,
  };
  getData(){
    axios.get(`http://localhost:3000/api/hazards/search?lat=${this.defaultProps.markerLat}&lon=${this.defaultProps.markerLng}&maxDist=${10000}`)
    .then((hazards)=>{
        for(i=0; i<hazards.length; i++){

        }
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "75vh", width: "60%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GOOGLEMAPS_API_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <div className="markers">
            <Marker lat={25.757225} lng={-80.375464} text="My Marker" />
          </div>
        </GoogleMapReact>
      </div>
    );
  }
}

console.log(SimpleMap);

export default SimpleMap;
