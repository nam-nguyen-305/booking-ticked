import React, { useState, useEffect } from 'react';
import { Form } from "react-bootstrap"
import { addShowtime, getListShowtime } from "../../../../store/slice/AdminSlice"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify";

function ShowtimeItem({ day, showtime, room, movie }) {
    const dispatch = useDispatch()
    const listShowtime = showtime.filter(item => item.day === day);
    console.log(room)


    const [isEditForm, setIsEditForm] = useState(false)
    const [startAt, setStartAt] = useState('')
    const [endAt, setEndAt] = useState('')
    const [roomSelected, setRoomSelected] = useState('')
    listShowtime.sort()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newShowtime = {
            startAt: startAt,
            endAt: endAt,
            roomId: roomSelected,
            movieId: movie._id,
            day: day
        }
        await dispatch(addShowtime(newShowtime))
        toast.success("Product has been added", {
            position: "top-right",
            autoClose: 2500,
        });
        setIsEditForm(false)
        dispatch(getListShowtime(movie.slug));
    }
    const handleAdd = () => {
        setIsEditForm(true)
    }
    const test = (roomName) => {
        return listShowtime.filter(item => item.room.name === roomName)
    }
    return (
        <div className="showtime__wrapper">

            {isEditForm ?
                <Form className="form-modal-admin mt-5">
                    <div className="d-flex form-wrapper align-items-center" >
                        <Form.Group className='col-lg-3 form-gr' controlId="startAt">
                            <Form.Label className='form-label'>Giờ bắt đầu :</Form.Label>
                            <Form.Control
                                className='form-input'
                                type="text"
                                name="startAt"
                                value={startAt}
                                onChange={(e) => setStartAt(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='col-lg-3 form-gr' controlId="endAt">
                            <Form.Label className='form-label'>Giờ kết thúc :</Form.Label>
                            <Form.Control
                                className='form-input'
                                type="text"
                                name="endAt"
                                value={endAt}
                                onChange={(e) => setEndAt(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className='col-lg-3 form-gr' controlId="roomSelected">
                            <Form.Label className='form-label'>Phòng</Form.Label>
                            <Form.Select
                                className='form-input'
                                name="roomSelected"
                                value={roomSelected}
                                onChange={(e) => setRoomSelected(e.target.value)}
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
                                <span>{roomItem.name}</span>
                                <div className="showtime-list">
                                    {test(roomItem.name).length > 0 ? test(roomItem.name).map((item, index) => (
                                        <div key={index} className="showtime-list_item special">{item.startAt} - {item.endAt}</div>
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