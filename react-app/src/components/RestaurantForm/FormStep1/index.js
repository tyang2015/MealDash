import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { maskPhoneNumber, returnDigitsOnly } from '../PhoneNumberValidation';
import "./FormStep1.css"
import "../Restaurant.css"
import MapContainer from '../../Maps';
// import PlacesAutocomplete from '../../PlacesAutocomplete';
import PlacesAutocompleteContainer from '../../PlacesAutocomplete';

// const google = window.google

// first step: name, address (longitude & latitude), email, phone number, restaurant_pic_url
// for now just use number fields for long and lat
// text, use autocomplete* , text, number?, text
const FormStep1 = ({formData, setFormData}) => {
  return (
    <div className='create-restaurant-form-step-1-container'>

      {/* <MapContainer/> */}
      <div className='create-restaurant-form-step-1-first-row'>
        <div className='create-restaurant-label-input-container top-row'>
          <label htmlFor="restaurant-name">Restaurant Name *</label>
          <input
            id= "restaurant-name"
            type = 'text'
            value = {formData.name}
            onChange={e=> setFormData({...formData, name: e.target.value})}
            placeholder = "Restaurant name"
            className='restaurant-form-input-box'
            required
          />
        </div>
        <div className='create-restaurant-label-input-container top-row'>
          <label htmlFor="phone-number">Phone Number *</label>
          <input
            id="phone-number"
            type = 'tel'
            value = {formData.phoneNumber? maskPhoneNumber(formData.phoneNumber): null}
            onChange = {e=> setFormData({...formData, phoneNumber: e.target.value})}
            placeholder = "(123) 456-789"
            className='restaurant-form-input-box'
            // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
          />
        </div>
      </div>
      <div className='create-restaurant-form-step-1-second-row'>
        <div className='create-restaurant-label-input-container'>
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            type = 'text'
            value = {formData.email}
            onChange = {e=> setFormData({...formData, email: e.target.value})}
            className = 'one-input-per-row restaurant-form-input-box'
            placeholder = "Email "
            required
          />
        </div>
      </div>
      {/* <div className='create-restaurant-form-step-1-third-row'>
        <div className='create-restaurant-form-step-1-left-container'>
          <div className='create-restaurant-label-input-container'>
            <label htmlFor='longitude'>Longitude *</label>
            <input
              id="longitude"
              type= 'number'
              value={formData.longitude}
              onChange = {e=> setFormData({...formData, longitude: e.target.value})}
              placeholder = "Longitude"
              step='0.01'
              required
            />
          </div>
        </div>
        <div className='create-restaurant-form-step-2-right-container'>
          <div className='create-restaurant-label-input-container'>
            <label htmlFor='latitude'>Latitude *</label>
            <input
              id="latitude"
              type= 'number'
              value={formData.latitude}
              onChange = {e=> setFormData({...formData, latitude: e.target.value})}
              placeholder = "Latitude"
              step='0.01'
              required
            />

          </div>
        </div>
      </div> */}
      <PlacesAutocompleteContainer setFormData={setFormData} formData={formData}/>
      {/* <div>Converted to longitude and latitude: {formData.longitude} {formData.latitude} </div> */}
      <div className='create-restaurant-form-step-1-fourth-row'>
        <div className='create-restaurant-form-step-1-left-container'>
          <div className='create-restaurant-label-input-container'>
            <label htmlFor="restaurant-pic-url">Restaurant Pic Url *</label>
            <input
              id="restaurant-pic-url"
              type = 'text'
              value = {formData.restaurantPicUrl}
              onChange={e=> setFormData({...formData, restaurantPicUrl: e.target.value})}
              placeholder = "Restaurant Pic Url"
              required
              className='restaurant-form-input-box'

            />
          </div>
          <img
            src={formData.restaurantPicUrl}
            alt="restaurant pic url"
            className='create-restaurant-form-restaurant-pic form-step-1-pic'
            onError={e => { e.currentTarget.src = "https://i.pinimg.com/originals/90/85/b0/9085b0692d8ffe530e71a601ec887cf2.jpg"; }}
          />
        </div>
        <div className='create-restaurant-form-step-1-right-container'>
          <div className='create-restaurant-label-input-container'>
            <label htmlFor="logo-url">Logo Url *</label>
            <input
              id="logo-url"
              type = 'text'
              value = {formData.logo}
              onChange={e=> setFormData({...formData, logo: e.target.value})}
              placeholder = "Logo"
              required
              className='restaurant-form-input-box'
            />
          </div>
          <img
            src={formData.logo}
            alt="logo url"
            className='restaurant-form-restaurant-logo form-step-1-pic'
            onError={e => { e.currentTarget.src = "https://cdn5.vectorstock.com/i/1000x1000/65/29/vintage-badge-retro-blank-labels-logo-vector-23946529.jpg"; }}
          />
        </div>

      </div>
    </div>

  )
}

export default FormStep1
