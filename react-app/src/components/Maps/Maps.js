// frontend/src/components/Maps/Maps.js
import React from 'react';
import { useState } from 'react';
import { GoogleMap, useJsApiLoader,Marker, Autocomplete } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const center = {
  lat: 34.0522,
  lng: 118.2437,
};

const Maps = ({ apiKey }) => {
  const [map, setMap] = useState(/** @type google.maps.GoogleMap */null)
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries: ['places']
  });

  return (
    <>
      {/* <Autocomplete>
        <input type='text' name="restaurant-address" placeholder='address'/>
      </Autocomplete> */}
      <button
        onClick = {()=> map.panTo(center)}
      >
        CLICK TO CENTER BACK
      </button>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl:false
          }}
          onLoad={map=> setMap(map)}
        >
          <Marker position={center}/>
        </GoogleMap>
      )}
    </>
  );
};

export default React.memo(Maps);
