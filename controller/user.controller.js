const Bot = require("../config/telegram.Bot");
const User = require("../model/User");
const ApiResponse = require("../utilities/apiResponse");
const httpStatusCodes = require("http-status-codes");

exports.startChat = (chatId) => {
  try {
    if (!chatId || typeof chatId !== 'number') {
      throw new Error('Invalid chatId');
    }

    Bot.sendMessage(
      chatId,
      "Welcome to the weather Bot! Please provide your name:"
    );
  } catch (err) {
    console.log("Error in initiating bot : ", err);
  }
};

exports.getUserInfo = async (chatId) => {
  try {
    if (!chatId || typeof chatId !== 'number') {
      throw new Error('Invalid chatId');
    }

    const { name, city, country, status } = await User.findOne({
      chatId: chatId,
    });
    if (status) {
      Bot.sendMessage(
        chatId,
        `Name : ${name}
    City : ${city}
    Country : ${country}
      `
      );
    } else {
      Bot.sendMessage(chatId, "You have been blocked for violating terms.");
    }
  } catch (err) {
    console.log("Error while getting user info : ", err);
  }
};

exports.saveUserInfo = async (chatId, user, message) => {
  try {
    if (!chatId || typeof chatId !== 'number') {
      throw new Error('Invalid chatId');
    }

    if (message != "/start") {
      if (!user) {
        const newUser = new User({ chatId: chatId });
        newUser.name = message;
        newUser.status = 1;
        newUser.save();
        Bot.sendMessage(
          chatId,
          "Thank you for registering your name. Please provide your city:"
        );
      } else if (!user.name) {
        user.name = message;
        user.save();
        Bot.sendMessage(
          chatId,
          "Thank you for providing your name. Please provide your city:"
        );
      } else if (!user.city) {
        user.city = message;
        user.save();
        Bot.sendMessage(
          chatId,
          "Thank you for providing your city. Please provide your country:"
        );
      } else if (!user.country) {
        user.country = message;
        user.save();
        Bot.sendMessage(
          chatId,
          "Thank you for providing your country. You are now registered!"
        );
      }
    }
  } catch (err) {
    console.log("Error while saving data : ", err);
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    let userInfo = [];

    users.forEach((user) => {
      const { name, city, country, status, chatId } = user;
      userInfo.push({ name, city, country, status, chatId });
    });

    ApiResponse.success(
      res,
      httpStatusCodes.OK,
      "Data fetch Successfully..!",
      userInfo
    );
    console.log(userInfo);
  } catch (err) {
    console.log(err);
    ApiResponse.error(res, 400, err);
  }
};

exports.changeUserAccessById = async (req, res) => {
  try {
    if (!req.body || !req.body.chatId) {
      throw new Error('Invalid request parameters');
    }

    const user = await User.findOne({ chatId: req.body.chatId });
    user.status = req.body.status || 1;
    console.log(user);
    console.log(req.body.status)
    user.save();
    ApiResponse.success(
      res,
      httpStatusCodes.OK,
      "User updated Successfully..!",
      {}
    );
  } catch (err) {
    console.log(err);
    ApiResponse.error(res, 400, err);
  }
};
