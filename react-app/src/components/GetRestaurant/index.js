import { useParams, useHistory, NavLink, useLocation } from "react-router-dom"
import React,{useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurants } from "../../store/restaurant";
import { deleteRestaurant } from "../../store/restaurant";
import { deleteFoodItem } from "../../store/foodItem";
import { getFoodItems } from "../../store/foodItem";
import "./GetRestaurant.css"
import { Modal } from "../../context/FoodItemOrder";
// import { ReviewModal} from "../../context/Review";
import FoodItemModal from "../FoodItemModal";
import CartRightPane from "../CartRightPane";
import RestaurantFooter from "../RestaurantFooter";
import NavBar from "../Navigation/NavBar";
import RestaurantReviewsContainer from "../RestaurantReviewsContainer";
import { useToggleCart } from '../../context/ToggleCartContext';
import DeleteRestaurantModalComponent from "../DeleteRestaurantModal";
import DeleteFoodItemModalComponent from "../DeleteFoodItemModal";

// let cartFromLocalStorage =  JSON.parse(localStorage.getItem('cart' || "[]"))
// let cartFromLocalStorage =  JSON.parse(localStorage.getItem('cart'))

const GetRestaurant = () => {
  let { id } = useParams();
  const {toggleCartPane, setToggleCartPane} = useToggleCart();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const sessionUser = useSelector(state=> state.session.user)
  const restaurant = useSelector(state=> state.restaurants[id])
  const [quantityChange, setQuantityChange] = useState(false)
  const [newQuantity, setNewQuantity] = useState(1)
  const [oldFoodItem, setOldFoodItem] = useState(null)

  let foodItems = useSelector(state => Object.values(state.foodItems))

  const [foodItemModal, setFoodItemModal] = useState(false)
  const [restaurantDeleteModal, setRestaurantDeleteModal] = useState(false)
  const [foodItemDeleteModal, setFoodItemDeleteModal] = useState(false)
  const [foodItem, setFoodItem] =useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [closeTime, setCloseTime] = useState('')
  const [openTime, setOpenTime] = useState('')
  const [main, setMain] = useState('')
  const [sides, setSides] = useState('')
  const [drinks, setDrinks] = useState('')
  const [desserts, setDesserts] = useState('')
  const [all, setAll] = useState('')
  const [categoryChosen, setCategoryChosen] = useState('All')
  const [isFiltered, setIsFiltered] = useState(false)
  let [filteredItems, setFilteredItems] = useState([])

  const [submittedCart, setSubmittedCart] =useState(false)
  const [submittedCartItems, setSubmittedCartItems] = useState(JSON.parse(localStorage.getItem('cart')) || [])
  const [forceCartUpdate, setForceCartUpdate] = useState(false)

  const [finalAvgRating, setFinalAvgRating] = useState(0)


  let today = new Date();
  let todayInHours = today.getHours()
  let todayInMinutes = today.getMinutes()

  // // console.log('cart from local storage:', cartFromLocalStorage)
  // useEffect(()=>{
  //   let initialCartItems = localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')): []
  //   cartFromLocalStorage = initialCartItems
  //   setSubmittedCartItems(initialCartItems)
  // }, [])

  // // DONT SEND SUBMITTED CART ITEMS AS A PROP
  useEffect(()=> {
    localStorage.setItem("cart", JSON.stringify(submittedCartItems))
  }, [submittedCartItems])

  useEffect(()=>{
    if (restaurant){
      setFinalAvgRating(String(Number(restaurant.avgRating).toFixed(2)))
      let closeMinutesIndex;
      let closeMinutes;
      let openMinutesIndex;
      let openMinutes;
      let openExtension;
      let closeExtension;
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
      closeMinutes = restaurant.closeTime.substring(closeMinutesIndex+1, closeMinutesIndex+3)
      openMinutesIndex = restaurant.openTime.split("").indexOf(':')
      openMinutes = restaurant.openTime.substring(openMinutesIndex+1, openMinutesIndex+3)
      if (openHours[0]==='0') {
        let time = openHours.concat(":").concat(openMinutes).concat(openExtension)
        setOpenTime(time.substring(1,time.length))
      } else {
        setOpenTime(openHours.concat(":").concat(openMinutes).concat(openExtension))
      }
      if (closeHours[0]==='0'){
        let time = closeHours.concat(":").concat(closeMinutes).concat(closeExtension)
        setCloseTime(time.substring(1, time.length))
      } else {
        setCloseTime(closeHours.concat(":").concat(closeMinutes).concat(closeExtension))
      }
      if (todayInHours === actualCloseHours)console.log('hours match')
      if ((todayInHours < actualCloseHours && todayInHours > actualOpenHours) || (todayInHours === actualCloseHours && todayInMinutes < Number(closeMinutes))
      || (todayInHours === actualOpenHours && todayInMinutes > Number(openMinutes))) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    }
  }, [restaurant?.openTime, restaurant?.closeTime])

  console.log('submitted cart items on get restaurant page:', submittedCartItems)


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
      setFilteredItems(filteredItems)
      setIsFiltered(true)
      return filteredItems

    }
  }, [main])

  useEffect(()=>{
    if (foodItems.length>0 && sides === "Sides"){
      filteredItems = foodItems.filter(item => item.category === sides)
      setFilteredItems(filteredItems)
      setIsFiltered(true)
      return filteredItems

    }

  }, [sides])

  useEffect(()=>{
    if (foodItems.length>0 && desserts === "Desserts"){
      filteredItems = foodItems.filter(item => item.category === desserts)
      setFilteredItems(filteredItems)
      setIsFiltered(true)
      return filteredItems
    }

  }, [desserts])

  useEffect(()=>{
    if (foodItems.length>0 && drinks === "Drinks"){
      filteredItems = foodItems.filter(item => item.category === drinks)
      setFilteredItems(filteredItems)
      setIsFiltered(true)
      return filteredItems
    }
  }, [drinks])

  useEffect(()=> {
    dispatch(getAllRestaurants())
  }, [dispatch])

  useEffect(()=> {
    dispatch(getFoodItems(id))
  }, [dispatch, id])

