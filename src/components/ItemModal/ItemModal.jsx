import React from "react";
import "./ItemModal.css";

const ItemModal = ({ isOpen, onClose, card }) => {
    console.log(isOpen)
    return (
        <div className={`modal ${isOpen ? 'modal_is-opened' : ''}`} onClick={onClose}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <button className="modal__close" onClick={onClose}>X</button>
                {card && (
                    <div className="modal__image-wrapper">
                        <img src={card.link} alt={card.name} className="modal__image" />
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
