import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { GoogleMap, useJsApiLoader, Marker, Autocomplete, LoadScript } from '@react-google-maps/api';
import usePlacesAutocomplete, {
  getGeocode, getLatLng
} from "use-places-autocomplete"
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import "./OrderPlacesAutocomplete.css"

const google = window.google
const PlacesAutocomplete = ({apiKey,setRouteLoaded, setAddress, setUserCoordinates, destinationRef, calculateRoute, setDestinationRef}) => {
  let {ready, value, setValue, suggestions: {status, data}, clearSuggestions} = usePlacesAutocomplete();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries: ['places']
  });

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    console.log('address after select:', address)
    await setDestinationRef(address)
    await setAddress(address)

    const results = await getGeocode({address});
    const {lat, lng} = await getLatLng(results[0]);
    console.log('lat:', lat)
    console.log('lng:' , lng)
    setUserCoordinates({"lat": lat, "lng": lng})
  }

  return (
    <>
      {isLoaded && (
        <div className="order-confirmation-address-container">
        {/* <Autocomplete> */}
          <div className='location-dot-container'>
            <i class="fa-solid fa-location-dot"></i>
          </div>
          <Combobox className='create-restaurant-address-dropdown' onSelect={handleSelect}>
            {/* <div className="create-restaurant-label-input-container address"> */}
              {/* <label htmlFor='create-restaurant-address-input'>Address</label> */}
              <ComboboxInput
                className='order-confirmation-address-input'
                value={value}
                onChange={(e)=> setValue(e.target.value)}
                // ref={destinationRef}
                type='text'
                placeholder='Address'
                required
                disabled = {!ready}
                style={{backgroundColor: "#f4f2f2"}}
              />
            <ComboboxPopover>
              <ComboboxList>
                {status === "OK" && data.map(({place_id, description}) =>(
                <ComboboxOption key={place_id} value = {description}/>
                ))}
              </ComboboxList>
            </ComboboxPopover>
          </Combobox>
      </div>
      )}
    </>
  );
};

export default React.memo(PlacesAutocomplete)
