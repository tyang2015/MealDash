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
                <div className='dropdown-container-row'>
                <svg style={{marginRight: '15px'}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="styles__StyledInlineSvg-sc-12l8vvi-0 jFpckg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 13C13.2426 13 14.25 11.9926 14.25 10.75C14.25 9.50736 13.2426 8.5 12 8.5C10.7574 8.5 9.75 9.50736 9.75 10.75C9.75 11.9926 10.7574 13 12 13ZM12 15C14.3472 15 16.25 13.0972 16.25 10.75C16.25 8.40279 14.3472 6.5 12 6.5C9.65279 6.5 7.75 8.40279 7.75 10.75C7.75 13.0972 9.65279 15 12 15Z" fill="#494949"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 4C16.4183 4 20 7.58172 20 12C20 14.1937 19.1171 16.1811 17.6872 17.6264C16.411 16.6455 14.5656 16 12 16C9.4344 16 7.58905 16.6455 6.31282 17.6264C4.88294 16.1811 4 14.1937 4 12C4 7.58172 7.58172 4 12 4ZM16.0273 18.9139C15.1418 18.3839 13.8588 18 12 18C10.1412 18 8.8582 18.3839 7.97271 18.9139C9.15555 19.6044 10.5316 20 12 20C13.4684 20 14.8445 19.6044 16.0273 18.9139Z" fill="#494949"></path></svg>
                  Welcome {sessionUser.firstName}
                </div>
                <NavLink className= 'navlink' to='/restaurants'>
                  <div className='dropdown-container-row'>
                  <svg style={{marginRight: '15px'}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="styles__StyledInlineSvg-sc-12l8vvi-0 jFpckg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.78981 3.18529L3.49497 8.08127C3.28191 8.24689 3.04125 8.43395 2.85387 8.60371L2.84189 8.61454C2.69969 8.74278 2.21289 9.1818 2.03436 9.8839C1.78945 10.8471 2.13832 11.8639 2.92298 12.4738C3.29798 12.7653 3.70814 12.8862 3.99999 12.9388L3.99998 17.4463C3.99989 17.6845 3.99978 17.969 4.02026 18.2196C4.04399 18.5101 4.10488 18.9261 4.32698 19.362C4.6146 19.9264 5.07354 20.3854 5.63802 20.673C6.07392 20.8951 6.4899 20.956 6.78033 20.9797C7.03098 21.0002 7.3155 21.0001 7.55374 21H16.4462C16.6845 21.0001 16.969 21.0002 17.2197 20.9797C17.5101 20.956 17.9261 20.8951 18.362 20.673C18.9265 20.3854 19.3854 19.9264 19.673 19.362C19.8951 18.9261 19.956 18.5101 19.9797 18.2196C20.0002 17.969 20.0001 17.6845 20 17.4462L20 12.9388C20.2918 12.8862 20.702 12.7653 21.077 12.4738C21.8617 11.8639 22.2105 10.8471 21.9656 9.8839C21.7871 9.1818 21.3003 8.74277 21.1581 8.61453L21.1461 8.60371C20.9588 8.43396 20.7181 8.24694 20.5051 8.08133L14.2102 3.18529C14.1906 3.17007 14.168 3.15202 14.1424 3.13165C13.8999 2.93835 13.3961 2.53685 12.784 2.37111C12.2706 2.23209 11.7294 2.23209 11.216 2.37111C10.6038 2.53685 10.1001 2.93833 9.85762 3.13162C9.83206 3.152 9.80939 3.17007 9.78981 3.18529ZM11.7386 4.3016C11.5447 4.35412 11.369 4.49075 11.0177 4.764L4.76311 9.62867C4.26433 10.0166 4.01494 10.2106 3.97268 10.3768C3.9237 10.5694 3.99347 10.7728 4.15041 10.8947C4.28579 11 4.60173 11 5.2336 11C5.48196 11 5.60615 11 5.70315 11.0431C5.74818 11.0631 5.78961 11.0895 5.82634 11.1212C5.86921 11.1581 5.90568 11.2022 5.934 11.2517C5.94234 11.2663 5.94998 11.2813 5.95686 11.2968C5.99999 11.3938 5.99999 11.518 5.99999 11.7663V17.4C5.99999 17.96 5.99999 18.2401 6.10899 18.454C6.20486 18.6421 6.35784 18.7951 6.546 18.891C6.75992 19 7.03994 19 7.59999 19H9.5V14.5C9.5 13.1193 10.6193 12 12 12C13.3807 12 14.5 13.1193 14.5 14.5V19H16.4C16.96 19 17.2401 19 17.454 18.891C17.6421 18.7951 17.7951 18.6421 17.891 18.454C18 18.2401 18 17.96 18 17.4V11.7664C18 11.518 18 11.3938 18.0431 11.2968C18.05 11.2813 18.0576 11.2663 18.066 11.2517C18.0943 11.2022 18.1308 11.1581 18.1736 11.1212C18.2104 11.0895 18.2518 11.0631 18.2968 11.0431C18.3938 11 18.518 11 18.7664 11C19.3982 11 19.7142 11 19.8496 10.8947C20.0065 10.7728 20.0763 10.5694 20.0273 10.3768C19.985 10.2106 19.7357 10.0166 19.2369 9.62867L12.9823 4.764C12.631 4.49075 12.4553 4.35412 12.2613 4.3016C12.0902 4.25526 11.9098 4.25526 11.7386 4.3016Z" fill="#494949"></path></svg>
                    <div>Home</div>
                  </div>
                </NavLink>
                <NavLink className= 'navlink' to="/restaurants/new">
                  <div className='dropdown-container-row'>
                  <svg style={{marginRight: '15px'}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="styles__StyledInlineSvg-sc-12l8vvi-0 jFpckg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.4142 2H19C20.6569 2 22 3.34315 22 5V9.58579C22 10.3814 21.6839 11.1445 21.1213 11.7071L12.1213 20.7071C10.9497 21.8787 9.05025 21.8787 7.87868 20.7071L3.29289 16.1213C2.12132 14.9497 2.12132 13.0503 3.29289 11.8787L12.2929 2.87868C12.8555 2.31607 13.6186 2 14.4142 2ZM14.4142 4H19C19.5523 4 20 4.44772 20 5V9.58579C20 9.851 19.8946 10.1054 19.7071 10.2929L10.7071 19.2929C10.3166 19.6834 9.68342 19.6834 9.29289 19.2929L4.70711 14.7071C4.31658 14.3166 4.31658 13.6834 4.70711 13.2929L13.7071 4.29289C13.8946 4.10536 14.149 4 14.4142 4Z" fill="#494949"></path><path d="M18 7.5C18 8.32843 17.3284 9 16.5 9C15.6716 9 15 8.32843 15 7.5C15 6.67157 15.6716 6 16.5 6C17.3284 6 18 6.67157 18 7.5Z" fill="#494949"></path></svg>
                      Register Restaurant
                  </div>
                </NavLink>
                <div className='navbar-logout-button dropdown-container-row'>
                  <svg style={{marginRight: '15px'}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="styles__StyledInlineSvg-sc-12l8vvi-0 jFpckg"><path d="M16.2071 7.79289C16.5976 8.18342 16.5976 8.81658 16.2071 9.20711L13.4142 12L16.2071 14.7929C16.5976 15.1834 16.5976 15.8166 16.2071 16.2071C15.8166 16.5976 15.1834 16.5976 14.7929 16.2071L12 13.4142L9.20711 16.2071C8.81658 16.5976 8.18342 16.5976 7.79289 16.2071C7.40237 15.8166 7.40237 15.1834 7.79289 14.7929L10.5858 12L7.79289 9.2071C7.40237 8.81658 7.40237 8.18341 7.79289 7.79289C8.18341 7.40237 8.81658 7.40237 9.2071 7.79289L12 10.5858L14.7929 7.79289C15.1834 7.40237 15.8166 7.40237 16.2071 7.79289Z" fill="#494949"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z" fill="#494949"></path></svg>
                  <LogoutButton/>
                </div>
                <NavLink to="/orders" className='navlink'>
                  <div className='orders-container dropdown-container-row'>
                  <svg style={{marginRight: '15px'}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="styles__StyledInlineSvg-sc-12l8vvi-0 jFpckg"><path d="M9 10C8.44772 10 8 10.4477 8 11C8 11.5523 8.44772 12 9 12H15C15.5523 12 16 11.5523 16 11C16 10.4477 15.5523 10 15 10H9Z" fill="#494949"></path><path d="M8 7C8 6.44772 8.44772 6 9 6H11C11.5523 6 12 6.44772 12 7C12 7.55228 11.5523 8 11 8H9C8.44772 8 8 7.55228 8 7Z" fill="#494949"></path><path d="M9 14C8.44772 14 8 14.4477 8 15C8 15.5523 8.44772 16 9 16H12C12.5523 16 13 15.5523 13 15C13 14.4477 12.5523 14 12 14H9Z" fill="#494949"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M20 21C20 21.3565 19.8102 21.686 19.5019 21.8649C19.1936 22.0438 18.8134 22.0451 18.5039 21.8682L15.5 20.1518L12.4961 21.8682C12.1887 22.0439 11.8113 22.0439 11.5039 21.8682L8.5 20.1518L5.49614 21.8682C5.18664 22.0451 4.80639 22.0438 4.49807 21.8649C4.18976 21.686 4 21.3565 4 21V5C4 3.34315 5.34315 2 7 2H17C18.6569 2 20 3.34315 20 5V21ZM6 19.2768L8.5 17.8482L12 19.8482L15.5 17.8482L18 19.2768V5C18 4.44772 17.5523 4 17 4H7C6.44772 4 6 4.44772 6 5V19.2768Z" fill="#494949"></path></svg>
                    Orders
                  </div>
                </NavLink>
            </div>
        )

        return (
          <>
            <div className='nav-bar-profile-button-and-dropdown'>
              <div className="nav-bar-profile-button" onClick={()=> setOpen(!open)}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="styles__StyledInlineSvg-sc-12l8vvi-0 jFpckg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4 8C3.45 8 3 7.55 3 7C3 6.45 3.45 6 4 6H20C20.55 6 21 6.45 21 7C21 7.55 20.55 8 20 8H4ZM4 13H20C20.55 13 21 12.55 21 12C21 11.45 20.55 11 20 11H4C3.45 11 3 11.45 3 12C3 12.55 3.45 13 4 13ZM4 18H20C20.55 18 21 17.55 21 17C21 16.45 20.55 16 20 16H4C3.45 16 3 16.45 3 17C3 17.55 3.45 18 4 18Z" fill="currentColor"></path></svg>
              </div>
              {open && dropDownMenu}
            </div>
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
        <nav style={{position: "static", zIndex: '-1'}}>
          <div className='navbar'>
            <div className='navbar-menu-logo-container'>
              {profileMenu()}
              <NavLink style={{marginLeft: "50px", width: "fit-content"}} to="/restaurants" className='mealdash-logo-link'>
                <i  className="fa-solid fa-burger"> MealDash </i>
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
