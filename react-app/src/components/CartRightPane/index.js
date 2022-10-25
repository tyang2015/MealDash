import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from 'react-router-dom';
import FinalConfirmationNavBar from '../FinalConfirmationNavBar';
import "./CartRightPane.css"

// can we access the submitted Cart items from local instead??
// const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'))

const CartRightPane = ({ forceCartUpdate, restaurant, submittedCartItems, setSubmittedCartItems}) => {
  const location = useLocation();
  const [orderSubtotal, setOrderSubtotal] = useState(0)
  // let [submittedCartItems, setSubmittedCartItems] = useState(cartFromLocalStorage)
  console.log('cart directly from local storage in cart right pane:', submittedCartItems)

  const calculateOrderTotal = () => {
    let totalPrice = 0;
    for (let i =0; i<submittedCartItems.length;i++){
      let foodItem = submittedCartItems[i]
      totalPrice+=Number(foodItem.price) * foodItem.quantity
     }
    setOrderSubtotal(totalPrice)
  }

  useEffect(()=> {
    if (location?.state?.prevPath && location.state.cartItems){
      console.log('location state prevPath is TRUE')
      // submittedCartItems = location.state.cartItems
      setSubmittedCartItems(location.state.cartItems)
      restaurant = location?.state?.cartItems[0]?.Restaurant
    }
  }, [])

  useEffect(()=> {
    localStorage.setItem("cart", JSON.stringify(submittedCartItems))
  }, [submittedCartItems])

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
    // console.log('delete food item button clicked')
    let copiedCartItems = [...submittedCartItems]
    console.log('copied cart items:', copiedCartItems)
    while (i< submittedCartItems.length){
      let item = submittedCartItems[i]
      if (item.id === itemToDelete.id){
        copiedCartItems.splice(i,1)
        setSubmittedCartItems(copiedCartItems)
        return
      }
      i=i+1
    }
    // console.log('cart items after deletion from right pane:', submittedCartItems)
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
            <NavLink className="navlink" style={{color: "white"}} to={{pathname: `/checkout`, data: {orderSubtotal: orderSubtotal, cartItems: submittedCartItems, restaurant: restaurant, setCartItems: setSubmittedCartItems}, state: {prevPath: location.pathname}}}>
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
                  <div className='cart-pane-quantity-circle'>
                    {item.quantity} <p style={{fontSize:'10px'}}>x</p>
                  </div>
                </div>
                <div className='cart-pane-food-item-name-price-container'>
                  <div className='cart-pane-food-item-name-container'>
                    <h4 className='cart-pane-food-item-name-text-box'> {item.name}</h4>
                  </div>
                  <div className="cart-pane-food-item-price-container">
                    <h4> ${(item.price*item.quantity).toFixed(2)}</h4>
                  </div>
                </div>
                <div className='cart-pane-food-item-delete-container'>
                  <div onClick={()=> handleDeleteItem(item)}><i class="fa-solid fa-trash-can"></i></div>
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
