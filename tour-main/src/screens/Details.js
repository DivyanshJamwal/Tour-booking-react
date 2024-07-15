import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {Carousel, Input, DatePicker, InputNumber} from "antd"
import "./Details.css"

import config from "./../config"

const {BASE_API_URL} = config

const Details = () => {

  const {id} = useParams()

  const [data, setData] = useState({})

  const [noOfPerson, setNoOfPerson] = useState(1)

  const [name, setName] = useState("")

  const [date, setDate] = useState("") 

  // Call API
  useEffect(()=>{
    const API_ENDPOINT = `${BASE_API_URL}/details?id=${id}`
    fetch(API_ENDPOINT).then((res)=>res.json()).then((APIData)=>{
      const {data} = APIData
      setData(data)
    })
  },[])

  const bookingHandler = ()=>{

    // Call The Booking API
    const formData = new FormData()
    formData.append("adventure", data.id)
    formData.append("name", name)
    formData.append("date", date)
    formData.append("person", noOfPerson)

    const API_URL = "https://makemytrip-backend-w2d2.onrender.com/reservations/new"

    fetch(API_URL, {
      method : "POST",
      body : formData
    }).then((res=>res.json())).then((data)=>{
      console.log(data)
    })

  }

  return (
    <div>
      {
        Object.keys(data).length && 
        
        <div id='container'>

          <div id='description-area'>
           
            <div>
              <h2>{data.name}</h2>
              <h3>{data.subtitle}</h3>
            </div>

            {/* TODO: Use all the images via creating a carousel here */}

            <div>
              <img style={{width: "100%", height: "400px", objectFit : "cover"}} src={data.images[0]}/>
            </div>

            <div>
              <h4>About The Experience</h4>
              <p>{data.content}</p>
            </div>

          </div>

          <div>
            {!data.available &&
            <h1 className='sold-out'>Sold Out!</h1>
            }
            {
              data.available &&
              <div id='form-container'>
                <div className='form-field'>
                  <label>Name</label>
                  <input onChange={(e)=>{setName(e.target.value)}} type='text'/>
                </div>  
                <div className='form-field'>
                  <label>Pick a date</label>
                  <input onChange={(e)=>{setDate(e.target.value)}} type="date"/>
                </div>  
                <div className='form-field'>
                  {date}
                  <label>Select Persons</label>
                  <br/>
                  <span>Per Person Cost : {data.costPerHead} INR</span>
                  <input value={noOfPerson} min={1} max={4} onChange={(e)=>{
                    setNoOfPerson(e.target.value)
                  }} type="number"/>
                </div>
                <div className='form-field'>
                  <span>Total : {noOfPerson * data.costPerHead} INR</span>
                </div> 
                <div>
                  <button onClick={bookingHandler}>Book Adventure</button>
                </div>
              </div>
            }
          </div>
          
        </div>

      }
    </div>
  )

}

export default Details