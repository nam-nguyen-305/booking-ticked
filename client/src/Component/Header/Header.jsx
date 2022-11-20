import React, { useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
// import { useTranslation } from "react-i18next";
// import { useSelector } from "react-redux";
import { Menu, Dropdown } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { signOut } from "../../store/slice/UserSlice"


function Header() {
    const auth = JSON.parse(localStorage.getItem("userInfo"));
    const navigate = useNavigate()
    const [background, setBackground] = useState(false);
    const changeBackground = () => {
        if (window.scrollY >= 80) {
            setBackground(true)
        } else {
            setBackground(false)
        }
    }
    window.addEventListener('scroll', changeBackground)
    const logOut = async () => {
        localStorage.removeItem('userInfo')
        await signOut(auth)
        navigate("/")
    }

    const menu = auth && auth.role === 2 ? (
        <Menu>
            <Menu.Item key="1">
                <Link to="/profile">Thông tin cá nhân</Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/ticked-store">Kho vé</Link>
            </Menu.Item>
            <Menu.Item key="3">
                <button onClick={logOut}>Đăng xuất</button>
            </Menu.Item>
        </Menu>
    ) : (
        <Menu>
            <Menu.Item key="1">
                <Link to="/profile">Thông tin cá nhân</Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/admin">Quản lý</Link>
            </Menu.Item>
            <Menu.Item key="3">
                <button onClick={logOut}>Đăng xuất</button>
            </Menu.Item>
        </Menu>
    )
    return (
        <header className={background ? "background-active header" : "header"}>
            <Container>
                <div className="header__list">
                    <div className="header__logo">
                        <Link to="/">
                            <img src="https://themes.themewild.com/ticket/assets/img/logo/logo.png" alt="logo" />
                        </Link>
                    </div>
                    <nav className="header__nav">
                        <ul className="header__nav__list">
                            <li>
                                <Link className="header__nav__item" to="/">
                                    <span>Trang chủ</span>
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </Link>
                            </li>
                            <li>
                                <Link className="header__nav__item" to="/Movies">
                                    <span>Danh sách phim</span>
                                    <FontAwesomeIcon icon={faChevronDown} />

                                </Link>
                            </li>
                            <li>
                                <Link className="header__nav__item" to="/Movies">
                                    <span>Blogs</span>
                                    <FontAwesomeIcon icon={faChevronDown} />

                                </Link>
                            </li>
                            <li>
                                <Link className="header__nav__item" to="/Movies">
                                    <span>Đánh giá</span>
                                    <FontAwesomeIcon icon={faChevronDown} />

                                </Link>
                            </li>
                            <li>
                                <Link className="header__nav__item" to="/account">
                                    <span>Liên hệ</span>
                                    <FontAwesomeIcon icon={faChevronDown} />

                                </Link>
                            </li>
                        </ul>
                    </nav>
                    {
                        auth ?
                            <Dropdown overlay={menu} >
                                <Link className="ant-dropdown-link header__user-name" to="/profile" >
                                    {auth.fullname}
                                </Link>
                            </Dropdown>
                            :
                            <Link className="header__account__item mobile-hide" to="/login">
                                Đăng nhập
                            </Link>
                    }
                </div>
            </Container>
        </header>
    );
}

export default Header;
