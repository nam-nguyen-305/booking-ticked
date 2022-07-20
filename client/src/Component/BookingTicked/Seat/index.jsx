
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleLeft
} from "@fortawesome/free-solid-svg-icons";

import { SeatItem } from "./seat-item"
import "./style.scss"

function Seat({ listChosenSeat, addTicked, listPickingSeat, submitBooking }) {
    const arraySeat = Array.from({ length: 14 }, (_, i) => i + 1);
    const checkChosenSeat = seat => listChosenSeat.includes(seat)
    const displayListPickingSeat = listPickingSeat.join(", ")
    let totalPrice = listPickingSeat.length * 50000
    totalPrice = totalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    return (
        <section className="seat-wrapper">
            <Container>
                <ul className="seat-area">
                    <li className="seat-line">
                        <span>H</span>
                        <div className="d-flex justify-content-center">
                            {arraySeat.map(item =>
                            (
                                <SeatItem title={`H${item}`} checkChosenSeat={checkChosenSeat} addTicked={addTicked} listPickingSeat={listPickingSeat} />
                            )
                            )}
                        </div>
                        <span>H</span>
                    </li>
                    <li className="seat-line">
                        <span>G</span>
                        <div className="d-flex justify-content-center">
                            {arraySeat.map(item =>
                            (
                                <SeatItem title={`G${item}`} checkChosenSeat={checkChosenSeat} addTicked={addTicked} listPickingSeat={listPickingSeat} />
                            )
                            )}
                        </div>
                        <span>G</span>
                    </li>
                    <li className="seat-line">
                        <span>F</span>
                        <div className="d-flex justify-content-center">
                            {arraySeat.map(item =>
                            (
                                <SeatItem title={`F${item}`} checkChosenSeat={checkChosenSeat} addTicked={addTicked} listPickingSeat={listPickingSeat} />
                            )
                            )}
                        </div>
                        <span>F</span>
                    </li>
                    <li className="seat-line">
                        <span>E</span>
                        <div className="d-flex justify-content-center">
                            {arraySeat.map(item =>
                            (
                                <SeatItem title={`E${item}`} checkChosenSeat={checkChosenSeat} addTicked={addTicked} listPickingSeat={listPickingSeat} />
                            )
                            )}
                        </div>
                        <span>E</span>
                    </li>
                    <li className="seat-line">
                        <span>D</span>
                        <div className="d-flex justify-content-center">
                            {arraySeat.map(item =>
                            (
                                <SeatItem title={`D${item}`} checkChosenSeat={checkChosenSeat} addTicked={addTicked} listPickingSeat={listPickingSeat} />
                            )
                            )}
                        </div>
                        <span>D</span>
                    </li>
                    <li className="seat-line">
                        <span>C</span>
                        <div className="d-flex justify-content-center">
                            {arraySeat.map(item =>
                            (
                                <SeatItem title={`C${item}`} checkChosenSeat={checkChosenSeat} addTicked={addTicked} listPickingSeat={listPickingSeat} />
                            )
                            )}
                        </div>
                        <span>C</span>
                    </li>
                    <li className="seat-line">
                        <span>B</span>
                        <div className="d-flex justify-content-center">
                            {arraySeat.map(item =>
                            (
                                <SeatItem title={`B${item}`} checkChosenSeat={checkChosenSeat} addTicked={addTicked} listPickingSeat={listPickingSeat} />
                            )
                            )}
                        </div>
                        <span>B</span>
                    </li>
                    <li className="seat-line">
                        <span>A</span>
                        <div className="d-flex justify-content-center">
                            {arraySeat.map(item =>
                            (
                                <SeatItem title={`A${item}`} checkChosenSeat={checkChosenSeat} addTicked={addTicked} listPickingSeat={listPickingSeat} />
                            )
                            )}
                        </div>
                        <span>A</span>
                    </li>

                </ul>
                <div className="proceed-booking">
                    <div className="proceed-to-book">
                        <div className="book-item picking-seat">
                            <span>Ghế đã chọn</span>
                            {displayListPickingSeat ? (

                                <h3 className="title">{displayListPickingSeat}</h3>
                            ) : (<div></div>)}
                        </div>
                        <div className="book-item">
                            <span>Tổng tiền</span>
                            <h3 className="title">{totalPrice}</h3>
                        </div>
                        <div className="book-item">
                            <button className="submit-booking-btn" onClick={() => submitBooking()}>
                                Đặt vé
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}

export default Seat;