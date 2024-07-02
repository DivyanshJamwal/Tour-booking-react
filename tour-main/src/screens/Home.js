import React, {useState} from 'react'
import CityContainer from '../components/Home/CityContainer'
import HeroSection from '../components/Home/HeroSection'

const Home = () => {
  
  const [searchCity, setSearchCity] = useState("")

  return (
    <div>
        <HeroSection setSearchCity={setSearchCity}/>
        <CityContainer searchCity={searchCity} />
    </div>
  )
}

export default Home