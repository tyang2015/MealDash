// frontend/src/components/Maps/index.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getKey } from '../../store/maps';
// import Maps from './Maps';
import MapDistance from './MapDistance';

const MapDistanceContainer = ({directionsResponse, restaurant, userCoordinates}) => {
  // must access restaurant data from history object
  const key = useSelector((state) => state.maps.key);
  const dispatch = useDispatch();


  useEffect(() => {
    if (!key) {
      dispatch(getKey());
    }
  }, [dispatch, key]);

  if (!key) {
    return null;
  }

  return (
    <>
      <MapDistance directionsResponse={directionsResponse} userCoordinates={userCoordinates} apiKey={key} restaurant={restaurant}/>
    </>
  );
};

export default MapDistanceContainer;
