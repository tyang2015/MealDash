import { useParams, useHistory, NavLink } from "react-router-dom"
import React,{useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurants } from "../../store/restaurant";
import { deleteRestaurant } from "../../store/restaurant";
import { deleteFoodItem } from "../../store/foodItem";
import { getFoodItems } from "../../store/foodItem";
import "./GetRestaurant.css"

const GetRestaurant = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state=> state.session.user)
  // console.log('id is:', id)
  const restaurant = useSelector(state=> state.restaurants[id])
  let foodItems = useSelector(state => Object.values(state.foodItems))
  console.log('all food items:', foodItems)
  const [isOpen, setIsOpen] = useState(false)
  const [closeTime, setCloseTime] = useState('')
  const [openTime, setOpenTime] = useState('')
  const [main, setMain] = useState('')
  const [sides, setSides] = useState('')
  const [drinks, setDrinks] = useState('')
  const [desserts, setDesserts] = useState('')
  const [all, setAll] = useState('')
  const [categoryChosen, setCategoryChosen] = useState('All')
  // const [foodItemsChange, setFoodItemsChange] = useState(false)
  const [isFiltered, setIsFiltered] = useState(false)
  let [filteredItems, setFilteredItems] = useState([])

  // console.log('food items:', foodItems)
  let today = new Date();
  let todayInHours = today.getHours()
  let todayInMinutes = today.getMinutes()
  console.log('hours:', today.getHours())
  console.log('minutes:', today.getMinutes())

  // let closeTime;
  // let openTime;
  // let isOpen;
  // let filteredItems;
  let closeMinutesIndex;
  let closeMinutes;
  let openMinutesIndex;
  let openMinutes;
  let openExtension;
  let closeExtension;
  // keep track of actual hours from restaurant.closeTime and restaurant.openTime () to determine isOpen
  useEffect(()=>{
    if (restaurant){
      // convert to readable time format => 17:00:00 to 5:00
      let closeHours = restaurant.closeTime.substring(0,2)
      let openHours = restaurant.openTime.substring(0,2)
      let actualCloseHours = Number(closeHours)
      let actualOpenHours = Number(openHours)
      // console.log('close hours from restaurant object:', closeHours)
      if (Number(openHours)<12) openExtension = "AM"
      if (Number(closeHours)<12) closeExtension = "AM"
      if (Number(openHours) == 12) openExtension = 'PM'
      if (Number(closeHours) == 12) closeExtension = 'PM'
      if (Number(closeHours)>12){
        closeHours = String(Number(closeHours) -12)
        closeExtension = "PM"
      }
      if (Number(openHours)>12) {
        openHours = String(Number(openHours) -12)
        openExtension = "PM"
      }
      closeMinutesIndex = restaurant.closeTime.split("").indexOf(':')
      closeMinutes = restaurant.closeTime.substring(closeMinutesIndex, closeMinutesIndex+3)
      // closeTime = closeHours.concat(closeMinutes).concat(closeExtension)
      setCloseTime(closeHours.concat(closeMinutes).concat(closeExtension))
      openMinutesIndex = restaurant.openTime.split("").indexOf(':')
      openMinutes = restaurant.openTime.substring(openMinutesIndex, openMinutesIndex+3)
      // openTime = openHours.concat(openMinutes).concat(openExtension)
      setOpenTime(openHours.concat(openMinutes).concat(openExtension))

      // determine if open
      if ((todayInHours < actualCloseHours && todayInHours > actualOpenHours) || (todayInHours === actualCloseHours && todayInMinutes < Number(closeMinutes))
      || (todayInHours === actualCloseHours && todayInMinutes > Number(openMinutes))) {
        setIsOpen(true)
      }
    }
  }, [restaurant])

  // useEffect(()=> {
  // }, [main, sides, desserts, drinks])

  useEffect(()=>{
    if (foodItems.length>0 && all=== "All"){
      foodItems = [...foodItems]
      setIsFiltered(false)
      return foodItems
    }
  }, [all])

  useEffect(()=>{
    if (foodItems.length>0 && main=== "Main"){
      filteredItems = foodItems.filter(item => item.category === main)
      console.log('filtered Items: ', filteredItems)
      setFilteredItems(filteredItems)
      setIsFiltered(true)
      console.log('filtered?', isFiltered)
      return filteredItems

    }
  }, [main])

  useEffect(()=>{
    if (foodItems.length>0 && sides === "Sides"){
      filteredItems = foodItems.filter(item => item.category === sides)
      console.log('filtered Items: ', filteredItems)
      setFilteredItems(filteredItems)
      setIsFiltered(true)
      console.log('filtered?', isFiltered)
      return filteredItems

    }

  }, [sides])

  useEffect(()=>{
    if (foodItems.length>0 && desserts === "Desserts"){
      filteredItems = foodItems.filter(item => item.category === desserts)
      console.log('filtered Items: ', filteredItems)
      setFilteredItems(filteredItems)
      setIsFiltered(true)
      console.log('filtered?', isFiltered)
      return filteredItems

      // foodItems = [...filteredItems]
      // console.log('food items: ', foodItems)
      // return foodItems
    }

  }, [desserts])

  useEffect(()=>{
    if (foodItems.length>0 && drinks === "Drinks"){
      filteredItems = foodItems.filter(item => item.category === drinks)
      console.log('filtered Items: ', filteredItems)
      setFilteredItems(filteredItems)
      setIsFiltered(true)
      console.log('filtered?', isFiltered)
      return filteredItems
    }
  }, [drinks])

  // useEffect(()=>{
  //   console.log('food items changing')
  //   setFoodItemsChange(!foodItemsChange)
  // }, [foodItems.length])

  useEffect(()=> {
    dispatch(getAllRestaurants())
  }, [dispatch])

  useEffect(()=> {
    dispatch(getFoodItems(id))
  }, [dispatch])

  // FOR RESTAURANT
  const handleDelete = e => {
    dispatch(deleteRestaurant(id))
    alert('successfully deleted!')
    return history.push('/')
  }

  const handleDeleteFoodItem = (foodItemId)=> {
    console.log('food item id in handle delete function:', foodItemId)
    dispatch(deleteFoodItem(id, foodItemId))
    alert('food item deleted!')
    return
  }

  const handleFilter = categoryName => {
    if (categoryName === "All") {
      setAll(categoryName)
      setCategoryChosen("All")
      setMain("")
      setSides("")
      setDesserts("")
      setDrinks("")
    }
    if (categoryName === "Main") {
      setMain("Main")
      setCategoryChosen("Main")
      setSides("")
      setDesserts("")
      setDrinks("")
      setAll("")
    }
    if (categoryName=== "Desserts"){
      setDesserts("Desserts")
      setCategoryChosen("Desserts")
      setMain("")
      setSides("")
      setDrinks("")
      setAll("")

    }
    if (categoryName=== 'Sides') {
      setSides("Sides")
      setCategoryChosen("Sides")
      setDrinks("")
      setMain("")
      setDesserts("")
      setAll("")

    }
    if (categoryName === "Drinks") {
      setDrinks("Drinks")
      setCategoryChosen("Drinks")
      setMain("")
      setDesserts("")
      setSides("")
      setAll("")
    }
  }



  return (
    <div className="restaurant-page-main-container">
      <div className="restaurant-page-main-content-container">
        {/* <h3> restaurant page</h3> */}
        {restaurant  && (
          <>
            <div className="restaurant-page-pic-container">
              <img className="restaurant-page-pic" src={restaurant.restaurantPicUrl} onError={e => { e.currentTarget.src = "https://i.pinimg.com/originals/90/85/b0/9085b0692d8ffe530e71a601ec887cf2.jpg"; }}/>
            </div>
            <div className="restaurant-page-logo-pic-container">
              <img className="restaurant-page-logo-pic" src={restaurant.logo} onError={e => { e.currentTarget.src = "https://cdn5.vectorstock.com/i/1000x1000/65/29/vintage-badge-retro-blank-labels-logo-vector-23946529.jpg"; }} />
            </div>
            <div className="restaurant-page-name">
              {restaurant.name}
            </div>
            <div className="restaurant-page-description-container">
              <div className="restaurant-page-left-description-text-box">
                <div> {restaurant.category} {restaurant.avgRating}
                {restaurant.numReviews} ratings {restaurant.priceRange == "1"? "$": "2"? "$$": "$$$"}
                </div>
                <div className="restaurant-page-hours-container">
                  {isOpen? "Open Now": "Closed"} Closes at {restaurant? closeTime: null}
                </div>
              </div>
              <div style={{width: "330px"}} className="restaurant-page-update-delete-buttons-container">
                {sessionUser.id == restaurant.ownerId && (
                  <>
                    <NavLink className='navlink' to={`/restaurants/${restaurant.id}/edit`}>
                      <div className = "restaurant-page-update-button button">
                        Update Restaurant
                      </div>
                    </NavLink>
                    <button onClick={handleDelete} className="restaurant-page-delete-button button">
                      Delete Restaurant
                    </button>
                    <NavLink className='navlink' to={`/restaurants/${restaurant.id}/new`}>
                      <div className="restaurant-page-create-food-item-button button">
                        Add to the Menu
                      </div>
                    </NavLink>
                  </>
                )}
              </div>
            </div>
            <div className="restaurant-page-middle-container">
                <div> Full Menu </div>
                <div> {openTime} - {closeTime}</div>
                <div className="filter-food-item-category-container">
                  <div onClick={ e=> handleFilter("All")} className='food-category-main-button'>All</div>
                  <div onClick={ e=> handleFilter("Main")} className='food-category-main-button not-first-category'>Main</div>
                  <div onClick={e=> handleFilter("Sides")} className='food-category-side-button not-first-category'>Sides</div>
                  <div onClick={e=>  handleFilter("Drinks")} className="food-category-drink-button not-first-category">Drinks</div>
                  <div onClick={e=>  handleFilter("Desserts")} className="food-category-dessert-button not-first-category">Desserts</div>
                </div>
                <div className="filter-food-item-category-dynamic-bar-selection" style={{}}>
                </div>
            </div>
            <div className="restaurant-page-bottom-container">
              <h2> {categoryChosen} </h2>
              <div className="food-items-grid-container">
                  {foodItems.length>0 && !isFiltered && foodItems.map(item=>(
                    <div key={item.id} className="food-item-card-container">
                      <div className="food-item-left-container">
                        <div style={{fontWeight:"700"}}> {item.name} </div>
                        <div> {item.description.length>87? item.description.substring(0,88).concat("..."): item.description} </div>
                        <div> {item.price} </div>
                        <div> {item.category}</div>
                      </div>
                      <div className="food-item-middle-container">
                        <img className="food-item-pic" src= {item.foodPicUrl} onError={e => { e.currentTarget.src =
                          "https://static.onecms.io/wp-content/uploads/sites/47/2020/08/06/cat-with-empty-bowl-1224404559-2000.jpg"; }}/>
                      </div>
                      <div className="food-item-right-container">
                        {sessionUser.id == restaurant.ownerId && (
                          <>
                            <NavLink to={`/restaurants/${id}/fooditems/${item.id}`}>
                              <button className="button">edit item</button>
                            </NavLink>
                            <button onClick={(e)=> handleDeleteFoodItem(item.id)} className="button">delete item</button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                  {filteredItems.length>0 && isFiltered && filteredItems.map(item=>(
                    <div key={item.id} className="food-item-card-container">
                      <div className="food-item-left-container">
                        <div style={{fontWeight:"700"}}> {item.name} </div>
                        <div> {item.description.length>87? item.description.substring(0,88).concat("..."): item.description} </div>
                        <div> {item.price} </div>
                        <div> {item.category}</div>
                      </div>
                      <div className="food-item-middle-container">
                        <img className="food-item-pic" src= {item.foodPicUrl} onError={e => { e.currentTarget.src =
                          "https://static.onecms.io/wp-content/uploads/sites/47/2020/08/06/cat-with-empty-bowl-1224404559-2000.jpg"; }}/>
                      </div>
                      <div className="food-item-right-container">
                        {sessionUser.id == restaurant.ownerId && (
                          <>
                            <NavLink to={`/restaurants/${id}/fooditems/${item.id}`}>
                              <button className="button">edit item</button>
                            </NavLink>
                            <button onClick={(e)=> handleDeleteFoodItem(item.id)} className="button">delete item</button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
              </div>

            </div>
          </>
        )}
      </div>
    </div>


  )
}

export default GetRestaurant
