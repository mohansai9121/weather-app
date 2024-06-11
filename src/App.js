import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import CityWeather from './Components/CityWeather';

function App() {
  const url = 'https://api.openweathermap.org/data/2.5/'
  const api_key = '47426df0e4d2962b6e7b3873fb8ec359'
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [currentLoc_weather, setCurrentLoc_weather] = useState('')
  const [currentLoc_name, setCurrentLoc_name] = useState('')
  const [ currentLoc_temp, setCurrentLoc_temp] = useState('')
  const [ currentLoc_humidity, setCurrentLoc_humidity] = useState('')
  const [ currentLoc_wind, setCurrentLoc_wind] = useState('')
  const [data, setData] = useState('')
  useEffect(()=>{
    const fetchData = async()=>{
      navigator.geolocation.getCurrentPosition((pos)=>{
        setLatitude(pos.coords.latitude)
        setLongitude(pos.coords.longitude)
      })
      await axios.get(`${url}weather/?lat=${latitude}&lon=${longitude}&units=metric&APPID=${api_key}`).then(
          res=>{
            setData(JSON.stringify(res.data))
            setCurrentLoc_weather(JSON.stringify(res.data.weather[0].description))
            setCurrentLoc_name(JSON.stringify(res.data.name))
            setCurrentLoc_temp(JSON.stringify(res.data.main.temp))
            setCurrentLoc_humidity(JSON.stringify(res.data.main.humidity))
            setCurrentLoc_wind(JSON.stringify(res.data.wind.speed))
          }
        ).catch(err=>{  
          console.log(err.message)
        })
    }
    fetchData()
    console.log('latitude',latitude)
    console.log('longitude',longitude)
  },[latitude,longitude])
  console.log(data)
  return (
    <div className="App">
      <h1>Weather</h1>
      <div>
        <div>
          <p>Weather Condition:{currentLoc_weather}</p>
          <p>Name of current location:{currentLoc_name}</p>
          <p>Temparature:{currentLoc_temp}<sup>o</sup>C</p>
          <p>Humidity:{currentLoc_humidity}</p>
          <p>Wind Speed:{currentLoc_wind} km/hr</p>
        </div><br></br><hr/><br></br>
      </div>
      <div><CityWeather/></div>
    </div>
  );
}

export default App;
