import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { ReviewModal } from '../../context/Review';
import ReviewForm from '../ReviewForm';
import { getReviews } from '../../store/review';

const EditReviewModal = ({triggerUpdate,setTriggerUpdate, setReviewModal, review, restaurant}) => {
  const dispatch = useDispatch()
  const {id} = useParams()
  // const reviews = useSelector(state=> Object.values(state.reviews))
  let oldReview = {
    id: review.id,
    stars: review.stars,
    review: review.review,
  }

  useEffect(()=> {
    getReviews(id)
  }, [dispatch])

  return (
    <ReviewModal onClose={()=> setReviewModal(false)}>
      <ReviewForm formType="Edit Review" triggerUpdate={triggerUpdate} setTriggerUpdate={setTriggerUpdate} reviewData={oldReview} restaurant={restaurant} setReviewModal={setReviewModal}/>
    </ReviewModal>
  )
}

export default EditReviewModal
