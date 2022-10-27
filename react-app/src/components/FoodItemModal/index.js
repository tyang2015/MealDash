import { Modal } from '../../context/FoodItemOrder'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import CartRightPane from '../CartRightPane';
import "./FoodItemModal.css"
import "../../context/Modal.css"

const FoodItemModal = ({setForceCartUpdate, forceCartUpdate,setSubmittedCartItems, submittedCartItems,setSubmittedCart, setFoodItemModal, foodItem}) => {
  const {id} = useParams();
  const [totalPrice, setTotalPrice] = useState("")
  const [preferences, setPreferences] = useState("")
  const [quantity, setQuantity] = useState(1)

  const handleCartSubmission = (foodItem, quantity) => {
    setSubmittedCart(true)
    console.log('food item in cart submission:', foodItem)
    // if (!checkSameRestaurant(foodItem)){
    //   setSubmittedCartItems([])
    // }
    // if (submittedCartItems.length>0){
    //   let restaurantId = submittedCartItems[0].Restaurant.id
    //   if (foodItem.Restaurant.id != restaurantId){
    //     console.log('DIFFERENT RESTAURANT')
    //     setSubmittedCartItems([])
    //     localStorage.setItem('cart', JSON.stringify([]))
    //   }
    // }


    // i also need to check the cartItems and see if the food name already exists
    // if it does I need to update THAT particular item in submittedCartItems
    for (let i = 0; i< submittedCartItems.length; i++){
      let item = submittedCartItems[i]
      if (item.id === foodItem.id){
        // do not add foodItem to submittedCartItems if already in cart, just increment quantity
        item.quantity+=quantity
        // update the quantity in the total price display
        quantity = item.quantity
        // add food preference to foodItem
        item.preferences = preferences
        setForceCartUpdate(!forceCartUpdate)
        setSubmittedCartItems([...submittedCartItems])
        localStorage.setItem('cart', JSON.stringify([...submittedCartItems]))
        setFoodItemModal(false)
        return
      }
    }
    console.log('new item being added')
    foodItem.quantity = quantity
    foodItem.preferences = preferences
    setForceCartUpdate(!forceCartUpdate)
    setSubmittedCartItems([...submittedCartItems, foodItem])
    localStorage.setItem('cart', JSON.stringify([...submittedCartItems, foodItem]))
    localStorage.setItem('restaurant', JSON.stringify(foodItem.Restaurant))
    setFoodItemModal(false)
    return
  }

  const checkSameRestaurant = (foodItem) => {
    let restaurantId = foodItem.Restaurant.id
    if (restaurantId != id){
      console.log('Different restaurant!')
      return false
    }
    console.log('Same restaurant :)')
    return true
  }

  return (
    <Modal onClose={()=> setFoodItemModal(false)}>
      <div className='food-item-main-container'>
        <div className='food-item-main-content-container'>
          <div>x</div>
          <h1>{foodItem?.name}</h1>
          <h3>{foodItem?.description}</h3>
          <img className="food-item-modal-pic" src={foodItem?.foodPicUrl} />
          <div className='preferences-container'>
            <label htmlFor="food-item-preference-input">Preferences</label>
            <textarea
              id='food-item-preference-input'
              type='text'
              className='food-item-preference-input'
              value = {preferences}
              onChange={(e)=> setPreferences(e.target.value)}
            />
          </div>
        </div>
        <div className='food-item-footer'>
          <div className='food-item-quantity-container'>
            <div onClick={()=> quantity>1? setQuantity(prev=> prev - 1): 1} style={{display:"flex", alignItems:"center"}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="styles__StyledInlineSvg-sc-12l8vvi-0 jFpckg"><path d="M8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13H16C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11H8Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" fill="currentColor"></path></svg>            </div>
            <div> {quantity}</div>
            <div onClick={()=> quantity<50? setQuantity(prev=> prev + 1): 50} style={{display:"flex", alignItems:"center"}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="styles__StyledInlineSvg-sc-12l8vvi-0 jFpckg"><path d="M12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z" fill="currentColor"></path></svg>
            </div>
          </div>
          {/* <div className="modal-add-to-cart-button-container"> */}
            <div className='food-item-modal-add-to-cart-button' onClick={()=> handleCartSubmission(foodItem, quantity, preferences)}>
                Add to cart - {(foodItem?.price * quantity).toFixed(2)}
            </div>
          {/* </div> */}
        </div>
      </div>
    </Modal>

  )

}

export default FoodItemModal
