import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { maskPhoneNumber } from '../PhoneNumberValidation';
import "./FormStep1.css"

// first step: name, address (longitude & latitude), email, phone number, restaurant_pic_url
// 2nd step: openTime, closeTime, priceRange, category
// 3rd step: bankAccount, routingNumber

// for now just use number fields for long and lat
// text, use autocomplete* , text, number?, text
const FormStep1 = ({formData, setFormData}) => {

  return (
    <div className='create-restaurant-form-step-1-container'>
      <input
        id= "restaurant-name"
        type = 'text'
        value = {formData.name}
        onChange={e=> setFormData({...formData, name: e.target.value})}
        placeholder = "Restaurant name"
        required
      />
      <input
        type = 'text'
        value = {formData.restaurantPicUrl}
        onChange={e=> setFormData({...formData, restaurantPicUrl: e.target.value})}
        placeholder = "Restaurant Pic Url"
        required
      />
      <input
        type = 'text'
        value = {formData.logo}
        onChange={e=> setFormData({...formData, logo: e.target.value})}
        placeholder = "Logo"
        required
      />
      <input
        type = 'number'
        value = {formData.longitude}
        onChange = {e=> setFormData({...formData, longitude: e.target.value})}
        placeholder = "Address - Longitude"
        required
      />
      <input
        type = 'number'
        value = {formData.latitude}
        onChange = {e=> setFormData({...formData, latitude: e.target.value})}
        placeholder = "Address - Latitude"
        required
      />
      <input
        type = 'text'
        value = {formData.email}
        onChange = {e=> setFormData({...formData, email: e.target.value})}
        placeholder = "Email"
        required
      />
      <input
        type = 'tel'
        value = {maskPhoneNumber(formData.phoneNumber)}
        onChange = {e=> setFormData({...formData, phoneNumber: e.target.value})}
        placeholder = "xxx-xxx-xxxx"
        // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        required
      />

      <img
        src={formData.restaurantPicUrl}
        alt="restaurant pic url"
        onError={e => { e.currentTarget.src = "https://i.pinimg.com/originals/90/85/b0/9085b0692d8ffe530e71a601ec887cf2.jpg"; }}
      />
      <img
        src={formData.logo}
        alt="logo url"
        onError={e => { e.currentTarget.src = "https://cdn5.vectorstock.com/i/1000x1000/65/29/vintage-badge-retro-blank-labels-logo-vector-23946529.jpg"; }}
      />
    </div>

  )
}

export default FormStep1
