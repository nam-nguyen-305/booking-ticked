import { Tabs } from 'antd';
import { Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import { Link } from "react-router-dom";
import MovieManager from './MovieManager';
import { signOut } from "../../store/slice/UserSlice"
import UserManager from './UserManager';
import FoodManager from './FoodManager';
import RoomManager from './RoomManager';
import Chart from './Chart';
import { ToastContainer } from "react-toastify";

import "./style.scss";
const { TabPane } = Tabs;

function Admin() {
    const navigate = useNavigate()
    const auth = JSON.parse(localStorage.getItem('userInfo'));
    // const info = auth.user
    const logOut = async () => {
        localStorage.removeItem('userInfo')
        await signOut(auth)
        navigate("/")
    }

    const menu = (
        <Menu>
            <Menu.Item key="1">
                <Link to="/profile">Thông tin cá nhân</Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/">Trang chủ</Link>
            </Menu.Item>
            <Menu.Item key="3">
                <button onClick={logOut}>Đăng xuất</button>
            </Menu.Item>
        </Menu>
    );

    const TabUi = () => (
        <Tabs tabPosition="left" defaultActiveKey="1">
            <TabPane tab="Phim" key="1">
                <MovieManager />
            </TabPane>
            <TabPane tab="Người dùng" key="2">
                <UserManager />
            </TabPane>
            <TabPane tab="Đồ ăn" key="3">
                <FoodManager />
            </TabPane>
            <TabPane tab="Phòng chiếu" key="4">
                <RoomManager />
            </TabPane>
            <TabPane tab="Thống kê" key="5">
                <Chart />
            </TabPane>
        </Tabs>
    );
    return (
        <div className="admin">
            <Container>
                <header className="admin__header">
                    <span className="admin__logo">ADMIN</span>
                    <Dropdown overlay={menu}  >
                        <Link className="ant-dropdown-link admin__account" to="/profile" >
                            <span>
                                {auth.fullname}
                            </span>
                        </Link>
                    </Dropdown>

                </header>
                {<TabUi />}
            </Container>
            <ToastContainer />
        </div>
    );
}

export default Admin;