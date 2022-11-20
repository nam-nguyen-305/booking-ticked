import React from 'react';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
// import Select from 'react-select';
import { Form } from "react-bootstrap"
import { addFood } from "../../../store/slice/AdminSlice"
import { fetchFood } from "../../../store/slice/BookingSlice"
import { toast } from "react-toastify";

function ModalAddFood({ close }) {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [img, setImg] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState('')
    const [count, setCount] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newFood = {
            name: name,
            img: img,
            desc: desc,
            price: price,
            count: parseInt(count),
        }
        await dispatch(addFood(newFood))
        toast.success("Đã cập nhật thông tin món ăn!", {
            position: "top-right",
            autoClose: 2500,
        });
        dispatch(fetchFood());
        close()
    }

    return (
        <>
            <h1 className="admin__form-title">Thêm đồ ăn</h1>
            <Form className="form-modal-admin">
                <div className="d-flex form-wrapper">
                    <Form.Group className='col-lg-6 form-gr' controlId="name">
                        <Form.Label className='form-label'>Tên đồ ăn :</Form.Label>
                        <Form.Control
                            className='form-input'
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className='col-lg-6 form-gr' controlId="img">
                        <Form.Label className='form-label'>Ảnh :</Form.Label>
                        <Form.Control
                            className='form-input'
                            type="text"
                            name="img"
                            value={img}
                            onChange={(e) => setImg(e.target.value)}
                        />
                    </Form.Group>

                </div>
                <div className="d-flex form-wrapper">

                    <Form.Group className='col-lg-6 form-gr' controlId="price">
                        <Form.Label className='form-label'>Giá tiền :</Form.Label>
                        <Form.Control
                            className='form-input'
                            type="text"
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className='col-lg-6 form-gr' controlId="count">
                        <Form.Label className='form-label'>Số lương :</Form.Label>
                        <Form.Control
                            className='form-input'
                            type="text"
                            name="count"
                            value={count}
                            onChange={(e) => setCount(e.target.value)}
                        />
                    </Form.Group>


                </div>
                <div className="d-flex form-wrapper">
                    <Form.Group className='col-lg-6 form-gr' controlId='form-gr'>
                        <Form.Label className='form-label'>Mô tả :</Form.Label>
                        <Form.Control
                            className='form-input'
                            type="text"
                            name="summary"
                            as="textarea" rows={3}
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </Form.Group>
                </div>


            </Form>
            <button className="btn_submit mt-5" type="submit" size="lg" onClick={handleSubmit}>Lưu</button>
        </>
    )
}

export default ModalAddFood;
