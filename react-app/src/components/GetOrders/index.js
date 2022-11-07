import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import { getOrders, updateOrder, deleteOrder } from '../../store/order';
import NavBar from '../Navigation/NavBar';
import { useTriggerCountdown } from '../../context/TriggerCountdown';
// import { useOrderStarted } from '../../context/OrderStartedContext';
import "./GetOrders.css"
import { DeleteOrderModal } from '../../context/DeleteOrderModal';
import DeleteOrderModalComponent from '../DeleteOrderModal';
import {useCancelTimer} from "../../context/CancelTimer"
import {useDeliveryInterval} from "../../context/DeliveryInterval"
// the highest # order is your most recent aka the IN PROGRESS ONE, if there is one
let currentTime = new Date().toLocaleString('en-US', {
  month: "short",
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
})
console.log('current time:', currentTime)

const GetOrders = () => {
  const sessionUser = useSelector(state=> state.session.user)
  const orders = useSelector(state=> Object.values(state.orders))
  const {triggerCountdown, setTriggerCountdown} = useTriggerCountdown();
  const { deliveryIntervalObj, setDeliveryIntervalObj } = useDeliveryInterval();
  const dispatch = useDispatch();
  const [userCoordinates, setUserCoordinates] = useState({lat: 0, lng: 0})
  const [orderDeleteModal, setOrderDeleteModal] = useState(false)
  const [orderObj, setOrderObj] = useState(null)
  // const [sortedOrders, setSortedOrders]= useState()
  const [mostRecentOrder, setMostRecentOrder] = useState(orders?.length>0? orders.sort( (a,b)=> b.id - a.id)[0]: {})
  const [forceRender, setForceRender] = useState(false)
  console.log('user orders:', orders)
  console.log('most recent order:', mostRecentOrder)

  useEffect(()=>{
    dispatch(getOrders())
    return
  }, [dispatch])


  const convertCreatedTimeForInProgress = (orderObj)=>{
    // return the order object with newly formatted order created TIME
    let createdTimeObj = new Date (orderObj.createdAt)
    createdTimeObj.setMinutes(createdTimeObj.getMinutes()+ orderObj.duration)
    let convertedLocalTime = createdTimeObj.toLocaleString('en-US', {
      month: "short",
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    })

    // added here
    // if (currentTime == convertedLocalTime){
    //   console.log(`arrival time is current time!`)
    //   let order = {
    //     id: orderObj.id,
    //     customer_id: sessionUser.id,
    //     restaurant_id : orderObj.restaurantId,
    //     phone_number: orderObj.phoneNumber,
    //     credit_card: orderObj.creditCard,
    //     total_price: orderObj.totalPrice,
    //     distance: parseFloat(orderObj.distance),
    //     duration: parseInt(orderObj.duration),
    //     delivery_fee: Number(orderObj.deliveryFee),
    //     tip: Number(orderObj.tip),
    //     delivery_method: orderObj.deliveryMethod,
    //     delivery_option: orderObj.deliveryOption,
    //     food_items: orderObj.foodItems,
    //     order_completed: true
    //   }
    //   dispatch(updateOrder(orderObj))
    //   dispatch(getOrders())
    //   localStorage.clear()
    // }
    return convertedLocalTime
  }

  const convertCreatedTimeForCompleted = (orderObj) => {
    // let dayOfWeek = orderObj.createdAt.substring(0,3)
    let convertedTime= new Date (orderObj.createdAt).toLocaleString('en-US', {
      weekday: "short",
      month: "short",
      day: "numeric"
    })
    return `${convertedTime}`
  }

  // DOES NOT WORK UPON CLICKING NAVLINK
  const geoCodeUserAddress = async (orderObj) => {
    console.log('triggered geo code function! for user address')
    const results = await getGeocode({address: orderObj.userAddress})
    const {lat, lng} = await getLatLng(results[0]);
    setUserCoordinates({lat, lng})
  }


  // useEffect(()=>{
  //   let ordersCompleted = orders.filter(order => order.orderCompleted === true)
  //   let ordersNotCompleted = orders.filter(order=> order.orderCompleted === false)
  //   console.log('completed orders: ', ordersCompleted)
  //   console.log("in progress orders:", ordersNotCompleted)
  //   setInProgressOrders(ordersNotCompleted)
  //   setCompletedOrders(ordersCompleted)
  // }, [])


  const totalItemsPerOrder = (orderObj) => {
    return `${orderObj.foodItems.length} items`
    let foodItems = orderObj.foodItems
    let totalItems = foodItems.reduce( (accum, current) => accum + current.quantity, foodItems[0].quantity)
    return `${totalItems} items`
  }

  const handleDelete = (order) => {
    dispatch(deleteOrder(order.restaurant.id, order.id))
    localStorage.setItem('countdown', 0)
    localStorage.setItem('orders', JSON.stringify({}))
    setTriggerCountdown(true)
    // setOrderStarted(true)
    alert('successfully deleted!')
    return
  }


  return (
    <>
      <NavBar/>
      <div className='get-orders-main-container'>
          <h2> Orders</h2>
          {orders?.filter(order=> order.orderCompleted === false).length != 0 && (<h3> In Progress </h3>)}
          {orders?.length>0 && orders.filter(order=> order.orderCompleted === false).map( order => (
            <>
              <div className='get-orders-in-progress-card' key={order.id}>
                <div className='get-orders-restaurant-name-title-container'>
                  <h3> {order.restaurant.name}</h3>
                </div>
                <div className='get-orders-in-progress-text-content-main-container'>
                  <div className='get-orders-in-progress-text-content-left-container'>
                    <div className='prepare-your-order-container'>
                      <h3>Preparing your order</h3>
                    </div>
                    <div className="get-orders-estimated-delivery-container" style={{paddingLeft: '20px'}}>
                      <div>Estimated Delivery: {convertCreatedTimeForInProgress(order)}</div>
                    </div>
                  </div>
                  <div className='get-orders-in-progress-text-content-right-container'>
                    {/* TODO: fix user coordinates (instead of storing them as separate values, geocode in the finalorderconfirm component) */}
                    <NavLink className='navlink' to={{pathname:`/restaurants/${order.restaurant.id}/orders/${order.id}/new`, state: {createdOrder: order, cartItems: order.foodItems, userCoordinates, restaurant: order.restaurant, duration: order.duration}}}>
                      <div className='view-order-button'>
                        <h3>View Order</h3>
                      </div>
                    </NavLink>
                    <div className="get-orders-delete-order-button">
                      <h3 onClick={()=> {
                        setOrderDeleteModal(true)
                        setOrderObj(order)
                        // clearInterval(deliveryIntervalObj)
                      }}>Delete Order</h3>
                    </div>
                  </div>
                </div>
              </div>
              {orderDeleteModal && <DeleteOrderModalComponent restaurant={order.restaurant} order={orderObj} setOrderDeleteModal={setOrderDeleteModal}/>}
            </>
          ))}
          {/* {orders.filter(order=> order.orderCompleted === false).length === 0 && (
            <div> NO IN PROGRESS ORDERS </div>
          )} */}
          <h3>Completed</h3>
          {orders?.length>0 && orders.filter(order=> order.orderCompleted === true).map(order => (
            <>
              {/* <div className='get-orders-completed-container'> */}
                <div className='get-orders-completed-card' key={order.id}>
                  <div className='get-orders-restaurant-name-title-container'>
                    <h3> {order.restaurant.name}</h3>
                  </div>
                  <div className='get-orders-completed-text-content-main-container'>
                    <div className='get-orders-completed-text-content-left-container'>
                      <div className='get-orders-completed-text-content-top-row'>
                        <div> {convertCreatedTimeForCompleted(order)} • {order.totalPrice} • {totalItemsPerOrder(order)}</div>
                        <div> {order.foodItems.map( (item, i)=> (
                            <>
                              {i=== 0? ``: ` `} {item.name} {item.quantity>=2?`(${item.quantity})`: ""} {i!=order.foodItems.length - 1? "•": ""}
                            </>
                        ))}
                        </div>
                      </div>
                    </div>
                    <div className='get-orders-completed-text-content-right-container'>
                      <NavLink to={{pathname:`/orders/${order.id}`, state: {order }}} className="navlink">
                        <div className='view-receipt-button'>
                          <svg className='receipt-logo' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="styles__StyledInlineSvg-sc-12l8vvi-0 jFpckg"><path d="M9 10C8.44772 10 8 10.4477 8 11C8 11.5523 8.44772 12 9 12H15C15.5523 12 16 11.5523 16 11C16 10.4477 15.5523 10 15 10H9Z" fill="currentColor"></path><path d="M8 7C8 6.44772 8.44772 6 9 6H11C11.5523 6 12 6.44772 12 7C12 7.55228 11.5523 8 11 8H9C8.44772 8 8 7.55228 8 7Z" fill="currentColor"></path><path d="M9 14C8.44772 14 8 14.4477 8 15C8 15.5523 8.44772 16 9 16H12C12.5523 16 13 15.5523 13 15C13 14.4477 12.5523 14 12 14H9Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M20 21C20 21.3565 19.8102 21.686 19.5019 21.8649C19.1936 22.0438 18.8134 22.0451 18.5039 21.8682L15.5 20.1518L12.4961 21.8682C12.1887 22.0439 11.8113 22.0439 11.5039 21.8682L8.5 20.1518L5.49614 21.8682C5.18664 22.0451 4.80639 22.0438 4.49807 21.8649C4.18976 21.686 4 21.3565 4 21V5C4 3.34315 5.34315 2 7 2H17C18.6569 2 20 3.34315 20 5V21ZM6 19.2768L8.5 17.8482L12 19.8482L15.5 17.8482L18 19.2768V5C18 4.44772 17.5523 4 17 4H7C6.44772 4 6 4.44772 6 5V19.2768Z" fill="currentColor"></path></svg>
                              <h3>View Receipt</h3>
                        </div>
                      </NavLink>
                    </div>
                  </div>
                </div>
              {/* </div> */}
            </>
          ))}
          {/* {orders.filter(order=> order.orderCompleted === true).length ===0 && (
            <div> NO COMPLETED ORDERS </div>
          )} */}
      </div>
    </>
  )
}

export default GetOrders
