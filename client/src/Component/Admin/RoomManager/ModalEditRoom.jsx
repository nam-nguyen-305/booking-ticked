import React from 'react';
import { useState } from "react";
import { useDispatch } from "react-redux"
import { Form } from "react-bootstrap"
import { updateRoom, getListRoom } from "../../../store/slice/AdminSlice"
import { toast } from "react-toastify";

function ModalEditRoom({ room, close }) {
    const dispatch = useDispatch()
    const [name, setName] = useState(room.name)
    const [rows, setRows] = useState(room.rows)
    const [cols, setCols] = useState(room.cols)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newRoom = {
            name: name,
            rows: rows,
            cols: cols,

        }
        const roomId = room._id
        await dispatch(updateRoom({ id: roomId, newRoom: newRoom }))
        toast.success("Đã cập nhật thông tin phòng!", {
            position: "top-right",
            autoClose: 2500,
        });
        dispatch(getListRoom());
        close()
    }

    return (
        <>
            <h1 className="admin__form-title">Sửa thông tin đồ ăn</h1>
            <Form className="form-modal-admin">
                <div className=" form-wrapper">
                    <Form.Group className=' form-gr' controlId="name">
                        <Form.Label className='form-label'>Tên phòng :</Form.Label>
                        <Form.Control
                            className='form-input'
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className=' form-gr' controlId="rows">
                        <Form.Label className='form-label'>Số hàng :</Form.Label>
                        <Form.Control
                            className='form-input'
                            type="text"
                            name="rows"
                            value={rows}
                            onChange={(e) => setRows(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className=' form-gr' controlId="cols">
                        <Form.Label className='form-label'>Số cột :</Form.Label>
                        <Form.Control
                            className='form-input'
                            type="text"
                            name="cols"
                            value={cols}
                            onChange={(e) => setCols(e.target.value)}
                        />
                    </Form.Group>
                </div>
            </Form>
            <button className="btn_submit mt-5" type="submit" size="lg" onClick={handleSubmit}>Lưu</button>
        </>
    )
}

export default ModalEditRoom;
