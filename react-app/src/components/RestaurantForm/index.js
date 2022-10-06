import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory,useParams } from 'react-router-dom';
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
    // console.log('inside create restaurant form')
    // console.log('restaurant in restaurant form:', restaurant)
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
      if (formData === "") return null
      if (!formData.email.includes("@")) errors.push("Email is invalid")
      if (formData.name.length>50) errors.push("Name must be less than 50 characters")
      if (formData.email.length>30) errors.push("Email must be less than 50 characters")
      if (formData.priceRange < 1 || formData.priceRange >3) errors.push("Price range is invalid")
      if (logoExists(formData.logo)) errors.push("Logo must be unique and not be used by another owner")
      if (!isImage(formData.logo)) errors.push("Logo url is invalid")
      if (!isImage(formData.restaurantPicUrl)) errors.push("Restaurant pic url is invalid")
      if (formData.closeTime <= formData.openTime) errors.push("Closing Time must be after Opening Time")
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
      formData.routingNumber, formData.category, formData.openTime, formData.closeTime, formData.logo])


    function logoExists(logoUrl) {
      // get all logos that DONT below to you (you cannot duplicate a logo that DOESNT below to you)
      let logos= []
      if (restaurants.length>0){
        for (let i = 0; i< restaurants.length; i++) {
          let restaurantObj = restaurants[i]
          // console.log('restaurant owner id :', restaurantObj.ownerId)
          // console.log('session user id :', sessionUser.id)
          if (restaurantObj.ownerId != sessionUser.id){
            // console.log('different user, push the logo')
            logos.push(restaurantObj.logo)
          }
        }
      }
      // console.log('logos from db:', logos)
      let foundLogo = logos.find(item => item === logoUrl.trim())
      if (foundLogo){
        // console.log('found logo:', foundLogo)
        return true
      }
      else {
        // console.log('logo not found:')
        return false
      }
    }

    function isImage(url) {
      let imageExtensions= ['jpg', 'jpeg', 'png', 'svg', 'gif', 'webp']
      for (let i = 0; i< imageExtensions.length; i++){
        let ext = imageExtensions[i]
        if (url.toLowerCase().includes(ext)){
          return true
        }
      }
      return false
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

    const handleSubmit= async (e) => {
      e.preventDefault();
      setHasSubmitted(true)
      if (errors.length>0){
        alert('Cannot submit restaurant info')

        return
      }
      // console.log('form data right before submission:', formData)
      // let newFormData;
      // if(geolocationEnabled){
      // console.log('address to be sent in fetch...:', formData.address)
      // const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${formData.address}&key=${key}`)
      // if (response.ok){
      //   const data = await response.json()
      //   console.log('data from google api geocoder:', data)
      //   setFormData({...formData, latitude:  data.results[0]?.geometry.location.lat})
      //   setFormData({...formData, longitude:  data.results[0]?.geometry.location.lng})
      //   newFormData = {...formData}
      //   console.log('data object before deleting address:', formData)
      //   delete newFormData.address
      //   console.log('final data object before sending to db:', newFormData)
      // } else {
      //   console.log('bad fetch:', response)
      // }
      // }

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
      // console.log('restaurant to be submitted:', restaurant)

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
          <div className='create-restaurant-form-footer'>
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
