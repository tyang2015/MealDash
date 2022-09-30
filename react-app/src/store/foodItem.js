const GET_FOOD_ITEMS = "foodItems/getFoodItems"
const CREATE_FOOD_ITEM = "foodItems/createFoodItem"
const UPDATE_FOOD_ITEM = "foodItems/updateFoodItem"
const DELETE_FOOD_ITEM = "foodItems/deleteFoodItem"

const loadAll = (payload) => {
  return {
    type: GET_FOOD_ITEMS,
    payload
  }
}

const create = (payload) => {
  return {
      type: CREATE_FOOD_ITEM,
      payload
  }
}

const update = (payload) => {
  return {
      type: UPDATE_FOOD_ITEM,
      payload
  }
}

const remove = (id) => {
  return {
      type: DELETE_FOOD_ITEM,
      id
  }
}

export const getFoodItems = (id) => async dispatch => {
  const response = await fetch(`/api/restaurants/${id}/fooditems`)
  if (response.ok) {
    let foodItems = await response.json()
    dispatch(loadAll(foodItems))
    return foodItems
  }
}

export const createFoodItem = (restaurantId, payload) => async dispatch => {
  const response = await fetch(`/api/restaurants/${restaurantId}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload)
  })
  if (response.ok){
      const foodItem = await response.json()
      dispatch(create(foodItem))
      return foodItem
  }
}

export const updateFoodItem = (restaurantId, payload) => async dispatch => {
  const response = await fetch(`/api/restaurants/${restaurantId}/fooditems/${payload.id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload)
  })
  if (response.ok){
      let foodItem = await response.json()
      dispatch(update(foodItem))
  }
}

export const deleteFoodItem = (restaurantId, foodItemId) => async dispatch => {
  const response = await fetch(`/api/restaurants/${restaurantId}/fooditems/${foodItemId}`, {
    method: "DELETE",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(foodItemId)
  })
  if (response.ok){
    dispatch(remove(foodItemId))
  }
}

const initialState ={}
const foodItemReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_FOOD_ITEMS: {
      let newState = {}
      action.payload.food_items.forEach(item => newState[item.id] = item)
      return newState
    }
    case CREATE_FOOD_ITEM: {
      let newState = {...state}
      newState[action.payload.id] = action.payload
      return newState
    }
    case UPDATE_FOOD_ITEM: {
      let newState = {...state}
      newState[action.payload.id] = action.payload
      return newState
    }
    case DELETE_FOOD_ITEM: {
      let newState = {...state}
      delete newState[action.id]
      return newState
    }
    default:
      return state
  }
}

export default foodItemReducer
