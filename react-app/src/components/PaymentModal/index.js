// import { Modal } from "../../context/FoodItemOrder";
import { Modal } from "../../context/OrderConfirmPayment";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import "./PaymentModal.css"

const PaymentModal = ({setPaymentModal, creditCard, setCreditCard}) => {

  return (
    <Modal onClose={()=> setPaymentModal(false)}>
      <div className="credit-card-modal-inner-container">
        <div onClick={()=> setPaymentModal(false)} className="credit-card-modal-x-button">
          <svg style={{marginTop: "15px", marginLeft: "10px"}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="styles__StyledInlineSvg-sc-12l8vvi-0 jFpckg"><path d="M17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L13.4142 12L18.7071 6.70711C19.0976 6.31658 19.0976 5.68342 18.7071 5.29289C18.3166 4.90237 17.6834 4.90237 17.2929 5.29289L12 10.5858L6.70711 5.29289C6.31658 4.90237 5.68342 4.90237 5.29289 5.29289C4.90237 5.68342 4.90237 6.31658 5.29289 6.70711L10.5858 12L5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L12 13.4142L17.2929 18.7071Z" fill="currentColor"></path></svg>
        </div>
        <div className="add-new-card-title-container">
          <h2>Add New Card</h2>
        </div>
        <div className='credit-card-input-label-container'>
          <label style={{marginRight: '15px'}}> Card Details </label>
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
