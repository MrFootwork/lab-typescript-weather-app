// src/main.ts

import {
  getLocation,
  getCurrentWeather,
  displayWeather,
  displayLocation,
} from './utils';

const input = document.querySelector('input')!;
const button = document.querySelector('button')!;

button.addEventListener('click', async e => {
  e.preventDefault();
  const locationName = input.value;
  const response = await getLocation(locationName);
  const location = response.results?.[0];

  let weather = null;

  if (location) {
    weather = await getCurrentWeather(location);
  }

  if (weather) {
    displayLocation(location!);
    displayWeather(weather);
  }
});
