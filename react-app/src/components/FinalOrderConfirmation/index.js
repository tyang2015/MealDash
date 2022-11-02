import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation , useParams} from 'react-router-dom';
import "./FinalOrderConfirmation.css"
import MapDistanceContainer from '../MapDistance';
import FinalConfirmationNavBar from '../FinalConfirmationNavBar';
import { updateOrder, getOrders } from '../../store/order';
import { useOrderStarted } from '../../context/OrderStartedContext';
import { useTriggerCountdown } from '../../context/TriggerCountdown';
import {useCancelTimer} from "../../context/CancelTimer"
// make order started into context?? so it can access that value from Get Orders page too and reset OrderStarted = true

let countdownFromStorage = localStorage.getItem('countdown')|| 0
let cartFromLocalStorage = JSON.parse(localStorage.getItem('cart' )||'[]')
let orderStartedFromLocalStorage = localStorage.getItem('orderStarted') || 1

// ISSUE: countdown times for all deliveries is correct BUT hard refresh will reset the times to original times
const FinalOrderConfirmation = () => {
  // const {orderStarted, setOrderStarted} = useOrderStarted();
  const {triggerCountdown, setTriggerCountdown} = useTriggerCountdown();
  const { cancelTimer, setCancelTimer } = useCancelTimer();
  const location = useLocation();
  const dispatch = useDispatch();
  const {orderId, restaurantId} = useParams();
  let order = location?.state?.createdOrder
  const sessionUser = useSelector(state=> state.session.user)
  let cartItems= location?.state?.cartItems
  let duration= location?.state?.duration


  console.log('countdown from storage:', countdownFromStorage)
  let restaurant= location?.state?.restaurant
  let userCoordinates = location?.state?.userCoordinates
  console.log('duration in order confirm:', duration)
  const [submittedCartItems, setSubmittedCartItems] = useState(cartFromLocalStorage)
  const [orderStarted, setOrderStarted] = useState(orderStartedFromLocalStorage)
  const [countdown, setCountdown] = useState(countdownFromStorage === 0 || orderStarted? duration: countdownFromStorage)
  // const [countdown, setCountdown] = useState(orderStarted && countdownFromStorage != 0 ? duration: countdownFromStorage)
  // const [countdown, setCountdown] = useState(countdownFromStorage === 0 || orderStartedFromLocalStorage? duration: countdownFromStorage)

  console.log("order started at top of final order confirm:", orderStarted)
  console.log("countDOWN", countdown)

  useEffect(()=> {
    if (orderStarted) {
      // countdownFromStorage = duration
      setCountdown(duration)
      setOrderStarted(0)
    }
  }, [])


  useEffect(()=>{
    localStorage.setItem('orderStarted', orderStarted)
  }, [orderStarted])

  // useEffect(()=> {
  //   if (!orderStarted) return
  //   console.log("inside the initial use effect for setting countdown to duration")
  //   // setCountdown(duration)
  //   // if (orderStarted){
  //   //   countdownFunc()
  //   // }
  // }, [])

  // useEffect(()=> {
  //   localStorage.setItem('countdown', countdown)
  //   localStorage.setItem('orders',JSON.stringify({[orderId]: {...order, countdown: duration}}))
  // }, [countdown])


  useEffect(()=> {
    localStorage.setItem("orderStarted", orderStarted)
  }, [orderStarted])

  // useEffect(()=>{
  //   localStorage.setItem("countdown", countdown)
  // }, [countdown])

  // useEffect(()=>{
  //   localStorage.setItem("orders", JSON.stringify({...order}))
  // }, [order])


  const updateExistingOrderInStore = async (order) => {
    console.log('order inside update existing order function:', order)
    let orderObj = {
      id: order.id,
      customer_id: sessionUser.id,
      restaurant_id : order.restaurantId,
      phone_number: order.phoneNumber,
      credit_card: order.creditCard,
      total_price: order.totalPrice,
      distance: parseFloat(order.distance),
      duration: parseInt(order.duration),
      delivery_fee: Number(order.deliveryFee),
      tip: Number(order.tip),
      delivery_method: order.deliveryMethod,
      delivery_option: order.deliveryOption,
      food_items: order.foodItems,
      order_completed: true
    }
    await dispatch(updateOrder(orderObj))
    await dispatch(getOrders())
    return

  }

  // const countdownFunc = async () => {
  //   // if (!triggerCountdown) return
  //   if (!orderStarted) return
  //   setOrderStarted(0)
  //   let countdownInSec = countdown* 60
  //   let deliveryInterval = setInterval(()=> {
  //     console.log('timer:', countdownInSec)
  //     if (countdownInSec <= 0) {
  //       setCountdown(0)
  //       localStorage.setItem('countdown', 0)
  //       setOrderStarted(1)
  //       // setTriggerCountdown(true)
  //       updateExistingOrderInStore(order)
  //       localStorage.setItem('orders', JSON.stringify({...JSON.parse(localStorage.getItem('orders')), [orderId]: {...order, countdown: 0, orderCompleted: true} }))
  //       console.log("countdown completed")
  //       clearInterval(deliveryInterval);
  //       return
  //     }
  //     countdownInSec-=1
  //     if (Math.ceil(countdownInSec/60) != countdown){
  //       localStorage.setItem('countdown', Math.ceil(countdownInSec/60) )
  //       setCountdown(Math.ceil(countdownInSec/60))
  //       localStorage.setItem('orders', JSON.stringify({...JSON.parse(localStorage.getItem('orders')),[orderId]: {...order, countdown: Math.ceil(countdownInSec/60)}  }))
  //     }
  //   }, 1000)
  // }

  useEffect(()=> {
    if (!orderStarted) return
    console.log('entering countdown useeffect after orderStarted is TRUE')
    orderStartedFromLocalStorage = 0
    // setOrderStarted(0)
    localStorage.setItem('orderStarted', 0)
    // let countdownInSec = countdown* 60
    countdownFunc(countdown*60)

  }, [])

  const countdownFunc = async (countdownInSec) => {
    if (!triggerCountdown) return
    await setTriggerCountdown(false)
    let deliveryInterval = setInterval(()=> {
      console.log('timer:', countdownInSec)
      // if (cancelTimer){
      //   console.log('CANCEL TIMER ACTIVATED')
      //   clearInterval(deliveryInterval);
      // }
      if (countdownInSec <= 0) {
        setCountdown(0)
        localStorage.setItem('countdown', 0)
        localStorage.setItem('orderStarted', 1)
        setOrderStarted(1)
        orderStartedFromLocalStorage = 1
        setTriggerCountdown(true)
        updateExistingOrderInStore(order)
        localStorage.setItem('cart', JSON.stringify([]))
        localStorage.setItem('orders', JSON.stringify({...JSON.parse(localStorage.getItem('orders')), [orderId]: {...order, countdown: 0, orderCompleted: true} }))
        console.log("countdown completed")
        clearInterval(deliveryInterval);
        return
      }
      countdownInSec-=1
      // if (Math.ceil(countdownInSec/60) != countdown){
        setCountdown(Math.ceil(countdownInSec/60))
        order = {...order, countdown: Math.ceil(countdownInSec/60)}
        localStorage.setItem("countdown", Math.ceil(countdownInSec/60))
        localStorage.setItem("orders", JSON.stringify({...order}))
      // }
    }, 1000)

  }




// // CHANGED DEPENDENCY ARRAY FROM EMPTY TO ON DETCTION OF GETITEM. the !orderStarted will take care of the unnecessary triggers
//   useEffect(()=>{
//     // TODO: make orderStarted a useState? no.. because everytime it enters the component (change the url back to this), it will reset to default value
//     // console.log("order started here...", orderStarted)
//     if (!orderStarted) return
//     // setOrderStarted(false)
//     // orderStarted = false
//     // triggerCountdown = true
//     // setTriggerCountdown(true)
//     countdownFunc()

//   }, [localStorage.getItem('countdown')])



  return (
    <>
      <FinalConfirmationNavBar/>
      <div className='final-order-confirmation-page'>
        <div className='final-order-left-pane'>
          <div className='final-order-left-pane-top-container'>
              <h2>{localStorage.getItem('countdown')>0? "Preparing your order": "Order Completed"}</h2>
              <p className='arrives-in-container'> Arrives in&nbsp;<div className='countdown-time-container'>{ countdown? countdown: 0} min</div></p>
              <div className='order-delivery-progress-bar'></div>
              <p className='order-confirmation-restaurant-container'> {localStorage.getItem('countdown')>0? `${restaurant?.name} is preparing your order`: "Your order is complete. Enjoy!"} </p>
          </div>
          <div className='final-order-left-pane-middle-container'>
            <h3 className='order-details-container'>Order Details</h3>
            <div className='final-order-order-items'>
              {submittedCartItems? submittedCartItems.map(item=>(
                <div className='final-order-order-item-card'> {item.quantity}x {item.name}</div>
              )) : cartItems.map(item=> (
                <div className='final-order-order-item-card'> {item.quantity}x {item.name}</div>
              )) }
            </div>
          </div>
          <div className='final-order-left-pane-bottom-container'>
            <div className='final-order-delivery-address-container'> Delivery Address </div>
            <div style={{width:"94.5%", color: "#7F767F", fontWeight:"520"}}> {restaurant?.address}</div>
          </div>
        </div>
        <div className='final-order-right-pane'>
          <MapDistanceContainer userCoordinates={userCoordinates} restaurant={restaurant}/>
        </div>
      </div>
    </>
  )
}

export default FinalOrderConfirmation
