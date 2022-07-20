import React from 'react';
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClock,
    faTags,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function MoviesItem({ movie }) {
    return (
        <div className="movie">
            <div className="movie__thumb">
                <Link to={`/movie/${movie.slug}`}>
                    <img className="movie__img" src={movie.img} alt={movie.name} />
                </Link>
            </div>
            <div className="movie__content">

                <h5 className="movie__name">{movie.name}</h5>
                <ul className="movie__info">
                    <li>
                        <FontAwesomeIcon icon={faClock} />
                        <span>{movie.time}</span>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faTags} />
                        <span>{movie.category}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default MoviesItem;