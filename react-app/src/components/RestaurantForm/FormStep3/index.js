import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import "./FormStep3.css"

// 3rd step: bankAccount, routingNumber
const FormStep3 = ({formData, setFormData}) => {
  return (
    <div className='create-restaurant-form-step-3-container'>
      <div className='form-step-3-row'>
        <div style={{marginRight:"15em"}} className='form-step-3-label-input-container'>
          <label htmlFor="restaurant-bank-account">Account Number *</label>
          <input
            id="restaurant-bank-account"
            type="number"
            value = {formData.bankAccount}
            onChange={e=> setFormData({...formData, bankAccount: e.target.value})}
            placeholder="Must be 8-17 digits long"
            required
            className='restaurant-form-input-box financial-input'
          />
        </div>
        <div className='form-step-3-label-input-container' >
          <label htmlFor="restaurant-routing-number">Routing Number *</label>
          <input
            id="restaurant-routing-number"
            type="number"
            className='restaurant-form-input-box financial-input'
            placeholder="Must be 9 digits long"
            value = {formData.routingNumber}
            onChange={e=> setFormData({...formData, routingNumber: e.target.value})}
            required
          />
        </div>
      </div>
      {/* </input> */}
    </div>
  )
}

export default FormStep3
