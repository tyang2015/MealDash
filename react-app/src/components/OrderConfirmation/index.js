import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import MapContainer from '../Maps';
// import PlacesAutocompleteContainer from '../PlacesAutocomplete'
import OrderPlacesAutocompleteContainer from '../OrderPlacesAutocomplete';
import "./OrderConfirmation.css"
import { getKey } from '../../store/maps';
import OrderConfirmationRightPane from '../OrderConfirmationRightPane';
import { getAllRestaurants } from '../../store/restaurant';
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader
} from '@react-google-maps/api'

const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart' || "[]"))

const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const key = useSelector(state=> state.session.user)
  const user = useSelector(state=> state.session.user)
  // const [cartItems, setCartItems] = useState(cartFromLocalStorage)
  const orderSubtotal = location.data.orderSubtotal
  const cartItems = location.data.cartItems
  
  const [restaurant, setRestaurant] = useState(cartItems[0]?.Restaurant ||null)
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

  const [paymentDropdown, setPaymentDropdown] = useState(false)
  let [destinationRef, setDestinationRef] = useState('')
  let [originRef, setOriginRef] = useState('')
  // set your form use states below
  let [deliveryMethod, setDeliveryMethod] = useState('Delivery')
  let [deliveryOption, setDeliveryOption] = useState('Leave at my door')
  let [creditCard, setCreditCard] = useState('')
  let [errors, setErrors] = useState([])

  const google = window.google
  console.log('order subtotal on order confirmation page:', orderSubtotal)

  useEffect(()=> {
    if (!key) {
      dispatch(getKey());
    }
  }, [dispatch, key])


  useEffect(()=>{
    if (cartItems.length ===0) return
    let itemAddress = cartItems[0].Restaurant.address
    setOriginRef(itemAddress)
  }, [dispatch, cartItems[0]?.Restaurant.address])

  useEffect(()=>{
    calculateRoute()

  },[destinationRef])

  useEffect(()=>{
    let errs= []
    if (!creditCard) errs.push('Please enter credit card number')
    if (creditCard.length!=16) errs.push("Please enter valid credit card")
    setErrors(errs)
  }, [creditCard])


  console.log('restaurant on confirm page:', restaurant)
  console.log('address at restaurant origin:', originRef)
  console.log('address at user destination:', destinationRef)
  // your address input = destination
  // this will be attached to the address input below
  async function calculateRoute() {
    // if (routeLoaded){
      console.log('in calculate route')
      if (originRef === "" || destinationRef === "") return

      const directionsService = new google.maps.DirectionsService()
      const results = await directionsService.route({
        origin: originRef,
        destination: destinationRef,
        travelMode: google.maps.TravelMode.DRIVING
      })
      console.log('results from directions service function:', results)
      setDirectionsResponse(results)
      if (results.routes){
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
      }
  }

  return (
    <>
      <div className='order-confirmation-main-container'>
        <div className='order-confirmation-content-outer-container'>
            <div className='account-details-container'>
              <h4>  1. Account details </h4>
            </div>
            <form id='order-form' className='order-confirmation-form-container'>
              <div className='shipping-details-container'>
                <h4 style={{textAlign: "left", width: '100%'}}> 2. Shipping details </h4>
                <div className='shipping-details-container-excluding-title'>
                  <MapContainer/>
                  <div className='delivery-pickup-container'>
                    <label>
                      <input
                        type='radio'
                        value='Delivery'
                        name='delivery-method'
                        onChange={(e)=> setDeliveryMethod("Delivery")}
                        checked= {deliveryMethod==="Delivery"? true: false}
                      />
                      Delivery
                    </label>
                    <label>
                      <input
                        type='radio'
                        value='Pickup'
                        name='delivery-method'
                        onChange={(e)=> setDeliveryMethod("Pickup")}
                        checked= {deliveryMethod==="Pickup"? true: false}
                      />
                      Pickup
                    </label>
                  </div>
                  <div className='delivery-time-container'>
                    {deliveryMethod=== "Delivery" && (
                      <>
                        <p> Delivery Time</p>
                        <p>{duration? duration: null}</p>
                      </>
                    )}
                  </div>
                  <OrderPlacesAutocompleteContainer destinationRef={destinationRef} setDestinationRef={setDestinationRef} calculateRoute={calculateRoute}/>
                  {deliveryMethod==="Delivery" && (
                  <div className='delivery-option-container'>
                    <label>
                      <input
                        type='radio'
                        value='Leave at my door'
                        name='delivery-option'
                        onChange={(e)=> setDeliveryOption("Leave at my door")}
                        checked= {deliveryOption==="Leave at my door"? true: false}
                      />
                      Leave at my door
                    </label>
                    <label>
                      <input
                        type='radio'
                        value='Pickup'
                        name='delivery-option'
                        onChange={(e)=> setDeliveryOption("Hand it to me")}
                        checked= {deliveryOption==="Hand it to me"? true: false}
                      />
                      Hand it to me
                    </label>
                  </div>
                  )}
                  <div className='order-confirmation-phone-number-container'>
                    <i class="fa-solid fa-phone"></i>
                    <p> {user.phoneNumber}</p>
                  </div>
                </div>
              </div>
              {!paymentDropdown && (
                <div className='payment-details-container-toggle-false'>
                  <h4> 3. Payment details <div onClick={()=> setPaymentDropdown(true)}> ▼ </div></h4>
                </div>
              )}
              {paymentDropdown  && (
                <div className='payment-details-container-toggle-true'>
                  <h4>3. Payment details <div onClick={()=> setPaymentDropdown(false)}> ▲ </div> </h4>
                  <div className='credit-card-input-label-container'>
                    <label> Card Details </label>
                    <input
                      type='text'
                      placeholder='xxx xxx xxxx xxxx'
                      value={creditCard}
                      className='credit-card-input'
                      onChange={(e)=> setCreditCard(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}
            </form>
        </div>
        <OrderConfirmationRightPane deliveryMethod={deliveryMethod} deliveryOption={deliveryOption} distance={distance} duration={duration} errors={errors}
         restaurant={restaurant} creditCard={creditCard} orderSubtotal={orderSubtotal}/>
      </div>
    </>
  )

}

export default OrderConfirmationPage
