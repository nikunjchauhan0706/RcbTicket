const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  accountSid: String,
  authToken: String,
  twilioContactNumber: String,
  personalMobileNo: String,
  ticketDate: String,
  status: Boolean,
});

const Model = mongoose.model("Item", itemSchema);

module.exports = Model;
