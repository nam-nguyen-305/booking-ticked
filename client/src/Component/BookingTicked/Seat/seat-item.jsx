
import React, { useEffect } from 'react';
import "./style.scss"

export const SeatItem = ({ title, checkChosenSeat, addTicked, listPickingSeat }) => {
    const checkSeatStatus = checkChosenSeat(title) ? 'booked' : 'free'
    const checkPickingStatus = listPickingSeat.includes(title) ? "active" : ""
    return (
        <div className={`seat-item ${checkSeatStatus} ${checkPickingStatus}`} onClick={() => addTicked(title)}>
            <img src={require(`../../../statics/image/seat-${checkSeatStatus}.png`)} />
            <span>{title}</span>
        </div>
    );
}
