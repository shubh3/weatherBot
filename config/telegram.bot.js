const TelegramBot = require("node-telegram-bot-api");


const TOKEN = process.env.TELEGRAM_TOKEN;
console.log(TOKEN);
const options = {
  polling: true,
};
const Bot = new TelegramBot(TOKEN, options);

module.exports = Bot;
