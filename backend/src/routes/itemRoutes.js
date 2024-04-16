const express = require("express");
const itemsHandlers = require("../handlers/itemHandlers");
// const checkTicket = require("../checkTicket");

const router = express.Router();
router.get("/items", itemsHandlers.getAllItems);
router.get("/checkRcbTicket", itemsHandlers.checkRcbTicket);

router.post("/items", itemsHandlers.createItem);
router.get("/getCredentials/:number", itemsHandlers.checkNumberAvailability);
// // router.put("/items/:id", itemsHandlers.updateItem);
router.delete("/items/:id", itemsHandlers.deleteItem);
module.exports = router;
