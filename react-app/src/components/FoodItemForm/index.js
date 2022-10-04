import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
import { createFoodItem, updateFoodItem } from '../../store/foodItem';
import "./FoodItemForm.css"

const FOOD_ITEM_CATEGORIES = ["Main", "Sides", "Drinks", "Desserts"]


const FoodItemForm = ({foodItem, formType}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // id is RESTAURANT id to be put inside object on submit
  const { id, foodItemId } = useParams();
  const sessionUser = useSelector(state => state.session.user)
  // const foodItems =  useSelector(state=> state.foodItems)
  // let foodItem = foodItems[foodItemId]

  const [name, setName] = useState(foodItem? foodItem.name : '')
  const [foodPicUrl, setFoodPicUrl] = useState(foodItem? foodItem.foodPicUrl : '')
  const [description, setDescription] = useState(foodItem? foodItem.description:'')
  const [price, setPrice] = useState(foodItem? foodItem.price : '')
  const [category, setCategory] = useState(foodItem? foodItem.category: 'Main')
  const [errors, setErrors] = useState([])
  const [hasSubmitted, setHasSubmitted] = useState(false)

  function isImage(url) {
    let imageExtensions= ['jpg', 'jpeg', 'png', 'svg', 'gif', 'webp']
    for (let i = 0; i< imageExtensions.length; i++){
      let ext = imageExtensions[i]
      if (url.toLowerCase().includes(ext)){
        return true
      }
    }
    return false
    // if (url.toLowerCase().includes)
    // return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

  useEffect(()=>{
    console.log('input change in food item form')
    let errors =[]
    if (!name) errors.push('Name is required')
    if (name.length> 50) errors.push("Name must be less than 50 characters")
    if (description.length>500) errors.push("Description must be less than 500 chars")
    if (price>25000) errors.push("Price must be below 25000")
    if (price<=0) errors.push("Price must be greater than 0")
    if (!isImage(foodPicUrl)) errors.push("Food pic url is invalid")
    setErrors(errors)
  }, [name, foodPicUrl, description, price])

  const handleSubmit = e => {
    e.preventDefault();
    setHasSubmitted(true)
    if (errors.length>0){
      alert("Cannot submit food item info")
      return
    }
    console.log('description length on submission:', description.length)
    foodItem = {
      ...foodItem,
      name,
      food_pic_url: foodPicUrl,
      description,
      price,
      category,
      restaurant_id: id
    }
    // console.log('food item before sending to db:', foodItem)
    if (formType === "Create Form") {
      dispatch(createFoodItem(id, foodItem))
      alert("Food item successfully created!")
      history.push(`/restaurants/${id}`)
    } else {
      dispatch(updateFoodItem(id, foodItem))
      alert("Food item has been updated")
      return history.push(`/restaurants/${id}`)
      // console.log("todo: update")
    }
    setHasSubmitted(false)
    return

  }

  return (
    // <h3> food item form</h3>
    <>
      <form className='create-food-item-form-container'>
        <h3> {formType==="Create Form"? "Create Menu Item": "Update Menu Item"} </h3>
        <div className="create-food-item-errors-container">
          {errors.length>0 && hasSubmitted && (
            <div className="validation-errors-container">
                <ul className='validation-errors'>
                    {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                    ))}
                </ul>
            </div>
          )}
        </div>
        <div className='create-food-item-content-container'>
          <div className='create-food-item-left-container'>
            <div className='create-food-item-label-input-container'>
              <label htmlFor='food-item-name'>Food Item Name</label>
              <input
                id="food-item-name"
                type='text'
                placeholder="name"
                value={name}
                onChange={(e)=> setName(e.target.value)}
                required={true}
              />
            </div>
            <div className='create-food-item-label-input-container not-top-food-item'>
              <label htmlFor="food-item-description" style={{marginBottom:"-50px"}}>Description</label>
              <textarea
                type='text'
                id= "food-item-description"
                placeholder="description"
                rows='10'
                cols = '33'
                value={description}
                onChange={e=> setDescription(e.target.value)}
                style={{marginTop:"50px"}}
              />
            </div>
            <div className='food-item-price-category-container not-top-food-item' >
              <div className='create-food-item-label-input-container' >
                <label htmlFor="food-item-price">Price</label>
                <input
                  id='food-item-price'
                  type="number"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  placeholder='Price'
                  step='0.01'
                  min="0.01"
                  required
                />
              </div>
              <div className='create-food-item-label-input-container' >
                <label htmlFor="food-item-category">Food Category</label>
                <select
                  id='food-item-category'
                  value={category}
                  onChange={(e)=> setCategory(e.target.value)}
                  required
                  style={{boxSizing:"border-box", height: "100%"}}
                  >
                    {/* how come my default selected value does not sho */}
                  {FOOD_ITEM_CATEGORIES.map(cat => (
                    <>
                      <option key={cat.id}>{cat}</option>
                    </>
                  ))}
                </select>
              </div>
            </div>
            <div className='create-food-item-submit-container'>
              <button type='submit' className='create-food-item-button' onClick={handleSubmit}> Submit </button>
            </div>
          </div>
          <div className='create-food-item-right-container'>
            <label htmlFor="food-item-pic">Food Item Picture</label>
            <input
              id="food-item-pic"
              type='text'
              placeholder='food pic url'
              value={foodPicUrl}
              onChange={e=> setFoodPicUrl(e.target.value)}
              required
            />
            <div className='create-food-item-container'>
              <img
                src={foodPicUrl}
                alt="Food Pic Url"
                className='create-food-item-food-pic'
                onError={e => { e.currentTarget.src =
                  "https://static.onecms.io/wp-content/uploads/sites/47/2020/08/06/cat-with-empty-bowl-1224404559-2000.jpg"; }}
              />
            </div>
          </div>
        </div>

      </form>
    </>
  )
}

export default FoodItemForm
