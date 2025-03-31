
// Function to fetch weather data
async function getWeather() {
    const city = document.getElementById("city").value.trim(); // Get user input

    if (!city) {
        alert("Please enter a city name"); // Ensure input is not empty
        return;
    }

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(weatherUrl);
        const data = await response.json();

        if (data.cod !== 200) {
            document.getElementById("weather-info").innerHTML = "<p><b>City not found!</b></p>";
            return;
        }

        // Weather condition mapping to local images
        const weatherImages = {
            Clear: "images/clear.png",
            Clouds: "images/cloudy.png",
            Rain: "images/rainy.png",
            Drizzle: "images/drizzle.png",
            Thunderstorm: "images/thunder.png",
            Snow: "images/snow.png",
            Mist: "images/mist.png",
            Fog: "images/fog.png",
            Haze: "images/haze.png",
            Dust: "images/dust.png",
        };

        const weatherCondition = data.weather[0].main;
        const weatherImage = weatherImages[weatherCondition] || "images/default.png"; // Fallback image

        // Displaying weather info dynamically
        document.getElementById("weather-info").innerHTML = `
            <img src="${weatherImage}" alt="${weatherCondition}">
            <h2 style="text-align: center;">${data.name}, ${data.sys.country}</h2>
            <table style="width: 100%; text-align: left; border-collapse: collapse; margin-top: 10px;">
                <tr>
                    <td><strong>Temperature:</strong></td>
                    <td>${data.main.temp}°C</td>
                </tr>
                <tr>
                    <td><strong>Weather:</strong></td>
                    <td>${data.weather[0].description}</td>
                </tr>
                <tr>
                    <td><strong>Humidity:</strong></td>
                    <td>${data.main.humidity}%</td>
                </tr>
                <tr>
                    <td><strong>Wind Speed:</strong></td>
                    <td>${data.wind.speed} m/s</td>
                </tr>
            </table>
        `;

        // Expand the weather box for a better UI experience
        document.querySelector(".weather-box").classList.add("expand");

    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById("weather-info").innerHTML = "<p>Error retrieving data!</p>";
    }
}
