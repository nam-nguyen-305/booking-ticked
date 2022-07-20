import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'

import "./style.scss"
function Showtime({ day, showtime }) {
    const listShowtime = showtime.filter(item => item.day === day);
    const navigate = useNavigate()
    listShowtime.sort()

    return (
        <div className="showtime-list">
            {listShowtime.map((item, index) => (
                <div key={index} onClick={() =>
                    navigate(`/booking/${item.movie.slug}`, {
                        state: { slug: item.movie.slug, startAt: item.startAt, day: day }
                    },
                    )
                } className="showtime-list_item">{item.startAt}</div>
            ))}
        </div>
    );
}

export default Showtime;