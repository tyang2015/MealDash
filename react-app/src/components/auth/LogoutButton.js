import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { useHistory } from 'react-router-dom';
import { useDeliveryInterval } from '../../context/DeliveryInterval';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { deliveryIntervalObj, setDeliveryIntervalObj } = useDeliveryInterval();

  const onLogout = async (e) => {
    await dispatch(logout());
    // added here
    // history.push('/login')
    clearInterval(deliveryIntervalObj)
    localStorage.clear()
    history.push('/')
  };

  return <div style={{cursor:'pointer'}} onClick={onLogout}>Logout</div>;
};

export default LogoutButton;
