// import { Modal } from "../../context/FoodItemOrder";
import { Modal } from "../../context/OrderConfirmPayment";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import "./PaymentModal.css"

const PaymentModal = ({setPaymentModal, creditCard, setCreditCard}) => {

  return (
    <Modal onClose={()=> setPaymentModal(false)}>
      <div className="credit-card-modal-inner-container">
        <div className="add-new-card-title-container">
          <h2>Add New Card</h2>
        </div>
        <div className='credit-card-input-label-container'>
          <label> Card Details </label>
          <input
            type='text'
            placeholder='xxxx xxxx xxxx xxxx'
            value={creditCard}
            className='credit-card-input'
            onChange={(e)=> setCreditCard(e.target.value)}
            required
          />
        </div>
        <div className="payment-button-container">
          <button className="add-card-button" onClick={()=> setPaymentModal(false)}> Add Card </button>
        </div>
      </div>
    </Modal>
  )
}

export default PaymentModal
