const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  intervalInMinutes: Number,
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;