import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import "./FormStep2.css"
import "../Restaurant.css"

// 2nd step: openTime, closeTime, priceRange, category
// time inputs, number, select
const CATEGORY_CHOICES = ["Asian", "American","Breakfast", "Vegan", "Mexican", "Japanese", "Italian", "French", "FastFood", "Ethiopian", "Mediterranean"]

const FormStep2 = ({formData, setFormData}) => {
  // console.log('form data in form step 2:', formData)

  return (
    <div className='create-restaurant-form-step-2-container'>
      <div className='form-step-2-top-bottom-row'>
        <div className='form-step-2-label-input-container left-box'>
          <label htmlFor="open-time">Open Hours *</label>
          <input
            id='open-time'
            type="time"
            min="00:01"
            max="23:99"
            value = {formData.openTime}
            className="form-step-2-input restaurant-form-input-box"
            onChange={(e)=> setFormData({...formData, openTime: e.target.value})}
            required
          />
        </div>
        <div className='form-step-2-label-input-container'>
          <label  htmlFor="close-time">Close Hours *</label>
          <input
            id='close-time'
            type="time"
            // see if you can make the min = {formData.openTime + timeDelta(2)}
            min="00:01"
            max="23:99"
            value = {formData.closeTime}
            className="form-step-2-input restaurant-form-input-box"
            onChange={(e)=> setFormData({...formData, closeTime: e.target.value})}
            required
          />
        </div>
      </div>
      <div className='form-step-2-top-bottom-row' style={{marginTop:"30px"}}>
        <div className='form-step-2-label-input-container left-box'>
          <label htmlFor="price-range">Price Range *</label>
          <input
            id='price-range'
            type="number"
            // see if you can make the min = {formData.openTime + timeDelta(2)}
            min="1"
            max="4"
            step="1"
            // step="0.01"
            value = {formData.priceRange}
            className="form-step-2-input restaurant-form-input-box"
            onChange={(e)=> setFormData({...formData, priceRange: e.target.value})}
            placeholder="Select 1 - 4"
            required
          />
        </div>
        <div className='form-step-2-label-input-container'>
          <label htmlFor="restaurant-category">Category *</label>
          <select
            id="restaurant-category"
            value={formData.category}
            className="form-step-2-input restaurant-form-input-box restaurant-form-select"
            onChange={e=> setFormData({...formData, category: e.target.value})}
            required
          >
            {CATEGORY_CHOICES.map(category=> (
              <option
                key={category}
                // style={{backgroundColor: "lightblue", height: "40rem"}}
              >
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

    </div>
  )
}

export default FormStep2
