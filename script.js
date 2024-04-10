const apiKey = "7b6f3e16245b01e616d965fa484f314d";
      const apiUrl =
        "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

      const searchBox = document.querySelector(".search input");
      const searchBtn = document.querySelector(".search button");
      const weatherIcon = document.querySelector(".weather-icon");

      async function checkWeather(city) {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (response.status == 404) {
          document.querySelector(".error").style.display = "block";
          document.querySelector(".weather").style.display = "none";
        } else {
          var data = await response.json();

          console.log(data);

          document.querySelector(".city").innerHTML = data.name;
          document.querySelector(".temp").innerHTML =
            Math.round(data.main.temp) + "°c";
          document.querySelector(".humidity").innerHTML =
            data.main.humidity + " %";
          document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

          if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
          } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
          } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
          } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
          } else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snow.png";
          } else if (data.weather[0].main == "Haze") {
            weatherIcon.src = "images/mist.png";
          }

          document.querySelector(".weather").style.display = "block";
          document.querySelector(".error").style.display = "none";
        }
      }

      searchBtn.addEventListener("click", () => {
        checkWeather(searchBox.value);
      });

      searchBox.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          checkWeather(searchBox.value);
        }
      });

      window.onload = function () {
        if (!getCookie("cookieConsent")) {
          document.getElementById("cookieConsentContainer").style.display =
            "block";
        }
      };

      function acceptCookieConsent() {
        setCookie("cookieConsent", "1", 365);
        document.getElementById("cookieConsentContainer").style.display =
          "none";
      }

      function rejectCookieConsent() {
        document.getElementById("cookieConsentContainer").style.display =
          "none";
        // Handle the rejection logic here
      }

      function setCookie(name, value, days) {
        var expires = "";
        if (days) {
          var date = new Date();
          date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
          expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
      }

      function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == " ") c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
        }
        return null;
      }