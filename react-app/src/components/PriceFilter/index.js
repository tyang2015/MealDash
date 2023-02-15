import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { UsePriceDropdown } from '../../context/PriceDropdown';
import { UseRatingDropdown } from '../../context/RatingDropdown';
import "./PriceFilter.css"

const PriceFilter = ({ clickPrice1, setClickPrice1, clickPrice2, setClickPrice2, clickPrice3, setClickPrice3, clickPrice4, setClickPrice4, filteredItems , restaurants, setFilteredItems, isFiltered, setIsFiltered}) => {
  const sessionUser = useSelector(state=> state.session.user)
  const {toggleRatingDropdown, setToggleRatingDropdown} = UseRatingDropdown();
  const {togglePriceDropdown, setTogglePriceDropdown} = UsePriceDropdown();

  // const [clickPrice1, setClickPrice1] = useState(false)
  // const [clickPrice2, setClickPrice2] = useState(false)
  // const [clickPrice3, setClickPrice3] = useState(false)
  // const [clickPrice4, setClickPrice4] = useState(false)

  const selectedPriceRanges = [clickPrice1, clickPrice2, clickPrice3, clickPrice4]

  const mergeRestaurants = (arr) => {
    let set = new Set()
    let i = 0;
    while (i< arr.length) {
      if ( set.has(arr[i].id) ) {
        arr.splice(i, 1)
      } else {
        set.add(arr[i].id)
        i++
      }
    }
    return arr
  }

  const oneSelected = () => {
    return selectedPriceRanges.filter(item => item === true).length === 1
  }
  const handleClickPrice1 = () => {
    if (oneSelected() && clickPrice1) {
      return
    }
    else {
      // there is 1 other selected OR its currently not selected
      setClickPrice1(!clickPrice1)
    }
  }
  const handleClickPrice2 = () => {
    if (oneSelected() && clickPrice2) return
    else setClickPrice2(!clickPrice2)
  }
  const handleClickPrice3 = () => {

    if (oneSelected() && clickPrice3) return
    else setClickPrice3(!clickPrice3)
  }

  const handleClickPrice4 = () => {

    if (oneSelected() && clickPrice4) return
    else setClickPrice4(!clickPrice4)

  }

  const handlePriceFilter = () => {
    setIsFiltered(true)
    let newFilteredItems;
    if (isFiltered) {
      newFilteredItems = filteredItems.filter(restaurant => selectedPriceRanges[restaurant.priceRange-1] === true)
    } else {
      newFilteredItems = restaurants.filter(restaurant => selectedPriceRanges[restaurant.priceRange-1] === true)
    }
    // let newFilteredItems = restaurants.filter(restaurant => selectedPriceRanges[restaurant.priceRange-1] === true)
    setFilteredItems(newFilteredItems)

    // setFilteredItems( mergeRestaurants([...filteredItems, ...newFilteredItems]))
    // console.log("MERGED:", mergeRestaurants([...filteredItems, ...newFilteredItems]))
    // setFilteredItems(mergeRestaurants([...filteredItems, newFilteredItems]))
    // return filtered
    // console.log('clicked view results')
  }



  return (
    <div className='price-container-dropdown'>
      <div className='price-container-dropdown-content-container'>
        <div style={{width: '90%', margin: "auto", fontWeight: "770", fontSize: "20px", fontSize: "24px"}}>Price</div>
        <div className='price-filters-container'>
          <div
            className='price-container-dropdown-price-button price-button'
            onClick={handleClickPrice1}
            style={{backgroundColor: clickPrice1? "black": "#F7F7F7",
            color: clickPrice1? "white": "black",
            fontWeight: clickPrice1? "700": "550"
          }}
            >
            $
          </div>
          <div
            onClick={handleClickPrice2}
            className='price-container-dropdown-price-button price-button'
            style={{backgroundColor: clickPrice2? "black": "#F7F7F7",
            color: clickPrice2? "white": "black",
            fontWeight: clickPrice2? "700": "550"
          }}
            > $$ </div>
          <div
            className='price-container-dropdown-price-button price-button'
            onClick={handleClickPrice3}
            style={{backgroundColor: clickPrice3? "black": "#F7F7F7",
            color: clickPrice3? "white": "black",
            fontWeight: clickPrice3? "700": "550"
          }}
            >$$$</div>
          <div
            onClick={handleClickPrice4}
            className='price-container-dropdown-price-button price-button'
            style={{backgroundColor: clickPrice4? "black": "#F7F7F7",
            color: clickPrice4? "white": "black",
            fontWeight: clickPrice4? "700": "550"
          }}
            >$$$$</div>
        </div>
      </div>
      <div className='price-container-dropdown-buttons-container' style={{fontWeight: '550', marginRight: "40px"}} >
        <div style={{fontWeight: '550', marginRight: "40px", cursor: "pointer"}} onClick={()=> setTogglePriceDropdown(false)} className="price-container-cancel-button">
          Cancel
        </div>
        <div onClick={handlePriceFilter}>
          <div  className="price-container-view-results">View results</div>
        </div>
      </div>
    </div>
  )

}

export default PriceFilter
