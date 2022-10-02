import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import MapContainer from '../../Maps';
// import PlacesAutocomplete from '../../UsePlacesAutoComplete';

const OrderFormStep2 = () => {
  return (
    <>
      <h3> Order form step 2</h3>
      <MapContainer/>
    </>
  )
}

export default OrderFormStep2
