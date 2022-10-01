import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Navigation/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Restaurants from './components/Restaurants';
import SplashPage from './components/SplashPage';
import CreateRestaurant from './components/RestaurantForm';
import CreateRestaurantForm from './components/CreateRestaurantForm';
import UpdateRestaurantForm from './components/UpdateRestaurantForm';
import GetRestaurant from './components/GetRestaurant';
import CreateFoodItem from './components/CreateFoodItem';
import UpdateFoodItem from './components/UpdateFoodItem';
import NavBarSplash from './components/NavBarSplash';

function App() {
  const [loaded, setLoaded] = useState(false);
  const loggedInUser = useSelector(state=> state.session.user)
  const dispatch = useDispatch();
  console.log('logged in user in app:', loggedInUser)
  console.log('!loggedInuser', !loggedInUser)
  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* {!loggedInUser && <NavBarSplash/>} */}
      <Switch>
        <ProtectedRoute path='/restaurants/new' exact={true} >
         <CreateRestaurantForm/>
        </ProtectedRoute>
        <ProtectedRoute path='/restaurants/:id/edit' exact={true} >
          <UpdateRestaurantForm/>
        </ProtectedRoute>
        <div>
          {loggedInUser && <NavBar />}
          <Route path='/' exact={true}>
            <SplashPage/>
          </Route>
          <Route path='/sign-up' exact={true}>
            <SignUpForm />
          </Route>
          <Route path='/login' exact={true}>
            <LoginForm />
          </Route>
          <ProtectedRoute path='/users/:userId' exact={true} >
            <User />
          </ProtectedRoute>
          <ProtectedRoute path='/restaurants' exact={true} >
            <Restaurants/>
          </ProtectedRoute>
          <ProtectedRoute path='/restaurants/:id' exact={true} >
            <GetRestaurant/>
          </ProtectedRoute>
          <ProtectedRoute path='/restaurants/:id/new' exact={true} >
            <CreateFoodItem/>
          </ProtectedRoute>
          <ProtectedRoute path='/restaurants/:id/fooditems/:foodItemId' exact={true} >
            <UpdateFoodItem/>
          </ProtectedRoute>
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
