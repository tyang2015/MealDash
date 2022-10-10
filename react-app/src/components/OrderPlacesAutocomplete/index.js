import usePlacesAutocomplete from "use-places-autocomplete";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlacesAutocomplete from "./PlacesAutocomplete.js";
import { getKey } from '../../store/maps';

// import { GoogleMap, useJsApiLoader, Marker, Autocomplete, LoadScript } from '@react-google-maps/api';

const OrderPlacesAutocompleteContainer = ({setRouteLoaded,setDestinationRef,destinationRef, calculateRoute}) => {
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
      <PlacesAutocomplete setRouteLoaded={setRouteLoaded} setDestinationRef={setDestinationRef} calculateRoute={calculateRoute} destinationRef={destinationRef} apiKey={key}/>
    </>
  )



};

export default OrderPlacesAutocompleteContainer
