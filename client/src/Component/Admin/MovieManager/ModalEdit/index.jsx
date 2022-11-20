import React from 'react';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
// import Select from 'react-select';
import { Tabs } from 'antd';
import { getListShowtime, getListRoom, getAllShowtime } from "../../../../store/slice/AdminSlice"
import EditMovie from './EditMovie'
import EditShowtime from './EditShowtime'

const { TabPane } = Tabs;

function ModalEdit({ movie }) {
    const dispatch = useDispatch()
    const listShowtime = useSelector((state) => state.admin.listShowtimes.showtime);
    const listAllShowtimes = useSelector((state) => state.admin.listAllShowtimes.showtime);

    const listRoom = useSelector((state) => state.admin.listRoom.room);

    useEffect(() => {
        dispatch(getListShowtime(movie.slug));
    }, []);
    useEffect(() => {
        dispatch(getListRoom());
    }, []);
    useEffect(() => {
        dispatch(getAllShowtime());
    }, []);
    const TabUi = () => (
        <Tabs defaultActiveKey="1">
            <TabPane tab="Thông tin phim" key="1">
                <EditMovie movie={movie} />
            </TabPane>
            <TabPane tab="Suất chiếu" key="2">
                <EditShowtime showtime={listShowtime} room={listRoom} movie={movie} listAllShowtimes={listAllShowtimes} />
            </TabPane>
        </Tabs>
    );
    return (
        <>
            <TabUi />
        </>
    )
}

export default ModalEdit;
