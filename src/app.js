function updateWeather(response) {
  let temperatureElement = document.querySelector("#temp");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let emojiIconElement = document.querySelector("#emoji-icon");

  icon.innerHTML = `<img src=${response.data.condition.icon_url} class="weather-emoji-icon" />`;
  console.log(response.data.condition.description);

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = `${date.getDay()} ${date.getHours()}:${date.getMinutes()}`;
  descriptionElement.innerHTML = `${response.data.condition.description}`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "144016bb2ce3odff4b8e4583ca9a5c1t";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function searchButton(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search-form-input");
  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "144016bb2ce3odff4b8e4583ca9a5c1t";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
              <div class="weather-forecast-date">${formatDay(day.time)}</div>
              <div><img src="${
                day.condition.icon_url
              }" class="weather-forecast-icon" /></div>
              <div class="weather-forecast-temp">
                <strong>${Math.round(day.temperature.maximum)}°</strong></div>
                <div class="weather-forecast-temp">${Math.round(
                  day.temperature.minimum
                )}°</div>
          </div>
        </div>
      `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector(".search-form");
searchFormElement.addEventListener("submit", searchButton);

searchCity("Port Elizabeth");
displayForecast();
