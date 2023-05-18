var api = {
  getWeather: function(city) {
    // Make an API request to get the weather for the specified city.
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=5ec5845a9b7c8e9451636b9e096d36ab",
      dataType: "json"
    })
    .done(function(response) {
      // Check the response status code.
      if (response.cod === 200) {
        // The request was successful.
        var weatherData = response;
        console.log(weatherData);
        displayWeather(weatherData);
      } else {
        // The request failed.
        console.log("Request failed with status code " + response.cod);
      }
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.log("Request failed: " + textStatus + ", " + errorThrown);
    });
  }
};

function displayWeather(weatherData) {
  var div = document.getElementById("weather");
  div.innerHTML = "<h2>" + weatherData.name + "</h2><p>" + weatherData.weather[0].description + "</p><p>" + (weatherData.main.temp - 273.15) + "°C</p>";

  

}

