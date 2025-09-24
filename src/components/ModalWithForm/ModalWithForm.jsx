
import "./ModalWithForm.css";
import React from "react";


function ModalWithForm({ children, name, buttonText, title, isOpen, onClose }) {
    console.log("ModalWithForm rendered - isOpen:", isOpen, "name:", name);
    return (
        <div className={`modal modal_type_${name} ${isOpen ? 'modal_is_opened' : ''}`}>
            <div className="modal__content">
                <h2 className="modal__name">{title}</h2>
                <button
                    className="modal__close"
                    type="button"
                    onClick={onClose}>
                    X
                </button>

                <form className="modal__form" name={name}>
                    {children}
                    <button className="modal__button" type="submit">
                        {buttonText}
                    </button>
                </form>


            </div>
        </div>
    );
};

export default ModalWithForm;