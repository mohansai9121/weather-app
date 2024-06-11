import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const url = 'api.openweathermap.org/data/2.5/'
  const api_key = '47426df0e4d2962b6e7b3873fb8ec359'
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [data, setData] = useState('')
  useEffect(()=>{
    const fetchData = async()=>{
      navigator.geolocation.getCurrentPosition((pos)=>{
        setLatitude(pos.coords.latitude)
        setLongitude(pos.coords.longitude)
      })
      await axios.get(`https://${url}weather/?lat=${latitude}&lon=${longitude}&units=metric&APPID=${api_key}`).then(
          res=>setData(JSON.stringify(res.data))
        ).catch(err=>console.log(err.message))
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
          <p>{data.slice(73,105)}</p>
          <p>{data.slice(138,228)}</p>
          <p>{data.slice(490,504)}</p>
          <p>{data}</p>
          <p>{data.length}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
