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
import "./PlacesAutocomplete.css"

// const google = window.google
const PlacesAutocomplete = ({apiKey, setFormData, formData, destinationRef}) => {
  let {ready, value, setValue, suggestions: {status, data}, clearSuggestions} = usePlacesAutocomplete();
  // const autocomplete = new google.maps.places.Autocomplete()
  // const temporaryAddress= formData.address
  // if (formData.address){
  //   setValue(formData.address)
  // }
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries: ['places']
  });

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({address});
    const {lat, lng} = await getLatLng(results[0]);
    console.log('lat:', lat)
    console.log('lng:' , lng)
    await setFormData({...formData, latitude: lat, longitude: lng, address: address})
  }
  // useEffect(()=>{
  //   let item = document.getElementById("create-restaurant-address-input")
  //   item.setAttribute('value', formData?.address)
  //   // console.log('address field after change:', item)
  //   // item.innerHTML = formData.address
  // }, [])


  return (
    <>
      {isLoaded && (
        <div className="create-restaurant-form-step-1-third-row">
        {/* <Autocomplete> */}
          <Combobox className='create-restaurant-address-dropdown' onSelect={handleSelect}>
            {/* <div className="create-restaurant-label-input-container address"> */}
              <label htmlFor='create-restaurant-address-input'>Address</label>
              <ComboboxInput
                id="create-restaurant-address-input"
                className='one-input-per-row restaurant-form-input-box'
                value={value}
                onChange={(e)=> setValue(e.target.value)}
                ref={destinationRef}
                type='text'
                name="restaurant-address"
                placeholder='Search an address'
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
