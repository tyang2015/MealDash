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

const google = window.google
const PlacesAutocomplete = ({apiKey,setRouteLoaded, destinationRef, calculateRoute, setDestinationRef}) => {
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

  }


  return (
    <>
      {isLoaded && (
        <div className="order-confirmation-address-container">
        {/* <Autocomplete> */}
          <i class="fa-solid fa-location-dot"></i>
          <Combobox className='create-restaurant-address-dropdown' onSelect={handleSelect}>
            {/* <div className="create-restaurant-label-input-container address"> */}
              {/* <label htmlFor='create-restaurant-address-input'>Address</label> */}

              <ComboboxInput
                // id="create-restaurant-address-input"
                className='order-confirmation-address-input'
                value={value}
                onChange={(e)=> setValue(e.target.value)}
                // ref={destinationRef}
                type='text'
                // name="restaurant-address"
                placeholder='Address'
                required
                disabled = {!ready}
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
