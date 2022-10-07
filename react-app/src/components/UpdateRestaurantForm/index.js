import React, { useEffect } from 'react'
import RestaurantForm from '../RestaurantForm'
import { useDispatch, useSelector } from 'react-redux'
import restaurantReducer, { getAllRestaurants } from '../../store/restaurant'
import { useParams } from 'react-router-dom'
import { GoogleMap, useJsApiLoader, Marker, Autocomplete, LoadScript } from '@react-google-maps/api';
import usePlacesAutocomplete, {
  getGeocode, getLatLng
} from "use-places-autocomplete"
import { getKey } from '../../store/maps'

const google = window.google
const geocodeBaseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

const UpdateRestaurantForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const allRestaurants = useSelector(state=> state.restaurants)
  // const geocoder = new google.maps.Geocoder()
  let restaurant = allRestaurants[id]
  const key = useSelector((state) => state.maps.key);

  useEffect(() => {
    if (!key) {
      dispatch(getKey());
    }
  }, [dispatch, key]);


  const restaurants = Object.values(allRestaurants)
  let latLng;
  restaurant = {
    id: restaurant?.id,
    name: restaurant?.name,
    price_range: restaurant?.priceRange,
    restaurant_pic_url: restaurant?.restaurantPicUrl,
    logo: restaurant?.logo,
    longitude: restaurant?.longitude,
    latitude: restaurant?.latitude,
    email: restaurant?.email,
    phone_number: restaurant?.phoneNumber,
    bank_account: restaurant?.bankAccount,
    routing_number: restaurant?.routingNumber,
    category: restaurant?.category,
    open_time: restaurant?.openTime,
    close_time: restaurant?.closeTime,
    address: restaurant?.address
  }

  // // SHOULD NOT BE USED: does not return postal addresses but any geographically named locaiton that matches
  // if (restaurant){
  //   console.log(`longitude:${restaurant.longitude} | latitude: ${restaurant.latitude}`)
  //   latLng = {lat: parseFloat(restaurant.latitude), lng: parseFloat(restaurant.longitude) }
  // }
  // const reverseGeoCode = ({latitude: lat, longitude: lng}) => {
  //   const url = `${geocodeBaseUrl}?key=${key}&latlng=${lat},${lng}`;
  //   fetch(url).then((res)=> res.json()).then((location)=>{
  //     const place = location.results[0]
  //     console.log('place:', place)
  //   })
  // }
  // reverseGeoCode({latitude: restaurant.latitude, longitude: restaurant.longitude})

  useEffect(()=>{
    dispatch(getAllRestaurants())
  }, [dispatch])

  if (!key) {
    return null;
  }

  return (
    <RestaurantForm restaurants={restaurants} restaurant={restaurant} formType= "Update Form"/>
  )
}

export default UpdateRestaurantForm
