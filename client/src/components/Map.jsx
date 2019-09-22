import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./map-atoms/Marker.tsx";
import axios from "axios";

const markerText = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 25.757225,
      lng: -80.375464
    },
    zoom: 15,
    maxDist: 15000,
    markerLat: 25.7542529,
    markerLng: -80.2878964

    // hazard: this.defaultProps.any,
  };
  state = {
    key: String
  };

  createMarkers() {
    console.log(this);
    axios
      .get(
        `http://localhost:5000/api/hazards/search?lat=${this.props.markerLat}&lon=${this.props.markerLng}&maxDist=${this.props.maxDist}`
      )
      .then(hazards => {
        hazards.map(hazard => {
          let { address, date, description } = hazards.data;
          let [lon, lat] = hazards.data.location.coordinates;

          return <Marker lat={lat} lng={lon} text={description} />;
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="container">
        // Important! Always set the container height explicitly
        {this.getData()}
        <div style={{ height: "75vh", width: "60%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyA-Jb3JAwEHzOALBHyht19lDK6_vIyllIs"
            }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <Marker lat={25.757225} lng={-80.375464} text="My Marker" />
            {this.createMarkers()}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

// console.log(SimpleMap);

export default SimpleMap;
