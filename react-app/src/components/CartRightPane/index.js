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
        // console.log('food item in iteration: ', foodItem)
        console.log('food item price:', Number(foodItem.price).toFixed(2))
        // console.log('food item quanitty:', foodItem.quantity)
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
          Your cart from {restaurant.name}
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
                  <div>
                    {item.quantity}
                  </div>
                  <div className='cart-pane-food-item-name-price-container'>
                    <h3> {item.name}</h3>
                    <h3> ${(item.price*item.quantity).toFixed(2)}</h3>
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