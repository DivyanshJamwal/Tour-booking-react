import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"

const Navbar = () => {
  return (
    <div id='navbar-container'>
        <div>
          <div>
            <Link to="/"><span>TripKaro.in</span></Link>
          </div>
          <div id='nav-links'>
            <Link to="/reservation"><span>RESERVATION</span></Link>   
          </div>
        </div>
    </div>
  )
}

export default Navbar