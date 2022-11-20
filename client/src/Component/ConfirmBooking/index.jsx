import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import PaymentOption from "../PaymentOption"
import FormGroup from "../FormGroup"
import { regex_email, regex_phone, regex_name } from '../../const/regex'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from "formik";
import * as Yup from 'yup'
import {
    VISA
} from "../../const/payment-method"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleLeft
} from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import { fetchFood, postTicked } from "../../store/slice/BookingSlice"
import Food from "../Food"
import { Loading } from "../Loading"
import "./style.scss";

function BookingConfirm() {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const ticked = location.state.ticked
    const totalPrice = location.state.totalPrice
    const bookingInfo = location.state.bookingInfo
    const auth = JSON.parse(localStorage.getItem("userInfo"));
    const [isLoading, setIsLoading] = useState(false)

    const [editMode, setEditMode] = useState(false)
    const [selectPaymentMethod, setSelectPaymentMethod] = useState(VISA)
    const [listFoodAdded, setListFoodAdded] = useState([])

    const [newInfo, setNewInfo] = useState({
        email: auth.email,
        fullname: auth.fullname,
        phone: auth.phone,
    })
    const listFood = useSelector((state) => state.booking.food.data);

    useEffect(() => {
        dispatch(fetchFood());
    }, []);

    const sumArray = (arr) => {
        let sum = 0;
        arr.map(function (value) {
            sum += value;
        });
        return sum;
    }


    let totalFood
    let foodList
    if (listFoodAdded.length > 0) {
        const arrTotal = listFoodAdded.map(item => item.totalFoodPrice)
        totalFood = sumArray(arrTotal)
        foodList = listFoodAdded.map(item => `${item.foodItem.name} x${item.quantity}`)
        foodList = foodList.join(', ')
    }

    let total = totalFood ? totalPrice + totalFood : totalPrice
    const handleSelectPaymentMethod = (payment) => {
        setSelectPaymentMethod(payment)
    }

    const addFoodToTicked = (id, quantity) => {
        let checkExisted = listFoodAdded.some(item => item.foodItem._id === id);
        const foodItem = listFood.food.find(food => food._id === id);
        const newQuantity = quantity != 0 ? quantity : 1
        const totalFoodPrice = newQuantity * parseInt(foodItem.price)
        const newFoodItem = { ...foodItem, quantity: newQuantity, totalFoodPrice: totalFoodPrice }
        if (!checkExisted) {
            setListFoodAdded([...listFoodAdded, { foodItem: newFoodItem, quantity: newQuantity, totalFoodPrice: totalFoodPrice }]);
        }
    }
    console.log(totalPrice)
    const formik = useFormik({
        initialValues: {
            email: auth.email,
            fullname: auth.fullname,
            phone: auth.phone,
        },
        validationSchema: Yup.object({
            email:
                Yup.string()
                    .required("Vui lòng nhập Email")
                    .matches(regex_email, "Email không hợp lệ!"),
            fullname:
                Yup.string()
                    .required("Vui lòng nhập họ và tên")
                    .matches(regex_name, "Họ và tên không hợp lệ")
                    .max(50, "Max length reached"),
            phone:
                Yup.string()
                    .required("Vui lòng nhập Số điện thoại")
                    .matches(regex_phone, "Không tìm thấy số điện thoại"),
        }),
        onSubmit: () => {
            setNewInfo({ ...formik.values })
            setEditMode(false)
        },
    });

    const submitPayment = () => {

        const tickedPayload = {
            movieName: bookingInfo.movie.name,
            category: bookingInfo.movie.category,
            time: bookingInfo.movie.time,
            date: bookingInfo.showtime.day,
            startAt: bookingInfo.showtime.startAt,
            room: bookingInfo.showtime.room.name,
            listSeat: ticked.join(" "),
            totalSeat: ticked.length,
            food: foodList ? foodList : '',
            totalPriceFood: totalFood ? totalFood.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) : '',
            totalPrice: total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }),
            user: newInfo.fullname,
            phone: newInfo.phone,
            email: newInfo.email,

        }
        navigate('/payment', {
            state: { tickedPayload: tickedPayload, typePayment: selectPaymentMethod, slug: bookingInfo.movie.slug }
        })
    }

    let backgroundStyle = {
        backgroundImage: `url(${bookingInfo.movie.banner})`,
    }

    return (
        <div className="booking__banner" style={backgroundStyle}>
            <section className="booking__banner-wrapper">
                <Container>
                    <div className="booking__content">
                        <h3 className="title">{bookingInfo.movie.name}</h3>
                        <div className="tag">
                            <span className="language">{bookingInfo.movie.language}</span>
                            <span className="category">{bookingInfo.movie.category}</span>
                        </div>
                    </div>

                </Container>
            </section>
            <section className="booking__info">
                <Container>
                    <div className="booking__info-area">
                        <button className="button__back" onClick={() => navigate(-1)}>
                            <FontAwesomeIcon icon={faCircleLeft} />
                            <span>Chọn lại</span>
                        </button>
                        <div className="date-time">
                            <span className="date">{bookingInfo.showtime.day}</span>
                            <span className="time">{bookingInfo.showtime.startAt}</span>
                        </div>
                        <div className="endtime">
                            <small>TIME LEFT</small>
                            <span>{bookingInfo.showtime.endAt}</span>
                        </div>
                    </div>
                </Container>
            </section>
            <section className="bill">
                <Container>
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="bill-widget">
                                <h5 className="title">Thông tin cá nhân</h5>
                                <Form className="form-style" onSubmit={formik.handleSubmit}>
                                    <FormGroup
                                        label={'Họ và tên'}
                                        id='fullname'
                                        type='fullname'
                                        name='fullname'
                                        placeholder='Nhập họ và tên'
                                        value={formik.values.fullname}
                                        handleChange={formik.handleChange}
                                        error={formik.errors.fullname}
                                        onClick={() => setEditMode(true)}
                                    />
                                    <FormGroup
                                        label={'Email'}
                                        id='email'
                                        type='email'
                                        name='email'
                                        placeholder='Nhập email của bạn'
                                        value={formik.values.email}
                                        handleChange={formik.handleChange}
                                        error={formik.errors.email}
                                        disabled={true}
                                        onClick={() => setEditMode(true)}

                                    />
                                    <FormGroup
                                        label={'Số điện thoại'}
                                        id='phone'
                                        type='text'
                                        name='phone'
                                        placeholder='Nhập số điện thoại'
                                        value={formik.values.phone}
                                        disabled={true}
                                        handleChange={formik.handleChange}
                                        error={formik.errors.phone}
                                        onClick={() => setEditMode(true)}
                                    />
                                    {editMode &&
                                        <div className="d-flex justify-content-center align-items-center mt-3">
                                            <Button type="submit" className="btn_submit btn text-center" size="lg">Lưu lại</Button>
                                        </div>
                                    }
                                </Form>
                            </div>
                            <div className="bill-widget">
                                <h5 className="title">Phương thức thanh toán</h5>
                                <PaymentOption handleSelectPaymentMethod={handleSelectPaymentMethod} selectPaymentMethod={selectPaymentMethod} />
                            </div>
                            <div className="d-flex justify-content-between flex-wrap">
                                {listFood ? listFood.food.map(food =>
                                    <div className="col-lg-6 ">
                                        <Food food={food} addToTicked={addFoodToTicked} listFoodAdded={listFoodAdded} setListFoodAdded={setListFoodAdded} />
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="bill-ticked-info">
                                <h4 className="title">VÉ CỦA BẠN</h4>
                                <img src={bookingInfo.movie.img} />
                                <ul>
                                    <li className="d-flex align-items-center justify-content-center">
                                        <h6 className="title">{bookingInfo.movie.name}</h6>
                                    </li>
                                    <li className="d-flex align-items-center justify-content-between">
                                        <h6 className="subtitle">Thể loại</h6>
                                        <span className="infoo">{bookingInfo.movie.category}</span>
                                    </li>
                                    <li className="d-flex align-items-center justify-content-between">
                                        <h6 className="subtitle">
                                            Giờ chiếu
                                        </h6>
                                        <span>{bookingInfo.showtime.startAt}</span>

                                    </li>
                                    <li className="d-flex align-items-center justify-content-between">
                                        <h6 className="subtitle">
                                            Phòng chiếu
                                        </h6>
                                        <span>Phòng số {bookingInfo.showtime.room.name}</span>
                                    </li>
                                    <li className="d-flex align-items-center justify-content-between">
                                        <h6 className="subtitle">
                                            Ghế:
                                        </h6>
                                        <span>{ticked.join(", ")}</span>
                                    </li>
                                    {listFoodAdded.length > 0 ?
                                        <>
                                            <li className="d-flex align-items-start justify-content-between">
                                                <h6 className="subtitle">
                                                    Đồ ăn:
                                                </h6>
                                                <div>

                                                    {listFoodAdded.map(item =>
                                                        <div>{item.foodItem.name}</div>
                                                    )}
                                                </div>
                                            </li>
                                            <li className="d-flex align-items-start justify-content-between">
                                                <h6 className="subtitle">
                                                    Tiền đồ ăn:
                                                </h6>
                                                <span>{totalFood.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
                                            </li>
                                        </>
                                        : null
                                    }
                                    <li className="d-flex align-items-center justify-content-between">
                                        <h6 className="subtitle">
                                            Tiền vé:
                                        </h6>
                                        <span>{totalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bill-confirm-btn">
                                <div className="wrapper d-flex align-items-center justify-content-between">
                                    <h6 className="bill-total">
                                        Tổng tiền:
                                    </h6>
                                    <span>
                                        {total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                    </span>
                                </div>
                                <button className="btn_submit mt-4" onClick={() => submitPayment()}>Xác nhận thanh toán</button>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
            <Loading isLoading={isLoading} />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

        </div>
    );
}

export default BookingConfirm;