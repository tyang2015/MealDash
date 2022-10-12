import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import "./CartRightPane.css"

const CartRightPane = ({setSubmittedCartItems, forceCartUpdate, restaurant, submittedCartItems}) => {

  console.log('submitted cart items in cart right pane:', submittedCartItems)
  const [orderSubtotal, setOrderSubtotal] = useState(0)

  const calculateOrderTotal = () => {
    let totalPrice = 0;
    for (let i =0; i<submittedCartItems.length;i++){
      let foodItem = submittedCartItems[i]
      totalPrice+=Number(foodItem.price) * foodItem.quantity
     }
    setOrderSubtotal(totalPrice)
  }

  useEffect(()=>{
    if (submittedCartItems?.length>0){
      calculateOrderTotal()
    }
  }, [forceCartUpdate, submittedCartItems])


  if (submittedCartItems?.length<=0) return (
    <h3> Empty Cart </h3>
  )

  const handleDeleteItem = (itemToDelete) => {
    let i =0;
    let copiedCartItems = [...submittedCartItems]
    while (i< submittedCartItems.length){
      let item = submittedCartItems[i]
      if (item.id === itemToDelete.id){
        copiedCartItems.splice(i,1)
        setSubmittedCartItems(copiedCartItems)
        return
      }
      i=i+1
    }
  }

  return (
    <>
      <div className="cart-pane-main-container">
        <div>
          <p>Your cart from </p>
          <h3> {restaurant?.name}</h3>
        </div>
        <div className='checkout-button-container'>
          <div className='checkout-button'>
            <NavLink className="navlink" style={{color: "white"}} to={{pathname: `/checkout`, data: {orderSubtotal: orderSubtotal, cartItems: submittedCartItems}}}>
              <h3> Checkout </h3>
            </NavLink>
            <h3> {orderSubtotal.toFixed(2)} </h3>
          </div>
        </div>
        <div className='cart-pane-food-items-container'>
            {submittedCartItems?.length>0 && submittedCartItems.map(item=>(
              <>
                <div key={item.id} className='cart-pane-food-item-card-container'>
                  <div className='cart-pane-quantity-container'>
                    {item.quantity}
                  </div>
                  <div className='cart-pane-food-item-name-price-container'>
                    <h4> {item.name}</h4>
                    <h4> ${(item.price*item.quantity).toFixed(2)}</h4>
                  </div>
                  <div className='cart-pane-food-item-delete-container'>
                    <div onClick={()=> handleDeleteItem(item)}>Delete</div>
                  </div>
                </div>
              </>
            ))}
        </div>
        <h3>{submittedCartItems?.name}</h3>

      </div>
    </>
  )
}

export default CartRightPane
