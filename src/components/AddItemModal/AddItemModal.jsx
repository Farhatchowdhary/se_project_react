import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";


const AddItemModal = ({ isOpen, onAddItem, onCloseModal, name, setName, imageUrl, setImageUrl, radioButton, setRadioButton  }) => {
console.log("AddItemModal props:", { isOpen, onAddItem, onCloseModal });

if (isOpen) {
  console.log("Modal should be visible now!");
}
    return (
        <ModalWithForm
            isOpen={isOpen}
            onClose={onCloseModal}
            name="add-garment"
            title="New Garment"
            buttonText="Add Garment"
            onSubmit={onAddItem}
            isFormValid={true}
            >
            <label className="modal__label">
                Name
                <input
                    className="modal__input"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>

            <label className="modal__label">
                Image URL
                <input
                    className="modal__input"
                    type="url"
                    placeholder="Image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                />
            </label>

            <fieldset className="modal__radio-buttons">
                <legend className="modal__legend">Select the weather type:</legend>
                {["hot", "warm", "cold"].map((w) => (
                    <label key={w} className="modal__label modal__label_type_radio">
                        <input
                            className="modal__radio-button"
                            type="radio"
                            name="weather"
                            value={w}
                            checked={radioButton === w}
                            onChange={(e) => setRadioButton(e.target.value)}
                        />
                        <span>{w.charAt(0).toUpperCase() + w.slice(1)}</span>
                    </label>
                ))}
            </fieldset>
        </ModalWithForm>


    );
};


export default AddItemModal;