import React from 'react';
import { useEffect } from "react";

import Banner from './Banner'
import SearchTicked from './SearchTicked'
import NowShowing from './NowShowing'
import ComingSoon from './ComingSoon'
import { useDispatch, useSelector } from "react-redux"
import { fetchMovies, fetchComingSoonMovies } from "../../store/slice/MoviesSlice"
function Home() {
    const dispatch = useDispatch();

    const filter = useSelector((state) => state.movies.filter);
    const moviesList = useSelector((state) => state.movies.moviesList.data);
    const moviesListComingSoon = useSelector((state) => state.movies.moviesListComingSoon.data);

    useEffect(() => {
        dispatch(fetchMovies(filter));
    }, [filter, dispatch]);

    useEffect(() => {
        dispatch(fetchComingSoonMovies(filter));
    }, [filter, dispatch]);

    return (
        <>
            <Banner />
            <SearchTicked />
            <NowShowing movies={moviesList} />
            <ComingSoon movies={moviesListComingSoon} />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </>
    );
}

export default Home;