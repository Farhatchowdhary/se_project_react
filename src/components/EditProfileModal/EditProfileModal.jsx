import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import './EditProfileModal.css';


const EditProfileModal = ({ isOpen, onClose, onUpdateProfile, currentUser }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  // Prefill with current user info when modal opens
  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [isOpen, currentUser]);

  const isFormValid = name.trim() !== "" && avatar.trim() !== "";

  const handleSubmit = () => {
    onUpdateProfile({ name, avatar });
    onClose();
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="edit-profile"
      title="Change Profile Data"
      buttonText="Save"
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          placeholder="Terrence Tegegne"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          className="modal__input"
          type="url"
          placeholder="https://www.imgur.com/1wsdewes3"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
