import React from 'react'
import "./AdventureCard.css"
import {Link} from "react-router-dom"

const AdventureCard = ({id, name, costPerHead, currency, image, duration, category}) => {
  return (
    <Link to={`/details/${id}`}>
        <div className='adventure-card'>
            <img src={image}/>
            <div>
                <span>{name.split(" ")[0]}</span>
                <span>{currency + costPerHead}</span>
            </div>
            <div>
                <span>Duration</span>
                <span>{duration + "Hrs"}</span>
            </div>
            <div className="tag">
                <span>{category}</span>
            </div>
        </div>
    </Link>
  )
}

export default AdventureCard