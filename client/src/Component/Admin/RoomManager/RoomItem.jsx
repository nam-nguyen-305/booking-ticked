import React, { useEffect, useState } from 'react';
import ModalEditRoom from './ModalEditRoom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClock,
    faTags,
    faEdit,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Popup from "reactjs-popup";
// import "./style.scss";
function RoomItem({ room, handleDelete }) {
    const id = room._id

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
                    {close => <ModalEditRoom room={room} close={close} />}
                </Popup>

                <button className="movie__btn delete" onClick={() => handleDelete(id)}>Xóa <FontAwesomeIcon icon={faTimes} /></button>
            </div>
            <div className="food-thump">
                <img src={require("../../../statics/image/theater.png")} />
            </div>

            <div className="food-content">
                <div className="food-title">{room.name}</div>
                <h5 className="food-title">
                    Hàng:  {room.rows}
                </h5>
                <h5 className="food-title">
                    Cột:  {room.cols}
                </h5>
            </div>
        </div>
    );
}

export default RoomItem;