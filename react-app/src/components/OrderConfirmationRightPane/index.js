import React, { useState, useEffect, useRef } from 'react';
import OrderConfirmationPage from '../OrderConfirmation';
import { useDispatch, useSelector } from "react-redux";
import "./OrderConfirmationRightPane.css"
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
  console.log('cart items on order confirm right pane:', cartItems)
  console.log('restaurant on right pane:', restaurant)

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
      delivery_fee: deliveryFee,
      tip: tip,
      delivery_method: deliveryMethod,
      delivery_option: deliveryOption,
      food_items: cartItems
    }

  }

  return (
    <div className='order-confirmation-right-pane-main-container'>
      <div className='right-pane-top-one-fifth-container'>
        <div className='order-confirmation-title-container'>
          <div className='order-confirmation-restaurant-logo-container'>
            <img className='order-confirmation-restaurant-logo-pic' src={restaurant.logo}/>
          </div>
          <div className='order-confirmation-restaurant-title-text-container'>
            <div className='order-confirmation-title-text-container-top-row'>
              Your cart from
            </div>
            <div className='order-confirmation-title-text-container-bottom-row'>
              {restaurant?.name}
            </div>
          </div>
        </div>
        <div className='order-confirmation-place-order-container'>
          <button className="right-pane-place-order-button" onClick={handleSubmit} type="submit"> Place Order </button>
        </div>
        <div className='order-summary-container'>
          Order Summary
        </div>
      </div>
      <div className='order-confirmation-price-breakdown-container'>
        <div className='price-breakdown-row-container'> <p>Subtotal</p>  <p>${orderSubtotal}</p> </div>
        <div className='price-breakdown-row-container'> <p>Delivery Fee</p>  <p>${deliveryFee}</p></div>
        <div className='price-breakdown-row-container'> <p>Fees & Estimated Tax</p> <p>${fees}</p></div>
      </div>
      <div className='dasher-tip-container'>
        <div className='dasher-tip-container-top-row'>
          <p>Dasher Tip</p>
          <div> ${tip} </div>
        </div>
        <div className='dasher-tip-container-middle-row'>
          <input
            form="order-form"
            type='number'
            placeholder='$2.00'
            value={tip}
            onChange={(e)=> setTip(e.target.value)}
            className="dasher-tip-input"
          />
        </div>
        <div className='dasher-tip-container-bottom-row'>
          <small>
            The recommended Dasher tip is based on the delivery distance and effort. 100% of the tip goes to your Dasher. Learn more about how Dashers are paid.
          </small>
        </div>
      </div>
      <div className='order-final-total-container'>
        <div>Total</div>
        <div>${(orderFinalTotal).toFixed(2)}</div>
      </div>
      <div className='order-amount-due-container'>
        <div>Amount Due</div>
        <div>${(orderFinalTotal).toFixed(2)}</div>
      </div>
    </div>
  )
}

export default OrderConfirmationRightPane
