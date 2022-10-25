// frontend/src/components/Maps/Maps.js
import React from 'react';
import { useState } from 'react';
import { GoogleMap, useJsApiLoader,Marker, Autocomplete } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh',
};


const MapDistance = ({ apiKey, restaurant }) => {
  const [map, setMap] = useState(/** @type google.maps.GoogleMap */null)
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries: ['places']
  });

  // const restaurantLoc = {
  //   lat:
  // }
  const restaurantLoc ={
    lat: restaurant?.latitude,
    long: restaurant?.longitude
  }

  const center = {
    lat: 34.05,
    lng: -118.24,
  };

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          id="map"
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl:false
          }}
          onLoad={map=> setMap(map)}
        >
          {/* <Marker position={center}/> */}
        </GoogleMap>
      )}
    </>
  );
};

export default React.memo(MapDistance);
