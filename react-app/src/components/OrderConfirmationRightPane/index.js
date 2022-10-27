import React, { useState, useEffect, useRef } from 'react';
import OrderConfirmationPage from '../OrderConfirmation';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { createNewOrder } from '../../store/order';
import "./OrderConfirmationRightPane.css"
const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart' || "[]"))
// const restaurantFromStorage = localStorage.getItem('restaurant')!= undefined? localStorage.getItem('restaurant'): "restaurant name"

const OrderConfirmationRightPane = ({orderSubtotal, deliveryMethod, deliveryOption, creditCard, distance, duration, restaurant, errors}) => {
  const sessionUser = useSelector(state=> state.session.user)
  const dispatch = useDispatch()
  const history = useHistory()
  const [cartItems, setCartItems] = useState(cartFromLocalStorage)
  // tip is delivery fee
  const [deliveryFee, setDeliveryFee] = useState(0)
  const [tip, setTip] = useState(Number(2).toFixed(2))
  const [orderFinalTotal, setOrderFinalTotal] = useState(0)
  const [fees, setFees] = useState(0)
  const [hasSubmitted, setHasSubmitted] = useState(false)
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

  // useEffect(()=> {
  //   localStorage.setItem('restaurant', JSON.stringify(restaurant))
  // }, [])

  const MinuteCountdown = (countdown, setCountdown) => {
    let countdownInSec = countdown* 60
    let deliveryInterval = setInterval(()=> {
      console.log('timer:', countdownInSec)
      if (countdownInSec <= 0) {
        clearInterval(deliveryInterval);
      }
      countdownInSec-=1
      setCountdown(Math.ceil(countdownInSec/60))
    }, 1000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true)
    if (errors.length > 0) {
      alert('cannot submit order confirmation form')
      return
    }
    let order = {
      customer_id: sessionUser.id,
      restaurant_id : restaurant?.id,
      phone_number: sessionUser.phoneNumber,
      credit_card: creditCard,
      total_price: orderFinalTotal,
      distance: parseFloat(distance),
      duration: parseInt(duration),
      delivery_fee: Number(deliveryFee),
      tip: Number(tip),
      delivery_method: deliveryMethod,
      delivery_option: deliveryOption,
      food_items: cartItems,
    }
    console.log('order object:', order)
    let createdOrder = await dispatch(createNewOrder(order))
    console.log('created order:', createdOrder)
    localStorage.setItem("orders", JSON.stringify({...JSON.parse(localStorage.getItem('orders')), [createdOrder.id]: createdOrder}))
    alert('We have confirmed your order!')
    setHasSubmitted(false)
    history.push({pathname: `restaurants/${restaurant.id}/orders/${createdOrder?.id}/new`, state: {duration, cartItems, restaurant, createdOrder}})
    return

  }

  return (
    <div className='order-confirmation-right-pane-main-container'>
      {errors.length>0 && hasSubmitted && (
        <div className="validation-errors-container">
            <ul className='validation-errors'>
                {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
                ))}
            </ul>
        </div>
      )}
      <div className='right-pane-top-one-fifth-container'>
        <div className='order-confirmation-title-container'>
          <div className='order-confirmation-restaurant-logo-container'>
            <img className='order-confirmation-restaurant-logo-pic' src={restaurant?.logo}/>
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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="styles__StyledInlineSvg-sc-12l8vvi-0 jFpckg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.27821 4.00617C4.19614 4.00057 4.08253 4.00003 3.86483 4.00003H3C2.44772 4.00003 2 3.55231 2 3.00003C2 2.44774 2.44772 2.00003 3 2.00003H3.86483L3.95147 1.99978C4.26423 1.99845 4.65669 1.99679 5.01419 2.13554C5.32256 2.25523 5.59642 2.44954 5.81126 2.70105C6.06033 2.99264 6.18841 3.36362 6.29048 3.65926L6.31886 3.74112L6.40948 4.00004L18.5938 4.00003C18.9671 4 19.3123 3.99997 19.594 4.02564C19.8871 4.05234 20.2553 4.11584 20.5919 4.3437C21.0358 4.64406 21.3405 5.10996 21.4378 5.63696C21.5116 6.03674 21.4222 6.39946 21.3292 6.67867C21.2398 6.94706 21.1014 7.26331 20.9517 7.60528L18.8356 12.4422L18.8037 12.5155C18.6883 12.7823 18.5433 13.1173 18.2958 13.3778C18.082 13.6027 17.8189 13.7748 17.5271 13.8805C17.1892 14.0029 16.8242 14.0014 16.5336 14.0002L16.4536 14H9.05422L8.37797 15.082C8.11779 15.4983 7.96033 15.7522 7.86437 15.9424C7.85835 15.9544 7.85288 15.9655 7.8479 15.9758C7.85931 15.9771 7.87165 15.9784 7.88496 15.9796C8.09715 15.999 8.39587 16 8.88677 16H18C18.5523 16 19 16.4478 19 17C19 17.5523 18.5523 18 18 18L8.844 18C8.40971 18.0001 8.01725 18.0001 7.70227 17.9712C7.38473 17.9421 6.97162 17.8729 6.61172 17.6056C6.14885 17.2619 5.85685 16.735 5.81065 16.1603C5.77473 15.7135 5.93504 15.3265 6.07864 15.0418C6.22108 14.7594 6.4291 14.4266 6.6593 14.0583L7.39752 12.8772L4.43115 4.40182C4.35923 4.19634 4.32119 4.08929 4.28879 4.01368L4.28577 4.00672L4.27821 4.00617ZM9.20948 12L7.10948 6.00004H18.5536C18.9809 6.00004 19.2329 6.00102 19.4126 6.01739L19.4403 6.02013L19.4317 6.0466C19.3747 6.21775 19.2745 6.44906 19.1033 6.84053L17.0033 11.6405C16.9223 11.8255 16.88 11.921 16.8453 11.9883L16.8422 11.9942L16.8355 11.9947C16.76 11.9996 16.6555 12 16.4536 12H9.20948Z" fill="#494949"></path><path d="M7.5 22C8.32843 22 9 21.3285 9 20.5C9 19.6716 8.32843 19 7.5 19C6.67157 19 6 19.6716 6 20.5C6 21.3285 6.67157 22 7.5 22Z" fill="#494949"></path><path d="M16.5 22C17.3284 22 18 21.3285 18 20.5C18 19.6716 17.3284 19 16.5 19C15.6716 19 15 19.6716 15 20.5C15 21.3285 15.6716 22 16.5 22Z" fill="#494949"></path></svg>
          <h3 style={{marginLeft:'10px'}}>Order Summary </h3>
        </div>
      </div>
      <div className='order-confirmation-price-breakdown-container'>
        <div className='price-breakdown-row-container'> <p>Subtotal</p>  <p>${(Number(orderSubtotal)).toFixed(2)}</p> </div>
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
