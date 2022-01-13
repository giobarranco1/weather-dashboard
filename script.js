var weatherContainer = document.querySelector("#weather-container");
var submitButton = document.querySelector("#submit-button");
var tempEl = document.querySelector(".temp");
var humidityEl = document.querySelector(".humidity");
var windEl = document.querySelector(".wind")
var uvEl = document.querySelector(".uv-index")
var cityEl = document.querySelector(".city");
  function fetchWeather(lat, lon) {
    var requestUrl =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&exclude=minutely,hourly,alerts&appid=b97a233a86e30537282c0f50d75a8c17&units=imperial";
    console.log(requestUrl);
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data.daily[0]);
  
        // create img url with icon id
        var iconEl = document.createElement("img");
        var iconUrl =
          "https://openweathermap.org/img/wn/" +
          data.current.weather[0].icon +
          "@2x.png";
        iconEl.setAttribute("src", iconUrl);
        iconEl.setAttribute("alt", data.current.weather[0].description);
        weatherContainer.append(iconEl);

        var temp = data.current.temp;
        tempEl.textContent= temp + "° F";

        var humidity = data.current.humidity;
        humidityEl.textContent = "Humidity: " + humidity + "%";

        var windSpeed = data.current.wind_speed;
        windEl.textContent = "Wind speed: " + windSpeed + "mph";

        var uvIndex = data.current.uvi;
        uvEl.textContent = "UV Index: " + uvIndex;

        for (var i = 0; i < 5; i++){
            console.log(data.daily[i]);
        }

        




      });
  }
  
  function getCoords(search) {
    var requestUrl =
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
      search +
      "&limit=1&appid=b97a233a86e30537282c0f50d75a8c17";
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        fetchWeather(data[0].lat, data[0].lon);
      });
    }

      submitButton.addEventListener("click", function(event) {
          event.preventDefault();
          var search = document.querySelector("#search-id").value;
          getCoords(search);
          cityEl.textContent = "The weather in " + search + ":";
      })



  
  //getCoords("Missoula");