import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import AdventureCard from '../components/Adventure/AdventureCard'
import "./Adventure.css"
import {Select} from "antd"

const Adventure = () => {

  const {id} = useParams()

  // Original API Data
  const [adventureData, setAdventureData] = useState([])

  const [filteredAdventureData, setFilteredAdventureData] = useState([])

  const [categories, setCategories] = useState([])

  const [durations, setDurations] = useState([])

  const [budgets, setBudgets] = useState([])

  const [categorySelected, setCategorySelected] = useState([])

  const [durationSelected, setDurationSelected] = useState([])

  const [budgetSelected, setBudgetSelected] = useState([])

  const getUniqueCategories = (arr) => {
    const categories = arr.map(item => item.category);
    return [...new Set(categories)];
  };

  const getDurationIntervals = (arr) => {
    // [{},{},{}]
    const durations = arr.map(item=>item.duration)
    // [6, 8, 27, 9, 17]
    const ranges = durations.map((item)=>{
      const rem = item % 5
      const lowerRange = item - rem
      const higherRange = lowerRange + 5
      return `${lowerRange}-${higherRange}`
    })
    const newRanges = [...new Set(ranges)]
    return newRanges.sort((curr, next)=>{
      const a = parseInt(curr.split("-")[0])
      const b = parseInt(next.split("-")[0])
      return a > b ? 1 : -1
    })
  };

  const getBudgetIntervals = (arr) => {
    // [{},{},{}]
    const budgets = arr.map(item=>item.costPerHead)
    // [6, 8, 27, 9, 17]
    const ranges = budgets.map((item)=>{
      const rem = item % 2000
      const lowerRange = item - rem
      const higherRange = lowerRange + 2000
      return `${lowerRange}-${higherRange}`
    })
    const newRanges = [...new Set(ranges)]
    return newRanges.sort((curr, next)=>{
      const a = parseInt(curr.split("-")[0])
      const b = parseInt(next.split("-")[0])
      return a > b ? 1 : -1
    })
  };


  useEffect(()=>{

    const result = adventureData.filter((item)=>{
      if(categorySelected.length==0){
        return true
      }
      return categorySelected.includes(item.category)
    }).filter((item)=>{
      if(budgetSelected.length==0){
        return true
      }
      const price = item.costPerHead
      const rem = price % 2000 
      const lowerRange = price - rem 
      const higherRange = lowerRange + 2000
      const range = `${lowerRange}-${higherRange}`
      return budgetSelected.includes(range)
    }).filter((item)=>{
      if(durationSelected.length==0){
        return true
      }
      const duration = item.duration
      const rem = duration % 5 
      const lowerRange = duration - rem 
      const higherRange = lowerRange + 5
      const range = `${lowerRange}-${higherRange}`
      return durationSelected.includes(range)
    })

    setFilteredAdventureData(result)

  },[categorySelected, budgetSelected, durationSelected])
  

  useEffect(()=>{
    const API_ENDPOINT = `https://makemytrip-backend-w2d2.onrender.com/adventures?city=${id}`
    fetch(API_ENDPOINT).then(res=>res.json()).then((data)=>{
      setAdventureData(data)
      setFilteredAdventureData(data)
      // to update the categories
      const uniquCategories = getUniqueCategories(data)
      setCategories(uniquCategories)
      // to update the durations
      const uniqueIntervals = getDurationIntervals(data)
      setDurations(uniqueIntervals)
      // to update the budgets
      const uniqueBudgets =  getBudgetIntervals(data)
      setBudgets(uniqueBudgets)
    })
  },[])

  return (
    <div>
      <div id='filter-section'>
        <div>
          <h1>Apply Filters and Save Your Time !</h1>
        </div>
        <div>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '20%' }}
            placeholder="Select Category"
            defaultValue={[]}
            onChange={(value)=>{
              setCategorySelected(value)
            }}
            options={categories.map((item)=>{ 
              return {"label" : item, "value" : item}
            })}
          />
          <Select
            mode="multiple"
            allowClear
            style={{ width: '20%' }}
            placeholder="Select Budget"
            defaultValue={[]}
            onChange={(value)=>{
              setBudgetSelected(value)
            }}
            options={budgets.map((item)=>{ 
              return {"label" : item + " INR", "value" : item}
            })}
          />
          <Select
            mode="multiple"
            allowClear
            style={{ width: '20%' }}
            placeholder="Select Duration"
            defaultValue={[]}
            onChange={(value)=>{
              setDurationSelected(value)
            }}
            options={durations.map((item)=>{ 
              return {"label" : item + " Hrs", "value" : item}
            })}
          />
        </div>
      </div>
      <div id='adventure-card-container'>
        {filteredAdventureData.length==0 && <h2>No Result Found!</h2>}
        {filteredAdventureData.map((info)=>{
          const {id, name, costPerHead, currency, image, duration, category} = info;
          return <AdventureCard id={id} name={name} costPerHead={costPerHead} currency={currency} image={image} duration={duration} category={category} />
        })}
      </div>
    </div>
  )
}

export default Adventure