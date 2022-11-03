import './navbar.css'
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react'
import LogoutButton from '../auth/LogoutButton';
import CartRightPane from '../CartRightPane';
import { useToggleCart } from '../../context/ToggleCartContext';
import TextField from "@mui/material/TextField";
import SearchList from '../SearchList';
import { shouldForwardProp } from '@mui/styled-engine';

// const NavBar = ({toggleCartPane, setToggleCartPane}) => {
const NavBar = () => {
    const {toggleCartPane, setToggleCartPane} = useToggleCart();
    const sessionUser = useSelector((state) => state.session.user);
    const [open, setOpen] = useState(false)
    const [inputText, setInputText] = useState("")
    const [clickedSearchBar, setClickedSearchBar] = useState("")
    // const [toggleCartPane, setToggleCartPane] = useState(false)
    const profileMenu = () => {
        const dropDownMenu = (
            <div className='dropdown-container'>
                <div>
                  Welcome {sessionUser.firstName}
                </div>
                <NavLink className= 'navlink' to='/restaurants'>
                <div>
                    Home
                </div>
                </NavLink>
                <NavLink className= 'navlink' to="/restaurants/new">
                  <div>
                      Register Restaurant
                  </div>
                </NavLink>
                <div className='navbar-logout-button'>
                    <LogoutButton/>
                </div>
                <NavLink to="/orders">
                  <div className='orders-container'>
                    Orders
                  </div>
                </NavLink>
            </div>
        )

        return (
          <>
              <div className="nav-bar-profile-button" onClick={()=> setOpen(!open)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="styles__StyledInlineSvg-sc-12l8vvi-0 jFpckg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4 8C3.45 8 3 7.55 3 7C3 6.45 3.45 6 4 6H20C20.55 6 21 6.45 21 7C21 7.55 20.55 8 20 8H4ZM4 13H20C20.55 13 21 12.55 21 12C21 11.45 20.55 11 20 11H4C3.45 11 3 11.45 3 12C3 12.55 3.45 13 4 13ZM4 18H20C20.55 18 21 17.55 21 17C21 16.45 20.55 16 20 16H4C3.45 16 3 16.45 3 17C3 17.55 3.45 18 4 18Z" fill="currentColor"></path></svg>
              </div>
              {open && dropDownMenu}
            </>
        )
      }
    const handleToggleCart = (e)=> {
      // console.log('clicked toggle')
      // console.log(toggleCartPane)
      setToggleCartPane(!toggleCartPane)
    }

    const handleInput = (e) => {
      let lowerCaseInp = e.target.value.toLowerCase();
      setInputText(lowerCaseInp)
    }

    // const showBox = (inputText) => {
    //   console.log('SEARCH CLICKEDD')
    //   return (
    //     <SearchList value={inputText}/>
    //   )
    // }

    return (
      <>
        <nav>
          <div className='navbar'>
            <div className='navbar-menu-logo-container'>
              {profileMenu()}
              <NavLink to="/restaurants">
                <i className="fa-solid fa-burger"> MealDash </i>
              </NavLink>
            </div>
            <div className='navbar-searchbar-carticon-container'>
              <div className="navbar-searchbar-outer-container-with-dropdown">
                <div className='navbar-searchbar-container'>
                  <div className='searchbar-magnify-glass-container' onClick={()=> document.getElementById('navbar-searchfield').focus()}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="styles__StyledInlineSvg-sc-12l8vvi-0 jFpckg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.1922 15.6064C13.0236 16.4816 11.5723 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 11.5723 16.4816 13.0236 15.6064 14.1922L20.7071 19.2929C21.0976 19.6834 21.0976 20.3166 20.7071 20.7071C20.3166 21.0976 19.6834 21.0976 19.2929 20.7071L14.1922 15.6064ZM15 10C15 12.7614 12.7614 15 10 15C7.23858 15 5 12.7614 5 10C5 7.23858 7.23858 5 10 5C12.7614 5 15 7.23858 15 10Z" fill="#494949"></path></svg>
                  </div>
                  <input
                    type='text'
                    id='navbar-searchfield'
                    placeholder="Search restaurant names and restaurant categories"
                    value={inputText}
                    className="navbar-searchbox"
                    onChange={handleInput}
                  />
                </div>
                {inputText.length>0 && <SearchList value={inputText}/>}
              </div>
              <div className="cart-button-container" style={{cursor: "pointer", backgroundColor: 'lightcoral'}} onClick={handleToggleCart} >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="styles__StyledInlineSvg-sc-12l8vvi-0 jFpckg"><path color="white" fill-rule="evenodd" clip-rule="evenodd" d="M4.27821 4.00617C4.19614 4.00057 4.08253 4.00003 3.86483 4.00003H3C2.44772 4.00003 2 3.55231 2 3.00003C2 2.44774 2.44772 2.00003 3 2.00003H3.86483L3.95147 1.99978C4.26423 1.99845 4.65669 1.99679 5.01419 2.13554C5.32256 2.25523 5.59642 2.44954 5.81126 2.70105C6.06033 2.99264 6.18841 3.36362 6.29048 3.65926L6.31886 3.74112L6.40948 4.00004L18.5938 4.00003C18.9671 4 19.3123 3.99997 19.594 4.02564C19.8871 4.05234 20.2553 4.11584 20.5919 4.3437C21.0358 4.64406 21.3405 5.10996 21.4378 5.63696C21.5116 6.03674 21.4222 6.39946 21.3292 6.67867C21.2398 6.94706 21.1014 7.26331 20.9517 7.60528L18.8356 12.4422L18.8037 12.5155C18.6883 12.7823 18.5433 13.1173 18.2958 13.3778C18.082 13.6027 17.8189 13.7748 17.5271 13.8805C17.1892 14.0029 16.8242 14.0014 16.5336 14.0002L16.4536 14H9.05422L8.37797 15.082C8.11779 15.4983 7.96033 15.7522 7.86437 15.9424C7.85835 15.9544 7.85288 15.9655 7.8479 15.9758C7.85931 15.9771 7.87165 15.9784 7.88496 15.9796C8.09715 15.999 8.39587 16 8.88677 16H18C18.5523 16 19 16.4478 19 17C19 17.5523 18.5523 18 18 18L8.844 18C8.40971 18.0001 8.01725 18.0001 7.70227 17.9712C7.38473 17.9421 6.97162 17.8729 6.61172 17.6056C6.14885 17.2619 5.85685 16.735 5.81065 16.1603C5.77473 15.7135 5.93504 15.3265 6.07864 15.0418C6.22108 14.7594 6.4291 14.4266 6.6593 14.0583L7.39752 12.8772L4.43115 4.40182C4.35923 4.19634 4.32119 4.08929 4.28879 4.01368L4.28577 4.00672L4.27821 4.00617Z" fill="currentColor"></path><path color='white' d="M7.5 22C8.32843 22 9 21.3285 9 20.5C9 19.6716 8.32843 19 7.5 19C6.67157 19 6 19.6716 6 20.5C6 21.3285 6.67157 22 7.5 22Z" fill="currentColor"></path><path color='white' d="M16.5 22C17.3284 22 18 21.3285 18 20.5C18 19.6716 17.3284 19 16.5 19C15.6716 19 15 19.6716 15 20.5C15 21.3285 15.6716 22 16.5 22Z" fill="currentColor"></path></svg>
              </div>
            </div>
            {/* {inputText.length>0 && <SearchList value={inputText}/>} */}
            <div className='toggle-cart-panel'>
              {toggleCartPane && <CartRightPane setToggleCartPane={setToggleCartPane} toggleCartPane={toggleCartPane}/>}
            </div>
          </div>
        </nav>
      </>
    )

}

export default NavBar;
