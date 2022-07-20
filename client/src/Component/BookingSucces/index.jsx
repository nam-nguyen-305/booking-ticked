import React from 'react';
import { Link } from "react-router-dom";

import "./style.scss"
function BookingSuccessful() {
    return (
        <div className="success">
            <div className="wrapper">
                <h2 className="title">Đây là vé của bạn!</h2>
                <img src={require("../../statics/image/QRCode.png")} alt="QR code" />
                <Link to="/">
                    <span className=" btn_submit mt-5">
                        Về trang chủ
                    </span>
                </Link>
            </div>
        </div>
    );
}

export default BookingSuccessful;