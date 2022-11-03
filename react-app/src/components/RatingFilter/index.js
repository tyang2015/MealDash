import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from 'react-router-dom';
import "./RatingFilter.css"

const RatingFilter = () => {
  const sessionUser = useSelector(state=> state.session.user)
  const [starsFilter, setStarsFilter] = useState([3, 3.5, 4, 4.5, 5])
  const [selectedRatingMin, setSelectedRatingMin]= useState(3)


  return (
    <div className='ratings-modal-container'>
      <div>Ratings</div>
      <div>Over {selectedRatingMin}</div>
      <div className='rating-connector-line-container'>
        <div className='rating-connector-line' style={{
          width: selectedRatingMin == 3? "100%":
          selectedRatingMin == 3.5? "75%":
          selectedRatingMin == 4? "50%":
          selectedRatingMin == 4.5? "25%":
           "0%"
        }}>
        </div>
        <label>
          <input type="radio"
            value="3"
            onChange={e=>setSelectedRatingMin(3)}
            checked={selectedRatingMin==3? true: false}
            className="radio-star-rating"
          />
          <div className='rating-3-dot dot'
            style={{height: selectedRatingMin==3? "25px": "10px",
                  width:  selectedRatingMin==3? "25px": "10px",
                  color: selectedRatingMin==3? "black": "white" }}>
          </div>
        </label>
        <label>
          <input type="radio" value="3.5" className="radio-star-rating" onChange={e=>setSelectedRatingMin(3.5)} checked={selectedRatingMin==3.5?true: false}/>
          <div className='rating-3.5-dot dot' style={{backgroundColor:'green'}}></div>
        </label>
        <label>
          <input type="radio" value="4" className="radio-star-rating" onChange={e=>setSelectedRatingMin(4)} checked={selectedRatingMin==4?true: false}/>
          <div className='rating-4-dot dot' style={{backgroundColor:'green'}}></div>
        </label>
        <label>
          <input type="radio" className="radio-star-rating" value ="4.5" onChange={e=>setSelectedRatingMin(4.5)} checked={selectedRatingMin==4.5?true: false}/>
          <div className='rating-4.5-dot dot'style={{backgroundColor:'green'}}></div>
        </label>
        <label>
          <input type="radio" className="radio-star-rating" value="5" onChange={e=>setSelectedRatingMin(5)} checked={true}/>
          <div className='rating-5-dot dot'style={{backgroundColor:'green'}}></div>
        </label>

        {/* <div className='rating-3-dot dot' onClick={handleRatingClick}>
        </div>
        <div className='rating-3.5-dot dot' onClick={handleRatingClick}>
        </div>
        <div className='rating-4-dot dot' onClick={handleRatingClick}>
        </div>
        <div className='rating-4.5-dot dot' onClick={handleRatingClick}>
        </div>
        <div className='rating-5-dot dot' onClick={handleRatingClick}>
        </div> */}
      </div>

    </div>
  )

}

export default RatingFilter
