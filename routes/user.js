const express = require("express");
const { getUserList, postUserList } = require("../controllers/usercontroller");

const app = express();

app.get("/getlist", getUserList);
app.post("/postlist", postUserList);



module.exports = app