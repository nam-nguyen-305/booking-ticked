import React from 'react';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
// import Select from 'react-select';
import { toast } from "react-toastify";
import { Form } from "react-bootstrap"
import moment from "moment";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import { fetchMovies, fetchComingSoonMovies, addMovie } from "../../../../store/slice/MoviesSlice"
import { MOVIE_STATUS } from "../../../../const/movie-status"

function ModalAdd({ close }) {
    const dispatch = useDispatch()
    const filter = useSelector((state) => state.movies.filter);
    const [focus, setFocus] = useState(false);
    const [day, setDay] = useState(null)

    const [name, setName] = useState('')
    const [time, setTime] = useState('')
    const [ageLimit, setAgeLimit] = useState('')
    const [releaseDay, setReleaseDay] = useState('')
    const [actor, setActor] = useState('')
    const [country, setCountry] = useState('')
    const [summary, setSummary] = useState('')
    const [status, setStatus] = useState('')
    const [category, setCategory] = useState('')
    const [img, setImg] = useState('')
    const [director, setDirector] = useState('')
    const [banner, setBanner] = useState('')
    const [trailerId, setTrailerId] = useState('')
    const [language, setLanguage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(addMovie({
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

        }))
        toast.success("Phim đã được thêm vào!", {
            position: "top-right",
            autoClose: 2500,
        });
        dispatch(fetchMovies(filter));
        dispatch(fetchComingSoonMovies(filter));
        close()
    }
    if (releaseDay) {
        console.log(releaseDay)
    }
    console.log(day)

    return (
        <>
            <h1 className="admin__form-title">Thêm phim</h1>
            <Form className="form-modal-admin mt-5">
                <div className="d-flex form-wrapper" >

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
                <div className="d-flex form-wrapper" >

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
                            date={day}
                            onDateChange={(day) => {
                                setDay(day)
                                setReleaseDay(day.format("DD/MM/YY"))
                            }}
                            focused={focus}
                            onFocusChange={({ focused }) => setFocus(focused)}
                            numberOfMonths={1}
                            displayFormat="DD/MM/YY"
                            showClearDate={true}
                            isOutsideRange={() => false}
                        />
                    </div>

                </div>
                <div className="d-flex form-wrapper" >

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
                <div className="d-flex form-wrapper" >

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
                            <option value="">Chọn trạng thái</option>
                            {MOVIE_STATUS.map((item) =>
                                <option value={item.value}>{item.label}</option>
                            )}
                        </Form.Select>
                    </Form.Group>
                </div>
                <div className="d-flex form-wrapper" >

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
                <div className="d-flex form-wrapper" >

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
                <div className="d-flex form-wrapper" >

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
            <button className="btn_submit margin-x-auto mt-5" type="submit" size="lg" onClick={handleSubmit}>Lưu</button>
        </>
    )
}

export default ModalAdd;
