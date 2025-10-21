import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Utils
import { getToken } from "../../utils/auth.js";
import { defaultClothingItems } from "../../utils/clothingItems.js";
import { getWeatherData } from "../../utils/weatherApi.js";
import { addItem, getItems, deleteItem } from "../../utils/api.js";
import * as auth from "../../utils/auth.js";
// Contexts
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

// Pages & Components
import Main from "../Main/Main.jsx";
import Profile from "../../../Pages/Profile/Profile.jsx";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import MyConfirmationModal from "../MyConfirmationModal/MyConfirmationModal.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";


// Styles
import "./App.css";
import "../../vendor/normalize.css";
import "../../vendor/fonts.css";
import "../../styles/ui-kit.css";

const App = () => {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [weatherData, setWeatherData] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  console.log("Current activeModal state:", activeModal);
  const [selectedCard, setSelectedCard] = useState(null);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [radioButton, setRadioButton] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  // Fetch clothing items from backend
  useEffect(() => {
    const token = getToken();
    if (!token) return;

    getItems()
      .then((response) => {
        console.log("Fetched items:", response);
        const items = response.data || response;
        setClothingItems(items);
      })
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  // Fetch weather data
  useEffect(() => {
    getWeatherData()
      .then(setWeatherData)
      .catch((err) => console.error("Error fetching weather:", err));
  }, []);

  // Check logged-in user
  useEffect(() => {
    const jwt = getToken();
    if (!jwt) return;

    // If you have getUserInfo function in auth.js
    auth.getUserInfo(jwt)
      .then(({ username, email }) => {
        setIsLoggedIn(true);
        setCurrentUser({ username, email });
      })
      .catch(console.error);
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("item");
  };

  const handleCloseModal = () => setActiveModal("");

  const handleAddClick = () => setActiveModal("add-garment");

  const handleAddItemSubmit = () => {
    const newItem = { name, imageUrl, weather: radioButton };

    addItem(newItem)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
        setActiveModal("");
        setName("");
        setImageUrl("");
        setRadioButton("");
      })
      .catch((err) => console.error("Error adding item:", err));
  };

  const handleToggleSwitchChange = () =>
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");

  const handleDeleteItem = () => {
    if (!selectedCard?._id) return;

    deleteItem(selectedCard._id)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== selectedCard._id)
        );
        setSelectedCard(null);
        setActiveModal("");
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  const handleRegistration = ({ name, avatar, email, password }) => {
    auth.register(name, avatar, email, password)
      .then((res) => {
        console.log("Registration successful:", res);
        setActiveModal("");
      })
      .catch((err) => {
        console.error("Registration error:", err);
      });
  };

  const handleLogin = ({ email, password }) => {
    auth.authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          return auth.getUserInfo(res.token);
        }
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        setActiveModal("");
      })
      .catch((err) => {
        console.error("Login error:", err);
      });
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <Router>
          <div className="app-container">
            <Header
              onAddClick={handleAddClick}
              onLoginClick={() => setActiveModal("login")}
              onRegisterClick={() => setActiveModal("register")}
              isLoggedIn={isLoggedIn}
              userData={currentUser}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    items={clothingItems}
                    onCardClick={handleCardClick}
                    weatherData={weatherData}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  isLoggedIn ? (
                    <Profile
                      clothingItems={clothingItems}
                      onAddClick={handleAddClick}
                      onCardClick={handleCardClick}
                      weatherData={weatherData}
                    />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
            </Routes>

            <Footer />

            <ItemModal
              isOpen={activeModal === "item"}
              onClose={handleCloseModal}
              card={selectedCard}
              onDelete={() => setActiveModal("confirmation")}
            />

            <ModalWithForm
              isOpen={activeModal === "add-garment"}
              onClose={handleCloseModal}
              name="add-garment"
              title="New Garment"
              buttonText="Add Garment"
              onSubmit={handleAddItemSubmit}
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
                <legend>Select the weather type:</legend>
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

            <MyConfirmationModal
              show={activeModal === "confirmation"}
              onClose={handleCloseModal}
              message={
                "Are you sure you want to delete this item?\nThis action is irreversible."
              }
              onConfirm={handleDeleteItem}
            />



            <RegisterModal
              isOpen={activeModal === "register"}
              handleRegistration={handleRegistration}  // Use the new function
              onClose={handleCloseModal}
            />

            <LoginModal
              isOpen={activeModal === "login"}
              onClose={handleCloseModal}
              onLogin={handleLogin}  // Use the new function
            />

          </div>
        </Router>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
};

export default App;
