import React, { useState } from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Form } from "react-bootstrap"
import dayjs from 'dayjs';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { fetchAllTicked, fetchOtherAllTicked } from "../../../store/slice/BookingSlice"
import { tickedChart } from '../../../const/get-ticked-chart'
import { month } from '../../../const/month'
import { fetchMovies, fetchComingSoonMovies } from "../../../store/slice/MoviesSlice"

function Chart() {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );
    const dispatch = useDispatch();
    const allTicked = useSelector((state) => state.booking.allTicked.data);
    const otherAllTicked = useSelector((state) => state.booking.otherAllTicked.data);
    const thisMonth = dayjs().format('MM');
    const previousMonth = dayjs().subtract(1, 'month').format('MM')

    const filter = useSelector((state) => state.movies.filter);
    const moviesList = useSelector((state) => state.movies.moviesList.data);
    const [monthSelected, setMonthSelected] = useState(thisMonth)
    const [otherMonth, setOtherMonth] = useState(previousMonth)
    useEffect(() => {
        dispatch(fetchAllTicked(monthSelected));
    }, [monthSelected]);

    useEffect(() => {
        dispatch(fetchOtherAllTicked(otherMonth));
    }, [otherMonth]);

    useEffect(() => {
        dispatch(fetchMovies(filter));
    }, []);

    const options = {
        responsive: true,
        scales: {
            y: {
                max: 50,
                min: 0,
                ticks: {
                    font: {
                        size: 19
                    },
                    color: '#fff'
                }
            },
            x: {

                ticks: {
                    font: {
                        size: 13
                    },
                    color: '#fff'
                }
            },
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 20,
                    },
                    color: '#fff',
                }
            },
            title: {
                display: true,
                font: {
                    size: 20,
                },
                color: '#fff',
                text: 'Số lượng vé bán ra trong tháng',
            },
        },
    };
    const labels = moviesList.map(item => item.name.substring(0, 15) + '...')
    const nameMovie = moviesList.map(item => item.name)
    console.log(tickedChart(allTicked, nameMovie))


    const data = {
        labels,
        datasets: [
            {
                label: `Số lượng vé đã bán trong tháng ${monthSelected}`,
                data: tickedChart(allTicked, nameMovie),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: `Số lượng vé đã bán trong tháng ${otherMonth}`,
                data: tickedChart(otherAllTicked, nameMovie),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },

        ],
    };
    return (
        <>
            <div className="d-flex">
                <Form.Group className='col-lg-3 form-gr' controlId="monthSelected">
                    <Form.Label className='form-label label-month'>Tháng hiện tại</Form.Label>
                    <Form.Select
                        className='form-input'
                        name="monthSelected"
                        value={monthSelected}
                        disabled={true}
                        onChange={(e) => setMonthSelected(e.target.value)}
                    >
                        {month.map((item) =>
                            <option value={item.value}>{item.label}</option>
                        )}
                    </Form.Select>
                </Form.Group>
                <Form.Group className='col-lg-3 form-gr' controlId="otherMonth">
                    <Form.Label className='form-label label-month'>Tháng khác</Form.Label>
                    <Form.Select
                        className='form-input'
                        name="otherMonth"
                        value={otherMonth}
                        onChange={(e) => setOtherMonth(e.target.value)}
                    >
                        {month.map((item) =>
                            <option value={item.value}>{item.label}</option>
                        )}
                    </Form.Select>
                </Form.Group>
            </div>
            {moviesList.length > 0 ? <Bar options={options} data={data} maxBarThickness={100} /> : null}
        </>
    )
}

export default Chart;