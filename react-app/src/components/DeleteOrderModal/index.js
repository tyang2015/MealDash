import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink, useLocation } from 'react-router-dom';
import { DeleteOrderModal } from '../../context/DeleteOrderModal';
import { deleteOrder } from '../../store/order';
import {useCancelTimer} from "../../context/CancelTimer"
import { useDeliveryInterval } from '../../context/DeliveryInterval';
import { useTriggerCountdown } from '../../context/TriggerCountdown';
import "./DeleteOrderModal.css"

const DeleteOrderModalComponent = ({restaurant, setOrderDeleteModal, order}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  // const {cancelTimer, setCancelTimer} = useCancelTimer();
  const {triggerCountdown, setTriggerCountdown} = useTriggerCountdown();
  const { deliveryIntervalObj, setDeliveryIntervalObj } = useDeliveryInterval();
  console.log('deliveryIntervalObj')
  console.log('inside delete order modal component')

  const handleDelete = () => {
    dispatch(deleteOrder(restaurant.id, order.id ))
    clearInterval(deliveryIntervalObj)
    setTriggerCountdown(true)
    localStorage.setItem('countdown',0)
    localStorage.setItem('orderStarted',1)
    localStorage.setItem('cart', JSON.stringify([]))
    localStorage.setItem('orders', JSON.stringify({...JSON.parse(localStorage.getItem('orders')), [order.id]: {...order, countdown: 0, orderCompleted: true} }))
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
