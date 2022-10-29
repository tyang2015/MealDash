import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { getOrders } from '../../store/order';
import "./GetOrders.css"

const GetOrders = () => {
  const orders = useSelector(state=> Object.values(state.orders))
  const dispatch = useDispatch();
  console.log('user orders:', orders)
  // const [inProgressOrders, setInProgressOrders] = useState(orders.filter(order=> order.orderCompleted === false))
  // const [completedOrders, setCompletedOrders] = useState(orders.filter(order => order.orderCompleted === true))

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
    console.log("order object:", orderObj)
    let foodItems = orderObj.foodItems
    let totalItems = foodItems.reduce( (accum, current) => accum + current.quantity, foodItems[0].quantity)
    return `${totalItems} items`
  }

  // if (inProgressOrders?.length === 0 && completedOrders?.length === 0) return

  return (
    <>
      <div className='get-orders-main-container'>
        <h2> Orders</h2>
        <h3> In Progress </h3>
        <div className='get-orders-in-progress-container'>
          {orders.length>0 && orders.filter(order=> order.orderCompleted === false).map( order => (
            <div className='get-orders-in-progress-card'>
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
                  <div className='view-order-button'>
                    <h3>View Order</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {orders.filter(order=> order.orderCompleted === false).length === 0 && (
            <div> NO IN PROGRESS ORDERS </div>
          )}
        </div>
        <h3>Completed</h3>
        <div className='get-orders-completed-container'>
          {orders.length>0 && orders.filter(order=> order.orderCompleted === true).map(order => (
            <div className='get-orders-completed-card'>
              <div className='get-orders-restaurant-name-title-container'>
                <h3> {order.restaurant.name}</h3>
              </div>
              <div className='get-orders-completed-text-content-main-container'>
                <div className='get-orders-completed-text-content-left-container'>
                  <div className='get-orders-completed-text-content-top-row'>
                    <div> {convertCreatedTimeForCompleted(order)} • {order.totalPrice} • {totalItemsPerOrder(order)}</div>
                    <div> {order.foodItems.map( (item, i)=> (
                        <>
                          {i=== 0? ``: ` `} {item.name} {item.quantity>2?`(${item.quantity})`: ""} {i!=order.foodItems.length - 1? "•": ""}
                        </>
                    ))}
                    </div>
                  </div>
                </div>
                <div className='get-orders-completed-text-content-right-container'>
                  <NavLink to={{pathname:`/orders/${order.id}`, state: {order }}}>
                    <div className='view-receipt-button'>
                      <svg className='receipt-logo' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="styles__StyledInlineSvg-sc-12l8vvi-0 jFpckg"><path d="M9 10C8.44772 10 8 10.4477 8 11C8 11.5523 8.44772 12 9 12H15C15.5523 12 16 11.5523 16 11C16 10.4477 15.5523 10 15 10H9Z" fill="currentColor"></path><path d="M8 7C8 6.44772 8.44772 6 9 6H11C11.5523 6 12 6.44772 12 7C12 7.55228 11.5523 8 11 8H9C8.44772 8 8 7.55228 8 7Z" fill="currentColor"></path><path d="M9 14C8.44772 14 8 14.4477 8 15C8 15.5523 8.44772 16 9 16H12C12.5523 16 13 15.5523 13 15C13 14.4477 12.5523 14 12 14H9Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M20 21C20 21.3565 19.8102 21.686 19.5019 21.8649C19.1936 22.0438 18.8134 22.0451 18.5039 21.8682L15.5 20.1518L12.4961 21.8682C12.1887 22.0439 11.8113 22.0439 11.5039 21.8682L8.5 20.1518L5.49614 21.8682C5.18664 22.0451 4.80639 22.0438 4.49807 21.8649C4.18976 21.686 4 21.3565 4 21V5C4 3.34315 5.34315 2 7 2H17C18.6569 2 20 3.34315 20 5V21ZM6 19.2768L8.5 17.8482L12 19.8482L15.5 17.8482L18 19.2768V5C18 4.44772 17.5523 4 17 4H7C6.44772 4 6 4.44772 6 5V19.2768Z" fill="currentColor"></path></svg>
                          <h3>View Receipt</h3>
                    </div>
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
          {orders.filter(order=> order.orderCompleted === true).length ===0 && (
            <div> NO COMPLETED ORDERS </div>
          )}
        </div>
      </div>
    </>
  )
}

export default GetOrders
