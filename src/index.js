function formatDate(date) {
  let minute = date.getMinutes(); //0-59
  let hour = date.getHours(); //0-23
  let day = date.getDay(); //0-6

  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let formattedDay = days[date.getDay()];
  return `${formattedDay} ${hour}:${minute}`;
}
//
function refreshWeather(response) {
  console.log("Refresh Weather");
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#windSpeed");
  let timeElement = document.querySelector("#current-time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon"/>`;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  //Google: JS date.parse timestamp /api timestamp details like this:1733350775
  // console.log(new Date(1733350775 * 1000));
  temperatureElement.innerHTML = Math.round(temperature);
  getForecast(response.data.city);
}

//api
function searchCity(city) {
  //make api call anc update the ui interface
  let apiKey = "080cc4c3o478b5af3td4bb7f689bee06";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

//api forecast
function getForecast(city) {
  let apiKey = "080cc4c3o478b5af3td4bb7f689bee06";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  console.log("API URL for Forecast:", apiUrl); // 确认 API 请求的 URL
  axios.get(apiUrl).then(displayForecast);
}

//city name
function searchValue(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function displayForecast(response) {
  console.log(response.data);

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.daily.forEach(function (day) {
    forecastHtml += `<div class="weather-forecast-day">
            <div class="weather-forecast-date">TUE</div>
            <div class="weather-forecast-icon">🌞</div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature"><strong>${day.temperature.maximum}</strong></div>
              <div class="weather-forecast-temperature">12°</div>
            </div>
          </div>
          `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchValue);
searchCity("Shanghai");
