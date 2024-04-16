require("./src/configs/database");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const itemRoutes = require("./src/routes/itemRoutes");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3003;
app.use(bodyParser.json());
app.use("/api", itemRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
