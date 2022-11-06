import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import FinalConfirmationNavBar from '../FinalConfirmationNavBar';
import "./CartRightPane.css";
import emptyCart from "./images/empty-cart.png";
import { useToggleCart } from '../../context/ToggleCartContext';

let cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]')
let restaurantFromLocalStorage = JSON.parse(localStorage.getItem('restaurant') || '{}')
// let checkoutButton = document.querySelector("h3.checkout-text-container")
// let checkoutButton;
// we have cart items passed from PARENT and cart items from storage (this is not updating correctly...)

// const CartRightPane = ({ forceCartUpdate, restaurant, cartItems, setCartItems, setToggleCartPane, toggleCartPane}) => {
const CartRightPane = ({ forceCartUpdate, restaurant, cartItems, setCartItems}) => {
  console.log('cart items from right pane passed as props', cartItems)
  const {toggleCartPane, setToggleCartPane} = useToggleCart();
  const location = useLocation();
  const history = useHistory();
  const [orderSubtotal, setOrderSubtotal] = useState(0)
  // const [quantityChange, setQuantityChange] = useState(false)
  // const checkoutButtonRef = useRef(null)
  const [quantity, setQuantity] = useState(1)
  let [submittedCartItems, setSubmittedCartItems] = useState(JSON.parse(localStorage.getItem('cart'))||[])
  let [storedRestaurant, setStoredRestaurant] = useState(submittedCartItems?.length>0? submittedCartItems[0].Restaurant : restaurantFromLocalStorage!="{}"? restaurantFromLocalStorage: cartItems?.length> 0? cartItems[0].Restaurant: {})
  const [isOrderZero, setIsOrderZero] = useState(false)
  // console.log('SUBMITTED CART ITEMS AT BEGINNING OF CART RIGHT PANE:', submittedCartItems)

  // useEffect(()=> {
  //   setSubmittedCartItems([...submittedCartItems])
  //   if (cartItems){
  //     setCartItems([...cartItems])
  //   }
  //   return
  // }, [quantityChange])

  // useEffect(()=> {
  //   let copiedCartItems = cartItems? [...cartItems] : [...submittedCartItems]
  //   if (cartItems && cartItems.length>0){
  //     for (let i = 0; i< cartItems?.length; i++){
  //       let item = cartItems[i]
  //       if (item.id === oldFoodItem?.id){
  //         // remove it first before add the same one with new key values (quantity)
  //         copiedCartItems.splice(i,1)
  //         item.quantity+=newQuantity
  //         // update the quantity in the total price display
  //         // quantity = item.quantity
  //         // add food preference to foodItem
  //         // item.preferences = preferences
  //         // add it back
  //         copiedCartItems = [...copiedCartItems, item]
  //         console.log("copied cart items AFTER adding to same item:", copiedCartItems)
  //         setCartItems([...copiedCartItems])
  //         setSubmittedCartItems([...copiedCartItems])
  //         // setOldFoodItem(item)
  //         // setNewQuantity(quantity)
  //         // setForceCartUpdate(!forceCartUpdate)
  //         // localStorage.setItem('cart', JSON.stringify([...submittedCartItems]))
  //         localStorage.setItem('cart', JSON.stringify([...copiedCartItems]))
  //         return
  //       }
  //     }
  //   }

  // },[quantityChange])

  // // to update it if its the same item, with quantity change
  // // detect change by summing up quanties of all items
  // useEffect(()=>{
  //   console.log('change in quantities detected!!!')
  //   set
  // },[JSON.parse(localStorage.getItem("cart")).map(item=> item.quantity).reduce( (accum, val)=> accum + val)])


  // useEffect(()=> {
  //   const element = checkoutButtonRef.current
  //   if (checkoutButtonRef && element){
  //     element.addEventListener('click',(e)=> {
  //       let orderStarted = localStorage.getItem("orderStarted")
  //       if (orderStarted == 0){
  //         e.stopPropagation()
  //         e.preventDefault()
  //         // currently pending an order
  //         // console.log('order started is 0')
  //         alert('You have a pending order! Please be patient')
  //       } else {
  //         // console.log("order is completed! you can proceed to checkout")
  //         return
  //       }
  //     })
  //   }

  //   // return () => {
  //   //   element?.removeEventListener('click', handleCheckout)
  //   // }

  // }, [])

  useEffect(()=>{
    if (submittedCartItems?.length>0){
      setStoredRestaurant(submittedCartItems[0].Restaurant)
    }
  }, [submittedCartItems])

  // useEffect(()=> {
  //   setSubmittedCartItems(JSON.parse(localStorage.getItem("cart")))
  // }, [JSON.parse(localStorage.getItem("cart"))?.length])


  useEffect(()=> {
    // console.log('order subtotal use effect triggered')
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
  // console.log('cart from LOCAL STORAGE in right pane:', cartFromLocalStorage)
  // console.log('cart items at the end in right pane passed as props', cartItems)
  // console.log('cart items from local storage at end in right pane', submittedCartItems)

  if (isOrderZero) return (
    <div className="cart-pane-main-container">
      <div className='cart-pane-x-button-container'>
        <svg onClick={()=> setToggleCartPane(!toggleCartPane)} style={{backgroundColor: 'lightcoral', cursor: "pointer"}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="styles__StyledInlineSvg-sc-12l8vvi-0 jFpckg"><path d="M17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L13.4142 12L18.7071 6.70711C19.0976 6.31658 19.0976 5.68342 18.7071 5.29289C18.3166 4.90237 17.6834 4.90237 17.2929 5.29289L12 10.5858L6.70711 5.29289C6.31658 4.90237 5.68342 4.90237 5.29289 5.29289C4.90237 5.68342 4.90237 6.31658 5.29289 6.70711L10.5858 12L5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L12 13.4142L17.2929 18.7071Z" fill="currentColor"></path></svg>
      </div>
      <img src={emptyCart} className='empty-cart-pic' />
      <div className='cart-pane-empty-cart-description'>
        EMPTY CART
      </div>
    </div>
  )

  const handleCheckout = () => {
    let orderStarted = localStorage.getItem("orderStarted")
    // console.log('order started from storagee:', orderStarted)
    if (orderStarted == 0){
      alert('You have a pending order! Please be patient')
      return
    } else {
      history.push({pathname: `/restaurants/${restaurant? restaurant.id: storedRestaurant.id}/checkout`, data: {orderSubtotal: orderSubtotal, restaurant: restaurant? restaurant: storedRestaurant, submittedCartItems: cartItems? cartItems: submittedCartItems}, state: {prevPath: location.pathname}})
    }

  }

  // console.log('new quantity:', newQuantity)
  // console.log('old food Item:', oldFoodItem)
  return (
    <>
      <div className="cart-pane-main-container">
        <div className='cart-pane-x-button-container'>
          <svg onClick={()=> setToggleCartPane(!toggleCartPane)} style={{marginTop: "15px", marginLeft: "15px", cursor: "pointer"}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="styles__StyledInlineSvg-sc-12l8vvi-0 jFpckg"><path d="M17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L13.4142 12L18.7071 6.70711C19.0976 6.31658 19.0976 5.68342 18.7071 5.29289C18.3166 4.90237 17.6834 4.90237 17.2929 5.29289L12 10.5858L6.70711 5.29289C6.31658 4.90237 5.68342 4.90237 5.29289 5.29289C4.90237 5.68342 4.90237 6.31658 5.29289 6.70711L10.5858 12L5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L12 13.4142L17.2929 18.7071Z" fill="currentColor"></path></svg>
        </div>
        <div className='cart-pane-header-container' style={{marginTop: "15px"}}>
          <div>
            <p style={{fontSize: "15px", color: "rgb(118, 118, 118)", fontWeight: "700" }}>Your cart from </p>
            <h3> {restaurant? restaurant.name: storedRestaurant.name}</h3>
          </div>
          <div className='checkout-button-container'>
              <button onClick={handleCheckout} className="checkout-button" style={{color: "white"}} >
                <h3 id="checkout-text" className='checkout-text-container'> Checkout </h3>
                <h3> ${orderSubtotal.toFixed(2)} </h3>
              </button>
          </div>
        </div>
        <div className='cart-pane-food-items-container'>
          {cartItems? cartItems.map(item=> (
            <>
              <div key={item?.id} className='cart-pane-food-item-card-container'>
                <div className='cart-pane-quantity-container'>
                  <div className='cart-pane-quantity-circle'>
                    {item?.quantity} <p style={{fontSize:'10px'}}>x</p>
                  </div>
                </div>
                <div className='cart-pane-food-item-name-price-container'>
                  <div className='cart-pane-food-item-name-container'>
                    <h4 className='cart-pane-food-item-name-text-box'> {item?.name}</h4>
                  </div>
                  <div className="cart-pane-food-item-price-container">
                    <h4> ${(item?.price*item.quantity).toFixed(2)}</h4>
                  </div>
                </div>
                <div className='cart-pane-food-item-delete-container'>
                  <div onClick={()=> handleDeleteItem(item)}><i class="fa-solid fa-trash-can"></i></div>
                </div>
              </div>
            </>
          )): submittedCartItems?.map(item=>(
            <>
              <div key={item?.id} className='cart-pane-food-item-card-container'>
                <div className='cart-pane-quantity-container'>
                  <div className='cart-pane-quantity-circle'>
                    {item?.quantity} <p style={{fontSize:'10px'}}>x</p>
                  </div>
                </div>
                <div className='cart-pane-food-item-name-price-container'>
                  <div className='cart-pane-food-item-name-container'>
                    <h4 className='cart-pane-food-item-name-text-box'> {item?.name}</h4>
                  </div>
                  <div className="cart-pane-food-item-price-container">
                    <h4> ${(item?.price*item.quantity).toFixed(2)}</h4>
                  </div>
                </div>
                <div className='cart-pane-food-item-delete-container'>
                  <div onClick={()=> handleDeleteItem(item)}><i class="fa-solid fa-trash-can"></i></div>
                </div>
              </div>
            </>
          ))}
          {/* {submittedCartItems?.length>0 && submittedCartItems.map(item => (
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
