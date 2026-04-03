// 🔑 PUT YOUR API KEY HERE
const apiKey = "b9af44ab6cc28481131e1985e66731c9";

// 🌦 Get Weather by City
async function getWeather() {
  const city = document.getElementById("city").value;

  if (city === "") {
    alert("Please enter a city name!");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetchWeather(url);
}

// 🌍 Get Weather by Location
function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      fetchWeather(url);
    });
  } else {
    alert("Geolocation not supported!");
  }
}

// 🌦 Main Fetch Function
async function fetchWeather(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      alert("City not found!");
      return;
    }

    const data = await response.json();

    // 🌡 Extract Weather Data
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const condition = data.weather[0].main.toLowerCase();

    let rain = "No";
    if (data.rain) rain = "Yes";

    // 📊 Display Weather
    document.getElementById("location").innerText = "📍 " + data.name;
    document.getElementById("temp").innerText = "🌡 Temperature: " + temp + "°C";
    document.getElementById("humidity").innerText = "💧 Humidity: " + humidity + "%";
    document.getElementById("rain").innerText = "🌧 Rain: " + rain;

    // 🌱 ADVANCED FARMING ADVICE SYSTEM
    let advice = "";

    // 🌧 Rain Advice
    if (rain === "Yes") {
      advice += "🌧 Rain expected → Avoid irrigation. Ensure proper drainage to prevent waterlogging. ";
    } else {
      advice += "☀ No rain → Irrigate crops if soil is dry. ";
    }

    // 🌡 Temperature Advice
    if (temp > 35) {
      advice += "🔥 Extreme heat → Increase irrigation, use mulching, avoid afternoon watering. ";
    } else if (temp > 25) {
      advice += "🌤 Warm weather → Good growth conditions, maintain moderate watering. ";
    } else if (temp >= 15) {
      advice += "🌿 Mild weather → Ideal for most crops. Continue normal practices. ";
    } else {
      advice += "❄ Cold weather → Protect crops from frost using covers or greenhouse. ";
    }

    // 💧 Humidity Advice
    if (humidity > 85) {
      advice += "💧 Very high humidity → High fungal risk. Use fungicides & ensure airflow. ";
    } else if (humidity > 60) {
      advice += "🌫 Moderate humidity → Monitor pests & diseases. ";
    } else {
      advice += "🌵 Low humidity → Increase irrigation & retain soil moisture. ";
    }

    // 🌬 Wind Advice
    if (windSpeed > 10) {
      advice += "🌪 Strong winds → Use windbreaks & avoid spraying pesticides. ";
    } else {
      advice += "🍃 Light winds → Good for spraying fertilizers. ";
    }

    // ☁ Weather Condition Advice
    if (condition.includes("cloud")) {
      advice += "☁ Cloudy → Reduced sunlight may slow crop growth. ";
    } else if (condition.includes("clear")) {
      advice += "☀ Clear sky → Excellent for photosynthesis. ";
    } else if (condition.includes("storm") || condition.includes("thunder")) {
      advice += "⛈ Storm alert → Secure crops & delay farming operations. ";
    }

    // 🌾 Crop Suggestions (Smart Logic)
    if (temp > 25 && humidity > 70) {
      advice += "🌾 Suitable for rice cultivation. ";
    } else if (temp < 25 && humidity < 60) {
      advice += "🌱 Suitable for wheat, pulses. ";
    }

    // 🚜 General Advice
    advice += "🚜 Regularly check soil moisture & prefer organic fertilizers.";

    // 📢 Display Advice
    document.getElementById("advice").innerText = advice;

  } catch (error) {
    console.log(error);
    alert("Error fetching weather data!");
  }
}
