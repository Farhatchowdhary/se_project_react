
import "./ModalWithForm.css";
import React from "react";



function ModalWithForm({ children, name, buttonText, title, isOpen, onClose, onSubmit, isFormValid }) {
    console.log("ModalWithForm rendered - isOpen:", isOpen, "name:", name, 'timestamp:', Date.now());
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(event);
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        console.log("Form submitted:", data);
        // onSubmit(data);
    };


    return (
        <div 
        className={`modal modal_type_${name} ${isOpen ? 'modal_is_opened' : ''}`}>
            <div className="modal__content_form">
                <h2 className="modal__name">{title}</h2>
                <button
                    className="modal-btn__close"
                    type="button"
                    onClick={onClose}>
                </button>

                <form className="modal__form" name={name} onSubmit={handleSubmit}>
                    {children}
                    <button
                        className="modal__button"
                        type="submit"
                        disabled={!isFormValid}  // Add this line
                    >
                        {buttonText}
                    </button>
                </form>
            </div>
        </div>
    );
}
export default ModalWithForm;



