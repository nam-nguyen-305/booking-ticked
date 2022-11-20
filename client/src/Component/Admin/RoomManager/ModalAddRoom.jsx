import React from 'react';
import { useState } from "react";
import { useDispatch } from "react-redux"
import { Form } from "react-bootstrap"
import { addRoom, getListRoom } from "../../../store/slice/AdminSlice"
import { toast } from "react-toastify";

function ModalAddRoom({ close }) {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [rows, setRows] = useState('')
    const [cols, setCols] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newRoom = {
            name: name,
            rows: rows,
            cols: cols,
        }
        await dispatch(addRoom(newRoom))
        toast.success("Thêm phòng thành công!", {
            position: "top-right",
            autoClose: 2500,
        });
        dispatch(getListRoom());
        close()
    }

    return (
        <>
            <h1 className="admin__form-title">Thêm phòng chiếu</h1>
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

export default ModalAddRoom;
