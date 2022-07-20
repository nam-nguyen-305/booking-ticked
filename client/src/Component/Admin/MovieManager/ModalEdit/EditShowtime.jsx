import React from 'react';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
// import Select from 'react-select';
import ShowtimeItem from './ShowtimeItem'
import { Form } from "react-bootstrap"
import { Tabs } from 'antd';
const { TabPane } = Tabs;

function EditShowtime({ showtime, room, movie }) {
    const listDay = showtime.map(item => item.day)

    const newListDay = listDay.reduce((unique, item) =>
        unique.includes(item) ? unique : [...unique, item], []);
    const TabUi = () => (
        <Tabs defaultActiveKey="1">
            {
                newListDay.map((item, index) => (
                    <TabPane tab={item} key={index}>
                        <ShowtimeItem day={item} showtime={showtime} room={room} movie={movie} />
                    </TabPane>
                ))
            }
        </Tabs>
    );


    return (
        <>
            <h1 className="admin__form-title">Quản lý suất chiếu</h1>
            <TabUi />

        </>
    )
}

export default EditShowtime;
