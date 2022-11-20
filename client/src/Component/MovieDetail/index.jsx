import { Tabs } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { Container } from "react-bootstrap";
import { dayOfWeek } from '../../const/day-of-week'
import { fetchMovieDetail } from "../../store/slice/MoviesSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faCalendar,
    faClock
} from "@fortawesome/free-solid-svg-icons";
import "./style.scss"
import Showtime from "../Showtime"
const { TabPane } = Tabs;

function MovieDetail() {
    const params = useParams()
    const dispatch = useDispatch();
    const movieDetail = useSelector((state) => state.movies.movieDetail);
    const showtime = useSelector((state) => state.movies.showtime);

    const TabUi = () => (
        <Tabs defaultActiveKey="1">
            {
                dayOfWeek(7).map((item, index) => (
                    <TabPane tab={item} key={index}>
                        <Showtime day={item} showtime={showtime} />
                    </TabPane>
                ))
            }
        </Tabs>
    );

    useEffect(() => {
        const { slug } = params
        if (slug) {
            dispatch(fetchMovieDetail(slug));
        }
    }, []);

    const backgroundStyle = {
        backgroundImage: `url(${movieDetail.banner})`,
    }
    return (
        <div className="detail-movie__banner" style={backgroundStyle}>
            <Container>
                <div className="detail-movie__img-wrapper">
                    <div className="detail-movie__img-thump">
                        <img src={movieDetail.img} alt="img" />
                        <a href={`https://www.youtube.com/embed/${movieDetail.trailerId}`} className="detail-movie__video-button">
                            <FontAwesomeIcon icon={faPlay} />
                        </a>
                    </div>
                    <div className="detail-movie__content">
                        <h3 className="title">
                            {movieDetail.name}
                        </h3>
                        <div>
                            <div className="language">{movieDetail.language}</div>
                        </div>
                        <button className="category">{movieDetail.category}</button>
                        <div className="infoo d-flex justify-content-start">
                            <div className="duration d-flex justify-content-between col-lg-6">
                                <div className="item">
                                    <FontAwesomeIcon icon={faCalendar} />
                                    <span className="infoo__item">{movieDetail.releaseDay}</span>
                                </div>
                                <div className="item">
                                    <FontAwesomeIcon icon={faClock} />
                                    <span className="infoo__item">{movieDetail.time} phút</span>
                                </div>
                            </div>
                            <div className="col-lg-6"></div>
                        </div>
                        <div className="actor">
                            <span>Diễn viên: </span>
                            <p>{movieDetail.actor}</p>
                        </div>
                        <div className="description">
                            <h4>DESCRIPTION</h4>
                            <p>
                                {movieDetail.summary}
                            </p>
                        </div>
                        <div className="showtime">
                            <h4>NGÀY CHIẾU</h4>
                            {<TabUi />}
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
            </Container>
        </div>
    );
}

export default MovieDetail;