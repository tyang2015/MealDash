import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from 'react-router-dom';
import "./RatingFilter.css"

const RatingFilter= ({setToggleRatingDropdown, restaurants, setFilteredItems, isFiltered, setIsFiltered}) => {
  const sessionUser = useSelector(state=> state.session.user)
  const [starsFilter, setStarsFilter] = useState([3, 3.5, 4, 4.5, 5])
  const [selectedRatingMin, setSelectedRatingMin]= useState(3)

  const handleClick = (e) => {
    console.log('clicked rating:', e.target.value)
  }

  const handleRatingFilter = (selectedRatingMin) =>{
    setIsFiltered(true)
    let filteredItems = restaurants.filter(restaurant => Number(restaurant.avgRating) >= selectedRatingMin)
    setFilteredItems(filteredItems)
    return filteredItems
  }

  return (
    <div className='ratings-container-dropdown'>
      <div className='ratings-container-dropdown-content-container'>
        <div style={{fontSize:"24px", fontWeight:"700", letterSpacing:"-0.04ch"}}>Ratings</div>
        <div style={{color: "#797979", fontSize: "18px", fontWeight: "550", height: "30px", display:'flex', alignItems: "flex-end"}}>Over {selectedRatingMin}</div>
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
              onCLick={handleClick}
            />
            <div className='rating-3-dot dot'
              style={{height: selectedRatingMin==3? "25px": "8px",
                    width:  selectedRatingMin==3? "25px": "8px",
                    backgroundColor: selectedRatingMin==3? "black": "#E7E7E7" }}
              > </div>
          </label>
          <label>
            <input onClick={handleClick} type="radio" value="3.5" className="radio-star-rating" onChange={e=>setSelectedRatingMin(3.5)} checked={selectedRatingMin==3.5?true: false}
            />
            <div className='rating-3.5-dot dot'
              style={{height: selectedRatingMin==3.5? "25px": "8px",
              width:  selectedRatingMin==3.5? "25px": "8px",
              backgroundColor: selectedRatingMin<=3.5? "black": "#E7E7E7" }}
            ></div>
          </label>
          <label>
            <input onClick={handleClick} type="radio" value="4" className="radio-star-rating" onChange={e=>setSelectedRatingMin(4)} checked={selectedRatingMin==4?true: false}
            />
            <div className='rating-4-dot dot'
              style={{height: selectedRatingMin==4? "25px": "8px",
              width:  selectedRatingMin==4? "25px": "8px",
              backgroundColor: selectedRatingMin<=4? "black": "#E7E7E7" }}
              ></div>
          </label>
          <label>
            <input onClick={handleClick} type="radio" className="radio-star-rating" value ="4.5" onChange={e=>setSelectedRatingMin(4.5)} checked={selectedRatingMin==4.5?true: false}
            />
            <div className='rating-4.5-dot dot'
              style={{height: selectedRatingMin==4.5? "25px": "8px",
              width:  selectedRatingMin==4.5? "25px": "8px",
              backgroundColor: selectedRatingMin<=4.5? "black": "#E7E7E7" }}
            ></div>
          </label>
          <label>
            <input onClick={handleClick} type="radio" className="radio-star-rating" value="5" onChange={e=>setSelectedRatingMin(5)} checked={true}
            />
            <div className='rating-5-dot dot'
              style={{height: selectedRatingMin==5? "25px": "8px",
              width:  selectedRatingMin==5? "25px": "8px",
              backgroundColor: selectedRatingMin<=5? "black": "#E7E7E7" }}
            ></div>
          </label>

        </div>

      </div>
      <div className='ratings-container-dropdown-buttons-container'>
          <div onClick={()=> setToggleRatingDropdown(false)} style={{fontWeight: '550', marginRight: "40px"}} className='ratings-container-cancel-button' >Cancel</div>
          <div onClick={()=>handleRatingFilter(selectedRatingMin)} className='ratings-container-view-results-button'>
            <div>View Results</div>
          </div>
      </div>

    </div>
  )

}

export default RatingFilter
