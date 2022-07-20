import React from 'react';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
// import Select from 'react-select';
import { Tabs } from 'antd';
import { getListShowtime, getListRoom } from "../../../../store/slice/AdminSlice"
import EditMovie from './EditMovie'
import EditShowtime from './EditShowtime'

const { TabPane } = Tabs;

function ModalEdit({ movie }) {
    const dispatch = useDispatch()
    const listShowtime = useSelector((state) => state.admin.listShowtimes.showtime);
    const listRoom = useSelector((state) => state.admin.listRoom.room);
    console.log(listRoom)
    useEffect(() => {
        dispatch(getListShowtime(movie.slug));
    }, []);
    useEffect(() => {
        dispatch(getListRoom());
    }, []);
    const TabUi = () => (
        <Tabs defaultActiveKey="1">
            <TabPane tab="Thông tin phim" key="1">
                <EditMovie movie={movie} />
            </TabPane>
            <TabPane tab="Suất chiếu" key="2">
                <EditShowtime showtime={listShowtime} room={listRoom} movie={movie} />
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
