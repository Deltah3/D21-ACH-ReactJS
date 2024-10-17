import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = ({ show, handleClose, title, children }) => {
  if (!show) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <div>{children}</div>
        <button onClick={handleClose} className="modal-close-btn">Close</button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
