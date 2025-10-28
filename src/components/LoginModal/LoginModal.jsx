import React, { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import './LoginModal.css';


function LoginModal({ isOpen, onClose, onLogin }) {
  console.log("LoginModal rendered with isOpen:", isOpen);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log("LoginModal rendered with isOpen:", isOpen);
  console.log("LoginModal props:", { isOpen, onClose, onLogin });

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  const handleSubmit = (data) => {
    // e.preventDefault();
    console.log("Form submitted with:", data);
    console.log("Email from state:", email);
    console.log("Password from state:", password);
    onLogin({ email, password });
  };


  return (
    <ModalWithForm
      name="login"
      title="Log In"
      buttonText="Log In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      className="modal__type_login"
      isFormValid={isFormValid}
    >
      <label htmlFor="login-email" className="modal__label">
        Email
        <input
          name="email"
          type="email"
          className="modal__input"
          id="login-email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email" // added
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          name="password"
          type="password"
          className="modal__input"
          id="login-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password" // added
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;