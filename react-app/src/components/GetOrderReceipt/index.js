import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation , useParams} from 'react-router-dom';
import FinalConfirmationNavBar from '../FinalConfirmationNavBar';
import MapDistanceContainer from '../MapDistance';
import "./GetOrderReceipt.css"

const GetOrderReceipt = () => {
  const location = useLocation()
  let order = location?.state?.order
  // tip
  // devliery Fee
  console.log('order:', order)

  const getLongDate = (orderObj) => {
    let createdTimeObj = new Date (orderObj.createdAt)
    createdTimeObj.setMinutes(createdTimeObj.getMinutes()+ orderObj.duration)
    let convertedLocalTime = createdTimeObj.toLocaleString('en-US', {
      month: "long",
      day: 'numeric',
      year: "numeric",
      hour: 'numeric',
      minute: 'numeric'
    })
    return convertedLocalTime
  }

  const getTotalPricePerItem = (foodItemObj) => {
    return (Number(foodItemObj.price) * foodItemObj.quantity).toFixed(2)
  }


  return (
    <>
      <FinalConfirmationNavBar/>
      <div className='get-order-receipt-page'>
        <div className='get-order-receipt-left-pane'>
          <div className='get-order-receipt-top-container'>
            <h2>{order.restaurant.name}</h2>
            <p>{order.restaurant.address}</p>
            <p> {getLongDate(order)}</p>
          </div>
          <div className='get-order-receipt-bottom-container'>
            <div className='get-order-receipt-name-address-container'>
              <div className='get-order-receipt-name-container'>
                <h3 style={{fontWeight: "550"}}> {order.user.firstName} {order.user.lastName}</h3>
              </div>
              <div className='get-order-receipt-user-address-container'>
                <p> {order.userAddress} </p>
              </div>
            </div>
            <h3 style={{fontWeight: "550"}}>Order Details</h3>
            <div className='get-order-receipt-details-item-details-container'>
              {order.foodItems.map(item=> (
                <div className='get-order-receipt-food-item-card'>
                  {/* <div className='get-order-receipt-food-item-container'> */}
                    <div className='get-order-receipt-food-item-left-container-name-quantity'>
                      <div className='get-order-food-item-name-container'>
                        <div className='get-order-food-item-name'>
                          <div style={{marginRight: "5px", fontWeight:"700"}}>{item.quantity}x</div> {item.name}
                        </div>
                      </div>
                      <div className='get-order-total-price-per-item-container'>
                        <div> ${getTotalPricePerItem(item)}</div>
                      </div>
                    </div>
                    <div className = 'get-order-receipt-food-item-left-container-preference'>
                      <div className='get-order-receipt-item-preference'>{item.preferences}</div>
                    </div>
                  {/* </div> */}
                </div>
              ))}
            </div>
            <div className='get-order-receipt-price-breakdown-container'>
              <div className='get-order-subtotal-container get-order-price-line'>
                <div>Subtotal</div>
                <div> ${(Number(order.subtotal)).toFixed(2)}</div>
              </div>
              <div className='get-order-delivery-fee-container get-order-price-line middle'>
                <div> Delivery Fee</div>
                <div> ${ (Number(order.deliveryFee)).toFixed(2)}</div>
              </div>
              <div className='get-order-fees-container get-order-price-line middle'>
                <div>Service and Tax Fees </div>
                <div>${order.fees} </div>
              </div>
              <div className='get-order-tip-container get-order-price-line middle'>
                <div>Dasher Tip</div>
                <div> ${(Number(order.tip)).toFixed(2)}</div>
              </div>
              <div className='get-order-total-container get-order-price-line'>
                <div>Total</div>
                <div> ${(Number(order.totalPrice)).toFixed(2)}</div>
              </div>
            </div>

          </div>

        </div>
        <div className='get-order-receipt-right-pane'>
          <MapDistanceContainer restaurant={order.restaurant}/>
        </div>

      </div>
    </>
  )
}

export default GetOrderReceipt
