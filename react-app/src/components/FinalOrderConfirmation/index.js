import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from 'react-router-dom';
import "./FinalOrderConfirmation.css"
import MapDistanceContainer from '../MapDistance';
import FinalConfirmationNavBar from '../FinalConfirmationNavBar';
import MinuteCountdown from './Countdown';

const countdownFromStorage = localStorage.getItem('countdown')? Number(parseInt(localStorage.getItem('countdown'))) : 0
// let restaurantFromStorage = localStorage.getItem('restaurant')? localStorage.getItem('restaurant') : "restaurant name"
// let cartItemsFromStorage = JSON.parse(localStorage.getItem('cartItems')? localStorage.getItem('cartItems'): "[]")
let orderStarted = true

const FinalOrderConfirmation = () => {
  const location = useLocation()
  let restaurant= location?.data?.restaurant
  let cartItems= location?.data?.cartItems
  let duration= location?.data?.duration
  // console.log('duration in final confirm:', duration)
  // const countdown = location?.data?.countdown
  // const setCountdown = location?.data?.setCountdown
  // const [orderStarted, setOrderStarted] = useState(true)
  const [countdown, setCountdown] = useState(countdownFromStorage? countdownFromStorage: Number(parseInt(duration?.split(" ")[0])))
  // const [countdownInSec, setCountdownInSec] = useState(countdown? countdown* 60: null)
  const [finalCountDown, setFinalCountdown] = useState(0)
  const [orderCompleted, setOrderCompleted] = useState(false)
  const [triggerMinuteChange, setTriggerMinuteChange] = useState(false)
  const [triggerCountdown, setTriggerCountdown] = useState(false)
  // useEffect(()=>{
  //   // // set timer to the duration value
  //   // let countdownInSec = countdown* 60
  //   // let deliveryInterval = setInterval(()=> {
  //   //   console.log('timer:', countdownInSec)
  //   //   if (countdownInSec <= 0) {
  //   //     clearInterval(deliveryInterval);
  //   //   }
  //   //   countdownInSec-=1
  //   //   setCountdown(Math.ceil(countdownInSec/60))
  //   // }, 1000)
  //   MinuteCountdown(countdown, setCountdown)
  // }, [])

  // useEffect(()=>{
  //   console.log('trigerring countdown use effect')
  //   localStorage.setItem('countdown', countdown)
  // }, [countdown])

  const MinuteCountdown = async () => {
    let countdownInSec = countdown* 60
    let deliveryInterval = setInterval(()=> {
      console.log('timer:', countdownInSec)
      if (countdownInSec <= 0) {
        clearInterval(deliveryInterval);
      }
      countdownInSec-=1
      if (Math.ceil(countdownInSec/60) != countdown){
        setTriggerMinuteChange(!triggerMinuteChange)
      }
      localStorage.setItem('countdown', Math.ceil(countdownInSec/60) )
      console.log('local storage counter:', countdownFromStorage)
      // setCountdownInSec(prev=> prev - 1)
      setCountdown(Math.ceil(countdownInSec/60))
    }, 1000)
  }

  // useEffect(()=> {
  //   if (restaurant && cartItems.length>0){
  //     localStorage.setItem('restaurant', restaurant)
  //     localStorage.setItem('cartItems', JSON.stringify(cartItems))
  //   }
  // }, [restaurant, cartItems.length])


  if (orderStarted){
    // console.log('cart items in final confirmation page:')
    console.log('order started TRUE')
    orderStarted = false
    // localStorage.setItem('restaurant', restaurant)
    // localStorage.setItem('cartItems', JSON.stringify(cartItems) )
    // localStorage.setItem('duration', duration)
    setTriggerCountdown(true)
    // change the countdown state every second THE FIRST TIME (aka only when order has started NOT when component mounts)

    // MinuteCountdown()
  }

  useEffect(()=> {
    let countdownInSec = countdown* 60
    let deliveryInterval = setInterval(()=> {
      console.log('timer:', countdownInSec)
      if (countdownInSec <= 0) {
        clearInterval(deliveryInterval);
      }
      countdownInSec-=1
      if (Math.ceil(countdownInSec/60) != countdown){
        setTriggerMinuteChange(!triggerMinuteChange)
      }
      localStorage.setItem('countdown', Math.ceil(countdownInSec/60) )
      console.log('local storage counter:', countdownFromStorage)
      // setCountdownInSec(prev=> prev - 1)
      setCountdown(Math.ceil(countdownInSec/60))
    }, 1000)

  }, [triggerCountdown])



  return (
    <>
      <FinalConfirmationNavBar/>
      <div className='final-order-confirmation-page'>
        <div className='final-order-left-pane'>
          <div className='final-order-left-pane-top-container'>
              <h2>{countdown>0? "Preparing your order": "Order Completed"}</h2>
              <p className='arrives-in-container'> Arrives in&nbsp;<div className='countdown-time-container'>{countdown} min</div></p>
              <div className='order-delivery-progress-bar'></div>
              <p className='order-confirmation-restaurant-container'> {countdown>0? `${restaurant?.name} is preparing your order`: "Your order is complete. Enjoy!"} </p>
          </div>
          <div className='final-order-left-pane-middle-container'>
            <h3 className='order-details-container'>Order Details</h3>
            <div className='final-order-order-items'>
              {cartItems?.length>0 && cartItems.map(item=> (
                <div className='final-order-order-item-card'> {item.quantity}x {item.name}</div>
              ))}
            </div>
          </div>
          <div className='final-order-left-pane-bottom-container'>
            <div className='final-order-delivery-address-container'> Delivery Address </div>
            <div style={{width:"94.5%", color: "#7F767F", fontWeight:"520"}}> {restaurant?.address}</div>
          </div>
        </div>
        <div className='final-order-right-pane'>
          <MapDistanceContainer restaurant={restaurant}/>
        </div>
      </div>
    </>
  )
}

export default FinalOrderConfirmation
