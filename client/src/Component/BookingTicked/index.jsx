
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleLeft
} from "@fortawesome/free-solid-svg-icons";
import { fetchBookingInfo } from "../../store/slice/BookingSlice"
import Seat from "./Seat"
import "./style.scss"


function BookingTicked() {
    const location = useLocation()
    const payload = location.state
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const bookingInfo = useSelector((state) => state.booking.bookingInfo.data);
    const auth = JSON.parse(localStorage.getItem("userInfo"));
    const [listPickingSeat, setListPickingSeat] = useState([])
    let newListChosenSeat
    useEffect(() => {
        dispatch(fetchBookingInfo(payload));
    }, [payload]);

    let backgroundStyle
    if (bookingInfo) {
        backgroundStyle = {
            backgroundImage: `url(${bookingInfo.movie.banner})`,
        }
        const listChosenSeat = bookingInfo.ticked.map(item => item.listSeat.split(" "))
        newListChosenSeat = listChosenSeat.flat()
    }
    const checkChosenSeat = seat => newListChosenSeat.includes(seat)
    const checkListPickingSeat = (seat) => listPickingSeat.includes(seat)
    const addTicked = (item) => {
        let updateListPickingSeat = [...listPickingSeat]
        if (!checkChosenSeat(item)) {
            if (!checkListPickingSeat(item)) {
                updateListPickingSeat = [...listPickingSeat, item]
            } else {
                updateListPickingSeat.splice(listPickingSeat.indexOf(item), 1)
            }
        }
        setListPickingSeat(updateListPickingSeat)
    }
    const submitBooking = () => {

        if (auth) {
            navigate(`/booking/${bookingInfo.movie.slug}/confirm`, {
                state: { bookingInfo: bookingInfo, ticked: listPickingSeat }
            },
            )
        } else {
            navigate("/login")
        }
    }
    return (
        <>
            {bookingInfo &&
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
                    <section className="seat-plan">
                        <Container>
                            <div className="screen-area">
                                <h4 className="screen">
                                    theater
                                </h4>
                                <div className="screen-thump">
                                    <img src={require("../../statics/image/theater.png")} />
                                </div>
                            </div>
                        </Container>
                    </section>
                    <Seat listChosenSeat={newListChosenSeat} addTicked={addTicked} listPickingSeat={listPickingSeat} submitBooking={submitBooking} />
                </div>
            }
        </>
    );
}

export default BookingTicked;