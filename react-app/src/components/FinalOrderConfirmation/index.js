import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation , useParams} from 'react-router-dom';
import "./FinalOrderConfirmation.css"
import MapDistanceContainer from '../MapDistance';
import FinalConfirmationNavBar from '../FinalConfirmationNavBar';
import { updateOrder } from '../../store/order';

const countdownFromStorage = localStorage.getItem('countdown')? Number(localStorage.getItem('countdown')) : 0
// let restaurantsFromStorage = JSON.parse(localStorage.getItem(`restaurants`))
let restaurantFromStorage = JSON.parse(localStorage.getItem(`restaurant`))
let cartFromLocalStorage = JSON.parse(localStorage.getItem('cart' ||'[]'))
let ordersFromStorage = JSON.parse(localStorage.getItem('orders') )
let orderStarted = true

const FinalOrderConfirmation = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const {orderId, restaurantId} = useParams();
  const sessionUser = useSelector(state=> state.session.user)
  let restaurant= location?.state?.restaurant
  let cartItems= location?.state?.cartItems
  let duration= location?.state?.duration
  let order = location?.state?.createdOrder
  // const [orderStarted, setOrderStarted] = useState(true)
  const [countdown, setCountdown] = useState(countdownFromStorage? countdownFromStorage: Number(parseInt(duration?.split(" ")[0])))
  // const [countdownInSec, setCountdownInSec] = useState(countdown? countdown* 60: null)
  console.log('order in final order confirm page:', order)
  const [finalCountDown, setFinalCountdown] = useState(0)
  const [orderCompleted, setOrderCompleted] = useState(false)
  const [triggerMinuteChange, setTriggerMinuteChange] = useState(false)
  const [triggerCountdown, setTriggerCountdown] = useState(false)
  const [submittedCartItems, setSubmittedCartItems] = useState(cartFromLocalStorage)
  // let [storedRestaurant, setStoredRestaurant] = useState(restaurantFromStorage[restaurant?`${restaurant.id}`: restaurantId] )
  // let [storedOrders, setStoredOrders] = useState(ordersFromStorage)
  let [storedRestaurant, setStoredRestaurant] = useState(restaurantFromStorage)
  let [storedOrder, setStoredOrder]= useState(ordersFromStorage[orderId])
  // console.log("stored restaurant in final order confirm page:", storedRestaurant)
  console.log('stored orders DIRECTLy from local storage:', ordersFromStorage)
  // console.log('stored ordersss:', storedOrders)
  // console.log('stored order', storedOrder)


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

  const updateExistingOrderInStore = (order) => {
    // you dont need countdown to be updated... so i exclude it
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
    dispatch(updateOrder(orderObj))
    return

  }

  // useEffect(()=> {
  //   if (restaurant && cartItems.length>0){
  //     localStorage.setItem('restaurant', restaurant)
  //     localStorage.setItem('cartItems', JSON.stringify(cartItems))
  //   }
  // }, [restaurant, cartItems.length])
  // useEffect(()=>{
  //   localStorage.setItem('restaurant', restaurant)
  //   // localStorage.setItem('cartItems', JSON.stringify(cartItems) )

  // }, [])
  useEffect(()=>{
    // TODO: make orderStarted a useState? no.. because everytime it enters the component (change the url back to this), it will reset to default value
    if (!orderStarted) return
    console.log('order started should be TRUE:', orderStarted)
    setTriggerCountdown(true)
    orderStarted = false
    console.log('orderStarted should be FALSE (after countdown finishes)', orderStarted)
  }, [])


  // if (orderStarted){
  //   console.log('order started TRUE')
  //   orderStarted = false
  //   setTriggerCountdown(true)
  //   // change the countdown state every second THE FIRST TIME (aka only when order has started NOT when component mounts)
  // }

  useEffect(()=> {
    console.log('trigger countdown state in use effect:', triggerCountdown)
    if (!triggerCountdown) return
    let countdownInSec = countdown* 60
    let deliveryInterval = setInterval(()=> {
      console.log('timer:', countdownInSec)
      if (countdownInSec <= 0) {
        clearInterval(deliveryInterval);
        updateExistingOrderInStore(storedOrder)
        setStoredOrder({...storedOrder, countdown: 0, orderCompleted: true })
        localStorage.setItem('orders', JSON.stringify({...JSON.parse(localStorage.getItem('orders')), [orderId? orderId: order.id]:storedOrder }))
        setTriggerCountdown(false)
        console.log("countdown completed")
        return
      }
      countdownInSec-=1
      if (Math.ceil(countdownInSec/60) != countdown){
        setTriggerMinuteChange(!triggerMinuteChange)
      }
      // let concatCountdownInOrder = {...storedOrder, countdown: Math.ceil(countdownInSec/60) }
      localStorage.setItem('countdown', Math.ceil(countdownInSec/60) )
      // localStorage.setItem('orders', JSON.stringify({...JSON.parse(localStorage.getItem('orders')), [orderId? orderId: order.id]:storedOrder }))
      setCountdown(Math.ceil(countdownInSec/60))
      setStoredOrder( {...storedOrder, countdown: Math.ceil(countdownInSec/60) })
    }, 1000)

  }, [triggerCountdown])

  useEffect(()=>{
    console.log('STORED ORDER:', storedOrder)
    localStorage.setItem('orders', JSON.stringify({...JSON.parse(localStorage.getItem('orders')), [orderId? orderId: order.id]:storedOrder }))
  }, [storedOrder])



  return (
    <>
      <FinalConfirmationNavBar/>
      <div className='final-order-confirmation-page'>
        <div className='final-order-left-pane'>
          <div className='final-order-left-pane-top-container'>
              <h2>{countdown>0? "Preparing your order": "Order Completed"}</h2>
              <p className='arrives-in-container'> Arrives in&nbsp;<div className='countdown-time-container'>{countdown} min</div></p>
              <div className='order-delivery-progress-bar'></div>
              <p className='order-confirmation-restaurant-container'> {countdown>0? `${restaurant? restaurant.name: storedRestaurant.name} is preparing your order`: "Your order is complete. Enjoy!"} </p>
          </div>
          <div className='final-order-left-pane-middle-container'>
            <h3 className='order-details-container'>Order Details</h3>
            <div className='final-order-order-items'>
              {/* {cartItems?.length>0 && cartItems.map(item=> (
                <div className='final-order-order-item-card'> {item.quantity}x {item.name}</div>
              ))
              } */}
              {cartItems?.length>0? cartItems.map(item=> (
                <div className='final-order-order-item-card'> {item.quantity}x {item.name}</div>

              )) : submittedCartItems.map(item=>(
                <div className='final-order-order-item-card'> {item.quantity}x {item.name}</div>
              ))}
            </div>
          </div>
          <div className='final-order-left-pane-bottom-container'>
            <div className='final-order-delivery-address-container'> Delivery Address </div>
            <div style={{width:"94.5%", color: "#7F767F", fontWeight:"520"}}> {restaurant? restaurant.address: storedRestaurant.address}</div>
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
