// frontend/src/store/maps.js
import { csrfFetch } from './csrf';

const LOAD_API_KEY = 'maps/LOAD_API_KEY';

const loadApiKey = (key) => ({
  type: LOAD_API_KEY,
  payload: key,
});

export const getKey = () => async (dispatch) => {
  // const res = await csrfFetch('/api/maps/key', {
  //   method: 'POST',
  // });
  // console.log('response from maps getKey thunk:', res)
  // const data = await res.json();
  // console.log('data maps object from api backend:', data)
  // dispatch(loadApiKey(data.googleMapsAPIKey));
  const res = await fetch('/api/maps/key', {
    method: 'POST',
  });
  console.log('response from maps getKey thunk:', res)
  const data = await res.json();
  console.log('data maps object from api backend:', data)
  dispatch(loadApiKey(data.googleMapsAPIKey));
};

const initialState = { key: null };

const mapsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_API_KEY:
      return { key: action.payload };
    default:
      return state;
  }
};

export default mapsReducer;