// REFACTORED INTO MODAL

  const handleFilter = categoryName => {
    if (categoryName === "All") {
      setAll(categoryName)
      setCategoryChosen(categoryName)
      setMain("")
      setSides("")
      setDesserts("")
      setDrinks("")
    }
    if (categoryName === "Main") {
      setMain(categoryName)
      setCategoryChosen(categoryName)
      setSides("")
      setDesserts("")
      setDrinks("")
      setAll("")
    }
    if (categoryName=== "Desserts"){
      setDesserts(categoryName)
      setCategoryChosen(categoryName)
      setMain("")
      setSides("")
      setDrinks("")
      setAll("")

    }
    if (categoryName=== 'Sides') {
      setSides(categoryName)
      setCategoryChosen(categoryName)
      setDrinks("")
      setMain("")
      setDesserts("")
      setAll("")

    }
    if (categoryName === "Drinks") {
      setDrinks(categoryName)
      setCategoryChosen(categoryName)
      setMain("")
      setDesserts("")
      setSides("")
      setAll("")
    }
  }



  return (
    <>
    <NavBar toggleCartPane={toggleCartPane} setToggleCartPane={setToggleCartPane}/>
      <div className="restaurant-page-main-container">
        <div className="restaurant-page-main-content-top-outer-container">
          <div className="restaurant-page-main-content-container">
            {restaurant  && (
              <>
                <div className="restaurant-page-pic-container">
                  <img className="restaurant-page-pic" src={restaurant.restaurantPicUrl} onError={e => { e.currentTarget.src = "https://i.pinimg.com/originals/90/85/b0/9085b0692d8ffe530e71a601ec887cf2.jpg"; }}/>
                </div>
                <div className="restaurant-page-logo-pic-container">
                  <img className="restaurant-page-logo-pic" src={restaurant.logo} onError={e => { e.currentTarget.src = "https://cdn5.vectorstock.com/i/1000x1000/65/29/vintage-badge-retro-blank-labels-logo-vector-23946529.jpg"; }} />
                </div>
                <div className="restaurant-page-name" style={{marginTop: "20px"}}>
                  {restaurant.name}
                </div>
                <div className="restaurant-page-description-container">
                  <div className="restaurant-page-left-description-text-box">
                    <div style={{width: '100%', display: 'flex'}}> {restaurant.category} • {restaurant.avgRating == "0"? null: finalAvgRating}&nbsp;
                    <i class="fa-solid fa-star" ></i> • {restaurant.numReviews == "0"? "No": restaurant.numReviews}&nbsp;{restaurant.numReviews=== 1? "rating": "ratings"} • {restaurant.priceRange == 1? "$": restaurant.priceRange == 2? "$$": restaurant.priceRange == 3? "$$$":"$$$$"}
                    </div>
                    <div className="restaurant-page-hours-container">
                      <div className="restaurant-page-open-status" style={{color: isOpen? "green": "red"}}>
                        {isOpen? "Open Now": "Closed"}&nbsp;
                      </div>
                      <div className="restaurant-page-close-information">
                      •&nbsp;Closes at {restaurant? closeTime: null}
                      </div>
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
                        <button onClick={()=> setRestaurantDeleteModal(true)} className="restaurant-page-delete-button button">
                          Delete Restaurant
                        </button>
                        <NavLink className='navlink' to={`/restaurants/${restaurant.id}/new`}>
                          <div className="restaurant-page-create-food-item-button button">
                            Add to Menu
                          </div>
                        </NavLink>
                      </>
                    )}
                    {restaurantDeleteModal && (<DeleteRestaurantModalComponent setRestaurantDeleteModal={setRestaurantDeleteModal} restaurant={restaurant}/>)}
                  </div>
                </div>
                <RestaurantReviewsContainer sessionUser={sessionUser} restaurant={restaurant} finalAvgRating={finalAvgRating}/>
                <div className="restaurant-page-middle-container">
                    <div style={{marginTop:"15px"}}><b>Full Menu</b></div>
                    <div style={{color: "#7A7876"}}> {openTime} - {closeTime}</div>
                    <div className="filter-food-item-category-container">
                      <div onClick={ e=> handleFilter("All")} className='restaurant-page-category-container'>
                        All
                        {categoryChosen === "All" && (
                          <div className="restaurant-page-category-selection-bar"></div>
                        )}
                      </div>
                      <div onClick={ e=> handleFilter("Main")} className='restaurant-page-category-container not-first-category'>
                        Main
                        {categoryChosen === "Main" && (
                          <div className="restaurant-page-category-selection-bar"></div>
                        )}
                      </div>
                      <div onClick={e=> handleFilter("Sides")} className='restaurant-page-category-container not-first-category'>
                        Sides
                        {categoryChosen === "Sides" && (
                          <div className="restaurant-page-category-selection-bar"></div>
                        )}
                      </div>
                      <div onClick={e=>  handleFilter("Drinks")} className="restaurant-page-category-container not-first-category">
                        Drinks
                        {categoryChosen === "Drinks" && (
                          <div className="restaurant-page-category-selection-bar"></div>
                        )}
                      </div>
                      <div onClick={e=>  handleFilter("Desserts")} className="restaurant-page-category-container not-first-category">
                        Desserts
                        {categoryChosen === "Desserts" && (
                          <div className="restaurant-page-category-selection-bar"></div>
                        )}
                      </div>
                    </div>
                    <div className="filter-food-item-category-dynamic-bar-selection" style={{}}>
                    </div>
                </div>
                <div className="restaurant-page-bottom-container">
                  {foodItems.length === 0 && !isFiltered && (
                    <div className="no-food-items-container">
                      No food items &nbsp;<i class="fa-solid fa-plate-wheat"></i>&nbsp;
                      {sessionUser.id === restaurant.ownerId && (<p>Add to your menu!</p>)}
                    </div>
                  )}
                  {foodItems.length>0 && (
                    <>
                      <h2 className="category-name-container" > {categoryChosen} </h2>
                        {foodItems.length>0 && !isFiltered && (
                          <div className="food-items-grid-container">
                              {foodItems.map(item=>(
                                <div key={item.id} className="food-item-card-container">
                                  <div className="food-item-left-middle-outer-container" onClick={()=> {
                                    setFoodItemModal(true)
                                    setFoodItem(item)
                                    }}>
                                    <div className="food-item-left-container">
                                      <div style={{fontWeight:"700"}}> {item.name.length>32? item.name.substring(0,33).concat("..."): item.name} </div>
                                      <div> {item.description.length>87? item.description.substring(0,88).concat("..."): item.description} </div>
                                      <div> ${item.price} </div>
                                    </div>
                                    <div className="food-item-middle-container">
                                      <img className="food-item-pic" src= {item.foodPicUrl} onError={e => { e.currentTarget.src =
                                        "https://static.onecms.io/wp-content/uploads/sites/47/2020/08/06/cat-with-empty-bowl-1224404559-2000.jpg"; }}/>
                                    </div>
                                  </div>
                                  {sessionUser.id == restaurant.ownerId && (
                                    <div className="food-item-right-container">
                                      {/* {sessionUser.id == restaurant.ownerId && ( */}
                                        <>
                                          <NavLink className="navlink edit-food-item-button" to={`/restaurants/${id}/fooditems/${item.id}`}>
                                            <button style={{width:"100%"}}className="button edit-food-item-actual-button"><i class="fa-solid fa-pen-to-square"></i></button>
                                          </NavLink>
                                          <button onClick={()=> {
                                            setFoodItemDeleteModal(true)
                                            setFoodItem(item)
                                            }} className="button delete-food-item-button"><i class="fa-solid fa-trash-can"></i></button>
                                        </>
                                      {/* )} */}
                                      {foodItemDeleteModal && <DeleteFoodItemModalComponent foodItem={foodItem} restaurant={restaurant} setFoodItemDeleteModal={setFoodItemDeleteModal}/>}
                                    </div>
                                  )}
                                </div>
                              ))}
                              {foodItemModal && <FoodItemModal restaurant={restaurant} setFoodItemModal={setFoodItemModal} forceCartUpdate={forceCartUpdate} setForceCartUpdate={setForceCartUpdate} submittedCartItems={submittedCartItems} setSubmittedCartItems={setSubmittedCartItems} setSubmittedCart={setSubmittedCart} foodItem={foodItem}/> }
                          </div>
                        )}
                        {filteredItems.length>0 && isFiltered && (
                          <div className="food-items-grid-container">
                            {filteredItems.map(item=>(
                              <div key={item.id} className="food-item-card-container" >
                                <div className="food-item-left-middle-outer-container" onClick={()=> {
                                  setFoodItemModal(true)
                                  setFoodItem(item)
                                  }}>
                                  <div className="food-item-left-container">
                                    <div style={{fontWeight:"700"}}> {item.name} </div>
                                    <div> {item.description.length>87? item.description.substring(0,88).concat("..."): item.description} </div>
                                    <div> ${item.price} </div>
                                  </div>
                                  <div className="food-item-middle-container">
                                    <img className="food-item-pic" src= {item.foodPicUrl} onError={e => { e.currentTarget.src =
                                      "https://static.onecms.io/wp-content/uploads/sites/47/2020/08/06/cat-with-empty-bowl-1224404559-2000.jpg"; }}/>
                                  </div>
                                </div>
                                {sessionUser.id == restaurant.ownerId && (
                                  <div className="food-item-right-container">
                                    <>
                                      <NavLink className="navlink edit-food-item-button" to={`/restaurants/${id}/fooditems/${item.id}`}>
                                        <button style={{width:"100%"}} className="button edit-food-item-actual-button"><i class="fa-solid fa-pen-to-square"></i></button>
                                      </NavLink>
                                      <button onClick={()=> {
                                        setFoodItemDeleteModal(true)
                                        setFoodItem(item)
                                      }} className="button delete-food-item-button"><i class="fa-solid fa-trash-can"></i></button>
                                    </>
                                    {foodItemDeleteModal && <DeleteFoodItemModalComponent setFilteredItems= {setFilteredItems} filteredItems={filteredItems} foodItem={foodItem} restaurant={restaurant} setFoodItemDeleteModal={setFoodItemDeleteModal}/>}
                                  </div>
                                )}
                                {foodItemModal && <FoodItemModal restaurant={restaurant} setFoodItemModal={setFoodItemModal} forceCartUpdate={forceCartUpdate} setForceCartUpdate={setForceCartUpdate} submittedCartItems={submittedCartItems} setSubmittedCartItems={setSubmittedCartItems} setSubmittedCart={setSubmittedCart} foodItem={foodItem}/> }
                              </div>
                            ))}
                          </div>
                        )}
                        {filteredItems.length === 0 && isFiltered && (
                          <div className='no-food-items-main-container'>
                            {
                              <>
                                <i class="fa-solid fa-plate-wheat"></i> &nbsp; <h3> No filtered food items</h3>
                              </>
                            }
                          </div>
                        )}
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        {toggleCartPane && <CartRightPane setToggleCartPane={setToggleCartPane} toggleCartPane={toggleCartPane} cartItems={submittedCartItems} setCartItems={setSubmittedCartItems} forceCartUpdate={forceCartUpdate} restaurant={submittedCartItems?.length>0? submittedCartItems[0].Restaurant: null} />}
        </div>
        <RestaurantFooter/>

      </div>
    </>


  )
}

export default GetRestaurant
