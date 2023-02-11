import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory,useParams } from 'react-router-dom';
import "./Restaurant.css"
import { createRestaurant, updateRestaurant } from '../../store/restaurant';
import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';
import FormStep3 from './FormStep3';
import { getKey } from '../../store/maps';


// first step: name, address (longitude & latitude), email, phone number, restaurant_pic_url
// 2nd step: openTime, closeTime, priceRange, category
// 3rd step: bankAccount, routingNumber
const RestaurantForm = ({restaurant, formType, restaurants}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
    const key = useSelector((state) => state.maps.key);
    const [formStep, setFormStep]= useState(0)
    const [errors, setErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] =useState(false)
    // const [testName, setTestName] = useState(restaurant.name)

    const [formData, setFormData] = useState(
    {
      name: restaurant? restaurant.name: "",
      priceRange: restaurant? restaurant.price_range: "",
      restaurantPicUrl: restaurant? restaurant.restaurant_pic_url: "",
      logo: restaurant? restaurant.logo: "",
      longitude: restaurant? restaurant.longitude: "",
      latitude: restaurant? restaurant.latitude: "",
      email: restaurant? restaurant.email: "",
      phoneNumber: restaurant? restaurant.phone_number: "",
      bankAccount:  restaurant? restaurant.bank_account: "",
      routingNumber:  restaurant? restaurant.routing_number: "",
      category: restaurant? restaurant.category: "American",
      openTime:  restaurant? restaurant.open_time: "",
      closeTime:  restaurant? restaurant.close_time: "",
      address: restaurant? restaurant.address: ""
      // delete address key before sending to db in submit
      // address: restaurant? restaurant.address: ""
    })

    useEffect(()=> {
      if (!key) {
        dispatch(getKey());
      }
    }, [dispatch, key])

    useEffect(()=> {
      setFormStep(formStep)
    }, [formStep])

    useEffect(()=>{
      let errors= []
      // if (formData === "") return null
      if (!validateEmail(formData.email)) errors.push("Email is invalid")
      if (!formData.name) errors.push("Restaurant name is required")
      if (formData.name?.length>50) errors.push("Name must be less than 50 characters")
      if (formData.email?.length>30) errors.push("Email must be less than 50 characters")
      if (formData.priceRange < 1 || formData.priceRange >4) errors.push("Price range is invalid")
      if (logoExists(formData.logo)) errors.push("Logo must be unique and not be used by another owner")
      // if (!isImage(formData.logo)) errors.push("Logo url is invalid")
      // if (!isImage(formData.restaurantPicUrl)) errors.push("Restaurant pic url is invalid")
      if (formData.closeTime <= formData.openTime) errors.push("Closing Time must be after Opening Time")
      if (formData.longitude < -180 || formData.longitude > 180) errors.push("Longitude is invalid")
      if (formData.latitude < -90 || formData.latitude> 90) errors.push("Latitude is invalid")
      if (formData.phoneNumber?.length!= 14) errors.push("Phone Number is invalid")
      if (formData.bankAccount?.length < 8 || formData.bankAccount?.length > 17) {
        errors.push("Bank Account is invalid")
      }
      if (String(formData.routingNumber).length != 9) errors.push("Routing number is invalid")
      setErrors(errors)

    }, [formData.name, formData.priceRange, formData.restaurantPicUrl, formData.longitude,
      formData.latitude, formData.email, formData.phoneNumber, formData.bankAccount,
      formData.routingNumber, formData.category, formData.openTime, formData.closeTime, formData.logo, formData.address])


    function logoExists(logoUrl) {
      // get all logos that DONT below to you (you cannot duplicate a logo that DOESNT below to you)
      let logos= []
      if (restaurants.length>0){
        for (let i = 0; i< restaurants.length; i++) {
          let restaurantObj = restaurants[i]
          if (restaurantObj.ownerId != sessionUser.id){
            logos.push(restaurantObj.logo)
          }
        }
      }
      let foundLogo = logos.find(item => item === logoUrl?.trim())
      if (foundLogo){
        return true
      }
      else {
        return false
      }
    }

    function validateEmail(email) {
      let re = /\S+@\S+\.\S+/;
      return re.test(email);
    }

    // function isImage(url) {
    //   let imageExtensions= ['jpg', 'jpeg', 'png', 'svg', 'gif', 'webp']
    //   if (url){
    //     for (let i = 0; i< imageExtensions.length; i++){
    //       let ext = imageExtensions[i]
    //       if (url.toLowerCase().includes(ext)){
    //         return true
    //       }
    //     }
    //     return false
    //   }
    // }

    const FormDisplay = () => {
        if (formStep === 0 ) {
            return <FormStep1 formData={formData} setFormData={setFormData} />
        }
        else if (formStep === 1) {
            return <FormStep2 formData={formData} setFormData={setFormData}/>
        }
        else if (formStep === 2 ){
            return <FormStep3 formData={formData} setFormData={setFormData} />
        }
    }

    const handleSubmit= async (e) => {
      e.preventDefault();
      setHasSubmitted(true)
      if (errors.length>0){
        alert('Cannot submit restaurant info')

        return
      }

      restaurant = {
        ...restaurant,
        name: formData.name,
        price_range: formData.priceRange,
        restaurant_pic_url: formData.restaurantPicUrl,
        logo: formData.logo,
        longitude: formData.longitude,
        latitude: formData.latitude,
        email: formData.email,
        phone_number: formData.phoneNumber,
        bank_account: formData.bankAccount,
        routing_number: formData.routingNumber,
        category: formData.category,
        open_time: formData.openTime,
        close_time: formData.closeTime
        // ...formData
      }

      if (formType === "Create Form"){
        dispatch(createRestaurant(restaurant))
        alert("Restaurant successfully created!")
        history.push('/restaurants')
      } else {
        dispatch(updateRestaurant(restaurant.id, restaurant))
        alert("Restaurant updated successfully!")
        history.push(`/restaurants/${restaurant.id}`)
      }
      setHasSubmitted(false)
      return

    }

    if (formData === '') return null
    if (!key) {
      return null;
    }
    return (
			<>
        <div className='create-restaurant-title-container'>
          <NavLink to="/restaurants">
            <div className='back-to-restaurants-button'>
              <svg style={{color: "lightcoral", marginRight: "5px"}}  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="styles__StyledInlineSvg-sc-12l8vvi-0 jFpckg"><path d="M11.7071 6.70711C12.0976 6.31658 12.0976 5.68342 11.7071 5.29289C11.3166 4.90237 10.6834 4.90237 10.2929 5.29289L4.84222 10.7436C4.75796 10.8278 4.65733 10.9283 4.57595 11.0242C4.48166 11.1352 4.35611 11.3038 4.28052 11.5365C4.18264 11.8377 4.18264 12.1623 4.28052 12.4635C4.35611 12.6962 4.48166 12.8648 4.57595 12.9758C4.65733 13.0717 4.75796 13.1722 4.84222 13.2564L10.2929 18.7071C10.6834 19.0976 11.3166 19.0976 11.7071 18.7071C12.0976 18.3166 12.0976 17.6834 11.7071 17.2929L7.41421 13L19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11L7.41421 11L11.7071 6.70711Z" fill="currentColor"></path></svg>
              Back to Restaurants Page
            </div>
          </NavLink>
          <i className="fa-solid fa-burger sign-up-logo"style={{color:"lightcoral"}}> </i>
          <div className='create-restaurant-form-title'>
            Step {formStep + 1} of 3
          </div>
          <div className='create-restaurant-progress-bar-container'>
            <div className="create-restaurant-progress-bar" style={{ width: formStep === 0 ? "33.3%" : formStep == 1 ? "66.6%" : "100%" }}>
            </div>
          </div>
        </div>
				<form onSubmit={handleSubmit} className= 'create-restaurant-form-container'>
          <div className = "create-restaurant-form-body">
            {FormDisplay()}
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
          <div className={`create-restaurant-form-footer`} >
            <button
              type="button"
              disabled={formStep == 0}
              onClick={() => {
                setFormStep((currPage) => currPage - 1);
              }}
              className='create-restaurant-button'
            >
              Back
            </button>
            {formStep<2 && (
              <button
                type="button"
                className='create-restaurant-button'
                onClick={() => {
                  setFormStep((currPage) => currPage + 1);
                }}
              >
                Next
              </button>
            )}
            {formStep== 2 && (
              <button type='submit'
                className='create-restaurant-button'
              >
                Submit
              </button>
            )}
          </div>
				</form>
			</>
    )
}

export default RestaurantForm
