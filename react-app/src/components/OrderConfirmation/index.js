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
import zIndex from '@mui/material/styles/zIndex';

const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart' || "[]"))
const subTotalFromLocalStorage = localStorage.getItem("orderSubtotal") ? JSON.parse(localStorage.getItem("orderSubtotal" )): 0

const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {id} = useParams();
  const key = useSelector(state=> state.session.user)
  const user = useSelector(state=> state.session.user)
  const [cartItems, setCartItems] = useState(cartFromLocalStorage)
  const landingOrderSubtotal = location?.data?.orderSubtotal
  const restaurant= location?.data?.restaurant
  const submittedCartItems = location?.data?.submittedCartItems
  const [orderSubtotal, setOrderSubtotal] = useState(landingOrderSubtotal? landingOrderSubtotal: subTotalFromLocalStorage)
  const [storedRestaurant, setStoredRestaurant] = useState(JSON.parse(localStorage.getItem('restaurant') || "{}"))
  // let [restaurantId, setRestaurantId] = useState(cartItems?.length>0? cartItems[0].Restaurant.id: submittedCartItems?.length>0? submittedCartItems[0].Restaurant.id: "")
  // let [storedRestaurant, setStoredRestaurant] = useState(restaurantFromLocalStorage[restaurant?`${restaurant.id}`: `${id}`])
  const [paymentModal, setPaymentModal] = useState(false)
  const [userCoordinates,setUserCoordinates] =useState({lat: Number(restaurant? restaurant.latitude: storedRestaurant.latitude), lng: Number(restaurant? restaurant.longitude: storedRestaurant.longitude)})
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [address, setAddress] = useState('')

  let [destinationRef, setDestinationRef] = useState('')
  let [originRef, setOriginRef] = useState('')
  // set your form use states below
  let [deliveryMethod, setDeliveryMethod] = useState('Delivery')
  let [deliveryOption, setDeliveryOption] = useState('Leave at my door')
  let [creditCard, setCreditCard] = useState('')
  let [errors, setErrors] = useState([])

  const google = window.google
  // console.log("user coordinates:", userCoordinates)

  console.log('restaurant:', restaurant)
  console.log('stored restaurant:', storedRestaurant)
  useEffect(()=> {
    if (localStorage.getItem('restaurant')!= undefined && restaurant){
      localStorage.setItem('restaurant', JSON.stringify(restaurant))
    }
  }, [restaurant])

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
    setOriginRef(restaurant?restaurant.address: storedRestaurant.address)
  }, [dispatch, cartItems, submittedCartItems])

  useEffect(()=>{
    calculateRoute()

  },[destinationRef])

  useEffect(()=>{
    let errs= []
    if (!creditCard) errs.push('Please enter credit card number')
    if (creditCard.length!=16) errs.push("Please enter valid credit card")
    if (!distance || !duration) errs.push("Please select an address in dropdown box")
    if (duration.includes('hour')) errs.push("Delivery Time is too long. Please select a closer address")
    setErrors(errs)
  }, [creditCard, distance, duration])


  // console.log('restaurant on confirm page:', restaurant)
  // console.log('address at restaurant origin:', originRef)
  // console.log('address at user destination:', destinationRef)

  async function calculateRoute() {
      if (originRef === "" || destinationRef === "") return
      // console.log('origin ref in calc route:', originRef)
      // console.log('destination ref in calc route:', destinationRef)
      const directionsService = new google.maps.DirectionsService()
      const results = await directionsService.route({
        origin: originRef,
        destination: destinationRef,
        travelMode: google.maps.TravelMode.DRIVING
      })
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
                <h4 style={{textAlign: "left", width: '90%'}}> 2. Shipping details </h4>
                <div className='shipping-details-container-excluding-title'>
                  <MapContainer restaurant={restaurant? restaurant: storedRestaurant} userCoordinates={userCoordinates}/>
                  {/* <div className='delivery-pickup-container'> */}
                    {/* <label>
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
                    </label> */}
                  {/* </div> */}
                  <div className='delivery-time-container'>
                    {deliveryMethod=== "Delivery" && (
                      <>
                        <div className='order-confirm-delivery-time-container'>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="styles__StyledInlineSvg-sc-12l8vvi-0 jFpckg"><path d="M13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7V12C11 12.2652 11.1054 12.5196 11.2929 12.7071L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L13 11.5858V7Z" fill="#494949"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" fill="#494949"></path></svg>
                          <p style={{marginLeft: "15px"}}> Delivery Time</p>
                        </div>
                        <p>{duration? duration: null}</p>
                      </>
                    )}
                  </div>
                  <OrderPlacesAutocompleteContainer setUserCoordinates={setUserCoordinates} setAddress={setAddress} destinationRef={destinationRef} setDestinationRef={setDestinationRef} calculateRoute={calculateRoute}/>
                  {/* {deliveryMethod==="Delivery" && ( */}
                  <div className='delivery-option-container'>
                    <label className='delivery-option-label'>
                      <input
                        type='radio'
                        value='Leave at my door'
                        name='delivery-option'
                        className='delivery-option'
                        onChange={(e)=> setDeliveryOption("Leave at my door")}
                        checked= {deliveryOption==="Leave at my door"? true: false}
                      />
                      <div className='leave-at-door-button delivery-option-button' style={{zIndex:
                        deliveryOption === "Leave at my door"? "1": "0",
                        color: deliveryOption === "Leave at my door"? "white": "black",
                        backgroundColor: deliveryOption === "Leave at my door"? "black": "#F7F7F7",
                        fontWeight:  deliveryOption === "Leave at my door"? "700": "550"
                        }}>
                        Leave at my door
                      </div>
                    </label>
                    <label className='delivery-option-label'>
                      <input
                        type='radio'
                        value='Pickup'
                        name='delivery-option'
                        className='delivery-option'
                        onChange={(e)=> setDeliveryOption("Hand it to me")}
                        checked= {deliveryOption==="Hand it to me"? true: false}
                      />
                      <div className='hand-to-me-button delivery-option-button' style={{zIndex:
                        deliveryOption === "Hand it to me"? "1": "0",
                        color: deliveryOption === "Hand it to me"? "white": "black",
                        backgroundColor: deliveryOption === "Hand it to me"? "black": "#F7F7F7",
                        fontWeight:  deliveryOption === "Hand it to me"? "700": "550"
                        }}>
                        Hand it to me
                      </div>
                    </label>
                  </div>
                  {/* )} */}
                  <div className='order-confirmation-phone-number-container'>
                    <svg className='order-confirmation-phone-logo' style={{height: "100%", display: "flex", alignItems: "center"}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="styles__StyledInlineSvg-sc-12l8vvi-0 jFpckg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.13082 6.11845C2.90984 4.34182 4.38193 3 6 3H7.41641C8.80826 3 10.0173 3.95733 10.3365 5.3121L10.7697 7.15119C11.0886 8.50495 10.4353 9.90039 9.19131 10.5224L7.05836 11.5889C8.35611 13.7969 10.2031 15.6439 12.4111 16.9416L13.4776 14.8087C14.0996 13.5647 15.4951 12.9114 16.8488 13.2303L18.6879 13.6635C20.0427 13.9827 21 15.1917 21 16.5836V18C21 19.6181 19.6582 21.0902 17.8816 20.8692C15.9313 20.6266 14.083 20.0536 12.3951 19.208C9.1122 17.5634 6.43661 14.8878 4.79196 11.6049C3.94639 9.91705 3.37339 8.06874 3.13082 6.11845ZM14.1993 17.8375C15.4336 18.3556 16.7519 18.7133 18.1284 18.8845C18.544 18.9362 19 18.5911 19 18V16.5836C19 16.1196 18.6809 15.7166 18.2293 15.6102L16.3902 15.177C15.939 15.0707 15.4738 15.2885 15.2665 15.7031L14.1993 17.8375ZM6.1625 9.80072L8.29688 8.73353C8.71154 8.5262 8.92933 8.06105 8.82302 7.6098L8.38977 5.7707C8.28338 5.31911 7.88036 5 7.41641 5H6C5.40894 5 5.06383 5.45597 5.11552 5.87159C5.28673 7.24809 5.6444 8.56637 6.1625 9.80072Z" fill="#494949"></path></svg>
                    <p style={{marginLeft: "15px"}}> {user.phoneNumber}</p>
                  </div>
                </div>
              </div>
            </form>
              <div className='payment-details-container-toggle-false'>
                <h4> 3. Payment details </h4>
                <div onClick={handlePaymentEdit} style={{color: "lightcoral", fontWeight: "550"}}> Edit </div>
              </div>
              {paymentModal && (<PaymentModal setPaymentModal={setPaymentModal} creditCard={creditCard} setCreditCard={setCreditCard} />)}
        </div>
        <OrderConfirmationRightPane directionsResponse={directionsResponse} address={address} userCoordinates={userCoordinates} cartItems={submittedCartItems? submittedCartItems: cartItems} deliveryMethod={deliveryMethod} deliveryOption={deliveryOption} distance={distance} duration={duration} errors={errors}
         restaurant={restaurant? restaurant: storedRestaurant} creditCard={creditCard} orderSubtotal={orderSubtotal}/>
      </div>
    </>
  )

}

export default OrderConfirmationPage
