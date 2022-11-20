import React from 'react';
function PopupTicked({ ticked }) {
    console.log(ticked);
    return (
        <div className="ticked-popup-wrapper">
            <div className="wrapper">
                <h2 className="title">{ticked.movieName} - {ticked.startAt}</h2>
                <h2 className="title">Ngày: {ticked.date} - Phòng số {ticked.room}</h2>
                <img src={require("../../statics/image/QRCode.png")} alt="QR code" />
            </div>
        </div>
    );
}

export default PopupTicked;