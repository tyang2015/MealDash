import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import '../Modal.css';
import { ModalContext } from '../Modal';
import "./Review.css"


export function ReviewModal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" className='review-form-modal-background' onClick={onClose} />
      <div id="modal-content" className='review-form-modal-content'>
        {children}
      </div>
    </div>,
    modalNode
  );
}
