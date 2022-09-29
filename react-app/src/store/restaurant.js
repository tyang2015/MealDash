const GET_ALL_RESTAURANTS = 'restaurants/getRestaurants'
const CREATE_RESTAURANT = 'restaurants/createRestaurant'
const UPDATE_RESTAURANT = 'restaurants/updateRestaurant'
const DELETE_RESTAURANT = 'restaurants/deleteRestaurant'

const loadAll = (payload) => {
    return {
        type: GET_ALL_RESTAURANTS,
        payload
    }
}

const create = (payload) => {
    return {
        type: CREATE_RESTAURANT,
        payload
    }
}

const update = (payload) => {
    return {
        type: UPDATE_RESTAURANT,
        payload
    }
}

const remove = (id) => {
    return {
        type: DELETE_RESTAURANT,
        id
    }
}


export const getAllRestaurants = () => async dispatch => {
    const response = await fetch("/api/restaurants")
    if (response.ok){
        let restaurants = await response.json()
        dispatch(loadAll(restaurants))
        return restaurants
    }
}

export const createRestaurant = (payload) => async dispatch => {
    const response = await fetch("/api/restaurants", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    })
    if (response.ok){
        const restaurant= await response.json()
        dispatch(create(restaurant))
    }
}

export const updateRestaurant = (payload) => async dispatch => {
    const response = await fetch(`/api/restaurants/${payload.id}`,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    })
    if (response.ok){
        let restaurant = await response.json()
        dispatch(update(restaurant))
    }
}

export const deleteRestaurant = (payload) => async dispatch => {
    const response = await fetch(`/api/restaurants/${payload.id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload.id)
    })
    if (response.ok){
        dispatch(remove(payload.id))
    }
}
const initialState = {}
const restaurantReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_RESTAURANTS: {
            let newState = {}
            action.payload.restaurants.forEach(restaurant => newState[restaurant.id] = restaurant);
            return newState
        }
        case CREATE_RESTAURANT: {
            let newState = {...state}
            newState[action.payload.id] = action.payload
            return newState
        }
        case UPDATE_RESTAURANT: {
            let newState = {...state}
            newState[action.payload.id] = action.payload
            return newState
        }
        case DELETE_RESTAURANT: {
            let newState = {...state}
            delete newState[action.id]
            return newState
        }
        default:
            return state

    }
}

export default restaurantReducer
