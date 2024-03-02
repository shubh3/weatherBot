// adminPanel.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const initiateBot = require('./controller/bot.controller');
const { baseUrl } = require('./constants/app.config.constants');
const indexRoute = require('./routes/index')

const app = express();
app.use(bodyParser.json());
app.use('/api', indexRoute);
// Connect to MongoDB
mongoose.connect(
    "mongodb+srv://srp:Password98@cluster0.sttgvpf.mongodb.net/weatherBot?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  const db = mongoose.connection;



// Define routes and implement admin panel functionality here

app.listen(3000, () => {
  console.log('Bot is running on port 3000');
  initiateBot();
});
