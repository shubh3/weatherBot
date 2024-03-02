const axios = require("axios");
const mongoose = require("mongoose");
const Bot = require("../config/telegram.Bot");
const User = require("../model/User");
const schedule = require("node-schedule");

const weatherApiKey = process.env.WEATHER_API_KEY;
// Define a function to fetch weather updates



const fetchUserAndGetWeatherData = async() => {
  const users = await User.find(); // Retrieve all users from the database
  users.forEach(async (user) => {
    const { city, country, chatId, status } = user;
    if (status) {
      try {
        // Fetch weather data from the API
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${weatherApiKey}`
        );
        const weatherData = response.data;

        // Extract relevant weather information
        const description = weatherData.weather[0].description;
        const temperature = weatherData.main.temp;

        // Compose the weather update message
        const message = `Weather Update for ${city}, ${country}:\n${description}, Temperature: ${temperature}°C`;

        // Send the weather update to the user
        Bot.sendMessage(chatId, message);
      } catch (error) {
        console.error("Error fetching weather data:", error.message);
      }
    }
  });
}

const sendWeatherUpdates = async (intervalMinutes) => {
  schedule.scheduleJob(`*/${intervalMinutes} * * * *`, () => {
    fetchUserAndGetWeatherData();
    console.log('weather update sent')
  });
  
};

module.exports = sendWeatherUpdates;
