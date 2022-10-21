import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from 'react-router-dom';
import "./FinalOrderConfirmation.css"
import MapDistanceContainer from '../MapDistance';
import FinalConfirmationNavBar from '../FinalConfirmationNavBar';

const FinalOrderConfirmation = () => {
  const location = useLocation()
  const restaurant = location.data.restaurant
  const cartItems = location.data.cartItems
  const duration = location.data.duration
  // in minutes,ROUNDED -- to be displayed in jsx
  const [countdown, setCountdown] = useState(duration? Number(parseInt(duration.split(" ")[0])): null)
  useEffect(()=>{
    // set timer to the duration value
    let countdownInSec = countdown* 60
    let deliveryInterval = setInterval(()=> {
      console.log('timer:', countdownInSec)
      if (countdownInSec <= 0) {
        clearInterval(deliveryInterval);
      }
      countdownInSec-=1
      setCountdown(Math.ceil(countdownInSec/60))
    }, 1000)

  }, [])

  // useEffect(()=>{
  //   // calculate nonrounded interval in minutes
  //   let minutes = Math.floor(finalCountdown/60)
  // }, [countdown])

  return (
    <>
      <FinalConfirmationNavBar/>
      <div className='final-order-confirmation-page'>
        <div className='final-order-left-pane'>
          <div className='final-order-left-pane-top-container'>
              <h2>{countdown>0? "Preparing your order": "Order Completed"}</h2>
              <p className='arrives-in-container'> Arrives in&nbsp;<div className='countdown-time-container'>{countdown} min</div></p>
              <div className='order-delivery-progress-bar'></div>
              <p className='order-confirmation-restaurant-container'> {restaurant.name} is preparing your order</p>
          </div>
          <div className='final-order-left-pane-middle-container'>
            <h3 className='order-details-container'>Order Details</h3>
            <div className='final-order-order-items'>
              {cartItems.map(item=> (
                <div className='final-order-order-item-card'> {item.quantity}x {item.name}</div>
              ))}
            </div>
          </div>
          <div className='final-order-left-pane-bottom-container'>
            <div className='final-order-delivery-address-container'> Delivery Address </div>
            <div style={{width:"94.5%", color: "#7F767F", fontWeight:"520"}}> {restaurant.address}</div>
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
