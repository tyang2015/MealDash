import React, { useState, useEffect, useRef } from 'react';
import OrderConfirmationPage from '../OrderConfirmation';
import { useDispatch, useSelector } from "react-redux";

const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart' || "[]"))

const OrderConfirmationRightPane = ({orderSubtotal, deliveryMethod, deliveryOption, creditCard, distance, duration, restaurant, errors}) => {
  const sessionUser = useSelector(state=> state.session.user)

  const [cartItems, setCartItems] = useState(cartFromLocalStorage)
  // const [orderSubtotal, setOrderSubtotal] = useState(0)
  // tip is delivery fee
  const [deliveryFee, setDeliveryFee] = useState(0)
  const [tip, setTip] = useState(Number(2).toFixed(2))
  const [orderFinalTotal, setOrderFinalTotal] = useState(0)
  const [fees, setFees] = useState(0)
  console.log('car items on order confirm right pane:', cartItems)


  // calculate delivery fee (10% of subtotal)
  useEffect(()=> {
    if (orderSubtotal ===0) return
    let fee = (orderSubtotal * .1).toFixed(2)
    setDeliveryFee(fee)
  }, [orderSubtotal])

  // calculate fees based on subtotal
  useEffect(()=> {
    if (orderSubtotal ===0) return
    let fee = (orderSubtotal * .15).toFixed(2)
    setFees(fee)
  }, [orderSubtotal])

  useEffect(()=> {
    if (fees === 0 || deliveryFee ===0) return
    let total =0;
    total+= orderSubtotal + Number(fees) + Number(tip) + Number(deliveryFee)
    // total
    setOrderFinalTotal(total)
  }, [fees, tip])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.length > 0) {
      alert('cannot submit order confirmation form')
      return
    }
    let order = {
      customer_id: sessionUser.id,
      restaurant_id : restaurant.id,
      phone_number: sessionUser.phoneNumber,
      credit_card: creditCard,
      total_price: orderFinalTotal,
      distance: distance,
      duration: duration,
      delivery_fee: tip,
      delivery_method: deliveryMethod,
      delivery_option: deliveryOption,
      food_items: cartItems
    }

  }

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
        <button onClick={handleSubmit} type="submit"> Place Order </button>
      </div>
      <div className='order-summary-container'>
        Order Summary
      </div>
      <div className='order-confirmation-price-breakdown-container'>
        <div> Subtotal ${orderSubtotal}</div>
        <div> Delivery Fee ${deliveryFee}</div>
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
