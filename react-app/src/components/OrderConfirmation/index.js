import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import MapContainer from '../Maps';
// import PlacesAutocompleteContainer from '../PlacesAutocomplete'
import OrderPlacesAutocompleteContainer from '../OrderPlacesAutocomplete';
import "./OrderConfirmation.css"
import { getKey } from '../../store/maps';
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader
} from '@react-google-maps/api'

const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart' || "[]"))

const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const key = useSelector(state=> state.session.user)
  const [cartItems, setCartItems] = useState(cartFromLocalStorage)
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  // const destinationRef = useRef()
  let [destinationRef, setDestinationRef] = useState('')
  let [originRef, setOriginRef] = useState('')

  const google = window.google

  useEffect(()=> {
    if (!key) {
      dispatch(getKey());
    }
  }, [dispatch, key])

  // // let originRef;
  // // restaurant address from state
  // if (cartItems.length>0){
  //   originRef = cartItems[0]
  //   setOriginRef(cartItems)
  //   // console.log('origin Ref:', originRef)
  // }
  console.log('cart items on confirm. page:', cartItems)
  console.log('cart item at index 0:', cartItems[0])


// your address input = destination
  // this will be attached to the address input below
  async function calculateRoute() {
    if (originRef === "" || destinationRef.current.value === "") return

    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING
    })
    // this is just for displaying the link between 2 markers
    setDirectionsResponse(results)
    // you want distance and duration values for now
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  const user = useSelector(state=> state.session.user)
  // console.log('user:', user)
  // console.log('cart items in order page:', cartItems)
  console.log('distance:', distance)
  console.log('duration:', duration)

  return (
    <>
      <div className='order-confirmation-main-container'>
        <div className='order-confirmation-content-outer-container'>
            <div className='account-details-container'>
              <h4>  1. Account details </h4>
            </div>
            <div className='shipping-details-container'>
              <h4> 2. Shipping details </h4>
              <MapContainer/>
              <div>
                <p> Delivery Time </p>
              </div>
              <OrderPlacesAutocompleteContainer destinationRef={destinationRef} setDestinationRef={setDestinationRef} calculateRoute={calculateRoute}/>
              <div>
                <p>Leave it at my door </p>
              </div>
              <div>
                <p> {user.phoneNumber}</p>
              </div>
            </div>
            <div className='payment-details-container'>
              <h4> 3. Payment details</h4>
            </div>
        </div>
        <div className='order-confirmation-right-pane'>

        </div>
      </div>
    </>
  )

}

export default OrderConfirmationPage
