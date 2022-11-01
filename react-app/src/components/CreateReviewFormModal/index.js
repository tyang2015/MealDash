import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { ReviewModal } from '../../context/Review';
import ReviewForm from '../ReviewForm';
import { getReviews } from '../../store/review';
// import Review

const CreateReviewFormModal = ({setReviewModal, restaurant}) => {
  const dispatch = useDispatch()
  const reviews = useSelector(state=> Object.values(state.reviews))
  const sessionUser = useSelector(state => state.session.user);
  const {id} = useParams();

  const userIds = restaurant.reviews.map(review=> review.user.id)
  // if (userIds.includes(sessionUser.id)) {
  //   alert("Looks like you have already submitted a review. Only new customers can submit a review.")
  //   setReviewModal(false)
  //   // return
  // }
  // console.log('user ids:', userIds)
  useEffect(()=>{
    if (userIds.includes(sessionUser.id)) {
      alert("Looks like you have already submitted a review. Only new customers can submit a review.")
      setReviewModal(false)
      // return
    }
  }, [])

  useEffect(()=>{
    dispatch(getReviews(id))
  }, [dispatch])

  return (
    <ReviewModal onClose={()=> setReviewModal(false)}>
      <ReviewForm formType="Create Review" restaurant={restaurant} setReviewModal={setReviewModal} />
    </ReviewModal>
  )

}

export default CreateReviewFormModal
