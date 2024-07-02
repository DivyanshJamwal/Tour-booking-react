import React from 'react'
import "./HeroSection.css"
import {Input} from "antd"

const {Search} = Input;

const HeroSection = ({setSearchCity}) => {
  return (
    <div id='hero-container'>
        <img src='https://images.unsplash.com/photo-1536599018102-9f803c140fc1'/>
        <div>
            <h1>Welcome to TripKaro!</h1>
            <h2>Explore your trip packages with us</h2>
            <Search 
              placeholder="Search your favorite city" 
              onSearch={(value)=>{
                setSearchCity(value)
              }} 
              style={{ width: "60%" }}
            />
        </div>
    </div>
  )
}

export default HeroSection