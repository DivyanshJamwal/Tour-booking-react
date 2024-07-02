import React from 'react'
import "./CityCard.css"
import {Link} from "react-router-dom"

const CityCard = ({image, city, description, id}) => {
  return (
    <Link to={`/adventure/${id}`}>
      <div className='city-card'>
          <img src={image}/>
          <p>{city}</p>
          <p>{description}</p>
      </div>
    </Link>
  )
}

export default CityCard