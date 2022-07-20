import React, { useEffect, useState } from 'react';
import ModalEditFood from './ModalEditFood'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClock,
    faTags,
    faEdit,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Popup from "reactjs-popup";
// import "./style.scss";
function FoodItem({ food, handleDelete }) {
    const id = food._id
    const price = parseInt(food.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

    return (
        <div className="food">
            <div className="movie__action-wrapper">
                <Popup modal
                    trigger=
                    {
                        <button className="movie__btn edit">
                            Sửa
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                    }>
                    {close => <ModalEditFood food={food} close={close} />}
                </Popup>

                <button className="movie__btn delete" onClick={() => handleDelete(food._id)}>Xóa <FontAwesomeIcon icon={faTimes} /></button>
            </div>
            <div className="food-thump">
                <img src={food.img} />
                <div className="offer-tag">
                    <span>{price}</span>
                </div>
            </div>
            <div className="food-content">
                <h5 className="food-title">
                    {food.name}
                </h5>
            </div>
        </div>
    );
}

export default FoodItem;