const express = require("express");
const bodyParser = require("body-parser");
const itemRoutes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use("/api", itemRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
