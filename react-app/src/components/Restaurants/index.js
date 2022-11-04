import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurants } from '../../store/restaurant';
import { NavLink, useLocation } from 'react-router-dom';
import NavBar from '../Navigation/NavBar';
import "./restaurants.css";
import americanIcon from "./images/american-icon.png"
import asianIcon from "./images/asian-icon.png"
import breakfastIcon from "./images/breakfast-icon.png"
import ethiopianIcon from "./images/ethiopian-icon.png"
import fastFoodIcon from "./images/fastfood-icon.png"
import frenchIcon from "./images/french-icon.png"
import italianIcon from "./images/italian-icon.png"
import japaneseIcon from "./images/japanese-icon.png"
import mexicanIcon from "./images/mexican-icon.png"
import veganIcon from "./images/vegan-icon.png"
import mediterraneanIcon from "./images/mediterranean-icon.png"
import { useToggleCart } from '../../context/ToggleCartContext';
import RatingFilter from '../RatingFilter';
import PriceFilter from '../PriceFilter';
import { UsePriceDropdown } from '../../context/PriceDropdown';
import { UseRatingDropdown } from '../../context/RatingDropdown';

const CATEGORY_CHOICES = ["All","Asian", "American","Breakfast", "Vegan", "Mexican", "Japanese", "Italian", "French", "FastFood", "Ethiopian", "Mediterranean"]
const cartFromLocalStorage = localStorage.getItem('cart')!=undefined? JSON.parse(localStorage.getItem('cart' || "[]")): []

