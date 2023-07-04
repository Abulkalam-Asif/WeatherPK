import "./weather.css"
import React, { useState, useContext, useEffect } from "react"
import WeatherContext from "../../context/WeatherContext";
import { ConditionsBox, Footer, ForecastBox, Navbar } from "../../containers"
import { HourlyForecastItem, DailyForecastItem } from "../../components";
import { faTemperatureHalf, faWind, faDroplet, faCloud, faTemperatureHigh, faTemperatureLow, faCloudRain, faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const Weather = () => {
  const navigate = useNavigate(null);
  const context = useContext(WeatherContext);
  const { cityName, setCityName, data, setData, setShowAlert, setAlertMsg, getCityWeatherData, setShowLoader, units } = context;

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
  const windSpeedHandler = (val) => {
    if (units.wind_speed === "mph") {
      val = val * 0.62;
    }
    return val?.toFixed(1).toString() + (units.wind_speed === "mph" ? " mph" : " kph");
  }
  const temperatureHandler = (val) => {
    if (units.temperature === "F") {
      val = (val * (9 / 5)) + 32;
    }
    return val?.toFixed(1).toString() + (units.temperature === "F" ? "\u00B0F" : "\u00B0C");
  }

  useEffect(() => {
    setShowLoader(true);
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
        value: `${temperatureHandler(data?.current?.feelslike_c)} `,
      },
      {
        field: "Wind",
        icon: faWind,
        value: `${windSpeedHandler(data?.current?.wind_kph)}`
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
        value: `${temperatureHandler(data?.forecast?.forecastday[0]?.day.maxtemp_c)} `
      },
      {
        field: "Min Temperature",
        icon: faTemperatureLow,
        value: `${temperatureHandler(data?.forecast?.forecastday[0]?.day.mintemp_c)} `
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
          temperature: `${temperatureHandler(item.temp_c)}`,
        }}
      />
    ));
    setHourlyForecastData(hourlyForecastItems);
    const daillyForecastItems = data?.forecast?.forecastday.map((item, index) => (
      <DailyForecastItem key={index} data={{ day: getDay(item.date_epoch), date: getDate(item.date_epoch), maxTemp: `${temperatureHandler(item.day.maxtemp_c)}`, minTemp: `${temperatureHandler(item.day.mintemp_c)}`, rainChance: `${item.day.daily_chance_of_rain}%`, snowChance: `${item.day.daily_chance_of_snow}%` }} />
    ));

    setDailyForecastData(daillyForecastItems);
    // eslint-disable-next-line
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
              <h1 className="weather_main-city clr_p_high">{data?.location?.name}</h1>
              <h2 className="weather_main-region_country clr_p_medium">{data?.location?.region} - {data?.location?.country}</h2>
              <div className="weather_main-date_day clr_p_low">{getDay(data?.location?.localtime_epoch)} - {getDate(data?.location?.localtime_epoch)}</div>
              <h1 className="weather_main-temp clr_p_high">{temperatureHandler(data?.current?.temp_c)}</h1>
              <h3 className="weather_main-condition clr_p_medium">{data?.current?.condition.text}</h3>
            </div>
            <div className="weather_main-right">
              <img className="weather_main-icon" src={data?.current?.condition.icon} alt={data?.current?.condition.text} />
              <div className="clr_p_medium">Updated on&nbsp;&nbsp;<span className="weather_main-time">{getTime(data?.current?.last_updated_epoch)}</span></div>
            </div>
          </div>
          <ConditionsBox heading="Current Weather Conditions" dataItems={currentConditionsData} />
          <ForecastBox direction="row" heading="Hourly Forecast" dataItems={hourlyForecastData} />
          <ConditionsBox heading="Today's Summary" dataItems={todaysSummaryData} />
          <ForecastBox direction="column" heading="Daily Forecast" dataItems={dailyForecastData} />
          <Footer margin_top="1rem"/>
        </div>
      </div>
    </>
  )
}

export default Weather;