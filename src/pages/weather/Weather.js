import "./weather.css"
import React, { useState, useContext, useEffect } from "react"
import WeatherContext from "../../context/WeatherContext";
import { ConditionsBox, ForecastBox, Navbar } from "../../containers"
import { HourlyForecastItem, DailyForecastItem } from "../../components";
import { faTemperatureHalf, faWind, faDroplet, faCloud, faTemperatureHigh, faTemperatureLow, faCloudRain, faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const Weather = () => {
  const navigate = useNavigate(null);
  const context = useContext(WeatherContext);
  const { cityName, setCityName, data, setData, setShowAlert, setAlertMsg, getCityWeatherData, setShowLoader } = context;

  const searchInputHandler = (e) => {
    setCityName(e.target.value);
  };

  const handleData = async (city_name = cityName) => {
    const fetchedData = await getCityWeatherData(city_name);
    if (fetchedData.error) {
      setShowLoader(false);
      setShowAlert(true);
      let alertContent = fetchedData.error.message;
      if (alertContent.localeCompare("Parameter q is missing.") === 0) {
        alertContent = "Please Enter a City Name.";
      }
      setAlertMsg(alertContent);
      setCityName("");
    } else {
      localStorage.setItem("cityName", city_name);
      setData(fetchedData);
      setShowLoader(false);
    }
  };

  useEffect(() => {
    const localStorageData = localStorage.getItem("cityName");
    if (!data) {
      if (localStorageData) {
        setCityName(localStorageData);
        handleData(localStorageData);
      } else {
        navigate("/");
        setShowLoader(false);
        setShowAlert(true);
        setAlertMsg("Please Enter a city Name.");
        return;
      }
    } else {
      setShowLoader(false);
    }
    // eslint-disable-next-line
  }, []);

  const searchHandler = async () => {
    await setShowLoader(true);
    await handleData(cityName);
  };

  const [currentConditionsData, setCurrentConditionsData] = useState(null)
  const [todaysSummaryData, setTodaysSummaryData] = useState(null)
  const [hourlyForecastData, setHourlyForecastData] = useState([])
  const [dailyForecastData, setDailyForecastData] = useState(null)

  useEffect(() => {
    setCurrentConditionsData([
      {
        field: "Feels like",
        icon: faTemperatureHalf,
        value: `${data?.current?.feelslike_c}\u00B0C `,
      },
      {
        field: "Wind",
        icon: faWind,
        value: `${data?.current?.wind_kph} km/h`
      },
      {
        field: "Humidity",
        icon: faDroplet,
        value: `${data?.current?.humidity}%`
      },
      {
        field: "Cloud",
        icon: faCloud,
        value: `${data?.current?.cloud}%`
      }
    ]);
    setTodaysSummaryData([
      {
        field: "Max Temperature",
        icon: faTemperatureHigh,
        value: `${data?.forecast?.forecastday[0]?.day.maxtemp_c}\u00B0C `
      },
      {
        field: "Min Temperature",
        icon: faTemperatureLow,
        value: `${data?.forecast?.forecastday[0]?.day.mintemp_c}\u00B0C `
      },
      {
        field: "Chances of Rain",
        icon: faCloudRain,
        value: `${data?.forecast?.forecastday[0]?.day.daily_chance_of_rain}%`
      },
      {
        field: "Chances of Snow",
        icon: faSnowflake,
        value: `${data?.forecast?.forecastday[0]?.day.daily_chance_of_snow}%`
      }
    ]);
    const hourlyForecastItems = data?.forecast?.forecastday[0].hour.map((item, index) => (
      <HourlyForecastItem
        key={index}
        data={{
          time: getTime(item.time_epoch),
          icon: item.condition.icon,
          text: item.condition.text,
          temperature: `${item.temp_c}\u00B0C`,
        }}
      />
    ));
    setHourlyForecastData(hourlyForecastItems);
    const daillyForecastItems = data?.forecast?.forecastday.map((item, index) => (
      <DailyForecastItem key={index} data={{ day: getDay(item.date_epoch), date: getDate(item.date_epoch), maxTemp: `${item.day.maxtemp_c}\u00B0C`, minTemp: `${item.day.mintemp_c}\u00B0C`, rainChance: `${item.day.daily_chance_of_rain}%`, snowChance: `${item.day.daily_chance_of_snow}%` }} />
    ));

    setDailyForecastData(daillyForecastItems);
  }, [data])


  const getTime = (given) => {
    const date = new Date(given * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const twelveHourFormat = hours % 12 || 12;
    const amOrPm = hours < 12 ? 'AM' : 'PM';
    return (twelveHourFormat.toLocaleString('en-US', { minimumIntegerDigits: 2 }) + ':' + minutes.toLocaleString('en-US', { minimumIntegerDigits: 2 }) + ' ' + amOrPm);
  }
  const getDay = (given) => {
    const date = new Date(given * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: "long" })
    return day;
  }
  const getDate = (given) => {
    let date = new Date(given * 1000);
    date = date.toLocaleDateString('en-US', { dateStyle: "long" })
    return date;
  }

  return (
    <>
      <div className="weather_bg">
        <Navbar />
        <div className="weather_center">
          <div className="weather_search">
            <input type="search" name="search" id="weather_search_field" placeholder="Search for a city name" onChange={searchInputHandler} value={cityName} />
            <button className="weather_search_btn" onClick={searchHandler}>Search</button>
          </div>
          <div className="weather_main">
            <div className="weather_main-left">
              <h1 className="weather_main-city clr_f">{data?.location?.name}</h1>
              <h2 className="weather_main-region_country clr_d">{data?.location?.region} - {data?.location?.country}</h2>
              <div className="weather_main-date_day clr_a">{getDay(data?.location?.localtime_epoch)} - {getDate(data?.location?.localtime_epoch)}</div>
              <h1 className="weather_main-temp clr_f">{data?.current?.temp_c}&deg;C</h1>
              <h3 className="weather_main-condition clr_d">{data?.current?.condition.text}</h3>
            </div>
            <div className="weather_main-right">
              <img className="weather_main-icon" src={data?.current?.condition.icon} alt={data?.current?.condition.text} />
              <div className="clr_d">Updated on&nbsp;&nbsp;<span className="weather_main-time">{getTime(data?.current?.last_updated_epoch)}</span></div>
            </div>
          </div>
          <ConditionsBox heading="Current Weather Conditions" dataItems={currentConditionsData} />
          <ForecastBox direction="row" heading="Hourly Forecast" dataItems={hourlyForecastData} />
          <ConditionsBox heading="Today's Summary" dataItems={todaysSummaryData} />
          <ForecastBox direction="column" heading="Daily Forecast" dataItems={dailyForecastData} />
        </div>
      </div>
    </>
  )
}

export default Weather;