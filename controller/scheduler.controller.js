const Schedule = require("../model/Scheduler");
const sendWeatherUpdates = require("./weather.update.scheduler");

exports.updateScheduler = async (req, res) => {
  const { intervalInMinutes } = req.body;

  // Validate intervalInMinutes
  if (!intervalInMinutes || typeof intervalInMinutes !== 'number' || intervalInMinutes <= 0) {
    return res.status(400).json({ error: "Invalid intervalInMinutes value" });
  }

  try {
    // Save or update the scheduling data in the database
    let scheduleData = await Schedule.findOne();
    if (!scheduleData) {
      scheduleData = new Schedule({ intervalInMinutes });
    } else {
      scheduleData.intervalInMinutes = intervalInMinutes;
    }
    await scheduleData.save();

    // Start the scheduler with the updated interval
    sendWeatherUpdates(intervalInMinutes);

    res.send("Scheduler updated successfully");
  } catch (err) {
    console.error("Error updating scheduler:", err.message);
    res.status(500).send("Internal Server Error");
  }
};
