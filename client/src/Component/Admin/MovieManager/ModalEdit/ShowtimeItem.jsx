import React, { useState } from 'react';
import { Form } from "react-bootstrap"
import { Modal } from 'antd';
import { addShowtime, getListShowtime, deleteShowtime } from "../../../../store/slice/AdminSlice"
import { useDispatch } from "react-redux"
import { dayOfWeek } from '../../../../const/day-of-week'
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTimes,

} from "@fortawesome/free-solid-svg-icons";
const { confirm } = Modal;

function ShowtimeItem({ day, showtime, room, movie, listAllShowtimes }) {
    const dispatch = useDispatch()
    const listShowtime = showtime.filter(item => item.day === day);
    const listDay = dayOfWeek(10)

    const [isEditForm, setIsEditForm] = useState(false)
    const [startAt, setStartAt] = useState('')
    const [endAt, setEndAt] = useState('')
    const [newDay, setNewDay] = useState(listDay[0])
    const [roomSelected, setRoomSelected] = useState(room[0]._id)
    const [roomNameSelected, setRoomNameSelected] = useState(room[0].name)
    listShowtime.sort()
    const checkShowtimeExisted = (startAt, day, room) => {
        const check = listAllShowtimes.some(showtime => showtime.startAt === startAt && showtime.day === day && showtime.room.name === roomNameSelected)
        return check
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!checkShowtimeExisted(startAt, day, roomSelected)) {
            const newShowtime = {
                startAt: startAt,
                endAt: endAt,
                roomId: roomSelected,
                movieId: movie._id,
                day: newDay
            }
            await dispatch(addShowtime(newShowtime))
            toast.success("Suất chiếu đã được thêm!", {
                position: "top-right",
                autoClose: 2500,
            });
            setIsEditForm(false)
            dispatch(getListShowtime(movie.slug));
        } else {
            alert("Suất chiếu đã tồn tại")
        }
    }
    const handleAdd = () => {
        setIsEditForm(true)
    }
    const checkRoom = (roomName) => {
        return listShowtime.filter(item => item.room.name === roomName)
    }
    const deleteShowtimeById = (id) => {
        confirm({
            title: 'Bạn muốn xóa suất chiếu này?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            async onOk() {
                await dispatch(deleteShowtime(id))
                toast.success("Suất chiếu đã được xóa!", {
                    position: "top-right",
                    autoClose: 2500,
                });
                dispatch(getListShowtime(movie.slug));
            },
        });
    }
    return (
        <div className="showtime__wrapper">

            {isEditForm ?
                <Form className="form-modal-admin mt-5">
                    <div className="d-flex form-wrapper align-items-center" >
                        <Form.Group className='col-lg-2 form-gr' controlId="startAt">
                            <Form.Label className='form-label'>Giờ bắt đầu :</Form.Label>
                            <Form.Control
                                className='form-input'
                                type="text"
                                name="startAt"
                                value={startAt}
                                onChange={(e) => setStartAt(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='col-lg-2 form-gr' controlId="endAt">
                            <Form.Label className='form-label'>Giờ kết thúc :</Form.Label>
                            <Form.Control
                                className='form-input'
                                type="text"
                                name="endAt"
                                value={endAt}
                                onChange={(e) => setEndAt(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='col-lg-3 form-gr' controlId="daySelected">
                            <Form.Label className='form-label'>Ngày</Form.Label>
                            <Form.Select
                                className='form-input'
                                name="daySelected"
                                value={newDay}
                                onChange={(e) => setNewDay(e.target.value)}
                            >
                                {dayOfWeek(10).map((item) =>
                                    <option value={item}>{item}</option>
                                )}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='col-lg-3 form-gr' controlId="roomSelected">
                            <Form.Label className='form-label'>Phòng</Form.Label>
                            <Form.Select
                                className='form-input'
                                name="roomSelected"
                                value={roomSelected}
                                onChange={(e) => {
                                    setRoomSelected(e.target.value)
                                    setRoomNameSelected(e.target.options[e.target.selectedIndex].text)
                                }}
                            >
                                {room && room.map(item =>
                                    <option value={item._id}>{item.name}</option>
                                )}
                            </Form.Select>
                        </Form.Group>
                    </div>
                    <button className="btn_submit mt-5 " type="submit" size="lg" onClick={handleSubmit}>lưu</button>
                    <button className="btn_submit mt-5 delete ml-3" type="submit" size="lg" onClick={() => setIsEditForm(!isEditForm)}>Hủy</button>

                </Form>
                :
                <div className="room-wrapper">
                    {
                        room ? room.map(roomItem => (
                            <>
                                <span>Phòng số {roomItem.name}</span>
                                <div className="showtime-list">
                                    {checkRoom(roomItem.name).length > 0 ? checkRoom(roomItem.name).map((item, index) => (
                                        <div key={index} className="showtime-list_item special">
                                            {item.startAt} - {item.endAt}
                                            <div className='delete-btn' onClick={() => deleteShowtimeById(item._id)}>
                                                <FontAwesomeIcon icon={faTimes} />
                                            </div>
                                        </div>

                                    )) : <div className="room-default"></div>}
                                </div>
                            </>
                        ))
                            : null
                    }
                </div>
            }
            {!isEditForm ?
                <button className="btn_submit mt-5" type="submit" size="lg" onClick={handleAdd}>Thêm xuất chiếu</button>
                : null}
        </div>
    );
}

export default ShowtimeItem;