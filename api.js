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
  div.innerHTML = "<h2>" + weatherData.name + "</h2><p>" + weatherData.weather[0].description + "</p><p>" + (weatherData.main.temp - 273.15).toFixed(2) + "°C</p>";

}
function setBackgroundBasedOnWeather(weatherCondition) {
  var backgroundImageUrl = '';

  // Map weather conditions to background images
  if (weatherCondition === 'Clear') {
    backgroundImageUrl = 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xlYXIlMjBza3l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60';
  } else if (weatherCondition === 'Rain') {
    backgroundImageUrl = 'https://media.istockphoto.com/id/1429701799/photo/raindrops-on-asphalt-rain-rainy-weather-downpour.jpg?b=1&s=170667a&w=0&k=20&c=lXXWPQuhXI4xZRrr8d1uZGjQasuR-oRS1_GraXO9Fd0=';
  } else if (weatherCondition === 'Clouds') {
    backgroundImageUrl = 'https://media.istockphoto.com/id/1345919662/photo/panoramic-view-of-clear-blue-sky-and-clouds-clouds-with-background.jpg?s=1024x1024&w=is&k=20&c=SqQIXcNNk38ddmgWJIzLbld_I5CzwwU0iVqeM8I87Ts=';
  } else {
    // Use a default image if the weather condition doesn't match any specific image
    backgroundImageUrl = 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2xvdWR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60';
  }

  // Set the background image
  document.body.style.backgroundImage = 'url(' + backgroundImageUrl + ')';
}

