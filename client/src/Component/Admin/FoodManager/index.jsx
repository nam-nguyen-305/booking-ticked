import React from 'react';
import { useEffect } from "react";
import { Modal } from 'antd';
// import ModalAction from "../Modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus
} from "@fortawesome/free-solid-svg-icons";
import ModalAddFood from "./ModalAddFood"
import FoodItem from "./FoodItem"
import Popup from "reactjs-popup";
import { useDispatch, useSelector } from "react-redux"
import { fetchFood } from "../../../store/slice/BookingSlice"
import { deleteFood } from "../../../store/slice/AdminSlice"
import "./style.scss";
const { confirm } = Modal;

function FoodManager() {
    const dispatch = useDispatch();
    const listFood = useSelector((state) => state.booking.food.data);
    useEffect(() => {
        dispatch(fetchFood());
    }, []);

    const handleDelete = (id) => {
        confirm({
            title: 'Delete this products?',
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            async onOk() {
                await dispatch(deleteFood(id))
                dispatch(fetchFood());

            },
        });
    }

    return (
        <section className="movie-manager">
            <Popup modal
                trigger=
                {
                    <button className="movie-manager__add-btn">
                        Thêm đồ ăn <FontAwesomeIcon icon={faPlus} />
                    </button>
                }>
                {close => <ModalAddFood close={close} />}
            </Popup>
            <div className="movie-manager__main d-flex flex-wrap justify-content-start">
                {listFood && listFood.food.map(item =>
                    <div className="col-lg-3 m-lg-5">
                        <FoodItem food={item} handleDelete={handleDelete} />
                    </div>
                )}
            </div>
        </section>
    );
}

export default FoodManager;
