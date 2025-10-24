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
import Profile from "../../Pages/Profile/Profile.jsx";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import MyConfirmationModal from "../MyConfirmationModal/MyConfirmationModal.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";


// Styles
import "./App.css";
import "../../vendor/normalize.css";
import "../../vendor/fonts.css";
import "../../styles/ui-kit.css";

const App = () => {
  const [clothingItems, setClothingItems] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  console.log("Current activeModal state:", activeModal);
  const [selectedCard, setSelectedCard] = useState(null);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [radioButton, setRadioButton] = useState("");
  const [likedItems, setLikedItems] = useState(new Set());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  // Fetch clothing items from backend
  useEffect(() => {
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

  const handleCardLike = ({ id, isLiked }) => {
    console.log("Like clicked:", { id, isLiked });

    setLikedItems((prevLikedItems) => {
      const newLikedItems = new Set(prevLikedItems);
      if (isLiked) {
        // If currently liked, remove it (unlike)
        newLikedItems.delete(id);
      } else {
        // If not liked, add it (like)
        newLikedItems.add(id);
      }
      return newLikedItems;
    });
  };

  const handleCloseModal = () => setActiveModal("");


  const handleAddClick = () => {
    console.log("ADD BUTTON CLICKED!");
    setActiveModal("add-garment");
  };

  const handleAddItemSubmit = (e) => {
     e.preventDefault();
     
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

    deleteItem(selectedCard._id, getToken())
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
      .then(() => auth.authorize(email, password)) // immediate login after signup
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          return auth.getUserInfo(res.token);
        }
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        setActiveModal(""); // close RegisterModal
      })
      .catch((err) => console.error("Registration/Login error:", err));
  };



  const handleLogin = ({ email, password }) => {
    console.log("Hello");
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

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleUpdateProfile = (profileData) => {
    setCurrentUser(profileData);

    closeActiveModal();
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
                    onCardLike={handleCardLike}
                    weatherData={weatherData}
                    likedItems={likedItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  isLoggedIn ? (
                    <Profile
                      clothingItems={clothingItems}
                      onAddItemClick={handleAddClick}
                      onCardClick={handleCardClick}
                      weatherData={weatherData}
                      likedItems={likedItems}
                      onCardLike={handleCardLike}
                       onEditProfileClick={handleEditProfileClick}
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
              onLogin={handleLogin}
            />

            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onClose={handleCloseModal}
              onUpdateProfile={handleUpdateProfile}
            />

            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onAddItem={handleAddItemSubmit}  
              onCloseModal={handleCloseModal}  
              name={name}                      
              setName={setName}              
              imageUrl={imageUrl}            
              setImageUrl={setImageUrl}       
              radioButton={radioButton}       
              setRadioButton={setRadioButton} 
            />

          </div>
        </Router>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
};

export default App;
