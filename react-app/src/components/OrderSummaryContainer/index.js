import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import "./OrderSummaryContainer.css"

const OrderSummaryContainer = ({cartItems}) => {
  console.log('cart items in containerrr:', cartItems)
 return (
  <div className='order-confirmation-order-summary-main-container'>
    <div style={{fontSize: "24px",fontWeight: "700", letterSpacing: "-0.01ch"}}>Items</div>
    {cartItems?.length>0 && cartItems.map((item, i)=> (
      <div className={`order-summary-food-item-card ${i=== cartItems.length-1? 'food-item-last-card': ""}`}>
        <img className='order-summary-food-item-pic' src={`${item.foodPicUrl}`}/>
        <div className='order-summary-food-item-card-middle-container'>
          <div className='order-summary-food-item-row food-item-name'>{item.name}</div>
          <div className='order-summary-food-item-row food-item-price'>${item.price}</div>
        </div>
        <div className='order-summary-food-item-quantity'> <b style={{marginRight:"3px"}}>{item.quantity}</b> x</div>
      </div>
    ))}
  </div>
 )
}

export default OrderSummaryContainer
