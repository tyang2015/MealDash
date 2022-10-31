const GET_RESTAURANT_REVIEWS = "reviews/getRestaurantReviews"
const CREATE_REVIEW = "reviews/createReview"
const UPDATE_REVIEW = "reviews/updateReview"
const DELETE_REVIEW = 'reviews/deleteReview'

const load = (payload) => {
  return {
    type: GET_RESTAURANT_REVIEWS,
    payload
  }
}

const create = (payload) => {
  return {
    type: CREATE_REVIEW,
    payload
  }
}

const update = (payload) => {
  return {
    type: UPDATE_REVIEW,
    payload
  }
}

const remove = (id) => {
  return {
    type: DELETE_REVIEW,
    id
  }
}

export const getReviews = (restaurantId) => async dispatch => {
  const response = await fetch(`/api/restaurants/${restaurantId}/reviews`)
  if (response.ok){
    let reviews = await response.json()
    dispatch(load(reviews))
    return reviews
  }
}



const initialState={}
const reviewReducer = (state = initialState, action) => {
  switch (action.type){
    case GET_RESTAURANT_REVIEWS:{
      let newState={}
      action.payload.reviews.forEach(review=> newState[review.id]= review)
      return newState
    }
    case CREATE_REVIEW: {
      let newState = {...state}
      newState[action.payload.id] = action.payload
      return newState
    }
    case UPDATE_REVIEW: {
      let newState = {...state}
      newState[action.payload.id] = action.payload
      return newState
    }
    case DELETE_REVIEW: {
      let newState = {...state}
      delete newState[action.id]
      return newState
    }
    default:
      return state
  }
}

export default reviewReducer
