import React, { useEffect, useState } from 'react';
import { Container } from "react-bootstrap";
import { Modal } from 'antd';
import Popup from "reactjs-popup";
import PopupTicked from "./popup-ticked"
import { useDispatch, useSelector } from "react-redux"
import { fetchListTicked } from "../../store/slice/BookingSlice"
import "./style.scss"
function ListTicked() {
    const dispatch = useDispatch();
    const listTicked = useSelector((state) => state.booking.listTicked.data);
    const auth = JSON.parse(localStorage.getItem("userInfo"));
    const email = auth.email

    useEffect(() => {
        dispatch(fetchListTicked(email));
    }, [email]);
    return (
        <Container>
            {
                listTicked &&
                <div className="list-ticked">
                    <table>
                        <thead>
                            <tr className="list-ticked__head">
                                <th>Tên phim</th>
                                <th className="seat-width">Hàng ghế</th>
                                <th>Đồ ăn</th>
                                <th>Ngày/Giờ</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                                <th>Chi tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listTicked.ticked.length > 0
                                    ?
                                    listTicked.ticked.map((item, index) => (
                                        <tr className="list-ticked__item" key={index}>
                                            <td>
                                                {item.movieName}
                                            </td>
                                            <td>
                                                {item.listSeat}
                                            </td>
                                            <td>
                                                {item.food}
                                            </td>
                                            <td>
                                                {`${item.date}/${item.startAt}`}
                                            </td>
                                            <td>
                                                {item.totalPrice}
                                            </td>
                                            <td>
                                                {item.status === 1 ? <h4>Đã thanh toán</h4> : <h4>Đang chờ</h4>}
                                            </td>
                                            <td>
                                                <Popup modal
                                                    trigger=
                                                    {
                                                        <button className="">
                                                            Chi tiết
                                                        </button>
                                                    }>
                                                    {close => <PopupTicked ticked={item} />}
                                                </Popup>
                                            </td>
                                        </tr>
                                    ))
                                    :
                                    <tr>
                                        <td className="text-center" colSpan={6}>Chưa có đơn hàng nào!</td>
                                    </tr>
                            }

                        </tbody>
                    </table>

                </div>
            }
        </Container>
    );
}

export default ListTicked;