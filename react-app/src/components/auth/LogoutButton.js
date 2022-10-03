import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { useHistory } from 'react-router-dom';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const onLogout = async (e) => {
    await dispatch(logout());
    // added here
    // history.push('/login')
    history.push('/')
  };

  return <div style={{cursor:'pointer'}} onClick={onLogout}>Logout</div>;
};

export default LogoutButton;
