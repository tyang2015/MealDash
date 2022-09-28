import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurants } from '../../store/restaurant';
const Restaurants = () => {
    const dispatch = useDispatch()
    let restaurants = useSelector(state => Object.values(state.restaurants))
    console.log('restaurants:', restaurants)
    useEffect(()=>{
        dispatch(getAllRestaurants())
    }, [dispatch])
    return (
        <>
            <h3> restaurants </h3>
            <div>
                {restaurants.length>0 && restaurants.map(restaurant => (
                    <div key={restaurant.id}>
                        {restaurant.name}
                    </div>
                ))}
            </div>
        </>
    )
}

export default Restaurants
