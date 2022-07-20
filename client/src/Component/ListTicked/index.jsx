import React, { useEffect, useState } from 'react';
import { Container } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux"
import { fetchListTicked } from "../../store/slice/BookingSlice"
import "./style.scss"
function ListTicked() {
    const dispatch = useDispatch();
    const listTicked = useSelector((state) => state.booking.listTicked.data);
    const auth = JSON.parse(localStorage.getItem("userInfo"));
    const email = auth.user.email
    console.log(listTicked)
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
                                <th>Hàng ghế</th>
                                <th>Ngày/Giờ</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
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
                                                {`${item.date}/${item.startAt}`}
                                            </td>
                                            <td>
                                                {parseInt(item.totalPrice).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                            </td>
                                            <td>
                                                {item.status === 1 ? <h4>Đã thanh toán</h4> : <h4>Đang chờ</h4>}
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