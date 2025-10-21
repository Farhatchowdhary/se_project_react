import React from "react";
import "./MyConfirmationModal.css";

function MyConfirmationModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <p className="modal__message">{message}</p>
        <div className="modal__buttons">
          <button className="modal__button modal__button_cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="modal__button modal__button_confirm" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyConfirmationModal;