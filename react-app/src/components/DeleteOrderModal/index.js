import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink, useLocation } from 'react-router-dom';
import { DeleteOrderModal } from '../../context/DeleteOrderModal';
import { deleteOrder } from '../../store/order';
import {useCancelTimer} from "../../context/CancelTimer"
import "./DeleteOrderModal.css"

const DeleteOrderModalComponent = ({restaurant, setOrderDeleteModal, order}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {cancelTimer, setCancelTimer} = useCancelTimer();
  console.log('inside delete order modal component')

  const handleDelete = () => {
    dispatch(deleteOrder(restaurant.id, order.id ))
    setCancelTimer(true)
    setOrderDeleteModal(false)
    history.push({pathname: `/orders`})
  }

  return (
    <DeleteOrderModal onClose={()=> setOrderDeleteModal(false) }>
      <div className='delete-order-question-container'>Are you sure you want to delete this order? (Only in progress orders can be deleted)</div>
      <div className='delete-order-yes-no-container'>
        <button className='delete-order-button' onClick={handleDelete}>Yes</button>
        <button className='delete-order-button' onClick={()=> setOrderDeleteModal(false)}>No</button>
      </div>
    </DeleteOrderModal>
  )
}

export default DeleteOrderModalComponent
