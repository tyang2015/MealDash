import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react'
import "./SplashFooter.css"

const SplashFooter = () => {
  return (
    <div className="splashpage-footer">
      <div className='splashpage-footer-left-container'>
        <div className='splashpage-top-cities-title-container'>Top Cities</div>
        <div className='splashpage-cities-container'>
          <div className='splashpage-top-cities-first-column'>
            <p style={{fontSize:"11px"}}>New York City</p>
            <p style={{fontSize:"11px"}}> Los Angeles </p>
            <p style={{fontSize:"11px"}}> Toronto </p>
            <p style={{fontSize:"11px"}}> Chicago </p>
            <p style={{fontSize:"11px"}}> Houston</p>
            <p style={{fontSize:"11px"}}> Brooklyn</p>
            <p style={{fontSize:"11px"}}> San Diego</p>
            <p style={{fontSize:"11px"}}> Las Vegas</p>
          </div>
          <div className='splashpage-top-cities-second-column'>
            <p style={{fontSize:"11px"}}>San Francisco</p>
            <p style={{fontSize:"11px"}}>Seattle</p>
            <p style={{fontSize:"11px"}}>Atlanta</p>
            <p style={{fontSize:"11px"}}>Queens</p>
            <p style={{fontSize:"11px"}}>Vancouver, BC</p>
            <p style={{fontSize:"11px"}}>Miami</p>
            <p style={{fontSize:"11px"}}>San Antonio</p>
            <p style={{fontSize:"11px"}}>Phoenix</p>
          </div>
          <div className='splashpage-top-cities-third-column'>
            <p style={{fontSize:"11px"}}>Denver</p>
            <p style={{fontSize:"11px"}}>Austin</p>
            <p style={{fontSize:"11px"}}>Washington, DC</p>
            <p style={{fontSize:"11px"}}>Dallas</p>
            <p style={{fontSize:"11px"}}>Melbourne</p>
            <p style={{fontSize:"11px"}}>Sydney</p>
            <p style={{fontSize:"11px"}}>Montreal</p>
            <p style={{fontSize:"11px"}}>All Cities</p>
          </div>
        </div>
      </div>
      <div className='splashpage-footer-right-container'>
        <h3>About the Developer: </h3>
        <h3>Tiffany Yang</h3>
        <div className='footer-github-link-container'>
          <a className="github-container link" href="https://github.com/tyang2015/MealDash">
            <div className='github-svg-container'>
              {/* <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" class="octicon octicon-mark-github v-align-middle">
                  <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg> */}
              <i class="fa-brands fa-github"></i>
            </div>
            Github Link
          </a>
        </div>
        <div className='footer-linkedin-link-container'>
          <a className='linked-in-container link' href="https://www.linkedin.com/in/tiffany-yang-373140133/">
            <div className='linked-in-svg-container'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
              </svg>
            </div>
            LinkedIn
          </a>
        </div>

      </div>

    </div>
  )
}

export default SplashFooter
