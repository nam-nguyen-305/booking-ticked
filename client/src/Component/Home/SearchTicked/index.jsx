import React from 'react';
import "./style.scss";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faFilm
} from "@fortawesome/free-solid-svg-icons";

function SearchTicked() {
    return (
        <section className="search-ticked">
            <Container >
                <div className="search-ticked-content">
                    <div className="d-flex align-items-center mb--20">
                        <div className="col-lg-6 mb-5 position-relative">
                            <div className="search-ticked-header">
                                <h6 className="category">search ticked</h6>
                                <h4 className="title">find your ticked now</h4>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-5 position-relative">
                            <ul className="search-ticked__list-option">
                                <li className="search-ticked__option">
                                    <div className="search-ticked__icon">
                                        <FontAwesomeIcon icon={faFilm} />
                                    </div>
                                    <span>movies</span>
                                </li>
                                <li className="search-ticked__option">
                                    <div className="search-ticked__icon">
                                        <FontAwesomeIcon icon={faHeart} />
                                    </div>
                                    <span>Your list</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}

export default SearchTicked;