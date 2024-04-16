const { checkNumberAvailability } = require("../handlers/itemHandlers");
const Model = require("../models/itemModel");
const { Twilio } = require("twilio");

async function getAllItems() {
  try {
    return await Model.find();
  } catch (error) {
    throw new Error("Internal server error");
  }
}

async function getItemsByPersonalMobileNo(number) {
  try {
    const query = {};
    if (number) query.personalMobileNo = number;
    return await Model.find(query);
  } catch (error) {
    throw new Error("Internal server error");
  }
}

async function createItem(
  accountSid,
  authToken,
  twilioContactNumber,
  personalMobileNo,
  ticketDate,
  status
) {
  try {
    if (
      !accountSid ||
      !authToken ||
      !twilioContactNumber ||
      !personalMobileNo ||
      !ticketDate
    ) {
      throw new Error("All credentials must be provided");
    }
    const checkNumber = await getItemsByPersonalMobileNo(personalMobileNo);
    if (checkNumber.length != 0) {
      throw new Error("number already registered");
    }

    const twilioClient = new Twilio(accountSid, authToken);
    const twilioResponse = await twilioClient.messages.create({
      from: twilioContactNumber,
      body: `Subscribed to Rcb Ticket notifier`,
      to: personalMobileNo,
    });

    if (twilioResponse.errorMessage) {
      throw new Error("Wrong Credentials");
    }

    const newItem = new Model({
      accountSid: accountSid,
      authToken: authToken,
      twilioContactNumber: twilioContactNumber,
      personalMobileNo: personalMobileNo,
      ticketDate: ticketDate,
      status: status,
    });

    await newItem.save();
    return newItem;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteItemById(id) {
  try {
    return await Model.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  getAllItems,
  getItemsByPersonalMobileNo,
  createItem,
  deleteItemById,
};
