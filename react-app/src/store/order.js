// for viewing as a restaurant owner
const GET_RESTAURANT_ORDERS = "orders/getRestaurantOrders"
// for viewing as a user
const GET_USER_ORDERS = 'orders/getUserOrders'

const CREATE_ORDER = "orders/createOrder"
const UPDATE_ORDER = 'orders/updateOrder'
const DELETE_ORDER = 'orders/deleteOrder'

// dont use this one yet
const loadRestaurantOrders = (payload) => {
  return {
    type: GET_RESTAURANT_ORDERS,
    payload
  }
}

const loadUserOrders = (payload) => {
  return {
    type: GET_USER_ORDERS,
    payload
  }
}

const createOrder = (payload) => {
  return {
    type: CREATE_ORDER,
    payload
  }
}

const update = (payload) => {
  return {
    type: UPDATE_ORDER,
    payload
  }
}

const remove = (id) => {
  return {
    type: DELETE_ORDER,
    id
  }
}
// get user orders
export const getOrders = (userId) => async dispatch => {
  const response = await fetch(`/api/restaurants/orders`)
  if (response.ok){
    let orders = await response.json()
    dispatch(loadUserOrders(orders))
  }
}

// create order
// redux state must be updated with the following:
//  1) orders state must return the new order (of all orders for customer/user)
// 2) order food items must return
// REFACTOR so that you can do this for 2 different thunks that return 2 different results (orders and order food items)
export const createNewOrder = (payload) => async dispatch => {
  const response = await fetch(`/api/restaurants/${payload.restaurant_id}/orders`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(payload)
})
  if (response.ok){
    let order = await response.json()
    console.log('order in thunk:', order)
    dispatch(createOrder(order))
    return order
  }
}

export const updateOrder = (payload) => async dispatch => {
  console.log('order payload in thunk:', payload)
  const response = await fetch(`/api/restaurants/${payload.restaurant_id}/orders/${payload.id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(payload)
  })
  if (response.ok){
    let order = await response.json()
    dispatch(update(order))
    return order
  }
}

export const deleteOrder = (restaurantId, orderId) => async dispatch => {
  const response = await fetch(`/api/restaurants/${restaurantId}/orders/${orderId}`, {
    method: "DELETE",
    headers: {"Content-Type": "application/json"},
  })
  if (response.ok){
    dispatch(remove(orderId))
  }

}


const initialState = {}
//  orders state=> { 1: {order attributes: ...,}}
const orderReducer = (state= initialState, action) => {
  switch (action.type){
    case GET_USER_ORDERS: {
      let newState = {}
      action.payload.orders.forEach(order=> newState[order.id]=order)
      return newState
    }
    case CREATE_ORDER: {
      let newState = {}
      newState[action.payload.id] = action.payload
      // console.log('new state in order reducer:', newState)
      return newState
    }
    case UPDATE_ORDER: {
      let newState = {}
      newState[action.payload.id] = action.payload
      // console.log('new state in order reducer:', newState)
      return newState
    }
    case DELETE_ORDER: {
      let newState = {...state}
      delete newState[action.id]
      return newState
    }
    default:
      return state
  }
}

export default orderReducer
