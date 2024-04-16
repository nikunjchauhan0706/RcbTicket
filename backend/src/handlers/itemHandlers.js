const {
  getAllItems,
  getItemsByPersonalMobileNo,
  createItem,
  deleteItemById,
} = require("../controllers/itemController");
const {
  checkTicketAvailability,
} = require("../controllers/rcbTicketController");

exports.getAllItems = async (_req, res) => {
  try {
    const items = await getAllItems();
    res.status(200).json(items);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.checkNumberAvailability = async (req, res) => {
  try {
    const personalMobileNo = req.params.number;
    const items = await getItemsByPersonalMobileNo(personalMobileNo);
    if (items.length == 0) {
      res.status(200).json({ message: "number available" });
    } else {
      throw new Error("number already registered");
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.createItem = async (req, res) => {
  try {
    const status = false;
    const {
      accountSid,
      authToken,
      twilioContactNumber,
      personalMobileNo,
      ticketDate,
    } = req.body;
    const newItem = await createItem(
      accountSid,
      authToken,
      twilioContactNumber,
      personalMobileNo,
      ticketDate,
      status
    );
    res.status(201).json(newItem);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await deleteItemById(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.checkRcbTicket = async (_req, res) => {
  try {
    const items = await getAllItems();
    const checkTicketResults = [];
    for (let i = 0; i < items.length; i++) {
      const {
        _id,
        accountSid,
        authToken,
        twilioContactNumber,
        personalMobileNo,
        ticketDate,
      } = items[i];
      const checkTicket = await checkTicketAvailability(
        _id,
        accountSid,
        authToken,
        twilioContactNumber,
        personalMobileNo,
        ticketDate
      );
      checkTicketResults.push(checkTicket);
    }
    res.status(200).json(checkTicketResults);
  } catch (e) {
    res.status(500).json({ e: "internal server error" });
  }
};
