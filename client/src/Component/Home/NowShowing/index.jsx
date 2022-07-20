import React from 'react';
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRight
} from "@fortawesome/free-solid-svg-icons";
import MoviesItem from "../../MovieItem"
function NowShowing({ movies }) {

    return (
        <section className='movie-list'>
            <Container>
                <div className="row flex-wrap-reverse justify-content-center">
                    <div className="col-lg-12">
                        <div className="movie-list__main">
                            <div className="movie-list__header">
                                <h2 className="title">Đang chiếu</h2>
                                <Link to="/">
                                    Xem thêm
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </Link>
                            </div>
                            <div className="movie-list__list">
                                {movies && movies.map(movie => (
                                    <div className="col-lg-3 movie-list__item">
                                        <MoviesItem movie={movie} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}

export default NowShowing;