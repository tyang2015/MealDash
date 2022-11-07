import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink, useLocation } from 'react-router-dom';
import { Modal } from '../../context/DeleteReviewModal';
import { deleteReview, getReviews } from '../../store/review';
import "./DeleteReviewModal.css"

const DeleteReviewModalComponent = ({review, reviews, restaurant, setDeleteReviewModal}) => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()


  const handleDelete = () => {
    console.log('restauranttt in delete function:', restaurant)
    dispatch(deleteReview(restaurant.id, review.id))
    dispatch(getReviews(restaurant?.id))
    setDeleteReviewModal(false)
    history.push({pathname: `/restaurants/${restaurant.id}/reviews`})
    console.log('review length after deleting:', reviews.length)
  }

  return (
    // <div>
    <Modal onClose={()=> setDeleteReviewModal(false)}>
      <div className='delete-review-question-container'>Are you sure you want to delete this review?</div>
      <div className='delete-review-yes-no-container'>
        <button className= 'delete-review-button' onClick={handleDelete}>Yes</button>
        <button className= 'delete-review-button' onClick={()=> setDeleteReviewModal(false)}>No</button>
      </div>
    </Modal>
    // </div>
  )
}

export default DeleteReviewModalComponent
