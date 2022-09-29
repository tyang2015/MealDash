import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import "./FormStep3.css"

// 3rd step: bankAccount, routingNumber
const FormStep3 = ({formData, setFormData}) => {
  return (
    <div className='create-restaurant-form-step-3-container'>
      <label htmlFor="restaurant-bank-account">Account Number</label>
      <input
        id="restaurant-bank-account"
        type="number"
        value = {formData.bankAccount}
        onChange={e=> setFormData({...formData, bankAccount: e.target.value})}
      />
      <label htmlFor="restaurant-routing-number">Routing Number</label>
      <input
        id="restaurant-routing-number"
        type="number"
        value = {formData.routingNumber}
        onChange={e=> setFormData({...formData, routingNumber: e.target.value})}
      />
      {/* </input> */}
    </div>
  )
}

export default FormStep3
