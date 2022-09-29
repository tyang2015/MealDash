import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import "./Restaurant.css"
import { createRestaurant, updateRestaurant } from '../../store/restaurant';
import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';
import FormStep3 from './FormStep3';
import { returnDigitsOnly, maskPhoneNumber } from './PhoneNumberValidation';

// first step: name, address (longitude & latitude), email, phone number, restaurant_pic_url
// 2nd step: openTime, closeTime, priceRange, category
// 3rd step: bankAccount, routingNumber
const RestaurantForm = ({restaurant, formType}) => {
    // console.log('inside create restaurant form')
    console.log('restaurant in restaurant form:', restaurant)
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const [formStep, setFormStep]= useState(0)
    const [errors, setErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] =useState(false)
    // const [testName, setTestName] = useState(restaurant.name)
    // console.log('test name from rest.:', testName)fdf
    const [formData, setFormData] = useState(
    {
      name: restaurant? restaurant.name: "",
      priceRange: restaurant? restaurant.priceRange: "",
      restaurantPicUrl: restaurant? restaurant.restaurantPicUrl: "",
      longitude: restaurant? restaurant.longitude: "",
      latitude: restaurant? restaurant.latitude: "",
      email: restaurant? restaurant.email: "",
      phoneNumber: restaurant? restaurant.phoneNumber: "",
      bankAccount:  restaurant? restaurant.bankAccount: "",
      routingNumber:  restaurant? restaurant.routingNumber: "",
      category: restaurant? restaurant.category: "",
      openTime:  restaurant? restaurant.openTime: "",
      closeTime:  restaurant? restaurant.closeTime: ""
    } ||
    {
      name: "",
      priceRange: "",
      restaurantPicUrl: "",
      longitude: "",
      latitude: "",
      email: "",
      phoneNumber: "",
      bankAccount:  "",
      routingNumber:  "",
      category: "",
      openTime:  "",
      closeTime:  ""
    })

    console.log('form data use state object:', formData)
    // console.log('form step:', formStep)
    useEffect(()=>{
      let errors= []
      // change to string w/o dashes
      let newPhoneNumber = formData.phoneNumber.split("-").join("")
      if (!formData.email.includes("@")) errors.push("Email is invalid")
      if (formData.priceRange < 1 || formData.priceRange >3) errors.push("Price range is invalid")
      if (formData.longitude < -180 || formData.longitude > 180) errors.push("Longitude is invalid")
      if (formData.latitude < -90 || formData.latitude> 90) errors.push("Latitude is invalid")
      if (newPhoneNumber.length!= 10) errors.push("Phone Number is invalid")
      if (formData.bankAccount.length < 8 || formData.bankAccount.length > 17) {
        errors.push("Bank Account is invalid")
      }
      if (String(formData.routingNumber).length != 9) errors.push("Routing number is invalid")
      setErrors(errors)

    }, [formData.name, formData.priceRange, formData.restaurantPicUrl, formData.longitude,
      formData.latitude, formData.email, formData.phoneNumber, formData.bankAccount,
      formData.routingNumber, formData.category, formData.openTime, formData.closeTime])


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
      if (errors.length>0){
        alert('Cannot submit post')
        return
      }
      let newNumber = returnDigitsOnly(formData.phoneNumber)
      console.log(newNumber)

      // let newPhoneNumber = formData.phoneNumber.split("-").join("")
      // formData.phoneNumber = newPhoneNumber
      restaurant = {
        ...restaurant,
        ...formData
      }

      // console.log('restaurant data submitted:', restaurant)
      if (formType === "Create Form"){
        dispatch(createRestaurant(restaurant))
        alert("Restaurant successfully created!")
      } else {
        dispatch(updateRestaurant(restaurant))
        alert("Restaurant updated successfully!")
      }
      setHasSubmitted(false)
      return

    }


    return (
			<>
				<div className='create-restaurant-form-title'>
          Step {formStep + 1} of 3
          <div style={{ width: formStep === 0 ? "33.3%" : formStep == 1 ? "66.6%" : "100%" }}>
          </div>
				</div>
				<form className= 'create-restaurant-form-container'>
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
              disabled={formStep == 0}
              onClick={() => {
                setFormStep((currPage) => currPage - 1);
              }}
            >
              Back
            </button>
            {formStep<2 && (
              <button
                onClick={() => {
                  if (formStep === 2) {
                    // return handleSubmit()
                    console.log('last step')
                  } else {
                    setFormStep((currPage) => currPage + 1);
                  }
                }}
              >
                Next
              </button>
            )}
            {formStep== 2 && (
              <button type='submit'
                onClick={handleSubmit}
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
