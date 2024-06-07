const express = require("express");
const mongoose = require("mongoose")
require('./db');

const app = express();
const userRoutes = require("./routes/user")
const adminRoutes = require("./routes/admin")
const port = 4030;
app.use(express.json())
app.listen(port, () => {
  console.log("started port: ", port);
});

app.use("/user", userRoutes)
app.use("/admin", adminRoutes)

// post, put, delete, get , patch, option

app.get("/test", () => {
  console.log("get test");
});

app.post("/test", () => {
  console.log("post called");
});


