import React, {useEffect, useState} from 'react'
import CityCard from './CityCard'
import "./CityContainer.css"

const CityContainer = ({searchCity}) => {

  const [cityData, setCityData] = useState([])

  const [filteredCityData, setFilteredCityData] = useState([])


  useEffect(()=>{

    const API_ENDPONT = "https://makemytrip-backend-w2d2.onrender.com/cities"
    
    fetch(API_ENDPONT).then((res)=>res.json()).then((data)=>{
      setCityData(data)
    })

  },[])

  useEffect(()=>{

    if(searchCity===""){
      setFilteredCityData(cityData)
    }else{
      const ORIGINAL_CITY_DATA = [...cityData]
      const FILTERED_DATA = ORIGINAL_CITY_DATA.filter((cityInfo)=>{
        return cityInfo.city.toLowerCase()===searchCity.toLowerCase()
      })
      setFilteredCityData(FILTERED_DATA)
    }

  },[searchCity, cityData])

  return (
    <div>
      <div id='city-container'>
        {filteredCityData.length==0 && <h2>No City Found</h2>}
        {filteredCityData.map((info, index)=><CityCard key={index} city={info.city} description={info.description} image={info.image} id={info.id}/>)}
      </div>
    </div>
  )

}

export default CityContainer