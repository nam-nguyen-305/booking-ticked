import React, { useEffect, useState } from 'react';

// import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCartArrowDown,

} from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
function Food({ food, addToTicked, listFoodAdded, setListFoodAdded }) {
    const id = food._id
    const [quantityFood, setQuantityFood] = useState(0)

    const increaseQuantityFood = () => {
        if (listFoodAdded) {
            listFoodAdded.forEach(item => {
                if (item.foodItem._id == id) {
                    item.quantity += 1
                    item.totalFoodPrice = parseInt(item.foodItem.price) * (item.quantity)
                }
            })
        }
        const newListFood = [...listFoodAdded]

        setListFoodAdded(newListFood)
        setQuantityFood(quantityFood + 1)
    }
    const decreaseQuantityFood = () => {
        if (listFoodAdded) {
            listFoodAdded.forEach((item, index) => {
                if (item.foodItem._id == id) {
                    if (item.quantity >= 1) {
                        item.quantity -= 1
                        item.totalFoodPrice = parseInt(item.foodItem.price) * (item.quantity)
                        setQuantityFood(quantityFood - 1)
                        const newListFood = [...listFoodAdded]

                        setListFoodAdded(newListFood)

                    } else {
                        const newListFood = [...listFoodAdded]
                        newListFood.splice(index, 1)
                        setListFoodAdded(newListFood)
                    }
                }
            })
        }

    }
    const price = parseInt(food.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

    return (
        <div className="food">
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
                <div className="food-action">
                    <div className="quantity-wrapper">
                        <div className="decrease" onClick={decreaseQuantityFood}>-</div>
                        <input type="text" className="food-quantity" value={quantityFood} />
                        <div className="increase" onClick={increaseQuantityFood}>+</div>
                    </div>
                    <button className="add-btn" onClick={() => {
                        addToTicked(id, quantityFood)
                        if (quantityFood == 0) {
                            setQuantityFood(quantityFood + 1)
                        }
                    }}><FontAwesomeIcon icon={faCartArrowDown} />Thêm</button>
                </div>
            </div>
        </div>
    );
}

export default Food;