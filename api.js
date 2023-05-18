var api = {
  getWeather: function(city) {
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=5ec5845a9b7c8e9451636b9e096d36ab",
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
  var div = document.getElementById("weather");
  div.innerHTML = "<h2>" + weatherData.name + "</h2><p>" + weatherData.weather[0].description + "</p><p>" + (weatherData.main.temp - 273.15).toFixed(2) + "°C</p>";

  var dailyTemperatures = [];
  var daysOfWeek = [];

  // Extract temperature and day of the week data
  for (var i = 0; i < weatherData.daily.length; i++) {
    var temperature = (weatherData.daily[i].temp.day - 273.15).toFixed(2);
    var date = new Date(weatherData.daily[i].dt * 1000);
    var dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" });

    dailyTemperatures.push(temperature);
    daysOfWeek.push(dayOfWeek);
  }

  var ctx = document.getElementById("weatherChart").getContext("2d");
  var weatherChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: daysOfWeek,
      datasets: [
        {
          label: "Temperature (°C)",
          data: dailyTemperatures,
          backgroundColor: "rgba(0, 136, 204, 0.2)",
          borderColor: "rgba(0, 136, 204, 1)",
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  setBackgroundBasedOnWeather(weatherData.weather[0].main);
}

// Add event listener for the "Get Weather" button
var button = document.querySelector("button[type='submit']");
button.addEventListener("click", function() {
  var city = document.getElementById("city").value;
  api.getWeather(city);
});

