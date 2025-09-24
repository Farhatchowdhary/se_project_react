import React, { useState } from "react";
import "./App.css";
import Main from "../Main/Main";
import { defaultClothingItems } from "../../utils/clothingItems";
import ItemModal from "../ItemModal/ItemModal";
import Header from "../Header/Header"; // fixed path
import Footer from "../Footer/Footer";
import "../../vendor/normalize.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const App = () => {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

console.log("Current activeModal:", activeModal);

  const handleCardClick = (card) => {
    console.log("handleCardClick called with:", card);
    setSelectedCard(card);
    setActiveModal("item");
  };


  const handleCloseModal = () => {
    console.log("handleCloseModal called");
    setActiveModal("");
  };

  const handleAddClick = () => {
    console.log("Add button clicked! Setting activeModal to add-garment");
    setActiveModal("add-garment");
  }

  return (
    <div className="app-container">
      <Header onAddClick={handleAddClick} />

      <Main items={clothingItems} onCardClick={handleCardClick} />

      <ItemModal
        isOpen={activeModal === "item"}
        onClose={handleCloseModal}
        card={selectedCard}
      />
      <Footer />
      <ModalWithForm
        isOpen={activeModal === "add-garment"}
        onClose={handleCloseModal}
        name="add-garment"
        title="New garment"
        buttonText="Add garment"
      >
        <label className="modal__label">
          Name
          <input
            className="modal__input"
            type="text"
            name="name"
            placeholder="Name"
            required
          />
        </label>
        <label className="modal__label">
          Image
          <input
            className="modal__input"
            type="url"
            name="imageUrl"
            placeholder="Image URL"
            required
          />
        </label>
        <fieldset className="modal__radio-buttons">
  <legend className="modal__legend">Select the weather type:</legend>

  <label className="modal__label modal__label_type_radio">
    <input
      className="modal__radio-button"
      type="radio"
      name="weather"
      value="hot"
    />
    <span>Hot</span>
  </label>

  <label className="modal__label modal__label_type_radio">
    <input
      className="modal__radio-button"
      type="radio"
      name="weather"
      value="warm"
    />
    <span>Warm</span>
  </label>

  <label className="modal__label modal__label_type_radio">
    <input
      className="modal__radio-button"
      type="radio"
      name="weather"
      value="cold"
    />
    <span>Cold</span>
  </label>
</fieldset>

      </ModalWithForm>

    </div>
  );
};


export default App;
