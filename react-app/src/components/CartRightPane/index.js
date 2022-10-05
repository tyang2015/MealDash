import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import "./CartRightPane.css"

const CartRightPane = ({submittedCart, forceCartUpdate, restaurant, submittedCartItems}) => {
  // console.log('inside cart pane ')
  // console.log('restaurant in cart pane:', restaurant)
  console.log('submitted cart items:', submittedCartItems)
  const [orderTotal, setOrderTotal] = useState(0)

  useEffect(()=>{
    if (submittedCart){
      let totalPrice = 0;
      for (let i =0; i<submittedCartItems.length;i++){
        let foodItem = submittedCartItems[i]
        console.log('food item price:', Number(foodItem.price).toFixed(2))
        totalPrice+=Number(foodItem.price) * foodItem.quantity
        console.log("total price after checking out this item:", totalPrice)
      }
      setOrderTotal(totalPrice)
    }
  }, [forceCartUpdate])


  if (!submittedCart) return (
    <h3> Empty Cart </h3>
  )


  return (
    <>
      <div className="cart-pane-main-container">
        <div>
          <p>Your cart from </p>
          <h3> {restaurant.name}</h3>
        </div>
        <div className='checkout-button-container'>
          <div className='checkout-button'>
            <h3> Checkout </h3>
            <h3> {orderTotal} </h3>
          </div>
        </div>
        <div className='cart-pane-food-items-container'>
            {submittedCartItems.length>0 && submittedCartItems.map(item=>(
              <>
                <div className='cart-pane-food-item-card-container'>
                  <div className='cart-pane-quantity-container'>
                    {item.quantity}
                  </div>
                  <div className='cart-pane-food-item-name-price-container'>
                    <h4> {item.name}</h4>
                    <h4> ${(item.price*item.quantity).toFixed(2)}</h4>
                  </div>
                  <div className='cart-pane-food-item-delete-container'>
                    <div>Delete</div>
                  </div>
                </div>
              </>
            ))}
        </div>
        <h3>{submittedCartItems.name}</h3>
        {/* <h3>{restaurant?restaurant.name: null}</h3>
        <h2>{foodItem? foodItem.name: null}</h2> */}
      </div>
    </>
  )
}

export default CartRightPane
