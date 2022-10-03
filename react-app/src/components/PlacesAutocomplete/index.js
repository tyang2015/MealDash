import usePlacesAutocomplete from "use-places-autocomplete";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getKey } from '../../store/maps';

// import { GoogleMap, useJsApiLoader, Marker, Autocomplete, LoadScript } from '@react-google-maps/api';
import PlacesAutocomplete from "./PlacesAutocomplete";

const PlacesAutocompleteContainer = ({setFormData, formData}) => {
  const key = useSelector((state) => state.maps.key);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!key) {
      dispatch(getKey());
    }
  }, [dispatch, key]);

  if (!key) {
    return null;
  }

  return (
    <>
      <PlacesAutocomplete apiKey={key} formData={formData} setFormData={setFormData} />
    </>
  )



};

export default PlacesAutocompleteContainer
