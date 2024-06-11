import React, { useState } from 'react'
import axios from 'axios'

const CityWeather = () => {
    const url = 'https://api.openweathermap.org/data/2.5/'
    const api_key = '47426df0e4d2962b6e7b3873fb8ec359'
    const [city, setCity] = useState('')
    const [data, setData] = useState('')
    const [ cityWeather, setCityWeather ] = useState('')
    const [ cityName, setCityName ] = useState('')
    const [ cityTemp, setCityTemp ] = useState('')
    const [ cityHumidity, setCityHumidity ] = useState('')
    const [ cityWind, setCityWind ] = useState('')
    const [isCity, setIsCity] = useState(null)

    const submitHandler = async (e)=>{
        e.preventDefault()
        await axios.get(`${url}weather?q=${city}&appid=${api_key}`).then(
            res=>{
                setIsCity(true)
                setData(JSON.stringify(res.data))
                setCityWeather(JSON.stringify(res.data.weather[0].description))
                setCityName(JSON.stringify(res.data.name))
                setCityTemp(JSON.stringify(res.data.main.temp))
                setCityHumidity(JSON.stringify(res.data.main.humidity))
                setCityWind(JSON.stringify(res.data.wind.speed))
            }
        ).catch(err=>{
            setIsCity(false)    
            console.log(err.message)
        })
    }

    console.log(city)
    console.log(data)

  return (
    <div>
      <div>
        <form onSubmit={submitHandler}>
            <input type='text' value={city} onChange={e=>setCity(e.target.value)} placeholder='Enter City Name...' />
            <input type='submit' value='search'/>
        </form>
      </div>
      <div>{isCity===true?<div><br/>
      <p>Weather Condition:{cityWeather}</p>
      <p>City Name:{cityName}</p>
      <p>Temperature:{Math.round(cityTemp-273.15)} <sup>o</sup>C</p>
      <p>Humidity:{cityHumidity}</p>
      <p>Wind Speed:{cityWind} km/hr</p>
      </div>:''}</div>
      <div>{isCity===false?<div><p>No such city exists</p></div>:''}</div>
    </div>
  )
}

export default CityWeather
