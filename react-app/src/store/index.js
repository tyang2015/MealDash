import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import restaurantReducer from './restaurant';
import foodItemReducer from './foodItem';
import mapsReducer from './maps';
import orderReducer from './order';
import reviewReducer from './review';

const rootReducer = combineReducers({
  session,
  restaurants: restaurantReducer,
  foodItems: foodItemReducer,
  maps: mapsReducer,
  orders: orderReducer,
  reviews: reviewReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
