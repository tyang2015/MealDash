import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurants } from '../../store/restaurant';
import { NavLink } from 'react-router-dom';
import NavBar from '../Navigation/NavBar';
import "./restaurants.css"

const CATEGORY_CHOICES = ["All","Asian", "American","Breakfast", "Vegan", "Mexican", "Japanese", "Italian", "French", "FastFood", "Ethiopian", "Mediterranean"]


const Restaurants = () => {
    const dispatch = useDispatch()
    let restaurants = useSelector(state => Object.values(state.restaurants))
    // console.log('restaurants:', restaurants)
    let [filteredItems, setFilteredItems] = useState([])
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




    // useEffect(()=>{
    //   if (restaurants.length>0){
    //     for (let key in categories){
    //       if (key === "") {
    //         continue
    //       }
    //       else if (key === "ALL" && categories.ALL === "ALL") {
    //         // no filter, just return original state
    //         return restaurants
    //       }
    //       else {
    //         let filteredItems = restaurants.filter(restaurant=> restaurant.category === key)
    //         console.log(`filtered restaurants based on category ${key}: ${filteredItems}`)
    //         setFilteredItems(filteredItems)
    //         setIsFiltered(true)
    //         return filteredItems
    //       }
    //     }
    //   }
    //   let filteredRestaurants = restaurants.filter(restaurant => restaurant.category === categories)
    // }, [categories])
    // [categories.ALL, categories.Asian, categories.American, categories.Breakfast, categories.Vegan,
    //   categories.Mexican, categories.Japanese, categories.Italian, categories.French, categories.FastFood,
    //   categories.Ethiopian, categories.Mediterranean
    // ]

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

    // const handleCategorySelection = async (chosenCategory) => {
    //   console.log('category clicked:', chosenCategory)
    //   await setCategories({
    //     ALL:"",
    //     Asian: "",
    //     American: "",
    //     Breakfast: "",
    //     Vegan: "",
    //     Mexican: "",
    //     Japanese: "",
    //     Italian: "",
    //     French: "",
    //     FastFood: "",
    //     Ethiopian:"",
    //     Mediterranean: ""
    //   })
    //   let allEmpty = Object.values(categories).every(cat=> cat === "" )
    //   if (allEmpty){
    //     setCategories({...categories, [chosenCategory] : chosenCategory})
    //   }

    // }
    return (
        <>
          <NavBar/>
          <div>
            <div className='restaurants-categories-container'>
              {CATEGORY_CHOICES.map(category=> (
                <p key={category} onClick={()=> handleCategorySelection(category)}>{category}</p>
              ))}
            {/* <img width="40" height="40" alt="Flowers" src="https://img.cdn4dd.com/s/media/photosV2/c8f182ec-622a-4094-bcae-68ef7242fccf-retina-large.SVG"/> */}
            {/* <svg viewBox="0 0 760 760" width="760" height="760" preserveAspectRatio="xMidYMid meet" style={{width: "100%", height: "100%", transform: "translate3d(0px, 0px, 0px)"}}><path fill="rgb(168,214,223)" fill-opacity="1" d=" M37.49100112915039,73.51599884033203 C104.54100036621094,73.51599884033203 141.96600341796875,35.45800018310547 157.33999633789062,26.514999389648438 C164.27099609375,22.85099983215332 168.08700561523438,18.158000946044922 173.4499969482422,14.182000160217285 C182.7519989013672,7.296999931335449 182.83700561523438,-0.04899999871850014 184.67799377441406,-7.491000175476074 C187.33200073242188,-18.209999084472656 184.11199951171875,-28.756999969482422 174.44200134277344,-38.89099884033203 C168.5019989013672,-45.11399841308594 157.2449951171875,-49.4109992980957 145.77099609375,-53.40599822998047 C118.56400299072266,-62.87799835205078 88.08999633789062,-68.17500305175781 55.33000183105469,-71.0459976196289 C15.071999549865723,-74.5780029296875 -24.57200050354004,-73.6050033569336 -64.50900268554688,-72.49099731445312 C-96.75900268554688,-71.58499908447266 -124.72100067138672,-66.31500244140625 -151.1540069580078,-58.891998291015625 C-163.9499969482422,-55.3129997253418 -170.94700622558594,-49.534000396728516 -176.50100708007812,-43.16899871826172 C-188.5030059814453,-29.42799949645996 -187.66299438476562,-15.225000381469727 -179.40899658203125,-0.7490000128746033 C-175.10299682617188,6.807000160217285 -171.0330047607422,14.456000328063965 -164.77200317382812,21.72800064086914 C-154.36500549316406,33.805999755859375 -125.54299926757812,76.28399658203125 -4.145999908447266,73.16600036621094 C-4.145999908447266,73.16600036621094 37.49100112915039,73.51599884033203 37.49100112915039,73.51599884033203z"></path></svg> */}
            </div>
            <div className="restaurant-main-grid-container" >
                {restaurants.length>0 && !isFiltered && restaurants.map(restaurant => (
                  <>
                    <NavLink className='navlink' key={restaurant.id} to = {`restaurants/${restaurant.id}`}>
                      <div key={restaurant.id} className="restaurant-card-container">
                        <div className= 'get-restaurants-pic-container'>
                          <img className= 'get-restaurants-pic'src={restaurant.restaurantPicUrl}/>
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
                {filteredItems.length>0 && isFiltered && filteredItems.map(restaurant => (
                  <>
                    <NavLink className='navlink' key={restaurant.id} to = {`restaurants/${restaurant.id}`}>
                      <div key={restaurant.id} className="restaurant-card-container">
                        <div className= 'get-restaurants-pic-container'>
                          <img className= 'get-restaurants-pic'src={restaurant.restaurantPicUrl}/>
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
          </div>
        </>
    )
}

export default Restaurants
