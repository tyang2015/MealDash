import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from 'react-router-dom';
import MapContainer from '../Maps';
// import PlacesAutocompleteContainer from '../PlacesAutocomplete'
import OrderPlacesAutocompleteContainer from '../OrderPlacesAutocomplete';
import "./OrderConfirmation.css"
import { getKey } from '../../store/maps';
import OrderConfirmationRightPane from '../OrderConfirmationRightPane';
import { getAllRestaurants } from '../../store/restaurant';
import PaymentModal from '../PaymentModal';
import CheckoutPageNavBar from '../CheckoutPageNavBar';

import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader
} from '@react-google-maps/api'

const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart' || "[]"))
const subTotalFromLocalStorage = localStorage.getItem("orderSubtotal") ? JSON.parse(localStorage.getItem("orderSubtotal" )): 0
let restaurantFromLocalStorage = JSON.parse(localStorage.getItem('restaurants'))

const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {id} = useParams();
  const key = useSelector(state=> state.session.user)
  const user = useSelector(state=> state.session.user)
  // const [cartItems, setCartItems] = useState(cartFromLocalStorage)
  const landingOrderSubtotal = location?.data?.orderSubtotal
  const restaurant= location?.data?.restaurant
  const cartItems = cartFromLocalStorage
  const [orderSubtotal, setOrderSubtotal] = useState(landingOrderSubtotal? landingOrderSubtotal: subTotalFromLocalStorage)
  // const [storedRestaurant, setStoredRestaurant] = useState(restaurantFromLocalStorage)
  // let [restaurantId, setRestaurantId] = useState(cartItems?.length>0? cartItems[0].Restaurant.id: submittedCartItems?.length>0? submittedCartItems[0].Restaurant.id: "")
  let [storedRestaurant, setStoredRestaurant] = useState(restaurantFromLocalStorage[restaurant?`${restaurant.id}`: `${id}`])
  const [paymentModal, setPaymentModal] = useState(false)
  const [userCoordinates,setUserCoordinates] =useState({lat: Number(restaurant? restaurant.latitude: storedRestaurant.latitude), lng: Number(restaurant? restaurant.longitude: storedRestaurant.longitude)})
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  console.log('restaurant in order confirm page:', restaurant)
  console.log('restaurant from local storageeee', storedRestaurant)

  const [paymentDropdown, setPaymentDropdown] = useState(false)
  let [destinationRef, setDestinationRef] = useState('')
  let [originRef, setOriginRef] = useState('')
  // set your form use states below
  let [deliveryMethod, setDeliveryMethod] = useState('Delivery')
  let [deliveryOption, setDeliveryOption] = useState('Leave at my door')
  let [creditCard, setCreditCard] = useState('')
  let [errors, setErrors] = useState([])

  const google = window.google
  // console.log('order subtotal on order confirmation page:', orderSubtotal)
  console.log("user coordinates:", userCoordinates)
  useEffect(()=>{
    if(landingOrderSubtotal){
      localStorage.setItem("orderSubtotal", JSON.stringify(landingOrderSubtotal))
    }
  }, [])


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
    if (!distance || !duration) errs.push("Please select an address in dropdown box")
    setErrors(errs)
  }, [creditCard, distance, duration])


  // console.log('restaurant on confirm page:', restaurant)
  // console.log('address at restaurant origin:', originRef)
  // console.log('address at user destination:', destinationRef)
  // your address input = destination
  async function calculateRoute() {
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

  const handlePaymentEdit = () => {
    setPaymentModal(true)
  }
  console.log('duration:', duration)

  return (
    <>
      <CheckoutPageNavBar />
      <div className='order-confirmation-main-container'>
        <div className='order-confirmation-content-outer-container'>
            <div className='account-details-container'>
              <h4>  1. Account details </h4>
              <p> {user.email}</p>
            </div>
            <form id='order-form' className='order-confirmation-form-container'>
              <div className='shipping-details-container'>
                <h4 style={{textAlign: "left", width: '100%'}}> 2. Shipping details </h4>
                <div className='shipping-details-container-excluding-title'>
                  <MapContainer restaurant={restaurant? restaurant: storedRestaurant} userCoordinates={userCoordinates}/>
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
                        <div className='order-confirm-delivery-time-container'>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="styles__StyledInlineSvg-sc-12l8vvi-0 jFpckg"><path d="M13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7V12C11 12.2652 11.1054 12.5196 11.2929 12.7071L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L13 11.5858V7Z" fill="#494949"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" fill="#494949"></path></svg>
                          <p> Delivery Time</p>
                        </div>
                        <p>{duration? duration: null}</p>
                      </>
                    )}
                  </div>
                  <OrderPlacesAutocompleteContainer setUserCoordinates={setUserCoordinates} destinationRef={destinationRef} setDestinationRef={setDestinationRef} calculateRoute={calculateRoute}/>
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
            </form>
              <div className='payment-details-container-toggle-false'>
                <h4> 3. Payment details </h4>
                <div onClick={handlePaymentEdit}> Edit </div>
              </div>
              {paymentModal && (<PaymentModal setPaymentModal={setPaymentModal} creditCard={creditCard} setCreditCard={setCreditCard} />)}
        </div>
        <OrderConfirmationRightPane deliveryMethod={deliveryMethod} deliveryOption={deliveryOption} distance={distance} duration={duration} errors={errors}
         restaurant={restaurant? restaurant: storedRestaurant} creditCard={creditCard} orderSubtotal={orderSubtotal}/>
      </div>
    </>
  )

}

export default OrderConfirmationPage
