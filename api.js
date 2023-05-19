var api = {
  getWeatherForecast: function(city, appid) {
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/onecall?q=" + city + "&exclude=current,minutely,hourly,alerts&appid=" + appid,
      dataType: "json"
    })
    .done(function(response) {
      if (response.cod === 200) {
        var weatherData = response;
        console.log(weatherData);
        displayWeather(weatherData);
      } else {
        console.log("Request failed with status code " + response.cod);
      }
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.log("Request failed: " + textStatus + ", " + errorThrown);
    });
  }
};

function displayWeather(weatherData) {
  var weatherContainer = document.getElementById("weather");
  
  // Clear the previous content
  weatherContainer.innerHTML = "";
  
  // Create elements for each weather data point
  var cityName = document.createElement("h2");
  cityName.textContent = weatherData.name;

  var weatherDescription = document.createElement("p");
  weatherDescription.textContent = weatherData.weather[0].description;

  var temperature = document.createElement("p");
  temperature.textContent = "Temperature: " + (weatherData.main.temp - 273.15).toFixed(2) + "°C";

  // Append the elements to the weather container
  weatherContainer.appendChild(cityName);
  weatherContainer.appendChild(weatherDescription);
  weatherContainer.appendChild(temperature);
  
  // Add custom styling to the weather container
  weatherContainer.style.border = "1px solid #ccc";
  weatherContainer.style.padding = "10px";
  weatherContainer.style.borderRadius = "8px";
  weatherContainer.style.marginTop = "20px";
  weatherContainer.style.backgroundColor = "#f5f5f5";
  weatherContainer.style.textAlign = "center";
}
// Add event listener for the "Get Weather" button
var button = document.querySelector("button[type='submit']");
button.addEventListener("click", function() {
  var city = document.getElementById("city").value;
  var apiKey = "5ec5845a9b7c8e9451636b9e096d36ab"; // Replace with your actual API key
  api.getWeatherForecast(city, apiKey);
});


