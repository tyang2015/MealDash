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

export const createReview = (restaurantId, payload) => async dispatch =>{
  const response = await fetch(`/api/restaurants/${restaurantId}/reviews`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(payload)
  })
  if (response.ok){
    let review = await response.json()
    console.log('review from thunk:', review)
    dispatch(create(review))
    return review
  }
}

export const updateReview = (restaurantId, payload)=> async dispatch =>{
  const response = await fetch(`/api/restaurants/${restaurantId}/reviews/${payload.id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(payload)
  })
  if (response.ok){
    let review = await response.json()
    dispatch(update(review))

  }
}

export const deleteReview = (restaurantId, id) => async dispatch =>{
  const response = await fetch(`/api/restaurants/${restaurantId}/reviews/${id}`, {
    method: "DELETE",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(id)
  })
  if (response.ok){
    dispatch(remove(id))
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
