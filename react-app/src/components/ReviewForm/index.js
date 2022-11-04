import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { createReview, getReviews, updateReview } from '../../store/review';
import "./ReviewForm.css";
import Star from '../Star';


const ReviewForm = ({formType, triggerUpdate, setTriggerUpdate, restaurant, reviewData, setReviewModal}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const [review, setReview] = useState(reviewData?.review||'')
  const [stars, setStars] = useState(reviewData?.stars || null);
  const [errors, setErrors] = useState([])
  const [hover, setHover] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false)

  useEffect(()=>{
    let errors = []
    if (!stars) errors.push("Please input a valid rating by clicking on the corresponding star")
    if (review.length>500) errors.push("Review must be less than 500 characters")
    setErrors(errors)

  }, [review, stars])

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('submit')
    setHasSubmitted(true)
    if (errors.length>0){
      alert("Cannot submit form")
      return
    }
    let reviewObj = {
      ...reviewData,
      stars,
      review
    }

    // console.log('review obj before submission:', reviewObj)
    if (formType === "Create Review"){
      dispatch(createReview(restaurant?.id, reviewObj))
      dispatch(getReviews(restaurant?.id))
      alert('Successfully submitted your review!')
      setReviewModal(false)
      history.push({pathname:`/restaurants/${restaurant?.id}/reviews`, state: {restaurant, finalAvgRating: String(Number(restaurant?.avgRating).toFixed(2))}})

    } else {
      dispatch(updateReview(restaurant.id, reviewObj))
      dispatch(getReviews(restaurant?.id))
      setTriggerUpdate(!triggerUpdate)
      alert("Successfully updated your review!")
      setReviewModal(false)
      history.push({pathname:`/restaurants/${restaurant?.id}/reviews`, state: {restaurant, finalAvgRating: String(Number(restaurant?.avgRating).toFixed(2))}})
    }
    setHasSubmitted(false)
    return
  }

  return (
    <>
      <div className='review-form-x-button'>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="styles__StyledInlineSvg-sc-12l8vvi-0 jFpckg"><path d="M17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L13.4142 12L18.7071 6.70711C19.0976 6.31658 19.0976 5.68342 18.7071 5.29289C18.3166 4.90237 17.6834 4.90237 17.2929 5.29289L12 10.5858L6.70711 5.29289C6.31658 4.90237 5.68342 4.90237 5.29289 5.29289C4.90237 5.68342 4.90237 6.31658 5.29289 6.70711L10.5858 12L5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L12 13.4142L17.2929 18.7071Z" fill="currentColor"></path></svg>
      </div>
      {errors.length>0 && hasSubmitted && (
        <div>
            The following errors were found:
            <ul className='validation-errors'>
                {errors.map((error) => (
                <li key={error}>{error}</li>
                ))}
            </ul>
        </div>
      )}
      {/* <div className='review-form-container'> */}
        <form className='review-form' onSubmit={handleSubmit}>
          <div style={{textAlign:'left', width: "95%", fontSize:"32px", marginTop:"0px", fontWeight:"700", letterSpacing: "-0.02ch"}}>{formType==="Create Review"? "Add a Public Review": "Update Your Review"}</div>
          <div style={{width: "95%", fontSize: '16px', color: "rgb(73, 73, 73)", fontWeight: "550" , marginTop:"15px"}}>{restaurant?.name}</div>
          <div className='review-form-star-review-input-container'>
            <div style={{marginTop:"30px", marginLeft: "15px", fontSize: '16px', fontWeight: "500"}}>{sessionUser.firstName} {sessionUser.lastName[0]}</div>
            <div className='review-form-stars-container'>
              {[1,2,3,4,5].map( (ratingValue)=> (
                <Star
                  value={ratingValue}
                  onClick={()=>{
                    console.log('Rating value:', ratingValue)
                    setStars(ratingValue)
                  }}
                  filled={ratingValue <= hover || ratingValue<=stars}
                  key={ratingValue}
                  onMouseEnter={()=>setHover(ratingValue)}
                  onMouseLeave={()=>setHover(null)}
                  // style={{backgroundColor: 'white'}}
                />
              ))}
            </div>
            <div className="review-form-review-content-container">
              <textarea
                placeholder="You may want to mention specific items..."
                type="textarea"
                className= 'review-content'
                onChange={e=> setReview(e.target.value)}
                value={review}
              />
            </div>
          </div>
          <div className='review-form-submit-button-container'>
            <button type='submit' className='review-form-submit-button'>
              Submit
            </button>
          </div>
        </form>
      {/* </div> */}
    </>
  )
}

export default ReviewForm
