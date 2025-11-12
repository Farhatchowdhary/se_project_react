import React from "react";
import "./ItemModal.css";

const ItemModal = ({ isOpen, onClose, card, onDelete, currentUser }) => {
    console.log(isOpen)

    // Checking if the current user is the owner of the current clothing item
    const isOwn = card?.owner === currentUser?._id;

    // Creating a variable which you'll then set in `className` for the delete button
    const itemDeleteButtonClassName = (
        `modal__delete-button ${isOwn ? '' : 'modal__delete-button_hidden'}`
    );
    return (
        <div className={`modal ${isOpen ? 'modal_is-opened' : ''}`} onClick={onClose}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <button className="modal__close" onClick={onClose}></button>
               
                {card && (
                    <div className="modal__image-wrapper">
                  <img src={card.imageUrl} alt={card.name} className="modal__image" />
                         <button className={itemDeleteButtonClassName} onClick={onDelete}>Delete item</button>
                        <h2 className="modal__title">{card.name}</h2>
                        <p className="modal__description">{card.description}</p>
                        {card.weather && <p className="modal-weather__name">Weather: {card.weather}</p>}
                   
                    </div>
                    
                )}
                
            </div>
        </div>
    );
};

export default ItemModal;
