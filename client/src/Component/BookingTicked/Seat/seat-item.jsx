
import React, { useEffect } from 'react';
import "./style.scss"

export const SeatItem = ({ title, checkChosenSeat, addTicked, listPickingSeat, typeOfSeat }) => {
    const checkSeatStatus = checkChosenSeat(title) ? 'buy' : 'unselect'
    const checkPickingStatus = listPickingSeat.includes(title)
    return (
        <>
            {
                checkPickingStatus ?
                    <div className={`seat-item ${checkSeatStatus} `} onClick={() => addTicked(title, typeOfSeat)}>
                        <img src={require(`../../../statics/image/seat-select-${typeOfSeat}.png`)} />
                        <span>{title}</span>
                    </div>
                    :
                    <div className={`seat-item ${checkSeatStatus} `} onClick={() => addTicked(title, typeOfSeat)}>

                        <img src={require(`../../../statics/image/seat-${checkSeatStatus}-${typeOfSeat}.png`)} />
                        <span>{title}</span>
                    </div>

            }

        </>
    )

}
