import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
import "./FoodItemForm.css"

const FOOD_ITEM_CATEGORIES = ["Main", "Side", "Drink", "Dessert"]


const FoodItemForm = () => {
  const dispatch = useDispatch();
  const history = useHistory;
  // this is RESTAURANT id to be put inside object on submit
  const { id } = useParams();
  const sessionUser = useSelector(state => state.session.user)

  const [name, setName] = useState('')
  const [foodPicUrl, setFoodPicUrl] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [errors, setErrors] = useState([])
  const [hasSubmitted, setHasSubmitted] = useState(false)

  function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

  useEffect(()=>{
    let errors =[]
    if (description.length>500) errors.push("Description must be less than 500 chars")
    if (price>25000) errors.push("Price must be below 25000")
    if (!isImage(foodPicUrl)) errors.push("Food pic url is invalid")
    setErrors(errors)
  }, [name, foodPicUrl, description, price, category])


  return (
    // <h3> food item form</h3>
    <>
      <form className='create-food-item-form-container'>
        <h3> Create Food Item </h3>
        <div className='create-food-item-content-container'>
          <div className='create-food-item-left-container'>
            <input
              type='text'
              placeholder="name"
              value={name}
              onChange={(e)=> setName(e.target.value)}
              required
            />
            <textarea
              type='text'
              placeholder="description"
              rows='10'
              cols = '33'
              value={description}
              onChange={e=> setDescription(e.target.value)}
              style={{marginTop:"50px"}}
            />
            <div className='food-item-price-category-container' style={{marginTop: "50px"}}>
              <input
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
                placeholder='Price'
                step='0.01'
                required="required"
                min="0.00"
                required
              />
              <select
                value={category}
                onChange={(e)=> setCategory(e.target.value)}
                required
                >
                {FOOD_ITEM_CATEGORIES.map(cat => (
                  <>
                    <option key={cat.id}>{cat}</option>
                  </>
                ))}
              </select>
            </div>
          </div>
          <div className='create-food-item-right-container'>
            <input
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
        <button type='submit' className='button'> Submit </button>

      </form>
    </>
  )
}

export default FoodItemForm
