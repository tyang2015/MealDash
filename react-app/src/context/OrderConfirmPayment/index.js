import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import '../Modal.css';
import { ModalContext } from '../Modal';
import "./OrderConfirmPayment.css"


export function Modal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;
  console.log("inside order confirm")

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" className='order-confirm-payment-modal-background' onClick={onClose} />
      <div id="modal-content" className='order-confirm-payment-modal-content'>
        {children}
      </div>
    </div>,
    modalNode
  );
}
