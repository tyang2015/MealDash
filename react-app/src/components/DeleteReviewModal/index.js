import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink, useLocation } from 'react-router-dom';
import { DeleteReviewModal } from '../../context/DeleteReviewModal';
import { deleteReview } from '../../store/review';
import "./DeleteReviewModal.css"

const DeleteReviewModalComponent = ({review, restaurant, setDeleteReviewModal}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  // useEffect(()=>{
  //   dispatch(deleteReview())
  // }, [dispatch])
  const handleDelete = () => {
    dispatch(deleteReview(restaurant.id, review.id))
    setDeleteReviewModal(false)
    history.push({pathname: `/restaurants/${restaurant.id}/reviews`})
  }

  return (
    // <div>
    <DeleteReviewModal onClose={()=> setDeleteReviewModal(false)}>
      <div className='delete-review-question-container'>Are you sure you want to delete this review?</div>
      <div className='delete-review-yes-no-container'>
        <button className= 'delete-review-button' onClick={handleDelete}>Yes</button>
        <button className= 'delete-review-button' onClick={()=> setDeleteReviewModal(false)}>No</button>
      </div>
    </DeleteReviewModal>
    // </div>
  )
}

export default DeleteReviewModalComponent
