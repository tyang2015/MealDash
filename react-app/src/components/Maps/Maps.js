// frontend/src/components/Maps/Maps.js
import React from 'react';
import { useState } from 'react';
import { GoogleMap, useJsApiLoader,Marker, Autocomplete } from '@react-google-maps/api';

const containerStyle = {
  width: '29em',
  height: '180px',
};

// const center = {
//   lat: 34.05,
//   lng: -118.24,
// };

const Maps = ({ apiKey, userCoordinates, restaurant }) => {
  const [map, setMap] = useState(/** @type google.maps.GoogleMap */null)
  const [restaurantCoord, setRestaurantCoord] = useState({'lat': restaurant?.latitude, "lng": restaurant?.longitude })
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries: ['places']
  });
  console.log('restaurant in maps:', restaurant)
  console.log('restaurant coordintes in maps:', restaurantCoord)
  return (
    <>
      {/* <Autocomplete>
        <input type='text' name="restaurant-address" placeholder='address'/>
      </Autocomplete> */}
      {/* <button
        onClick = {()=> map.panTo(center)}
      >
        CLICK TO CENTER BACK
      </button> */}
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userCoordinates? userCoordinates: restaurantCoord}
          zoom={10}
          // added here?????
          id="map"
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl:false
          }}
          onLoad={map=> setMap(map)}
        >
          <Marker position={userCoordinates? userCoordinates: restaurantCoord}/>
        </GoogleMap>
      )}
    </>
  );
};

export default React.memo(Maps);
