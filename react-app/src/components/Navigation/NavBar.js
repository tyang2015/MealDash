import './navbar.css'
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react'
import LogoutButton from '../auth/LogoutButton';


const NavBar = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const [open, setOpen] = useState(false)
    console.log('inside navbar component')
    const profileMenu = () => {
        const dropDownMenu = (
            <div className='dropdown-container'>
                <div>
                    Home
                </div>
                <div>
                    Orders
                </div>
                <NavLink to="/restaurants/new">
                    <div>
                        Register Restaurant
                    </div>
                </NavLink>

                <div className='navbar-logout-button'>
                    <LogoutButton/>
                </div>
            </div>
        )

        return (
            <>
            <button className="nav-bar-profile-button" onClick={()=> setOpen(!open)}>
                Profile
            </button>
            {open && dropDownMenu}
            </>
        )
    }

    return (
        <>
            <nav>
                <div className='navbar'>
                    <div>
                        {profileMenu()}
                    </div>
                    <div>
                        DOORDASH
                    </div>
                    <div>
                        CART ICON
                    </div>
                </div>

            </nav>
        </>
    )

}

export default NavBar;
