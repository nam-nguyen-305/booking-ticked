import React from 'react';


function QrCode({ submit }) {
    return (
        <div className="success">
            <div className="wrapper">
                <h2 className="title">Hãy quét mã để thanh toán</h2>
                <img src={require("../../statics/image/QrCodePayment.png")} alt="QR code payment" />
                <button onClick={submit}>

                    <span className=" btn_submit mt-5">
                        Tôi đã thanh toán!
                    </span>
                </button>

            </div>
        </div>
    );
}

export default QrCode;