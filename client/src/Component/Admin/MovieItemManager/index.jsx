import React from 'react';
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClock,
    faTags,
    faEdit,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Popup from "reactjs-popup";
import ModalEdit from "../MovieManager/ModalEdit"

function MovieItemManager({ movie, handleDelete }) {
    return (
        <div className="movie">
            <div className="movie__action-wrapper">
                <Popup modal
                    trigger=
                    {
                        <button className="movie__btn edit">
                            Sửa
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                    }>
                    {close => <ModalEdit movie={movie} />}
                </Popup>

                <button className="movie__btn delete" onClick={() => handleDelete(movie._id)}>Xóa <FontAwesomeIcon icon={faTimes} /></button>
            </div>
            <div className="movie__thumb">
                <img className="movie__img" src={movie.img} alt={movie.name} />
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

export default MovieItemManager;