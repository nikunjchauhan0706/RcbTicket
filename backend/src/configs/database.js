const mongoose = require("mongoose");

const uri =
  "mongodb+srv://nikunj762000:nikunj123@taskscheduler.l6e4a09.mongodb.net/?retryWrites=true&w=majority&appName=TaskScheduler";
mongoose.connect(uri);

const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
