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
// this can have the geocoder inside
const PlacesAutocomplete = ({apiKey, setFormData, formData}) => {
  // const ref = useRef(null);
  // BIND event (your onChange in input) to the autocomplete object
  const {ready, value, setValue, suggestions: {status, data}, clearSuggestions} = usePlacesAutocomplete();
  // const autocomplete = new google.maps.places.Autocomplete()

  // useEffect(()=> {
  //   // const addressField = ref.current;
  //   google.maps.event.addEventListener(autocomplete, formData.address, handleAddressSelection)
  //   return () => {
  //     element.removeEventListener('click', handleAddressSelection);
  //   };
  // }, [])

  // const [map, setMap] = useState(null)
  // const [geocoder, setGeoCoder] = useState(null)

  // const { isLoaded } = useJsApiLoader({
  //   id: 'google-map-script',
  //   googleMapsApiKey: apiKey,
  //   // how to include geocoder in libraries?? include locaLContext for nearby locations (BONUS)
  //   libraries: ['places']
  // });

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({address});
    const {lat, lng} = await getLatLng(results[0]);
    console.log('lat:', lat)
    console.log('lng:' , lng)
    setFormData({...formData, latitude: lat})
    setFormData({...formData, longitude: lng})
  }

  // const handleAddressSelection = (e) => {
  //   setFormData({...formData, address: e.target.value})
  // }


  // // geocoder code from google code (you dont need a map)
  // const initialize = () => {
  //   setGeoCoder(new google.maps.Geocoder())
  //   return
  // }

  // const handleCodeAddress = async (e) => {
  //   // if (geocoder){
  //     setAddress(e.target.value)
  //     geocoder.geocode({'address': address}, function(results, status){
  //       if (status == 'OK'){
  //         // set the values passed down from FORM STEP 1 props
  //         setFormData({...formData, latitude: results[0].geometry.location[0]})
  //         setFormData({...formData, longitude: results[0].geometry.location[1]})
  //         console.log('converted longitude:', formData.longitude)
  //         console.log('converted latitude:', formData.latitude)
  //       } else{
  //         return
  //         // alert('Geocode was not successful for the following reason: ' + status);
  //       }
  //     })
  //   // }
  // }


  return (
      <div className="create-restaurant-form-step-1-third-row">
        {/* <Autocomplete> */}
          <Combobox onSelect={handleSelect}>
            <ComboboxInput
              id="address-dropdown"
              value={value}
              onChange={(e)=> setValue(e.target.value)}
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
        {/* </Autocomplete> */}
        {/* <div className='create-restaurant-label-input-container third-row'>
          <label htmlFor="address-dropdown">Address</label>
          <Autocomplete >
            <input
              onSelect={handleSelect}
              id="address-dropdown"
              value={formData.address}
              onChange={(e)=> setFormData({...formData, address: e.target.value})}
              type='text'
              name="restaurant-address"
              placeholder='address'
              required
              // ref = {ref}
            />
          </Autocomplete>
        </div> */}
      </div>
  );
};

export default React.memo(PlacesAutocomplete)
