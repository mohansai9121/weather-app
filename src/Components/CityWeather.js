import React, { useState } from "react";
import axios from "axios";
import { Rings } from "react-loader-spinner";
import weather from "../assets/weather.png";
import temperature from "../assets/temperature.jpg";
import humidity from "../assets/humidity.jpg";
import wind from "../assets/windSpeed.jpg";
import "../App.css";

const CityWeather = () => {
  const url = "https://api.openweathermap.org/data/2.5/";
  const api_key = "47426df0e4d2962b6e7b3873fb8ec359";
  const [city, setCity] = useState("");
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cityWeather, setCityWeather] = useState("");
  const [cityName, setCityName] = useState("");
  const [cityTemp, setCityTemp] = useState("");
  const [cityHumidity, setCityHumidity] = useState("");
  const [cityWind, setCityWind] = useState("");
  const [isCity, setIsCity] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await axios
      .get(`${url}weather?q=${city}&appid=${api_key}`)
      .then((res) => {
        setIsCity(true);
        setData(JSON.stringify(res.data));
        setCityWeather(JSON.stringify(res.data.weather[0].description));
        setCityName(JSON.stringify(res.data.name));
        setCityTemp(JSON.stringify(res.data.main.temp));
        setCityHumidity(JSON.stringify(res.data.main.humidity));
        setCityWind(JSON.stringify(res.data.wind.speed));
      })
      .catch((err) => {
        setIsCity(false);
        console.log(err.message);
      });
    setIsLoading(false);
  };

  console.log(city);
  console.log(data);

  return (
    <div className="cityWeather">
      {isLoading ? (
        <Rings
          visible={true}
          height="80"
          width="80"
          color="#E8E8E8"
          ariaLabel="rings-loading"
          wrapperStyle={{}}
          wrapperClass="loader"
        />
      ) : (
        <div>
          <h2 className="heading2">Predict current Weather for any City </h2>
          <div>
            <form onSubmit={submitHandler}>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter City Name..."
                className="input"
              />
              <input type="submit" value="search" className="button" />
            </form>
          </div>
          <div>
            {isCity === true ? (
              <div>
                <center>
                  <h2>{cityName}</h2>
                </center>
                <div className="grid">
                  <div className="card">
                    <img
                      src={weather}
                      alt="weather"
                      height={170}
                      width={135}
                      style={{ borderRadius: "5px" }}
                    />
                    <br />
                    Weather Condition:
                    <h3>{cityWeather}</h3>
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
                      {Math.round(cityTemp - 273.15)} <sup>o</sup>C
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
                    Humidity:<h3>{cityHumidity}</h3>
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
                    <h3>{cityWind} km/hr</h3>
                  </div>
                </div>
                <br />
                <br />
                <br />
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            {isCity === false ? (
              <div>
                <h2>{`There is no city named:${city}`}</h2>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CityWeather;
