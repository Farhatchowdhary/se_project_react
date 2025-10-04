import React from "react";
import "./ConfirmationModal.css"; 

const MyConfirmationModal = ({ show, onClose, onConfirm, message, }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal__close" onClick={onClose}>X</button>
        <p>{message}</p>
       <button onClick={onConfirm}>Yes,delete item</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default MyConfirmationModal;
