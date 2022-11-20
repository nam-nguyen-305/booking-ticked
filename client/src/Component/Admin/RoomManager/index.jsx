import React from 'react';
import { useEffect } from "react";
import { Modal } from 'antd';
// import ModalAction from "../Modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus
} from "@fortawesome/free-solid-svg-icons";
import ModalAddRoom from "./ModalAddRoom"
import RoomItem from "./RoomItem"
import Popup from "reactjs-popup";
import { useDispatch, useSelector } from "react-redux"
import { getListRoom, deleteRoom } from "../../../store/slice/AdminSlice"
import "./style.scss";
const { confirm } = Modal;

function RoomManager() {
    const dispatch = useDispatch();
    const listRoom = useSelector((state) => state.admin.listRoom.room);
    useEffect(() => {
        dispatch(getListRoom());
    }, []);
    console.log(listRoom)
    const handleDelete = (id) => {
        confirm({
            title: 'Bạn muốn xóa phòng này?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            async onOk() {
                await dispatch(deleteRoom(id))
                dispatch(getListRoom());

            },
        });
    }

    return (
        <section className="movie-manager">
            <Popup modal
                trigger=
                {
                    <button className="movie-manager__add-btn">
                        Thêm phòng chiếu <FontAwesomeIcon icon={faPlus} />
                    </button>
                }>
                {close => <ModalAddRoom close={close} />}
            </Popup>
            <div className="movie-manager__main d-flex flex-wrap justify-content-start">
                {listRoom && listRoom.map(item =>
                    <div className="col-lg-3 m-lg-5">
                        <RoomItem room={item} handleDelete={handleDelete} />
                    </div>
                )}
            </div>
        </section>
    );
}

export default RoomManager;