// TODO: refactor so that you don't have filteredItems variable (just modify restaurants var)
const Restaurants = () => {
    const {toggleCartPane, setToggleCartPane} = useToggleCart();
    const {toggleRatingDropdown, setToggleRatingDropdown} = UseRatingDropdown();
    const {togglePriceDropdown, setTogglePriceDropdown} = UsePriceDropdown();
    const dispatch = useDispatch();
    const location = useLocation();
    const restaurantObj = useSelector(state => state.restaurants)
    let restaurants = Object.values(restaurantObj)
    // const [toggleCartPane, setToggleCartPane] = useState(false)
    // const [toggleRatingDropdown, setToggleRatingDropdown] = useState(false)
    // const [togglePriceDropdown, setTogglePriceDropdown] = useState(false)
    const [selectedRatingMin, setSelectedRatingMin]= useState(3)
    let [filteredItems, setFilteredItems] = useState([])
    const [submittedCartItems, setSubmittedCartItems] = useState(cartFromLocalStorage || [])
    const [isFiltered, setIsFiltered] = useState(false)
    const [categoryChosen, setCategoryChosen] = useState('')
    const [all, setAll] = useState('')
    const [asian, setAsian] = useState('')
    const [american, setAmerican] = useState('')
    const [breakfast, setBreakfast] = useState('')
    const [vegan, setVegan] = useState('')
    const [mexican, setMexican] = useState('')
    const [japanese, setJapanese] = useState('')
    const [italian, setItalian] = useState('')
    const [french, setFrench] = useState('')
    const [fastFood, setFastFood] = useState('')
    const [ethiopian, setEthiopian ] = useState('')
    const [mediterranean, setMediterranean] = useState('')

    const [lenAsian, setLenAsian] = useState(0)
    const [lenAmerican, setLenAmerican] = useState(0)
    const [lenBreakfast, setLenBreakfast] = useState(0)
    const [lenVegan, setLenVegan] = useState(0)
    const [lenMexican, setLenMexican] = useState(0)
    const [lenJapanese, setLenJapanese] = useState(0)
    const [lenItalian, setLenItalian] = useState(0)
    const [lenFrench, setLenFrench] = useState(0)
    const [lenFastFood, setLenFastFood] = useState(0)
    const [lenEthiopian, setLenEthiopian] = useState(0)
    const [lenMediterranean, setLenMediterranean] = useState(0)
    // const [minStarsFilter, setMinStarsFilter] = useState(3)
    const [categoryNum, setCategoryNum] = useState({
      Asian: 0,
      American: 0,
      Breakfast: 0,
      Vegan: 0,
      Mexican: 0,
      Japanese: 0,
      Italian: 0,
      French: 0,
      FastFood: 0,
      Ethiopian:0,
      Mediterranean: 0

    })
    console.log('location on main page:', location.pathname)

    // const [categories, setCategories] = useState({
    //   ALL:"",
    //   Asian: "",
    //   American: "",
    //   Breakfast: "",
    //   Vegan: "",
    //   Mexican: "",
    //   Japanese: "",
    //   Italian: "",
    //   French: "",
    //   FastFood: "",
    //   Ethiopian:"",
    //   Mediterranean: ""
    // })

    useEffect(()=>{
        dispatch(getAllRestaurants())
    }, [dispatch])

    useEffect(()=>{
      // {name_category: count_category}
      let countCategories={}
      if (restaurants.length>0){
        for (let i=0; i<restaurants.length; i++){
          let category = restaurants[i].category
          if (!countCategories[`${category}`]) {
            countCategories[`${category}`] = 1
          } else countCategories[`${category}`] +=1
        }
        setCategoryNum(countCategories)
      }
    }, [restaurantObj])

    useEffect(()=>{
      if (restaurants.length>0 && all === "All"){
        setIsFiltered(false)
        return restaurants
      }
    }, [all])

    useEffect(()=>{
      if (restaurants.length>0 && asian === 'Asian'){
        filteredItems = restaurants.filter(restaurant=> restaurant.category === asian)
        setFilteredItems(filteredItems)
        setIsFiltered(true)
        return filteredItems
      }
    }, [asian])

    useEffect(()=>{
      if (restaurants.length>0 && american === "American"){
        filteredItems = restaurants.filter(restaurant=> restaurant.category === american)
        setFilteredItems(filteredItems)
        setIsFiltered(true)
        return filteredItems
      }
    }, [american])

    useEffect(()=>{
      if (restaurants.length>0 && breakfast === "Breakfast"){
        filteredItems = restaurants.filter(restaurant=> restaurant.category === breakfast)
        setFilteredItems(filteredItems)
        setIsFiltered(true)
        return filteredItems
      }
    }, [breakfast])

    useEffect(()=>{
      if (restaurants.length>0 && vegan === "Vegan"){
        filteredItems = restaurants.filter(restaurant=> restaurant.category === vegan)
        setFilteredItems(filteredItems)
        setIsFiltered(true)
        return filteredItems
      }
    }, [vegan])

    useEffect(()=>{
      if (restaurants.length>0 && mexican === "Mexican"){
        filteredItems = restaurants.filter(restaurant=> restaurant.category === mexican)
        setFilteredItems(filteredItems)
        setIsFiltered(true)
        return filteredItems
      }
    }, [mexican])

    useEffect(()=>{
      if (restaurants.length>0 && japanese === "Japanese"){
        filteredItems = restaurants.filter(restaurant=> restaurant.category === japanese)
        setFilteredItems(filteredItems)
        setIsFiltered(true)
        return filteredItems
      }
    }, [japanese])

    useEffect(()=>{
      if (restaurants.length>0 && italian === "Italian"){
        filteredItems = restaurants.filter(restaurant=> restaurant.category === italian)
        setFilteredItems(filteredItems)
        setIsFiltered(true)
        return filteredItems
      }
    }, [italian])

    useEffect(()=>{
      if (restaurants.length>0 && french === "French"){
        filteredItems = restaurants.filter(restaurant=> restaurant.category === french)
        setFilteredItems(filteredItems)
        setIsFiltered(true)
        return filteredItems
      }
    }, [french])

    useEffect(()=>{
      if (restaurants.length>0 && fastFood === "FastFood"){
        filteredItems = restaurants.filter(restaurant=> restaurant.category === fastFood)
        setFilteredItems(filteredItems)
        setIsFiltered(true)
        return filteredItems
      }
    }, [fastFood])

    useEffect(()=>{
      if (restaurants.length>0 && ethiopian === "Ethiopian"){
        filteredItems = restaurants.filter(restaurant=> restaurant.category === ethiopian)
        setFilteredItems(filteredItems)
        setIsFiltered(true)
        return filteredItems
      }
    }, [ethiopian])

    useEffect(()=>{
      if (restaurants.length>0 && mediterranean === "Mediterranean"){
        filteredItems = restaurants.filter(restaurant=> restaurant.category === mediterranean)
        setFilteredItems(filteredItems)
        setIsFiltered(true)
        return filteredItems
      }
    }, [mediterranean])

    const handleCategorySelection = (category) => {
        if(category === "All") {
          setCategoryChosen(category)
          setAll(category)
          setAsian("")
          setAmerican("")
          setBreakfast("")
          setVegan("")
          setMexican("")
          setJapanese('')
          setItalian('')
          setFrench("")
          setFastFood("")
          setEthiopian("")
          setMediterranean("")
        } else if (category === 'Asian') {
          setAsian(category)
          setCategoryChosen(category)
          setAll('')
          setAmerican("")
          setBreakfast("")
          setVegan("")
          setMexican("")
          setJapanese('')
          setItalian('')
          setFrench("")
          setFastFood("")
          setEthiopian("")
          setMediterranean("")
        } else if (category === 'American'){
          setAmerican(category)
          setCategoryChosen(category)
          setAsian("")
          setAll('')
          setBreakfast("")
          setVegan("")
          setMexican("")
          setJapanese('')
          setItalian('')
          setFrench("")
          setFastFood("")
          setEthiopian("")
          setMediterranean("")
        } else if (category === "Breakfast") {
          setBreakfast(category)
          setCategoryChosen(category)
          setAsian("")
          setAmerican("")
          setAll('')
          setVegan("")
          setMexican("")
          setJapanese('')
          setItalian('')
          setFrench("")
          setFastFood("")
          setEthiopian("")
          setMediterranean("")
        } else if (category === "Vegan"){
          setVegan(category)
          setCategoryChosen(category)
          setBreakfast("")
          setAmerican("")
          setAsian("")
          setAll('')
          setMexican("")
          setJapanese('')
          setItalian('')
          setFrench("")
          setFastFood("")
          setEthiopian("")
          setMediterranean("")
        } else if (category === "Mexican"){
          setMexican(category)
          setCategoryChosen(category)
          setVegan("")
          setBreakfast("")
          setAmerican("")
          setAsian("")
          setAll('')
          setJapanese('')
          setItalian('')
          setFrench("")
          setFastFood("")
          setEthiopian("")
          setMediterranean("")
        } else if (category=== "Japanese"){
          setJapanese(category)
          setCategoryChosen(category)
          setAsian("")
          setAmerican("")
          setBreakfast("")
          setVegan("")
          setMexican("")
          setAll('')
          setItalian('')
          setFrench("")
          setFastFood("")
          setEthiopian("")
          setMediterranean("")
        } else if (category=== "Italian"){
          setItalian(category)
          setCategoryChosen(category)
          setJapanese("")
          setAsian("")
          setAmerican("")
          setBreakfast("")
          setVegan("")
          setMexican("")
          setAll('')
          setFrench("")
          setFastFood("")
          setEthiopian("")
          setMediterranean("")
        } else if (category === "French"){
          setFrench(category)
          setCategoryChosen(category)
          setJapanese("")
          setAsian("")
          setAmerican("")
          setBreakfast("")
          setVegan("")
          setMexican("")
          setAll('')
          setFastFood("")
          setEthiopian("")
          setMediterranean("")
          setItalian("")
        } else if (category === "FastFood"){
          setFastFood(category)
          setCategoryChosen(category)
          setFrench("")
          setJapanese("")
          setAsian("")
          setAmerican("")
          setBreakfast("")
          setVegan("")
          setMexican("")
          setAll('')
          setEthiopian("")
          setMediterranean("")
          setItalian("")
        } else if (category === "Ethiopian"){
          setEthiopian(category)
          setCategoryChosen(category)
          setFastFood("")
          setFrench("")
          setJapanese("")
          setAsian("")
          setAmerican("")
          setBreakfast("")
          setVegan("")
          setMexican("")
          setAll('')
          setMediterranean("")
          setItalian("")
        } else if (category === "Mediterranean"){
          setMediterranean(category)
          setCategoryChosen(category)
          setEthiopian("")
          setFastFood("")
          setFrench("")
          setJapanese("")
          setAsian("")
          setAmerican("")
          setBreakfast("")
          setVegan("")
          setMexican("")
          setAll('')
          setItalian("")
        }
    }

    return (
        <>
          <NavBar setToggleCartPane={setToggleCartPane} toggleCartPane={toggleCartPane}/>
          <div>
            <div className='restaurants-categories-container'>
              {CATEGORY_CHOICES.map(category=> (
                <div style={{marginTop: "10px"}} key={category} onClick={()=> handleCategorySelection(category)} className="category-selection-icon-containers">
                  {category ==="All" && <img style={{height:'3.8em', width: '3.8em'}} className='get-restaurants-icon' width="40" height="40" alt="Ships Nationwide" src="https://img.cdn4dd.com/s/managed/consumer/discovery/shipping_vertical_two_row_icon2.svg"></img>}
                  {category === "American" && <img style={{height:'3.8em', width: '3.8em'}} src={americanIcon}/>}
                  {category === "Mexican" && <img style={{height:'3.8em', width: '3.8em'}} src={mexicanIcon}/>}
                  {category === "Asian" && <img style={{height:'3.8em', width: '3.8em'}} src={asianIcon}/>}
                  {category === "Breakfast" && <img style={{height:'3.8em', width: '3.8em'}} src={breakfastIcon}/>}
                  {category === "Vegan" && <img style={{height:'3.8em', width: '3.8em'}} src={veganIcon}/>}
                  {category === "Japanese" && <img style={{height:'3.8em', width: '3.8em'}} src={japaneseIcon}/>}
                  {category === "Italian" && <img style={{height:'3.8em', width: '3.8em'}} src={italianIcon}/>}
                  {category === "French" && <img style={{height:'3.8em', width: '3.8em'}} src={frenchIcon}/>}
                  {category === "FastFood" && <img style={{height:'3.8em', width: '3.8em'}} src={fastFoodIcon}/>}
                  {category === "Ethiopian" && <img style={{height:'3.8em', width: '3.8em'}} src={ethiopianIcon}/>}
                  {category === "Mediterranean" && <img style={{height:'3.8em', width: '3.8em'}} src={mediterraneanIcon}/>}
                  <small style={{fontSize: "10px", color: "red"}} >
                  {category}
                  </small>
                </div>
              ))}
            </div>
            <div className='get-restaurants-filter-price-stars-time-container'>
              <div className='star-rating-filter-container' onClick={()=> {
                setToggleRatingDropdown(!toggleRatingDropdown)
                setTogglePriceDropdown(false)
                }}>
                <div className='get-restaurants-star-rating-filter-left-container'>
                  <div style={{display: "flex", alignItems: "center", height: "100%"}}> Over {selectedRatingMin}</div>
                  <div style={{height: "100%", display:"flex", alignItems: "center", paddingTop: "2.5px", marginLeft: '7px'}}>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" dimensionOverrides="[object Object]" class="styles__StyledInlineSvg-sc-12l8vvi-0 djCUZq sc-1290d041-0 jHoJgS"><path d="M8.91126 0.588193C8.74945 0.230121 8.39293 0 7.99999 0C7.60705 0 7.25054 0.230121 7.08872 0.588193L5.37316 4.38448L1.23254 4.84295C0.841992 4.8862 0.512964 5.15416 0.39154 5.52786C0.270115 5.90157 0.378802 6.31175 0.669346 6.5763L3.7497 9.381L2.90621 13.4606C2.82665 13.8454 2.97982 14.2412 3.29771 14.4721C3.6156 14.7031 4.0393 14.7265 4.38068 14.5319L7.99999 12.469L11.6193 14.5319C11.9607 14.7265 12.3844 14.7031 12.7023 14.4721C13.0202 14.2412 13.1733 13.8454 13.0938 13.4606L12.2503 9.381L15.3306 6.5763C15.6212 6.31175 15.7299 5.90157 15.6084 5.52786C15.487 5.15416 15.158 4.8862 14.7674 4.84295L10.6268 4.38448L8.91126 0.588193Z" fill="currentColor"></path></svg>
                  </div>
                </div>
                <div className='get-restaurants-star-rating-filter-right-container'>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="styles__StyledInlineSvg-sc-12l8vvi-0 jFpckg sc-84e263d1-5 bcmrDQ"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 8.79289C5.68342 8.40237 6.31658 8.40237 6.70711 8.79289L12 14.0858L17.2929 8.79289C17.6834 8.40237 18.3166 8.40237 18.7071 8.79289C19.0976 9.18342 19.0976 9.81658 18.7071 10.2071L12.7071 16.2071C12.5196 16.3946 12.2652 16.5 12 16.5C11.7348 16.5 11.4804 16.3946 11.2929 16.2071L5.29289 10.2071C4.90237 9.81658 4.90237 9.18342 5.29289 8.79289Z" fill="currentColor"></path></svg>
                </div>
              </div>
              {toggleRatingDropdown && <RatingFilter selectedRatingMin={selectedRatingMin} setSelectedRatingMin={setSelectedRatingMin} restaurants={restaurants} setIsFiltered={setIsFiltered} isFiltered={isFiltered} setFilteredItems={setFilteredItems}/>}
              <div className='price-filter-container' style={{marginLeft: '10px'}} onClick={()=> {
                setTogglePriceDropdown(!togglePriceDropdown)
                setToggleRatingDropdown(false)
                }}>
                <div className='get-restaurants-price-filter-left-container'>
                  Price
                </div>
                <div className='get-restaurants-price-filter-right-container'>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="styles__StyledInlineSvg-sc-12l8vvi-0 jFpckg sc-84e263d1-5 bcmrDQ"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 8.79289C5.68342 8.40237 6.31658 8.40237 6.70711 8.79289L12 14.0858L17.2929 8.79289C17.6834 8.40237 18.3166 8.40237 18.7071 8.79289C19.0976 9.18342 19.0976 9.81658 18.7071 10.2071L12.7071 16.2071C12.5196 16.3946 12.2652 16.5 12 16.5C11.7348 16.5 11.4804 16.3946 11.2929 16.2071L5.29289 10.2071C4.90237 9.81658 4.90237 9.18342 5.29289 8.79289Z" fill="currentColor"></path></svg>
                </div>
              </div>
              {togglePriceDropdown && <PriceFilter restaurants={restaurants} setIsFiltered={setIsFiltered} isFiltered={isFiltered} setFilteredItems={setFilteredItems}/>}
            </div>
            {!isFiltered && categoryNum.Asian>0 && (
              <>
                <h2 className='restaurant-category-title'>Asian</h2>
                <div className="restaurant-main-grid-container" >
                {restaurants.length>0 && !isFiltered && restaurants.map(restaurant => (
                  <>
                    {restaurant.category === "Asian" && (
                        <NavLink className='navlink' key={restaurant.id} to={{pathname:`restaurants/${restaurant.id}`}} >
                        <div key={restaurant.id} className="restaurant-card-container">
                            <div className= 'get-restaurants-pic-container'>
                              <img className= 'get-restaurants-pic'src={restaurant.restaurantPicUrl}  onError={e => { e.currentTarget.src = "https://i.pinimg.com/originals/90/85/b0/9085b0692d8ffe530e71a601ec887cf2.jpg"; }}/>
                            </div>
                            <div className="get-restaurants-bottom-text-container">
                              <div className='get-restaurants-left-inner-text-container'>
                                <h4>{restaurant.name}</h4>
                                <p> {restaurant.avgRating} <i class="fa-solid fa-star" ></i> ratings</p>
                              </div>
                            </div>
                          </div>
                        </NavLink>
                    )}
                  </>
                ))}
                </div>
              </>
            )}
            {!isFiltered && categoryNum.American>0 && (
              <>
                <h2 className='restaurant-category-title'>American</h2>
                <div className="restaurant-main-grid-container" >
                {restaurants.length>0 && !isFiltered && restaurants.map(restaurant => (
                  <>
                    {restaurant.category === "American" && (
                        <NavLink className='navlink' key={restaurant.id} to={{pathname:`restaurants/${restaurant.id}`}} >
                        <div key={restaurant.id} className="restaurant-card-container">
                            <div className= 'get-restaurants-pic-container'>
                              <img className= 'get-restaurants-pic'src={restaurant.restaurantPicUrl}  onError={e => { e.currentTarget.src = "https://i.pinimg.com/originals/90/85/b0/9085b0692d8ffe530e71a601ec887cf2.jpg"; }}/>
                            </div>
                            <div className="get-restaurants-bottom-text-container">
                              <div className='get-restaurants-left-inner-text-container'>
                                <h4>{restaurant.name}</h4>
                                <p> {restaurant.avgRating} <i class="fa-solid fa-star" ></i> ratings</p>
                              </div>
                            </div>
                          </div>
                        </NavLink>
                    )}
                  </>
                ))}
                </div>
              </>
            )}
            {!isFiltered && categoryNum.Breakfast >0 && (
            <>
              <h2 className='restaurant-category-title'>Breakfast</h2>
              <div className="restaurant-main-grid-container" >
              {restaurants.length>0 && !isFiltered && restaurants.map(restaurant => (
                <>
                  {restaurant.category==="Breakfast" && (
                      <NavLink className='navlink' key={restaurant.id} to={{pathname:`restaurants/${restaurant.id}`}} >
                        <div key={restaurant.id} className="restaurant-card-container">
                        <div className= 'get-restaurants-pic-container'>
                          <img className= 'get-restaurants-pic'src={restaurant.restaurantPicUrl}  onError={e => { e.currentTarget.src = "https://i.pinimg.com/originals/90/85/b0/9085b0692d8ffe530e71a601ec887cf2.jpg"; }}/>
                        </div>
                        <div className="get-restaurants-bottom-text-container">
                          <div className='get-restaurants-left-inner-text-container'>
                            <h4>{restaurant.name}</h4>
                            <p> {restaurant.avgRating} <i class="fa-solid fa-star" ></i> ratings</p>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                    )}
                </>
              ))}
              </div>
            </>
            )}
            {!isFiltered && categoryNum.Vegan >0 && (
            <>
              <h2 className='restaurant-category-title'>Vegan</h2>
              <div className="restaurant-main-grid-container" >
              {restaurants.length>0 && !isFiltered && restaurants.map(restaurant => (
                <>
                  {restaurant.category==="Vegan" && (
                    <NavLink className='navlink' key={restaurant.id} to={{pathname:`restaurants/${restaurant.id}`}} >
                      <div key={restaurant.id} className="restaurant-card-container">
                        <div className= 'get-restaurants-pic-container'>
                          <img className= 'get-restaurants-pic'src={restaurant.restaurantPicUrl}  onError={e => { e.currentTarget.src = "https://i.pinimg.com/originals/90/85/b0/9085b0692d8ffe530e71a601ec887cf2.jpg"; }}/>
                        </div>
                        <div className="get-restaurants-bottom-text-container">
                          <div className='get-restaurants-left-inner-text-container'>
                            <h4>{restaurant.name}</h4>
                            <p> {restaurant.avgRating} <i class="fa-solid fa-star" ></i> ratings</p>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                    )}
                </>
              ))}
              </div>
            </>
            )}
            {!isFiltered && categoryNum.Mexican >0 && (
            <>
              <h2 className='restaurant-category-title'>Mexican</h2>
              <div className="restaurant-main-grid-container" >
              {restaurants.length>0 && !isFiltered && restaurants.map(restaurant => (
                <>
                  {restaurant.category==="Mexican" && (
                    <NavLink className='navlink' key={restaurant.id} to={{pathname:`restaurants/${restaurant.id}`}} >
                      <div key={restaurant.id} className="restaurant-card-container">
                        <div className= 'get-restaurants-pic-container'>
                          <img className= 'get-restaurants-pic'src={restaurant.restaurantPicUrl}  onError={e => { e.currentTarget.src = "https://i.pinimg.com/originals/90/85/b0/9085b0692d8ffe530e71a601ec887cf2.jpg"; }}/>
                        </div>
                        <div className="get-restaurants-bottom-text-container">
                          <div className='get-restaurants-left-inner-text-container'>
                            <h4>{restaurant.name}</h4>
                            <p> {restaurant.avgRating} <i class="fa-solid fa-star" ></i> ratings</p>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                    )}
                </>
              ))}
              </div>
            </>
            )}

            {!isFiltered && categoryNum.Japanese >0 && (
            <>
              <h2 className='restaurant-category-title'>Japanese</h2>
              <div className="restaurant-main-grid-container" >
              {restaurants.length>0 && !isFiltered && restaurants.map(restaurant => (
                <>
                  {restaurant.category==="Japanese" && (
                    <NavLink className='navlink' key={restaurant.id} to={{pathname:`restaurants/${restaurant.id}`}} >
                      <div key={restaurant.id} className="restaurant-card-container">
                        <div className= 'get-restaurants-pic-container'>
                          <img className= 'get-restaurants-pic'src={restaurant.restaurantPicUrl} onError={e => { e.currentTarget.src = "https://i.pinimg.com/originals/90/85/b0/9085b0692d8ffe530e71a601ec887cf2.jpg"; }}/>
                        </div>
                        <div className="get-restaurants-bottom-text-container">
                          <div className='get-restaurants-left-inner-text-container'>
                            <h4>{restaurant.name}</h4>
                            <p> {restaurant.avgRating} <i class="fa-solid fa-star" ></i> ratings</p>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                    )}
                </>
              ))}
              </div>
            </>
            )}

            {!isFiltered && categoryNum.Italian >0 && (
            <>
              <h2 className='restaurant-category-title'>Italian</h2>
              <div className="restaurant-main-grid-container" >
              {restaurants.length>0 && !isFiltered && restaurants.map(restaurant => (
                <>
                  {restaurant.category==="Italian" && (
                    <NavLink className='navlink' key={restaurant.id} to={{pathname:`restaurants/${restaurant.id}`}} >
                      <div key={restaurant.id} className="restaurant-card-container">
                        <div className= 'get-restaurants-pic-container'>
                          <img className= 'get-restaurants-pic'src={restaurant.restaurantPicUrl} onError={e => { e.currentTarget.src = "https://i.pinimg.com/originals/90/85/b0/9085b0692d8ffe530e71a601ec887cf2.jpg"; }}/>
                        </div>
                        <div className="get-restaurants-bottom-text-container">
                          <div className='get-restaurants-left-inner-text-container'>
                            <h4>{restaurant.name}</h4>
                            <p> {restaurant.avgRating} <i class="fa-solid fa-star" ></i> ratings</p>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                    )}
                </>
              ))}
              </div>
            </>
            )}

            {!isFiltered && categoryNum.French >0 && (
            <>
              <h2 className='restaurant-category-title'>French</h2>
              <div className="restaurant-main-grid-container" >
              {restaurants.length>0 && !isFiltered && restaurants.map(restaurant => (
                <>
                  {restaurant.category==="French" && (
                    <NavLink className='navlink' key={restaurant.id} to={{pathname:`restaurants/${restaurant.id}`}} >
                      <div key={restaurant.id} className="restaurant-card-container">
                        <div className= 'get-restaurants-pic-container'>
                          <img className= 'get-restaurants-pic'src={restaurant.restaurantPicUrl} onError={e => { e.currentTarget.src = "https://i.pinimg.com/originals/90/85/b0/9085b0692d8ffe530e71a601ec887cf2.jpg"; }}/>
                        </div>
                        <div className="get-restaurants-bottom-text-container">
                          <div className='get-restaurants-left-inner-text-container'>
                            <h4>{restaurant.name}</h4>
                            <p> {restaurant.avgRating} <i class="fa-solid fa-star" ></i> ratings</p>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                    )}
                </>
              ))}
              </div>
            </>
            )}

            {!isFiltered && categoryNum.FastFood >0 && (
            <>
              <h2 className='restaurant-category-title'>FastFood</h2>
              <div className="restaurant-main-grid-container" >
              {restaurants.length>0 && !isFiltered && restaurants.map(restaurant => (
                <>
                  {restaurant.category==="FastFood" && (
                    <NavLink className='navlink' key={restaurant.id} to={{pathname:`restaurants/${restaurant.id}`}} >
                      <div key={restaurant.id} className="restaurant-card-container">
                        <div className= 'get-restaurants-pic-container'>
                          <img className= 'get-restaurants-pic'src={restaurant.restaurantPicUrl} onError={e => { e.currentTarget.src = "https://i.pinimg.com/originals/90/85/b0/9085b0692d8ffe530e71a601ec887cf2.jpg"; }}/>
                        </div>
                        <div className="get-restaurants-bottom-text-container">
                          <div className='get-restaurants-left-inner-text-container'>
                            <h4>{restaurant.name}</h4>
                            <p> {restaurant.avgRating} <i class="fa-solid fa-star" ></i> ratings</p>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                    )}
                </>
              ))}
              </div>
            </>
            )}
            {!isFiltered && categoryNum.Ethiopian >0 && (
            <>
              <h2 className='restaurant-category-title'>Ethiopian</h2>
              <div className="restaurant-main-grid-container" >
              {restaurants.length>0 && !isFiltered && restaurants.map(restaurant => (
                <>
                  {restaurant.category==="Ethiopian" && (
                    <NavLink className='navlink' key={restaurant.id} to={{pathname:`restaurants/${restaurant.id}`}} >
                      <div key={restaurant.id} className="restaurant-card-container">
                        <div className= 'get-restaurants-pic-container'>
                          <img className= 'get-restaurants-pic'src={restaurant.restaurantPicUrl} onError={e => { e.currentTarget.src = "https://i.pinimg.com/originals/90/85/b0/9085b0692d8ffe530e71a601ec887cf2.jpg"; }}/>
                        </div>
                        <div className="get-restaurants-bottom-text-container">
                          <div className='get-restaurants-left-inner-text-container'>
                            <h4>{restaurant.name}</h4>
                            <p> {restaurant.avgRating} <i class="fa-solid fa-star" ></i> ratings</p>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  )}
                </>
              ))}
              </div>
            </>
            )}
            {!isFiltered && categoryNum.Mediterranean >0 && (
            <>
              <h2 className='restaurant-category-title'>Mediterranean</h2>
              <div className="restaurant-main-grid-container" >
              {restaurants.length>0 && !isFiltered && restaurants.map(restaurant => (
                <>
                  {restaurant.category==="Mediterranean" && (
                    <NavLink className='navlink' key={restaurant.id} to={{pathname:`restaurants/${restaurant.id}`}} >
                      <div key={restaurant.id} className="restaurant-card-container">
                        <div className= 'get-restaurants-pic-container'>
                          <img className= 'get-restaurants-pic'src={restaurant.restaurantPicUrl} onError={e => { e.currentTarget.src = "https://i.pinimg.com/originals/90/85/b0/9085b0692d8ffe530e71a601ec887cf2.jpg"; }}/>
                        </div>
                        <div className="get-restaurants-bottom-text-container">
                          <div className='get-restaurants-left-inner-text-container'>
                            <h4>{restaurant.name}</h4>
                            <p> {restaurant.avgRating} <i class="fa-solid fa-star" ></i> ratings</p>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  )}
                </>
              ))}
              </div>
            </>
            )}
            {filteredItems.length>0 && isFiltered && (
            <div className='restaurant-filtered-main-grid-container'>
               {filteredItems.map(restaurant => (
                <>
                    <NavLink className='navlink' key={restaurant.id} to={{pathname:`restaurants/${restaurant.id}`}} >
                    <div key={restaurant.id} className="restaurant-card-container">
                      <div className= 'get-restaurants-pic-container'>
                        <img className= 'get-restaurants-pic'src={restaurant.restaurantPicUrl} onError={e => { e.currentTarget.src = "https://i.pinimg.com/originals/90/85/b0/9085b0692d8ffe530e71a601ec887cf2.jpg"; }}/>
                      </div>
                      <div className="get-restaurants-bottom-text-container">
                        <div className='get-restaurants-left-inner-text-container'>
                          <h3>{restaurant.name}</h3>
                          <p> {restaurant.avgRating} <i class="fa-solid fa-star" ></i> ratings</p>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                </>
              ))}
            </div>
            )}
            {filteredItems.length === 0 && isFiltered && (
              <div className='restaurants-no-items-display'>
               <i class="fa-solid fa-utensils"> </i> &nbsp;&nbsp;No Restaurants in this Category
              </div>
            )}
          </div>
        </>
    )
}

export default Restaurants
