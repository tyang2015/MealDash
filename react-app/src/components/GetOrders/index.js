import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
import { getOrders } from '../../store/order';

const GetOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(state=> Object.values(state.orders))
  console.log('user orders:', orders)

  useEffect(()=>{
    dispatch(getOrders())
  }, [dispatch])

  return (
    <>
      <h2> Orders</h2>
      <div className='get-orders-main-container'>
        {orders.length>0 && orders.map( order => (
          <div key={order.id}>
            Order Id#{order.id}
            <p> {order.restaurant.name}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default GetOrders
