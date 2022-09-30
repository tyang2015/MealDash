import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import "./FormStep2.css"

// 2nd step: openTime, closeTime, priceRange, category
// time inputs, number, select
const CATEGORY_CHOICES = ["Asian", "American","Breakfast", "Vegan", "Mexican", "Japanese", "Italian", "French","Dessert", "FastFood"]

const FormStep2 = ({formData, setFormData}) => {
  // console.log('form data in form step 2:', formData)
  
  return (
    <div className='create-restaurant-form-step-2-container'>
      <label htmlFor="open-time">Open Hours</label>
      <input
        id='open-time'
        type="time"
        min="00:01"
        max="23:99"
        value = {formData.openTime}
        onChange={(e)=> setFormData({...formData, openTime: e.target.value})}
        required
      />
      <label htmlFor="close-time">Close Hours</label>
      <input
        id='close-time'
        type="time"
        // see if you can make the min = {formData.openTime + timeDelta(2)}
        min="00:01"
        max="23:99"
        value = {formData.closeTime}
        onChange={(e)=> setFormData({...formData, closeTime: e.target.value})}
        required
      />
      <label htmlFor="price-range">Price Range</label>
      <input
        id='price-range'
        type="number"
        // see if you can make the min = {formData.openTime + timeDelta(2)}
        min="1"
        max="3"
        step="1"
        // step="0.01"
        value = {formData.priceRange}
        onChange={(e)=> setFormData({...formData, priceRange: e.target.value})}
        required
      />
      <label htmlFor="restaurant-category">Category</label>
      <select
        id="restaurant-category"
        value={formData.category}
        onChange={e=> setFormData({...formData, category: e.target.value})}
        required
      >
        {CATEGORY_CHOICES.map(category=> (
          <option
            key={category}
          >
            {category}
          </option>
        ))}
        {/* <option value="Asian">Asian</option>
        <option value="American">American</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Vegan">Vegan</option>
        <option value="Mexican">Mexican</option>
        <option value="Japanese">Japanese</option>
        <option value="Italian">Italian</option>
        <option value="French">French</option>
        <option value="Dessert">Dessert</option>
        <option value="FastFood">FastFood</option> */}
      </select>
    </div>
  )
}

export default FormStep2
