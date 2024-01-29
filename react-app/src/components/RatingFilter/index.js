import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { UsePriceDropdown } from '../../context/PriceDropdown';
import { UseRatingDropdown } from '../../context/RatingDropdown';

import "./RatingFilter.css"

const RatingFilter= ({ filteredItems, categories, selectedPrices, selectedRatingMin, setSelectedRatingMin ,restaurants, setFilteredItems, isFiltered, setIsFiltered}) => {
  // const [selectedRatingMin, setSelectedRatingMin]= useState(3)
  const {toggleRatingDropdown, setToggleRatingDropdown} = UseRatingDropdown();
  const {togglePriceDropdown, setTogglePriceDropdown} = UsePriceDropdown();

  const handleClick = (e) => {
    return
  }

  const filterPrice = (filteredItems, priceFilters) => {
    let finalItems = filteredItems.filter(rest => {
      // only true values, filterName = price1, price2
      for (let [filterName, bool] of priceFilters) {
        if (rest.priceRange === parseInt(filterName[filterName.length - 1])){
          return true
        }
      }
      return false
    })
    return finalItems
  }

  const filterCats = (filteredItems, catFilters) => {
    let finalItems = filteredItems.filter(rest => {
      for (let [filterName, bool] of catFilters) {
        // console.log('filter name for cat')
        if (filterName.toLowerCase() === "all") return true
        if (rest.category === filterName) return true
      }
      return false
    })
    return finalItems
  }

  const handleRatingFilter = (selectedRatingMin) =>{
    setIsFiltered(true)
    let newFilteredItems;

    // look at ratings
    newFilteredItems = restaurants.filter(rest => Number(rest.avgRating) >= selectedRatingMin)

    // look at prices
    let priceFilters = Object.entries(selectedPrices).filter(arr => arr[1] === true)
    // look at category filter
    let catFilters = Object.entries(categories).filter(arr=> arr[1] === true)

    if (!priceFilters.length && !catFilters.length) {
      setFilteredItems(newFilteredItems)
      return
    }

    // if both
    else if (priceFilters.length && catFilters.length) {
      let filter1 = filterPrice(newFilteredItems, priceFilters)
      let filter2 = filterCats(filter1, catFilters)
      newFilteredItems = filter2
    }

// IF PRICE FILTERS ONLY
    else if (priceFilters.length && !catFilters.length) {
      const filteredItems = filterPrice(newFilteredItems, priceFilters)
      newFilteredItems = filteredItems
    }

// IF CAT FILTERS ONLY
    else if (catFilters.length && !priceFilters.length) {
      const filteredItems = filterCats(newFilteredItems, catFilters)
      newFilteredItems = filteredItems
    }

    setFilteredItems(newFilteredItems)
  }

  return (
    <div className='ratings-container-dropdown'>
      <div className='ratings-container-dropdown-content-container'>
        <div style={{fontSize:"24px", fontWeight:"700", letterSpacing:"-0.04ch"}}>Ratings</div>
        <div style={{color: "#797979", fontSize: "18px", fontWeight: "550", height: "30px", display:'flex', alignItems: "flex-end"}}>Over {selectedRatingMin}</div>
        <div className='rating-connector-line-container'>
          <div className='rating-connector-line' style={{
            width: selectedRatingMin == 3? "100%":
            selectedRatingMin == 3.5? "75%":
            selectedRatingMin == 4? "50%":
            selectedRatingMin == 4.5? "25%":
            "0%"
          }}>
          </div>
          <label>
            <input type="radio"
              value="3"
              onChange={e=>setSelectedRatingMin(3)}
              checked={selectedRatingMin==3? true: false}
              className="radio-star-rating"
              onCLick={handleClick}
            />
            <div className='rating-3-dot dot'
              style={{height: selectedRatingMin==3? "25px": "8px",
                    width:  selectedRatingMin==3? "25px": "8px",
                    backgroundColor: selectedRatingMin==3? "black": "#E7E7E7" }}
              > </div>
          </label>
          <label>
            <input onClick={handleClick} type="radio" value="3.5" className="radio-star-rating" onChange={e=>setSelectedRatingMin(3.5)} checked={selectedRatingMin==3.5?true: false}
            />
            <div className='rating-3.5-dot dot'
              style={{height: selectedRatingMin==3.5? "25px": "8px",
              width:  selectedRatingMin==3.5? "25px": "8px",
              backgroundColor: selectedRatingMin<=3.5? "black": "#E7E7E7" }}
            ></div>
          </label>
          <label>
            <input onClick={handleClick} type="radio" value="4" className="radio-star-rating" onChange={e=>setSelectedRatingMin(4)} checked={selectedRatingMin==4?true: false}
            />
            <div className='rating-4-dot dot'
              style={{height: selectedRatingMin==4? "25px": "8px",
              width:  selectedRatingMin==4? "25px": "8px",
              backgroundColor: selectedRatingMin<=4? "black": "#E7E7E7" }}
              ></div>
          </label>
          <label>
            <input onClick={handleClick} type="radio" className="radio-star-rating" value ="4.5" onChange={e=>setSelectedRatingMin(4.5)} checked={selectedRatingMin==4.5?true: false}
            />
            <div className='rating-4.5-dot dot'
              style={{height: selectedRatingMin==4.5? "25px": "8px",
              width:  selectedRatingMin==4.5? "25px": "8px",
              backgroundColor: selectedRatingMin<=4.5? "black": "#E7E7E7" }}
            ></div>
          </label>
          <label>
            <input onClick={handleClick} type="radio" className="radio-star-rating" value="5" onChange={e=>setSelectedRatingMin(5)} checked={true}
            />
            <div className='rating-5-dot dot'
              style={{height: selectedRatingMin==5? "25px": "8px",
              width:  selectedRatingMin==5? "25px": "8px",
              backgroundColor: selectedRatingMin<=5? "black": "#E7E7E7" }}
            ></div>
          </label>

        </div>

      </div>
      <div className='ratings-container-dropdown-buttons-container'>
          <div onClick={()=> setToggleRatingDropdown(false)} style={{fontWeight: '550', marginRight: "40px", cursor: "pointer"}} className='ratings-container-cancel-button'>Cancel</div>
          <div onClick={()=>handleRatingFilter(selectedRatingMin)} className='ratings-container-view-results-button'>
            <div>View Results</div>
          </div>
      </div>

    </div>
  )

}

export default RatingFilter
