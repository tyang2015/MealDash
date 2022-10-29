import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from 'react-router-dom';
import FinalConfirmationNavBar from '../FinalConfirmationNavBar';
import "./CartRightPane.css"

// can we access the submitted Cart items from local instead??
let cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]')
// let restaurantFromLocalStorage = JSON.parse(localStorage.getItem('restaurants') || '{}')
let restaurantFromLocalStorage = JSON.parse(localStorage.getItem('restaurant') || '{}')
// we have cart items passed from PARENT and cart items from storage (this is not updating correctly...)
const CartRightPane = ({ forceCartUpdate, restaurant, cartItems, setCartItems, setToggleCartPane, toggleCartPane}) => {

  console.log('restaurant from local storage:', restaurantFromLocalStorage)
  const location = useLocation();
  const [orderSubtotal, setOrderSubtotal] = useState(0)
  let [submittedCartItems, setSubmittedCartItems] = useState(cartFromLocalStorage || [])
  // let [restaurantId, setRestaurantId] = useState(cartItems?.length>0? cartItems[0].Restaurant.id: submittedCartItems?.length>0?
  //   submittedCartItems[0].Restaurant.id:restaurantFromLocalStorage? restaurantFromLocalStorage.id: "")
  // let [storedRestaurant, setStoredRestaurant] = useState(restaurantId? restaurantFromLocalStorage[`${restaurantId}`] : {})
  let [storedRestaurant, setStoredRestaurant] = useState(submittedCartItems?.length>0? submittedCartItems[0].Restaurant : restaurantFromLocalStorage!="{}"? restaurantFromLocalStorage: cartItems?.length> 0? cartItems[0].Restaurant: {})
  const [isOrderZero, setIsOrderZero] = useState(false)
  // console.log('restaurant id use state:', restaurantId)
  console.log('cart in rightt pane from local storage', submittedCartItems)
  console.log('cart in right pane passed down as propsss', cartItems)
  console.log('stored restaurant value:', storedRestaurant)

  useEffect(()=>{
    if (submittedCartItems?.length>0){
      setStoredRestaurant(submittedCartItems[0].Restaurant)
    }
  }, [submittedCartItems])


  useEffect(()=> {
    console.log('order subtotal use effect triggered')
    if (orderSubtotal == 0){
      setIsOrderZero(true)
    } else {
      setIsOrderZero(false)
    }
  }, [orderSubtotal])

  const calculateOrderTotal = () => {
    let totalPrice = 0;
    if (cartItems){
      for (let i =0; i<cartItems.length;i++){
        let foodItem = cartItems[i]
        totalPrice+=Number(foodItem.price) * foodItem.quantity
       }
      setOrderSubtotal(totalPrice)
      return
    }
    for (let i =0; i<submittedCartItems.length;i++){
      let foodItem = submittedCartItems[i]
      totalPrice+=Number(foodItem.price) * foodItem.quantity
     }
    setOrderSubtotal(totalPrice)
  }

  useEffect(()=> {
    let initialCartItems = localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')): []
    setSubmittedCartItems(initialCartItems)
    if (location?.state?.prevPath && location.state.cartItems){
      // console.log('location state prevPath is TRUE')
      // submittedCartItems = location.state.cartItems
      setSubmittedCartItems(location.state.cartItems)
      restaurant = location?.state?.cartItems[0]?.Restaurant
    }
  }, [])

  // THIS IS BREAKING YOUR DELETE FUNCTION (if u include cartFromLocalStorage as a dependency)
  useEffect(()=> {
    if (cartItems?.length>0){
      localStorage.setItem("cart", JSON.stringify(cartItems))
    }
    // console.log('after setting it in local storage use effect...', submittedCartItems)
    // setSubmittedCartItems(cartFromLocalStorage)
  }, [ forceCartUpdate, cartItems])

  useEffect(()=>{
    if (cartItems?.length>=0){
      calculateOrderTotal()
      return
    }
    if (submittedCartItems?.length>=0){
      calculateOrderTotal()
      return
    }
  }, [forceCartUpdate, submittedCartItems, cartItems])


  // if ((cartItems?.length<=0 && submittedCartItems?.length<=0) || (!submittedCartItems)) return (
  //   <h3> Empty Cart </h3>
  // )

  const handleDeleteItem = (itemToDelete) => {
    let i =0;
    // console.log('delete food item button clicked')
    if (cartItems?.length>0){
      let copiedCartItems = [...cartItems]
      // console.log('copied cart items from passed down cart items:', copiedCartItems)
      while (i< cartItems.length){
        let item = cartItems[i]
        if (item.id === itemToDelete.id){
          copiedCartItems.splice(i,1)
          // console.log('after deletion:', copiedCartItems)
          setSubmittedCartItems(copiedCartItems)
          setCartItems(copiedCartItems)
          localStorage.setItem('cart', JSON.stringify(copiedCartItems))
          return
        }
        i=i+1
      }
      return
    }
    // if there are no cartItems, there will be no setCartItems from parent too
    let copiedCartItems = [...submittedCartItems]
    while (i< submittedCartItems.length){
      let item = submittedCartItems[i]
      if (item.id === itemToDelete.id){
        copiedCartItems.splice(i,1)
        // console.log('after deletion:', copiedCartItems)
        setSubmittedCartItems(copiedCartItems)
        localStorage.setItem('cart', JSON.stringify(copiedCartItems))
        return
      }
      i=i+1
    }
  }
  console.log('cart items at the end in right pane passed as props', cartItems)
  console.log('cart items from local storage at end in right pane', submittedCartItems )

  if (isOrderZero) return (
    <div className="cart-pane-main-container"> EMPTY CART </div>
  )

  return (
    <>
      <div className="cart-pane-main-container">
        <div className='cart-pane-x-button-container'>
          <svg onClick={()=> setToggleCartPane(!toggleCartPane)} style={{backgroundColor: 'lightcoral', cursor: "pointer"}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="styles__StyledInlineSvg-sc-12l8vvi-0 jFpckg"><path d="M17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L13.4142 12L18.7071 6.70711C19.0976 6.31658 19.0976 5.68342 18.7071 5.29289C18.3166 4.90237 17.6834 4.90237 17.2929 5.29289L12 10.5858L6.70711 5.29289C6.31658 4.90237 5.68342 4.90237 5.29289 5.29289C4.90237 5.68342 4.90237 6.31658 5.29289 6.70711L10.5858 12L5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L12 13.4142L17.2929 18.7071Z" fill="currentColor"></path></svg>
        </div>
        <div>
          <p>Your cart from </p>
          <h3> {restaurant? restaurant.name: storedRestaurant.name}</h3>
        </div>
        <div className='checkout-button-container'>
          <div className='checkout-button'>
            {/* <NavLink className="navlink" style={{color: "white"}} to={{pathname: `/restaurants/${restaurant? restaurant.id: restaurantId? restaurantId: storedRestaurant.id}/checkout`, data: {orderSubtotal: orderSubtotal, restaurant: restaurant? restaurant: storedRestaurant, setCartItems: setSubmittedCartItems}, state: {prevPath: location.pathname}}}> */}
            <NavLink className="navlink" style={{color: "white"}} to={{pathname: `/restaurants/${restaurant? restaurant.id: storedRestaurant.id}/checkout`, data: {orderSubtotal: orderSubtotal, restaurant: restaurant? restaurant: storedRestaurant, submittedCartItems: cartItems? cartItems: submittedCartItems}, state: {prevPath: location.pathname}}}>
              <h3> Checkout </h3>
            </NavLink>
            <h3> {orderSubtotal.toFixed(2)} </h3>
          </div>
        </div>
        <div className='cart-pane-food-items-container'>
          {/* {cartItems.length>0 && cartItems.map(item=> (
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
          ))} */}
          {/* {(submittedCartItems && submittedCartItems.length=== 0) && (cartItems && cartItems.length === 0) && (
            <div className='cart-pane-food-item-card-container'>
              EMPTY CART :(
            </div>
          )} */}
          {cartItems?.length>0? cartItems.map(item=> (
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
          )): submittedCartItems.map(item=>(
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
          {/* {submittedCartItems?.length>0 && submittedCartItems.map(item=>(
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
          ))} */}
        </div>

      </div>
    </>
  )
}

export default CartRightPane
