import React, { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom'
import { postTicked } from "../../store/slice/BookingSlice"
import { useDispatch, useSelector } from "react-redux"
import {
    VISA,
    QR_CODE
} from "../../const/payment-method"
import QrCode from './QrCode'
import Visa from './Visa'
import { toast, ToastContainer } from "react-toastify";

function Payment() {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const _postTicked = async (payload) => {
        setIsLoading(true)
        try {
            await dispatch(postTicked(payload))
            toast.success("Đã thanh toán thành công!", {
                position: "top-right",
                autoClose: 2500,
            });
            setTimeout(() => navigate(`/booking/${paymentInfo.slug}/successful`), 2500)
        } catch (err) {
            console.log(err)
        }
        setIsLoading(false)
    }
    const location = useLocation()
    const paymentInfo = location.state

    const submitPayment = () => {
        _postTicked(paymentInfo.tickedPayload)
    }
    return (
        <div>
            {paymentInfo.typePayment === QR_CODE &&
                <QrCode submit={() => submitPayment()} />
            }
            {paymentInfo.typePayment === VISA &&
                <Visa submit={() => submitPayment()} />
            }
            <ToastContainer />
        </div>
    );
}

export default Payment;