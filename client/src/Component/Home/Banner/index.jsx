import React from 'react';
import "./style.scss";
import { Container } from "react-bootstrap";


function Banner() {
    return (
        <section className="banner">
            <div className="banner-bg"></div>
            <Container >
                <div className="banner-content">
                    <h1 className="banner-title">
                        <span className="d-block title">Tickets Booking</span>
                        <span className="d-block title">FOR <b>MOVIE</b></span>
                    </h1>
                </div>
            </Container>
        </section>
    );
}

export default Banner;