import { FaStar } from "react-icons/fa";
import React from "react"
import "./Star.css"


const Star = ({filled, value, onClick, onMouseEnter, onMouseLeave}) => {
    return (
        <label className="review-form-single-star-container">
            <input type='radio' id='rating' required="required" className="review-form-star-input"/>
            <FaStar color={filled? "#E8C500": "white"}
                onClick={onClick}
                value={value}
                className='review-form-star'
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            />
        </label>
    )
}
 export default Star
