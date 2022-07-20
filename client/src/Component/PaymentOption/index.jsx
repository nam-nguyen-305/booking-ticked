import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCreditCard,
    faQrcode
} from "@fortawesome/free-solid-svg-icons";
import {
    VISA,
    QR_CODE
} from "../../const/payment-method"
import "./style.scss"


function PaymentOption({ handleSelectPaymentMethod, selectPaymentMethod }) {
    return (
        <ul className="payment-option">
            <li onClick={() => handleSelectPaymentMethod(VISA)} className={selectPaymentMethod == VISA && "active"}>
                <div className="payment-option__item">
                    <FontAwesomeIcon icon={faCreditCard} />
                    <span>Thẻ Visa</span>
                </div>
            </li>
            <li onClick={() => handleSelectPaymentMethod(QR_CODE)} className={selectPaymentMethod == QR_CODE && "active"}>
                <div className="payment-option__item">
                    <FontAwesomeIcon icon={faQrcode} />
                    <span>Mã QR</span>
                </div>
            </li>
        </ul>
    );
}

export default PaymentOption;