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
                <NavLink className= 'navlink' to='/restaurants'>
                <div>
                    Home
                </div>
                </NavLink>
                {/* FEATURE #3 */}
                {/* <div style={{cursor:'pointer'}}>
                    Orders
                </div> */}
                <NavLink className= 'navlink' to="/restaurants/new">
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
              <div className="nav-bar-profile-button" onClick={()=> setOpen(!open)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="styles__StyledInlineSvg-sc-12l8vvi-0 jFpckg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4 8C3.45 8 3 7.55 3 7C3 6.45 3.45 6 4 6H20C20.55 6 21 6.45 21 7C21 7.55 20.55 8 20 8H4ZM4 13H20C20.55 13 21 12.55 21 12C21 11.45 20.55 11 20 11H4C3.45 11 3 11.45 3 12C3 12.55 3.45 13 4 13ZM4 18H20C20.55 18 21 17.55 21 17C21 16.45 20.55 16 20 16H4C3.45 16 3 16.45 3 17C3 17.55 3.45 18 4 18Z" fill="currentColor"></path></svg>
              </div>
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
                    <NavLink to="/restaurants">
                      <i className="fa-solid fa-burger"> DoorDash </i>
                    </NavLink>
                    <div>
                      <div>
                        Welcome {sessionUser.firstName}
                      </div>
                        CART ICON
                    </div>
                </div>
            </nav>
        </>
    )

}

export default NavBar;
