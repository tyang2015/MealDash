// frontend/src/components/Maps/Maps.js
import React from 'react';
import { useState } from 'react';
import { GoogleMap, useJsApiLoader,Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh',
};


const MapDistance = ({ apiKey, restaurant, userCoordinates, directionsResponse }) => {
  const [map, setMap] = useState(/** @type google.maps.GoogleMap */null)
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries: ['places']
  });
  // console.log('user coordinates in map component:', userCoordinates)
  // const restaurantLoc = {
  //   lat:
  // }
  const restaurantLoc ={
    lat: parseFloat(Number(restaurant?.latitude)),
    lng: parseFloat(Number(restaurant?.longitude))
  }
  // console.log('restaurant coordinates in map comp:', restaurantLoc)

  // const center = {
  //   lat: 34.05,
  //   lng: -118.24,
  // };

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={restaurantLoc}
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
          <Marker position={restaurantLoc}/>
          <Marker position={userCoordinates}/>
          {/* <Marker position ={center}/> */}
          {/* {directionsResponse && <DirectionsRenderer/>} */}
        </GoogleMap>
      )}
    </>
  );
};

export default React.memo(MapDistance);
