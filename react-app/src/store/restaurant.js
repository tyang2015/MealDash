const GET_ALL_RESTAURANTS = 'restaurants/getRestaurants'

const loadAll = (payload) => {
    return {
        type: GET_ALL_RESTAURANTS,
        payload
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

const initialState = {}
const restaurantReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_RESTAURANTS: {
            let newState = {}
            action.payload.restaurants.forEach(restaurant => newState[restaurant.id] = restaurant);
            return newState
        }
        default:
            return state

    }
}

export default restaurantReducer
