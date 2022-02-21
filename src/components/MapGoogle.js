// import { GoogleMap, LoadScript } from '@react-google-maps/api';
import React, { Component } from "react";

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

export default class MyComponent extends Component {
  render() {
    return (
      <LoadScript
        googleMapsApiKey="AIzaSyCgl_vNtqaSla_nvtroCW47gyc_OXrYnfE"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
      </LoadScript>
    )
  }
  
}