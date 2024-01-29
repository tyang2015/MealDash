import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { UsePriceDropdown } from '../../context/PriceDropdown';
import { UseRatingDropdown } from '../../context/RatingDropdown';
import "./PriceFilter.css"

const PriceFilter = ({selectedPrices, categories, setSelectedPrices, selectedRatingMin, filteredItems, restaurants, setFilteredItems, isFiltered, setIsFiltered}) => {
  const sessionUser = useSelector(state=> state.session.user)
  const {toggleRatingDropdown, setToggleRatingDropdown} = UseRatingDropdown();
  const {togglePriceDropdown, setTogglePriceDropdown} = UsePriceDropdown();


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
        if (filterName.toLowerCase() === "all") return true
        if (rest.category === filterName) return true
      }
      return false
    })
    return finalItems
  }

  // only for click the buttons
  const selectPriceFilter = (price) => {
    setSelectedPrices({...selectedPrices, [price]: !(selectedPrices[[price]])})
    return
  }

  const handlePriceFilter = () => {
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
      // setFilteredItems(filteredItems)
      // return
    }
// IF CAT FILTERS ONLY
    else if (catFilters.length && !priceFilters.length) {
      const filteredItems = filterCats(newFilteredItems, catFilters)
      newFilteredItems = filteredItems
    }

    setFilteredItems(newFilteredItems)
  }



  return (
    <div className='price-container-dropdown'>
      <div className='price-container-dropdown-content-container'>
        <div style={{width: '90%', margin: "auto", fontWeight: "770", fontSize: "20px", fontSize: "24px"}}>Price</div>
        <div className='price-filters-container'>
          <div
            className='price-container-dropdown-price-button price-button'
            onClick={()=> selectPriceFilter("price1")}
            style={{backgroundColor: selectedPrices.price1? "black": "#F7F7F7",
            color: selectedPrices.price1? "white": "black",
            fontWeight: selectedPrices.price1? "700": "550"
          }}
            >
            $
          </div>
          <div
            onClick={()=> selectPriceFilter("price2")}
            className='price-container-dropdown-price-button price-button'
            style={{backgroundColor: selectedPrices.price2? "black": "#F7F7F7",
            color: selectedPrices.price2? "white": "black",
            fontWeight: selectedPrices.price2? "700": "550"
          }}
            > $$ </div>
          <div
            className='price-container-dropdown-price-button price-button'
            onClick={()=> selectPriceFilter("price3")}
            style={{backgroundColor: selectedPrices.price3? "black": "#F7F7F7",
            color: selectedPrices.price3? "white": "black",
            fontWeight: selectedPrices.price3? "700": "550"
          }}
            >$$$</div>
          <div
            onClick={()=> selectPriceFilter("price4")}
            className='price-container-dropdown-price-button price-button'
            style={{backgroundColor: selectedPrices.price4? "black": "#F7F7F7",
            color: selectedPrices.price4? "white": "black",
            fontWeight: selectedPrices.price4? "700": "550"
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
