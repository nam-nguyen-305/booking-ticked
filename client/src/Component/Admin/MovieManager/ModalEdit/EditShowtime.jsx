import React from 'react';
import ShowtimeItem from './ShowtimeItem'

import { Tabs } from 'antd';
import { dayOfWeek } from '../../../../const/day-of-week'
const { TabPane } = Tabs;

function EditShowtime({ showtime, room, movie, listAllShowtimes }) {

    const TabUi = () => (
        <Tabs defaultActiveKey="1">
            {
                dayOfWeek(10).map((item, index) => (
                    <TabPane tab={item} key={index}>
                        <ShowtimeItem day={item} showtime={showtime} room={room} movie={movie} listAllShowtimes={listAllShowtimes} />
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
