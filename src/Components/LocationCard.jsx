import React from 'react';
import './styles/locationCard.css';

const LocationCard = ({location}) => {

  return (
    <section className='location'>
        <h2 className='location__title'>{location?.name}</h2>
        <ul>
          <li className='location__list'><span>Type: </span>{location?.type}</li>
          <li className='location__list'><span>Dimension: </span>{location?.dimension}</li>
          <li className='location__list'><span>Type: </span>{location?.residents.length}</li>  
        </ul>
    </section>
  )
}

export default LocationCard;