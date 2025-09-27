import React, { useState } from "react";
import "./App.css";
import Main from "../Main/Main";
import { defaultClothingItems } from "../../utils/clothingItems";
import ItemModal from "../ItemModal/ItemModal";
import Header from "../Header/Header"; // fixed path
import Footer from "../Footer/Footer";
import "../../vendor/normalize.css";
import "../../vendor/fonts.css";
import "../../styles/ui-kit.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { addItem } from "../../utils/api";


const App = () => {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [radioButton, setRadioButton] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

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

  const handleAddItemSubmit = (data) => {
    console.log("Received data:", data);

    const newItem = {
      name: name,
      link: imageUrl,
      weather: radioButton,
    };
    addItem(newItem)
      .then((item) => {
        console.log("Item returned fromAPI:", item);
        console.log("Existing item for comparison:", clothingItems[0]);
        setClothingItems([item, ...clothingItems]);
        setActiveModal("");
        setName("");
        setImageUrl("");
        setRadioButton("");
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  }

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  }

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}>

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
          onSubmit={handleAddItemSubmit}
        >
          <label className="modal__label">
            Name
            <input
              className="modal__input"
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
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
                checked={radioButton === "hot"}
                onChange={(e) => setRadioButton(e.target.value)}
              />
              <span>Hot</span>
            </label>

            <label className="modal__label modal__label_type_radio">
              <input
                className="modal__radio-button"
                type="radio"
                name="weather"
                value="warm"
                checked={radioButton === "warm"}
                onChange={(e) => setRadioButton(e.target.value)}
              />
              <span>Warm</span>
            </label>

            <label className="modal__label modal__label_type_radio">
              <input
                className="modal__radio-button"
                type="radio"
                name="weather"
                value="cold"
                checked={radioButton === "cold"}
                onChange={(e) => setRadioButton(e.target.value)}
              />
              <span>Cold</span>
            </label>
          </fieldset>

        </ModalWithForm>
      </div>
    </CurrentTemperatureUnitContext.Provider>

  );
};


export default App;
