// src/utils.ts

import axios from 'axios';
import { LocationResponse, Location, WeatherResponse } from './types';

export function getLocation(locationName: string): Promise<LocationResponse> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1`;

  return axios.get(url).then(response => response.data);
}

export function getCurrentWeather(
  location: Location
): Promise<WeatherResponse> {
  const lat = location.latitude;
  const lon = location.longitude;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily_weather=true&models=icon_global&timezone=UTC`;

  return axios.get(url).then(response => response.data);
}

export function displayLocation(locationDetails: Location): void {
  const displayLocationName = document.querySelector(
    '#location-name'
  ) as HTMLHeadingElement;

  const displayCountry = document.querySelector(
    '#country'
  ) as HTMLHeadingElement;

  displayLocationName.textContent = locationDetails?.name as string;
  displayCountry.textContent = locationDetails?.country as string;

  return;
}

export function displayWeather(weatherDetails: WeatherResponse): void {
  //   display temperature
  const displayTemperature = document.querySelector(
    '#temperature'
  ) as HTMLParagraphElement;

  const temperature = weatherDetails.current_weather.temperature;
  const temperatureUnits = weatherDetails.current_weather_units.temperature;
  displayTemperature.textContent = `Temperature: ${temperature} ${temperatureUnits}`;

  // display windspeed
  const displayWindSpeed = document.querySelector(
    '#windspeed'
  ) as HTMLParagraphElement;

  const windspeed = weatherDetails.current_weather.temperature;
  const windspeedUnits = weatherDetails.current_weather_units.temperature;
  displayWindSpeed.textContent = `Wind Speed: ${windspeed} ${windspeedUnits}`;

  // display wind direction
  const displayWindDirection = document.querySelector(
    '#winddirection'
  ) as HTMLParagraphElement;

  const winddirection = weatherDetails.current_weather.winddirection;
  const winddirectionUnits = weatherDetails.current_weather_units.winddirection;
  displayWindDirection.innerText = `Wind Direction: ${winddirection} ${winddirectionUnits}`;

  return;
}

export function updateBackground(weatherCode: number, isDay: number): void {
  let weatherClass: string = '';

  switch (weatherCode) {
    case 0:
    case 1:
      if (isDay) weatherClass = 'sunny';
      if (!isDay) weatherClass = 'sunny-night';
      break;
    case 2:
      if (isDay) weatherClass = 'partly-cloudy';
      if (!isDay) weatherClass = 'partly-cloudy-night';
      break;
    case 3:
      weatherClass = 'cloudy';
      break;
    case 4:
      weatherClass = 'foggy';
      break;
    case 5:
      weatherClass = 'drizzle';
      break;
    case 6:
      weatherClass = 'rain';
      break;
    case 7:
      weatherClass = 'snow';
      break;
    case 8:
      weatherClass = 'showers';
      break;
    case 9:
      weatherClass = 'thunderstorm';
      break;
    default:
      console.warn('Unknown weather code: ', weatherCode);
      break;
  }

  document.body.className = weatherClass;

  return;
}
