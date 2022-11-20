import React from 'react';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Form } from "react-bootstrap"
import moment from "moment";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import { updateMovie, fetchMovies, fetchComingSoonMovies, } from "../../../../store/slice/MoviesSlice"
import { toast } from "react-toastify";
import { MOVIE_STATUS } from "../../../../const/movie-status"

function EditMovie({ movie }) {
    const dispatch = useDispatch()
    const filter = useSelector((state) => state.movies.filter);
    const [day, setDay] = useState(null)

    const [name, setName] = useState(movie.name)
    const [time, setTime] = useState(movie.time)
    const [ageLimit, setAgeLimit] = useState(movie.ageLimit)
    const [releaseDay, setReleaseDay] = useState(movie.releaseDay)
    const [actor, setActor] = useState(movie.actor)
    const [country, setCountry] = useState(movie.country)
    const [summary, setSummary] = useState(movie.summary)
    const [status, setStatus] = useState(movie.status)
    const [category, setCategory] = useState(movie.category)
    const [img, setImg] = useState(movie.img)
    const [director, setDirector] = useState(movie.director)
    const [banner, setBanner] = useState(movie.banner)
    const [trailerId, setTrailerId] = useState(movie.trailerId)
    const [language, setLanguage] = useState(movie.language)
    const [focus, setFocus] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newMovie = {
            name: name,
            time: time,
            ageLimit: ageLimit,
            releaseDay: releaseDay,
            actor: actor,
            country: country,
            summary: summary,
            status: status,
            category: category,
            img: img,
            director: director,
            banner: banner,
            trailerId: trailerId,
            language: language,

        }
        const movieID = movie._id
        await dispatch(updateMovie({ id: movieID, newMovie: newMovie }))
        toast.success("Đã cập nhật thông tin phim!", {
            position: "top-right",
            autoClose: 2500,
        });
        dispatch(fetchMovies(filter));
        dispatch(fetchComingSoonMovies(filter));
    }

    return (
        <>
            <h1 className="admin__form-title">{movie.name} ({movie.releaseDay})</h1>
            <Form className="form-modal-admin">
                <div className="d-flex form-wrapper">

                    <Form.Group className='col-lg-6 form-gr' controlId="name">
                        <Form.Label className='form-label'>Tên phim :</Form.Label>
                        <Form.Control
                            className='form-input'
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className='col-lg-6 form-gr' controlId="time">
                        <Form.Label className='form-label'>Thời gian :</Form.Label>
                        <Form.Control
                            className='form-input'
                            type="text"
                            name="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </Form.Group>

                </div>
                <div className="d-flex form-wrapper">

                    <Form.Group className='col-lg-6 form-gr' controlId="ageLimit">
                        <Form.Label className='form-label'>Giới hạn tuổi :</Form.Label>
                        <Form.Control
                            className='form-input'
                            type="text"
                            name="ageLimit"
                            value={ageLimit}
                            onChange={(e) => setAgeLimit(e.target.value)}
                        />
                    </Form.Group>
                    <div className="col-lg-6 date-picker-wrapper">
                        <h3>Ngày khởi chiếu</h3>
                        <SingleDatePicker
                            date={day} // momentPropTypes.momentObj or null
                            onDateChange={(day) => {
                                setDay(day)
                                setReleaseDay(day.format("DD/MM/YY"))
                            }} // PropTypes.func.isRequired
                            focused={focus} // PropTypes.bool
                            onFocusChange={({ focused }) => setFocus(focused)} // PropTypes.func.isRequired
                            numberOfMonths={1}
                            displayFormat="DD/MM/YY"
                            showClearDate={true}
                            isOutsideRange={() => false}
                        />
                    </div>

                </div>
                <div className="d-flex form-wrapper">

                    <Form.Group className='col-lg-6 form-gr' controlId='form-gr'>
                        <Form.Label className='form-label'>Diễn viên :</Form.Label>
                        <Form.Control
                            className='form-input'
                            type="text"
                            name="actor"
                            value={actor}
                            onChange={(e) => setActor(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className='col-lg-6 form-gr' controlId='form-gr'>
                        <Form.Label className='form-label'>Quốc gia :</Form.Label>
                        <Form.Control
                            className='form-input'
                            type="text"
                            name="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </Form.Group>

                </div>
                <div className="d-flex form-wrapper">

                    <Form.Group className='col-lg-6 form-gr' controlId='form-gr'>
                        <Form.Label className='form-label'>Ngôn ngữ :</Form.Label>
                        <Form.Control
                            className='form-input'
                            type="text"
                            name="language"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                        />
                    </Form.Group>


                    <Form.Group className='col-lg-6 form-gr' controlId='form-gr'>
                        <Form.Label className='form-label'>Trạng thái</Form.Label>
                        <Form.Select
                            className='form-input'
                            name="daySelected"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            {MOVIE_STATUS.map((item) =>
                                <option value={item.value}>{item.label}</option>
                            )}
                        </Form.Select>
                    </Form.Group>
                </div>
                <div className="d-flex form-wrapper">

                    <Form.Group className='col-lg-6 form-gr' controlId='form-gr'>
                        <Form.Label className='form-label'>Thể loại :</Form.Label>
                        <Form.Control
                            className='form-input'
                            type="text"
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className='col-lg-6 form-gr' controlId='form-gr'>
                        <Form.Label className='form-label'>Ảnh :</Form.Label>
                        <Form.Control
                            className='form-input'
                            type="text"
                            name="img"
                            value={img}
                            onChange={(e) => setImg(e.target.value)}
                        />
                    </Form.Group>

                </div>
                <div className="d-flex form-wrapper">

                    <Form.Group className='col-lg-6 form-gr' controlId='form-gr'>
                        <Form.Label className='form-label'>Đạo diễn :</Form.Label>
                        <Form.Control
                            className='form-input'
                            type="text"
                            name="director"
                            value={director}
                            onChange={(e) => setDirector(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className='col-lg-6 form-gr' controlId='form-gr'>
                        <Form.Label className='form-label'>Ảnh banner :</Form.Label>
                        <Form.Control
                            className='form-input'
                            type="text"
                            name="banner"
                            value={banner}
                            onChange={(e) => setBanner(e.target.value)}
                        />
                    </Form.Group>

                </div>
                <div className="d-flex form-wrapper">

                    <Form.Group className='col-lg-6 form-gr' controlId='form-gr'>
                        <Form.Label className='form-label'>Trailer :</Form.Label>
                        <Form.Control
                            className='form-input'
                            type="text"
                            name="trailerId"
                            value={trailerId}
                            onChange={(e) => setTrailerId(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className='col-lg-6 form-gr' controlId='form-gr'>
                        <Form.Label className='form-label'>Tóm tắt :</Form.Label>
                        <Form.Control
                            className='form-input'
                            type="text"
                            name="summary"
                            as="textarea" rows={5}
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                        />
                    </Form.Group>

                </div>

            </Form>
            <button className="btn_submit mt-5" type="submit" size="lg" onClick={handleSubmit}>Lưu</button>
        </>
    )
}

export default EditMovie;
