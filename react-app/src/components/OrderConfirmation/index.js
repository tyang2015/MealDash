import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import MapContainer from '../Maps';
import PlacesAutocompleteContainer from '../PlacesAutocomplete'
import "./OrderConfirmation.css"

const OrderConfirmationPage = () => {
  return (
    <>
      <div className='order-confirmation-main-container'>
        <div className='order-confirmation-content-outer-container'>
          <div className=''>

          </div>

        </div>
        <div className='order-confirmation-right-pane'>

        </div>
        <MapContainer/>
      </div>
    </>
  )

}

export default OrderConfirmationPage
