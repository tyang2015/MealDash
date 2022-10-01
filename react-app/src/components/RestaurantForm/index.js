import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import "./Restaurant.css"
import { createRestaurant, updateRestaurant } from '../../store/restaurant';
import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';
import FormStep3 from './FormStep3';
import { returnDigitsOnly, maskPhoneNumber } from './PhoneNumberValidation';

// first step: name, address (longitude & latitude), email, phone number, restaurant_pic_url
// 2nd step: openTime, closeTime, priceRange, category
// 3rd step: bankAccount, routingNumber
const RestaurantForm = ({restaurant, formType, restaurants}) => {
    // console.log('inside create restaurant form')
    // console.log('restaurant in restaurant form:', restaurant)
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
    const [formStep, setFormStep]= useState(0)
    const [errors, setErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] =useState(false)
    // const [testName, setTestName] = useState(restaurant.name)
    const [formData, setFormData] = useState(
    {
      name: restaurant? restaurant.name: "",
      priceRange: restaurant? restaurant.priceRange: "",
      restaurantPicUrl: restaurant? restaurant.restaurantPicUrl: "",
      logo: restaurant? restaurant.logo: "",
      longitude: restaurant? restaurant.longitude: "",
      latitude: restaurant? restaurant.latitude: "",
      email: restaurant? restaurant.email: "",
      phoneNumber: restaurant? restaurant.phoneNumber: "",
      bankAccount:  restaurant? restaurant.bankAccount: "",
      routingNumber:  restaurant? restaurant.routingNumber: "",
      category: restaurant? restaurant.category: "American",
      openTime:  restaurant? restaurant.openTime: "",
      closeTime:  restaurant? restaurant.closeTime: ""
    })

    // useEffect(()=> {
    //   console.log('form data in use effect:', formData)
    //   setFormData({...formData,
    //   name: restaurant? restaurant.name: formData? formData.name : "",
    //   priceRange: restaurant? restaurant.priceRange: formData? formData.priceRange: "",
    //   restaurantPicUrl: restaurant? restaurant.restaurantPicUrl: formData? formData.restaurantPicUrl: "",
    //   logo: restaurant? restaurant.logo: formData? formData.logo: "",
    //   longitude: restaurant? restaurant.longitude: formData? formData.longitude: "",
    //   latitude: restaurant? restaurant.latitude: formData? formData.latitude: "",
    //   email: restaurant? restaurant.email: formData? formData.email: "",
    //   phoneNumber: restaurant? restaurant.phoneNumber: formData? formData.phoneNumber: "",
    //   bankAccount:  restaurant? restaurant.bankAccount: formData? formData.bankAccount: "",
    //   routingNumber:  restaurant? restaurant.routingNumber: formData? formData.routingNumber: "",
    //   category: restaurant? restaurant.category: formData? formData.category: "American",
    //   openTime:  restaurant? restaurant.openTime: formData? formData.openTime: "",
    //   closeTime:  restaurant? restaurant.closeTime: formData? formData.closeTime: ""
    //   })
    // }, [formStep])
    useEffect(()=> {
      setFormStep(formStep)
    }, [formStep])

    console.log('form step:', formStep)
    useEffect(()=>{
      let errors= []
      if (formData === "") return null
      // console.log('phone number:', formData.phoneNumber)
      // let newPhoneNumber = formData.phoneNumber.split("-").join("")
      if (!formData.email.includes("@")) errors.push("Email is invalid")
      if (formData.priceRange < 1 || formData.priceRange >3) errors.push("Price range is invalid")
      if (!isImage(formData.restaurantPicUrl)) errors.push("Restaurant pic url is invalid")
      if (!isImage(formData.logo)) errors.push("Logo url is invalid")
      if (logoExists(formData.logo)) errors.push("Logo must be unique")
      if (formData.longitude < -180 || formData.longitude > 180) errors.push("Longitude is invalid")
      if (formData.latitude < -90 || formData.latitude> 90) errors.push("Latitude is invalid")
      if (formData.phoneNumber.length!= 14) errors.push("Phone Number is invalid")
      if (formData.bankAccount.length < 8 || formData.bankAccount.length > 17) {
        errors.push("Bank Account is invalid")
      }
      if (String(formData.routingNumber).length != 9) errors.push("Routing number is invalid")
      setErrors(errors)

    }, [formData.name, formData.priceRange, formData.restaurantPicUrl, formData.longitude,
      formData.latitude, formData.email, formData.phoneNumber, formData.bankAccount,
      formData.routingNumber, formData.category, formData.openTime, formData.closeTime])


    function logoExists(logoUrl) {
      let logos= []
      if (restaurants.length>0){
        for (let i = 0; i< restaurants.length; i++) {
          let restaurantObj = restaurants[i]
          // console.log('restaurant obj in fucntion:', restaurantObj)
          logos.push(restaurantObj.logo)
        }
      }
      // console.log('logos from db:', logos)
      let foundLogo = logos.find(item => item === logoUrl)

      if (foundLogo) return true
      else {
        // console.log('logo is..:', foundLogo)
        return false
      }
    }

    function isImage(url) {
      return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    }

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

    const handleSubmit= (e) => {
      e.preventDefault();
      setHasSubmitted(true)
      // console.log('logo url before submission:', formData.logo)
      // console.log('phone number (with masked function):', maskPhoneNumber(formData.phoneNumber))
      if (errors.length>0){
        alert('Cannot submit restsaurant info')
        return
      }
      // let newPhoneNumber = formData.phoneNumber.split("-").join("")
      restaurant = {
        ...restaurant,
        ...formData
      }

      if (formType === "Create Form"){
        dispatch(createRestaurant(restaurant))
        alert("Restaurant successfully created!")
        history.push('/restaurants')
      } else {
        dispatch(updateRestaurant(restaurant))
        alert("Restaurant updated successfully!")
        history.push(`/restaurants/${restaurant.id}`)
      }
      setHasSubmitted(false)
      return

    }

    if (formData === '') return null
    return (
			<>
        <div className='create-restaurant-title-container'>
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
          <div className = 'create-restaurant-form-footer'>
            <button
              type="button"
              disabled={formStep == 0}
              onClick={() => {
                setFormStep((currPage) => currPage - 1);
              }}
            >
              Back
            </button>
            {formStep<2 && (
              <button
                type="button"
                onClick={() => {
                  setFormStep((currPage) => currPage + 1);
                }}
              >
                Next
              </button>
            )}
            {formStep== 2 && (
              <button type='submit'
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
