import React, {useState, useEffect} from 'react'
// import styled from 'styled-components'

import {useDispatch, useSelector} from "react-redux"
import {fetchWeatherAction} from "../../redux/slices/weatherSlices"


const WeatherAPI = () => {
    const [city, setCity] = useState('london')

    const dispatch = useDispatch();
    // API Weather
    useEffect(() => {
        dispatch(fetchWeatherAction("paris"));
    }, [dispatch]);

    // select state from store
    const state = useSelector(state => state)
    const {weather, loading, error} = state
    console.log(state)

    return (
        <div>
            <input value={city} onChange={e=>setCity(e.target.value)}
                placeholder="Search City">
            </input>
            <button onClick={()=>dispatch(fetchWeatherAction(city))}>Prout</button>
            {loading? <h1 style={{color:"red"}}>Loading please wait...</h1> :
             error? <h1 style={{color:"red"}}>{error?.message}</h1>:
            <div style={{color:"red"}}>
                Success
                <h3>{weather?.name}, {weather?.sys?.country}</h3>
                <p>The weather condition in {weather?.name},{" "}
                {weather?.sys?.country} is described as :{" "}
                {weather?.weather[0].description} with a temperature of {" "}
                {Math.ceil(Number(weather?.main.temp))} °C and a humidity of {" "}
                {weather?.main?.humidity} %</p>
                <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="/"></img>
            </div>
            }
        </div>
    );
}

export default WeatherAPI