import React from 'react';
import { useEffect, useState } from "react";
import { Modal } from 'antd';
// import ModalAction from "../Modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus
} from "@fortawesome/free-solid-svg-icons";
import ModalAdd from "./ModalAdd"
import MovieItemManager from "../MovieItemManager"
import Popup from "reactjs-popup";
import { useDispatch, useSelector } from "react-redux"

import { fetchMovies, fetchComingSoonMovies, deleteMovie } from "../../../store/slice/MoviesSlice"
import "./style.scss";
const { confirm } = Modal;

function MovieManager() {
    const dispatch = useDispatch();
    const [typeMovie, setTypeMovie] = useState('nowShowing');
    const filter = useSelector((state) => state.movies.filter);
    const moviesList = useSelector((state) => state.movies.moviesList.data);
    const moviesListComingSoon = useSelector((state) => state.movies.moviesListComingSoon.data);

    useEffect(() => {
        dispatch(fetchMovies(filter));
    }, [filter, dispatch]);

    useEffect(() => {
        dispatch(fetchComingSoonMovies(filter));
    }, [filter, dispatch]);
    const handleDelete = (id) => {

        confirm({
            title: 'Delete this products?',
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            async onOk() {
                await dispatch(deleteMovie(id))
                dispatch(fetchMovies(filter));
                dispatch(fetchComingSoonMovies(filter));
            },
        });
    }

    return (
        <section className="movie-manager">
            <div className="movie-manager__header d-flex justify-content-between">
                <Popup modal
                    trigger=
                    {
                        <button className="movie-manager__add-btn">
                            Thêm phim <FontAwesomeIcon icon={faPlus} />
                        </button>
                    }>
                    {close => <ModalAdd close={close} />}
                </Popup>
                <div className="d-flex">
                    <button className={typeMovie === 'nowShowing' ? "type-movie-active type-movie" : "type-movie"} onClick={() => setTypeMovie('nowShowing')}>Đang chiếu</button>
                    <button className={typeMovie === 'comingSoon' ? "type-movie-active type-movie" : "type-movie"} onClick={() => setTypeMovie('comingSoon')}>sắp chiếu</button>
                </div>
            </div>
            {typeMovie === 'nowShowing' &&
                <div className="movie-manager__main d-flex flex-wrap justify-content-start">
                    {moviesList && moviesList.map(item =>
                        <div className="col-lg-3 m-lg-5">
                            <MovieItemManager movie={item} handleDelete={handleDelete} />
                        </div>
                    )}
                </div>
            }
            {typeMovie === 'comingSoon' &&
                <div className="movie-manager__main d-flex flex-wrap justify-content-start">
                    {moviesListComingSoon && moviesListComingSoon.map(item =>
                        <div className="col-lg-3 m-lg-5">
                            <MovieItemManager movie={item} handleDelete={handleDelete} />
                        </div>
                    )}
                </div>
            }
        </section>
    );
}

export default MovieManager;
