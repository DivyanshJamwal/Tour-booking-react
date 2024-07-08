import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {Carousel, Input, DatePicker, InputNumber} from "antd"
import "./Details.css"

const Details = () => {

  const {id} = useParams()

  const [data, setData] = useState({})

  const [noOfPerson, setNoOfPerson] = useState(1)

  const [name, setName] = useState("")

  const [date, setDate] = useState("") 

  // Call API
  useEffect(()=>{
    const API_ENDPOINT = `https://makemytrip-backend-w2d2.onrender.com/adventures/detail?adventure=${id}`
    fetch(API_ENDPOINT).then((res)=>res.json()).then((data)=>{
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
        
        <div id='container' style={{backgroundColor: "red"}}>
          <div>
            <div>
              <h2>{data.name}</h2>
              <h3>{data.subtitle}</h3>
            </div>
            <div>
              <Carousel arrows>
                {data.images.map((item)=><img className='carousel-img' src={item}/>)}
              </Carousel>
            </div>
            <div>
              <h4>About The Experience</h4>
              <p>{data.content}</p>
            </div>
          </div>
          <div style={{backgroundColor : "pink"}}>
            {!data.available &&
            <h1>Sold Out!</h1>
            }
            {
              data.available &&
              <div id='form-container'>
                <div>
                  <label>Name</label>
                  <br/>
                  <input onChange={(e)=>{setName(e.target.value)}} type='text'/>
                </div>  
                <div>
                  <label>Pick a date</label>
                  <br/>
                  <input onChange={(e)=>{setDate(e.target.value)}} type="date"/>
                </div>  
                <div>
                  {date}
                  <label>Select Persons</label>
                  <br/>
                  <span>Per Person Cost : {data.costPerHead} INR</span>
                  <input value={noOfPerson} min={1} max={4} onChange={(e)=>{
                    setNoOfPerson(e.target.value)
                  }} type="number"/>
                </div>
                <div>
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