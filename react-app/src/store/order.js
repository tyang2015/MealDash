// for viewing as a restaurant owner
const GET_RESTAURANT_ORDERS = "orders/getRestaurantOrders"
// for viewing as a user
const GET_USER_ORDERS = 'orders/getUserOrders'

const CREATE_ORDER = "orders/createOrder"

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

const create = (payload) => {
  return {
    type: CREATE_ORDER,
    payload
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



const initialState = {}
const orderReducer = (state= initialState, action) => {
  switch (action.type){
    case GET_USER_ORDERS: {
      let newState = {}
      action.payload.orders.forEach(order=> newState[order.id]=order)
      return newState
    }
    default:
      return state
  }
}

export default orderReducer
