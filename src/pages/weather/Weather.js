import React, { useContext } from "react"
import "./weather.css"
import { ConditionsBox, Navbar } from "../../containers"
import WeatherContext from "../../context/WeatherContext";
import { Link } from 'react-router-dom';
import data from "../../temp.json";
import { faTemperatureHalf, faWind, faDroplet, faCloud, faTemperatureHigh, faTemperatureLow, faCloudRain, faSnowflake } from '@fortawesome/free-solid-svg-icons';

const Weather = () => {
  const context = useContext(WeatherContext);
  const { cityName, setCityName } = context;

  const searchInputHandler = (e) => {
    setCityName(e.target.value);
  };
  const getTime = (given) => {
    const time = new Date(given * 1000);
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const twelveHourFormat = hours % 12 || 12;
    const amOrPm = hours < 12 ? 'AM' : 'PM';
    return (twelveHourFormat.toLocaleString('en-US', { minimumIntegerDigits: 2 }) + ':' + minutes.toLocaleString('en-US', { minimumIntegerDigits: 2 }) + ' ' + amOrPm);
  }

  // const isFirstRender = useRef(true);
  // useEffect(() => {
  //   if (isFirstRender.current) {
  //     isFirstRender.current = false;
  //     return;
  //   }
  //   getCityWeatherData();
  //   // eslint-disable-next-line
  // }, [])

  // const getCityWeatherData = async () => {
  //   const response = await fetch(`${base_url}forecast.json?key=${api_key}&q=${cityName}&days=7&aqi=no&alerts=no`);
  //   const data = await response.json();
  //   console.log(data);
  // }
  const currentConditionsData = [
    {
      field: "Feels like",
      icon: faTemperatureHalf,
      value: `${data.current.feelslike_c}\u00B0C `,
    },
    {
      field: "Wind",
      icon: faWind,
      value: `${data.current.wind_kph} km/h`
    },
    {
      field: "Humidity",
      icon: faDroplet,
      value: `${data.current.humidity}%`
    },
    {
      field: "Cloud",
      icon: faCloud,
      value: `${data.current.cloud}%`
    }
  ];
  const todaysSummaryData = [
    {
      field: "Max Temperature",
      icon: faTemperatureHigh,
      value: `${data.forecast.forecastday[0].day.maxtemp_c}\u00B0C `
    },
    {
      field: "Min Temperature",
      icon: faTemperatureLow,
      value: `${data.forecast.forecastday[0].day.mintemp_c}\u00B0C `
    },
    {
      field: "Chances of Rain",
      icon: faCloudRain,
      value: `${data.forecast.forecastday[0].day.daily_chance_of_rain}%`
    },
    {
      field: "Chances of Snow",
      icon: faSnowflake,
      value: `${data.forecast.forecastday[0].day.daily_chance_of_snow}%`
    }
  ];

  return (
    <>
      <div className="weather_bg">
        <Navbar />
        <div className="weather_center">
          <div className="weather_search">
            <input type="search" name="search" id="weather_search_field" placeholder="Search for a city name" onChange={searchInputHandler} value={cityName} />
            <Link to="/weather" className="weather_search_btn">Search</Link>
          </div>
          <div className="weather_main">
            <div className="weather_main-left">
              <h1 className="weather_main-city clr_f">{data.location.name}</h1>
              <h2 className="weather_main-region_country clr_d">{data.location.region} - {data.location.country}</h2>
              <h1 className="weather_main-temp clr_f">{data.current.temp_c}&deg;C</h1>
              <h3 className="weather_main-condition clr_d">{data.current.condition.text}</h3>
            </div>
            <div className="weather_main-right">
              <img className="weather_main-icon" src={data.current.condition.icon} alt={data.current.condition.text} />
              <div className="clr_d">Updated on <span className="weather_main-time">{getTime(data.current.last_updated_epoch)}</span></div>
            </div>
          </div>
          <ConditionsBox heading="Current Weather Conditions" dataItems={currentConditionsData} />
          <ConditionsBox heading="Today's Summary" dataItems={todaysSummaryData} />

        </div>
      </div>
    </>
  )
}

export default Weather