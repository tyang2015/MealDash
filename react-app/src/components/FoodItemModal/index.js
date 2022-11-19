import { Modal } from '../../context/FoodItemOrder'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import CartRightPane from '../CartRightPane';
import "./FoodItemModal.css"
import "../../context/Modal.css"

const FoodItemModal = ({ restaurant, setForceCartUpdate, forceCartUpdate,setSubmittedCartItems, submittedCartItems,setSubmittedCart, setFoodItemModal, foodItem}) => {
  const {id} = useParams();
  const [totalPrice, setTotalPrice] = useState("")
  const sessionUser = useSelector(state=> state.session.user)
  const [preferences, setPreferences] = useState("")
  const [displayQuantity, setDisplayQuantity] = useState(1)

  // useEffect(()=> {
  //   localStorage.setItem('cart', JSON.stringify(submittedCartItems))
  // }, [submittedCartItems])

  const handleCartSubmission = (foodItem, quantity, preferences) => {
    if (sessionUser.id == restaurant.ownerId) {
      alert("Wrong authorization - you can't order from a restaurant you own!")
      return
    }
    setSubmittedCart(true)

    if (submittedCartItems.length>0){
      let restaurantId = submittedCartItems[0].Restaurant.id
      if (foodItem.Restaurant.id != restaurantId){
        alert('different restaurant, resetting cart...')
        setSubmittedCartItems([])
        localStorage.setItem('cart', JSON.stringify([]))
        return
      }
    }

    let copiedCartItems = [...submittedCartItems]
    for (let i = 0; i< submittedCartItems.length; i++){
      let item = submittedCartItems[i]
      if (item.id === foodItem.id){
        // remove it first before add the same one with new key values (quantity)
        copiedCartItems.splice(i,1)
        item.quantity+=quantity
        item.preferences = preferences
        copiedCartItems = [...copiedCartItems, item]
        localStorage.setItem('cart', JSON.stringify([...copiedCartItems]))
        setSubmittedCartItems([...copiedCartItems])
        setForceCartUpdate(!forceCartUpdate)
        // localStorage.setItem('cart', JSON.stringify([...submittedCartItems]))
        setFoodItemModal(false)
        return
      }
    }
    // console.log('new item being added')
    foodItem.quantity = quantity
    foodItem.preferences = preferences
    setForceCartUpdate(!forceCartUpdate)
    setSubmittedCartItems([...submittedCartItems, foodItem])
    localStorage.setItem('cart', JSON.stringify([...submittedCartItems, foodItem]))
    localStorage.setItem(`restaurant`, JSON.stringify(foodItem.Restaurant))
    setFoodItemModal(false)
    // console.log('submitted cart items on food item modal after new item added:', submittedCartItems)
    return
  }


  return (
    <Modal onClose={()=> setFoodItemModal(false)}>
      <div className='food-item-main-container'>
        <div onClick={()=> setFoodItemModal(false)} style={{height: '40px', borderRadius: "22px", boxSizing: 'border-box', display: 'flex', alignItems: "center", paddingLeft:"10px", paddingTop: "10px", cursor: "pointer", width: "fit-content"}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="styles__StyledInlineSvg-sc-12l8vvi-0 jFpckg"><path d="M17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L13.4142 12L18.7071 6.70711C19.0976 6.31658 19.0976 5.68342 18.7071 5.29289C18.3166 4.90237 17.6834 4.90237 17.2929 5.29289L12 10.5858L6.70711 5.29289C6.31658 4.90237 5.68342 4.90237 5.29289 5.29289C4.90237 5.68342 4.90237 6.31658 5.29289 6.70711L10.5858 12L5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L12 13.4142L17.2929 18.7071Z" fill="currentColor"></path></svg>
        </div>
        <div className='food-item-main-content-container'>
          <h1 className='food-item-name-text' style={{textOverflow: "ellipsis"}}>{foodItem?.name}</h1>
          <div className='food-item-description-text'>{foodItem?.description}</div>
          <img className="food-item-modal-pic" src={foodItem?.foodPicUrl} />
          <div className='preferences-container'>
            <label htmlFor="food-item-preference-input" style={{marginTop: "16px", marginBottom: "8px"}}>Preferences</label>
            <textarea
              id='food-item-preference-input'
              type='text'
              className='food-item-preference-input'
              value = {preferences}
              onChange={(e)=> setPreferences(e.target.value)}
              placeholder="Add any special requests (e.g., food allergies, extra spicy, etc.) and the store will do its best to accomodate you."
            />
          </div>
        </div>
        <div className='food-item-footer'>
          <div className='food-item-quantity-container'>
            <div onClick={()=> displayQuantity>1? setDisplayQuantity(prev=> prev - 1): 1} style={{display:"flex", alignItems:"center"}}>
              <svg style={{cursor: displayQuantity == 1? "not-allowed":"pointer"}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="styles__StyledInlineSvg-sc-12l8vvi-0 jFpckg"><path d="M8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13H16C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11H8Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" fill="currentColor"></path></svg>
            </div>
            <div> {displayQuantity}</div>
            <div onClick={()=> displayQuantity<50? setDisplayQuantity(prev=> prev + 1): 50} style={{display:"flex", alignItems:"center"}}>
              <svg style={{cursor:  displayQuantity == 50? "not-allowed":"pointer"}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="styles__StyledInlineSvg-sc-12l8vvi-0 jFpckg"><path d="M12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z" fill="currentColor"></path></svg>
            </div>
          </div>
          <div className='food-item-modal-add-to-cart-button' onClick={()=> handleCartSubmission(foodItem, displayQuantity, preferences)}>
              Add to cart - ${(foodItem?.price * displayQuantity).toFixed(2)}
          </div>
        </div>
      </div>
    </Modal>

  )

}

export default FoodItemModal
