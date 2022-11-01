import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import '../Modal.css';
import { ModalContext } from '../Modal';
import "./DeleteOrderModal.css"

export function DeleteOrderModal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" className='delete-order-modal-background' onClick={onClose} />
      <div id="modal-content" className='delete-order-modal-content'>
        {children}
      </div>
    </div>,
    modalNode
  );
}
