import React, { useState }  from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
    Collapse,
    Nav,
    Navbar,
    NavbarToggler,
} from 'reactstrap'
import { useSelector } from 'react-redux'
import './Header.scss'

const Header = ({ loginBtnClick }) => {
    const userInfo = useSelector(state => state.user.current)
    const [dropDown, setDropDown] = useState(false);


    const handleShowDropDown = () => {
        setDropDown(!dropDown)
    }

    const handleLogOutBtn = async () => {
        const dbs = await window.indexedDB.databases();
        dbs.forEach(db => { window.indexedDB.deleteDatabase(db.name) });
    }

    return (
        <div>
            <Navbar
                className="px-5"
                color="light"
                expand="md"
                light
            >
                <NavLink
                    className="header__link text-decoration-none"
                    to="/photos"
                >
                    Trang chủ
                </NavLink>
                <NavbarToggler onClick={function noRefCheck(){}} />
                <Collapse navbar>
                <Nav
                    navbar
                >
                  
                {loginBtnClick
                  ?
                   <div className="user__info">
                       <img className="user__info-img" src={userInfo.photoUrl} alt={userInfo.photoUrl} />
                        <div className="user__info-content">
                            <p className="user__info-content-desc">{userInfo.name}</p>
                            <i
                             onClick={handleShowDropDown}
                             className="fas fa-caret-down user__info-content-icon"
                            >

                            </i>

                            {
                                dropDown 
                                 &&
                                <ul className="user__info-content-list">
                                <li
                                 onClick={handleLogOutBtn}
                                >
                                   <a href="/photos">Đăng xuất</a>
                                </li>
                            </ul>
                            }
                        </div>
                   </div>
                  :
                  <NavLink
                    className="header__link text-decoration-none"
                        to="/sign-in"
                   >
                    Đăng Nhập
                   </NavLink>
                }          
                    
                </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default Header
