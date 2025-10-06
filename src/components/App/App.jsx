import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Profile from "../../Pages/Profile.jsx";
import Main from "../Main/Main.jsx";

// Components
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import MyConfirmationModal from "../ConfirmationModal/ConfirmationModal.jsx";

// Contexts
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

// Utils
import { defaultClothingItems } from "../../utils/clothingItems.js";
import { getWeatherData, extractWeatherData } from "../../utils/weatherApi.js";
import { addItem, getItems, deleteItem } from "../../utils/api.js";

// Styles
import "./App.css";
import "../../vendor/normalize.css";
import "../../vendor/fonts.css";
import "../../styles/ui-kit.css";



const App = () => {
  console.log("App component rendered - timestamp:", Date.now());
  const [clothingItems, setClothingItems] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  console.log("Current activeModal state:", activeModal);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [radioButton, setRadioButton] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  console.log("Current activeModal:", activeModal);
  console.log("selectedCard:", selectedCard);
  console.log("ItemModal should be open:", activeModal === "item");



  const handleCardClick = (card) => {
    console.log("handleCardClick called with:", card);
    console.log("Setting selectedCard and activeModal to 'item'");
    console.log('Setting active modal to :', "item");
    console.log('Setting selected card to:', card);
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

  const openConfirmationModal = () => {
    console.log("openConfirmationModal called - should open confirmation modal");
    console.log("Setting activeModal to 'confirmation'")
    setActiveModal("confirmation");
  };

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

  const handleDeleteItem = () => {
  if (!selectedCard?._id)  return;

   deleteItem(selectedCard._id)

      .then(() => {
      // remove the deleted item from state
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedCard._id)
        );
        setSelectedCard(null);
        setActiveModal(""); // close modal
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => {
        console.log("Items fetched from API:", items);
        setClothingItems(items);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, [])


  console.log("Weather data in App:", weatherData);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >

      <Router>
        <div className="app-container">
          <Header onAddClick={handleAddClick} />

          <Routes>
            <Route
             path="/" 
             element={
              <Main items={clothingItems}
               onCardClick={handleCardClick} 
               weatherData={weatherData} />
            } />

            <Route path="/profile" 
            element={
            <Profile 
            clothingItems={clothingItems}
            onAddClick={handleAddClick}
            onCardClick={handleCardClick}
             />
             } />
          </Routes>
          <Footer />

          <ItemModal
            isOpen={activeModal === "item"}
            onClose={handleCloseModal}
            card={selectedCard}
            onDelete={openConfirmationModal}
          />
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

          <MyConfirmationModal
            show={activeModal === "confirmation"}
            onClose={handleCloseModal}
            message={"Are you sure you want to delete this item?\nThis action is irreversible."}
            onConfirm={handleDeleteItem}
          />

        </div>
      </Router>
    </CurrentTemperatureUnitContext.Provider>

  );
};


export default App;
