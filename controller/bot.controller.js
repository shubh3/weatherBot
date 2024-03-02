const User = require("../model/User");
const { startChat, getUserInfo, saveUserInfo } = require("./user.controller");
const Bot = require("../config/telegram.Bot");
const sendWeatherUpdates = require("./weather.update.scheduler");


const initiateBot = () => {
  Bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    if (chatId) startChat(chatId);
  });

  Bot.onText(/\/myinfo/, async (msg) => {
    const chatId = msg.chat.id;
    if (chatId) getUserInfo(chatId);
  });

  // Handle user registration
  Bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const message = msg.text.toString();
    const user = await User.findOne({ chatId: chatId });
    saveUserInfo(chatId, user, message);
  });

  // Schedule daily weather updates
  sendWeatherUpdates();
};

module.exports = initiateBot;