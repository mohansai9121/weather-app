import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { BallTriangle } from "react-loader-spinner";
//import clouds from "./assets/clouds.avif";
import weather from "./assets/weather.png";
import temperature from "./assets/temperature.jpg";
import humidity from "./assets/humidity.jpg";
import wind from "./assets/windSpeed.jpg";
import { BsCloudSun } from "react-icons/bs";
import CityWeather from "./Components/CityWeather";

function App() {
  const url = "https://api.openweathermap.org/data/2.5/";
  const api_key = "47426df0e4d2962b6e7b3873fb8ec359";
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [currentLoc_weather, setCurrentLoc_weather] = useState("");
  const [currentLoc_name, setCurrentLoc_name] = useState("");
  const [currentLoc_temp, setCurrentLoc_temp] = useState("");
  const [currentLoc_humidity, setCurrentLoc_humidity] = useState("");
  const [currentLoc_wind, setCurrentLoc_wind] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition((pos) => {
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
      });
      await axios
        .get(
          `${url}weather/?lat=${latitude}&lon=${longitude}&units=metric&APPID=${api_key}`
        )
        .then((res) => {
          setData(JSON.stringify(res.data));
          setCurrentLoc_weather(
            JSON.stringify(res.data.weather[0].description)
          );
          setCurrentLoc_name(JSON.stringify(res.data.name));
          setCurrentLoc_temp(JSON.stringify(res.data.main.temp));
          setCurrentLoc_humidity(JSON.stringify(res.data.main.humidity));
          setCurrentLoc_wind(JSON.stringify(res.data.wind.speed));
        })
        .catch((err) => {
          console.log(err.message);
        });
      setIsLoading(false);
    };
    fetchData();
    console.log("latitude", latitude);
    console.log("longitude", longitude);
  }, [latitude, longitude]);
  console.log(data);
  return (
    <div className="App">
      <div className="current-location">
        <h1 className="heading1">Predict Weather at your current location</h1>
        <div>
          <center>
            {isLoading ? (
              <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#DD810B"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass="loader"
                visible={true}
              />
            ) : (
              <div>
                <BsCloudSun className="cloud" />
                <h2>{currentLoc_name}</h2>
                <div className="grid">
                  <div className="card">
                    <img
                      src={weather}
                      alt="weather condition"
                      height={170}
                      width={135}
                      style={{ borderRadius: "5px" }}
                    />
                    <br />
                    Weather Condition:
                    <h3>{currentLoc_weather}</h3>
                  </div>
                  <div className="card">
                    <img
                      src={temperature}
                      alt="Temperature"
                      height={170}
                      width={135}
                      style={{ borderRadius: "5px" }}
                    />
                    <br />
                    Temperature:
                    <h3>
                      {currentLoc_temp}
                      <sup>o</sup>C
                    </h3>
                  </div>
                  <div className="card">
                    <img
                      src={humidity}
                      alt="Humidity"
                      height={170}
                      width={135}
                      style={{ borderRadius: "5px" }}
                    />
                    <br />
                    Humidity:
                    <h3>{currentLoc_humidity}</h3>
                  </div>
                  <div className="card">
                    <img
                      src={wind}
                      alt="Wind Speed"
                      height={170}
                      width={135}
                      style={{ borderRadius: "5px" }}
                    />
                    <br />
                    Wind Speed:
                    <h3>{currentLoc_wind} km/hr</h3>
                  </div>
                </div>
              </div>
            )}
          </center>
          <br />
          <br />
        </div>
      </div>
      <hr />
      <div>
        <CityWeather />
      </div>
    </div>
  );
}

export default App;
