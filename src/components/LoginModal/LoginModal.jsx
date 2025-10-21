import React, { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import './LoginModal.css';



function LoginModal({ isOpen, onClose, onLogin }) {
  console.log("LoginModal rendered with isOpen:",);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
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