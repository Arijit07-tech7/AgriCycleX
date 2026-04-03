// 🔑 ADD YOUR API KEY HERE
const apiKey = "b9af44ab6cc28481131e1985e66731c9";

async function getWeather() {
  const state = document.getElementById("state").value;
  const district = document.getElementById("district").value;
  const city = document.getElementById("city").value;

  if (state === "" || district === "") {
    alert("Please select state and district!");
    return;
  }

  const location = city !== "" ? city : district;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location},IN&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      alert("Location not found! Try a nearby city.");
      return;
    }

    const data = await response.json();

    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const wind = data.wind.speed;

    let rain = "No";
    if (data.rain) rain = "Yes";

    // Display Weather
    document.getElementById("location").innerText =
      `📍 ${district}, ${state}`;

    document.getElementById("temp").innerText =
      "🌡 Temperature: " + temp + "°C";

    document.getElementById("humidity").innerText =
      "💧 Humidity: " + humidity + "%";

    document.getElementById("rain").innerText =
      "🌧 Rain: " + rain;

    document.getElementById("wind").innerText =
      "🌬 Wind: " + wind + " m/s";

    // 🌱 Advanced Farming Advice
    let advice = "";

    if (rain === "Yes") {
      advice += "🌧 Avoid irrigation. Ensure drainage. ";
    } else {
      advice += "☀ Irrigate crops if soil is dry. ";
    }

    if (temp > 35) {
      advice += "🔥 High heat: Increase watering and use mulching. ";
    } else if (temp > 25) {
      advice += "🌤 Good conditions for crop growth. ";
    } else if (temp < 15) {
      advice += "❄ Protect crops from cold. ";
    }

    if (humidity > 80) {
      advice += "💧 High humidity: Risk of fungal diseases. ";
    }

    if (wind > 10) {
      advice += "🌪 Strong winds: Avoid spraying pesticides. ";
    }

    if (advice === "") {
      advice = "🌱 Normal farming conditions.";
    }

    document.getElementById("advice").innerText = advice;

  } catch (error) {
    console.log(error);
    alert("Error fetching weather data!");
  }
}