import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

const RegisterModal = ({ isOpen, handleRegistration, onClose }) => {
 console.log("RegisterModal is rendering");   
    const [isFormValid, setIsFormValid] = useState(false);

     const [data, setData] = useState({
        name: "",
        avatar: "",
        email: "",
        password: "",

    });

    const [errors, setErrors] = useState({
        name: "",
        avatar: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        checkFormValidity();
    }, [data]);



    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: "",
            }));
        }

    };

   const checkFormValidity = () => {
        const isValid = data.name.trim() &&
            data.avatar.trim() &&
            data.email.trim() &&
            data.password;
        setIsFormValid(isValid);
    };

    const validateForm = () => {
        const newErrors = {};

        // Check name
        if (!data.name.trim()) {
            newErrors.name = "Name is required";
        }

        // Check email
        if (!data.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            newErrors.email = "Please enter a valid email";
        }

        // Check password
        if (!data.password) {
            newErrors.password = "Password is required";
        } else if (data.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        // Check avatar
        if (!data.avatar.trim()) {
            newErrors.avatar = "Avatar URL is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    // Handle form submission
    const handleSubmit = (e) => {
    console.log("handleSubmit called!"); // Add this line
    console.log("Form data:", data); // Add this line
    
    if (validateForm()) {
        console.log("Form is valid, calling handleRegistration"); // Add this line
        handleRegistration(data);
    } else {
        console.log("Form validation failed"); // Add this line
        console.log("Errors:", errors); // Add this line
    }
};


    return (
        <ModalWithForm
            title="Sign Up"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText="Sign Up"
            isFormValid={isFormValid}
        >
         <label className="modal__label">
        Email*
        <input
          className="modal__input"
          id="register-email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Email"
          autoComplete="email"
          required
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>

      {/* 2️⃣ Password */}
      <label className="modal__label">
        Password*
        <input
          className="modal__input"
          id="register-password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Password"
          required
          autoComplete="new-password"
        />
        {errors.password && <span className="modal__error">{errors.password}</span>}
      </label>

      {/* 3️⃣ Name */}
      <label className="modal__label">
        Name*
        <input
          className="modal__input"
          id="name"
          name="name"
          type="text"
          value={data.name}
          onChange={handleChange}
          placeholder="Name"
          autoComplete="name"
          required
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>

      {/* 4️⃣ Avatar URL */}
      <label className="modal__label">
        Avatar URL*
        <input
          className="modal__input"
          id="avatar"
          name="avatar"
          type="url"
          value={data.avatar}
          onChange={handleChange}
          placeholder="Avatar URL"
          autoComplete="url"
          required
        />
        {errors.avatar && <span className="modal__error">{errors.avatar}</span>}
      </label>
        </ModalWithForm>
    );
}

export default RegisterModal;