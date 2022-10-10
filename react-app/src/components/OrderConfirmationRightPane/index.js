import React, { useState, useEffect, useRef } from 'react';
import OrderConfirmationPage from '../OrderConfirmation';
import { useDispatch, useSelector } from "react-redux";

const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart' || "[]"))

const OrderConfirmationRightPane = ({restaurant, errors}) => {
  const [cartItems, setCartItems] = useState(cartFromLocalStorage)
  const [orderSubtotal, setOrderSubtotal] = useState(0)
  const [fees, setFees] = useState(0)
  const [tip, setTip] = useState(Number(2).toFixed(2))
  const [orderFinalTotal, setOrderFinalTotal] = useState(0)
  console.log('car items on order confirm right pane:', cartItems)

// calculate subtotal
  useEffect(()=>{
    let orderTotal = 0
    for (let i =0; i<cartItems.length; i++){
      let item = cartItems[i]
      orderTotal+= Number(item.price) * item.quantity
    }
    setOrderSubtotal(orderTotal)

  }, [cartItems])
  console.log('car items subtotal:', orderSubtotal)

  // calculate fees based on subtotal
  useEffect(()=> {
    let fees = (orderSubtotal * .1).toFixed(2)
    setFees(fees)
  }, [orderSubtotal])

  useEffect(()=> {
    if (fees === 0) return
    let total =0;
    total+= orderSubtotal + Number(fees) + Number(tip)
    // total
    // console.log('subtotal:', typeof orderSubtotal)
    // console.log("fees:", typeof fees)
    // console.log('tip:', typeof tip)
    // console.log('total:', typeof total)
    setOrderFinalTotal(total)
  }, [fees, tip])


  return (
    <div className='order-confirmation-right-pane-main-container'>
      <div className='order-confirmation-title-container'>
        <div className='order-confirmation-restaurant-pic-container'>
          {/* <img src=""/> */}
        </div>
        <div className='order-confirmation-title-text-container-top-row'>
          Your cart from
        </div>
        <div className='order-confirmation-title-text-container-bottom-row'>
          {restaurant?.name}
        </div>
      </div>
      <div className='order-confirmation-place-order-container'>
        <button type="submit"> Place Order </button>
      </div>
      <div className='order-summary-container'>
        Order Summary
      </div>
      <div className='order-confirmation-price-breakdown-container'>
        <div> Subtotal ${orderSubtotal}</div>
        <div> Delivery Fee ${}</div>
        <div> Fees & Estimated Tax ${fees}</div>
      </div>
      <div className='dasher-tip-container'>
        <div className='dasher-tip-input-label-container'>
          <label className='dasher-tip-label-container'>
            <p>Dasher Tip</p>
            <div> ${tip} </div>
          </label>
          <input
            form="order-form"
            type='number'
            placeholder='$2.00'
            value={tip}
            onChange={(e)=> setTip(e.target.value)}
          />
        </div>
      </div>
      <div className='order-final-total-container'>
        <div>Total</div>
        <div>${(orderFinalTotal).toFixed(2)}</div>
      </div>
      <div className='order-amoount-due-container'>

      </div>
    </div>
  )
}

export default OrderConfirmationRightPane
