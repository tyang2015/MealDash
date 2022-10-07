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
const PlacesAutocomplete = ({apiKey, setFormData, formData}) => {
  // const ref = useRef(null);
  // BIND event (your onChange in input) to the autocomplete object
  let {ready, value, setValue, suggestions: {status, data}, clearSuggestions} = usePlacesAutocomplete();
  // const autocomplete = new google.maps.places.Autocomplete()
  // const temporaryAddress= formData.address
  // if (formData.address){
  //   setValue(formData.address)
  // }

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({address});
    const {lat, lng} = await getLatLng(results[0]);
    console.log('lat:', lat)
    console.log('lng:' , lng)
    await setFormData({...formData, latitude: lat, longitude: lng, address: address})
  }
  useEffect(()=>{
    let item = document.getElementById("create-restaurant-address-input")
    // console.log('address field:', item)
    item.setAttribute('value', formData?.address)
    // console.log('address field after change:', item)

    // return
    // item.innerHTML = formData.address
  }, [])


  return (
      <div className="create-restaurant-form-step-1-third-row">
        {/* <Autocomplete> */}
          <Combobox className='create-restaurant-address-dropdown' onSelect={handleSelect}>
            {/* <div className="create-restaurant-label-input-container address"> */}
              <label htmlFor='create-restaurant-address-input'>Address</label>
              <ComboboxInput
                id="create-restaurant-address-input"
                className='one-input-per-row'
                value={value}
                onChange={(e)=> setValue(e.target.value)}
                type='text'
                name="restaurant-address"
                placeholder='Search an address'
                required
                // disabled = {!ready}
              />
            {/* </div> */}
            <ComboboxPopover>
              <ComboboxList>
                {status === "OK" && data.map(({place_id, description}) =>(
                <ComboboxOption key={place_id} value = {description}/>
                ))}
              </ComboboxList>
            </ComboboxPopover>
          </Combobox>
      </div>
  );
};

export default React.memo(PlacesAutocomplete)
