import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink, useLocation } from 'react-router-dom';
import { Modal } from '../../context/DeleteReviewModal';
import { deleteRestaurant } from '../../store/restaurant';
import "./DeleteRestaurantModal.css"

// uses same modal and styling as review modal
const DeleteRestaurantModalComponent = ({setRestaurantDeleteModal, restaurant}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleDelete = () => {
    dispatch(deleteRestaurant(restaurant.id))
    setRestaurantDeleteModal(false)
    history.push({pathname: `/restaurants`})
  }

  return (
    <Modal onClose = {()=> setRestaurantDeleteModal(false)}>
      <div className='delete-review-question-container' style={{marginTop:"30px"}}>Are you sure you want to delete this restaurant?</div>
      <div className='delete-review-yes-no-container' >
        <button className= 'delete-review-button' onClick={handleDelete}>Yes</button>
        <button className= 'delete-review-button' onClick={()=> setRestaurantDeleteModal(false)}>No</button>
      </div>
    </Modal>
  )

}

export default DeleteRestaurantModalComponent
