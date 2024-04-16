const express = require("express");
const checkTicket = require("./getRcbTicket");

const router = express.Router();
router.get("/checkRcbTicket", checkTicket.checkRcbTicket);
module.exports = router;
