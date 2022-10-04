import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import '../Modal.css';
import { ModalContext } from '../Modal';
import "./FoodItemOrder.css"


export function Modal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" className='food-item-form-modal-background' onClick={onClose} />
      <div id="modal-content" className='food-item-form-modal-content'>
        {children}
      </div>
    </div>,
    modalNode
  );
}
