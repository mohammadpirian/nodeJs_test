const express = require("express");
const { asyncHandler } = require("../utils/async-handler");
const { getUserList, postUserList, registerUser, getAllUser, updateUser, handleGetById,editUserById } = require("../controllers/usercontroller");
const app = express();

app.get("/getlist", getUserList);

app.post("/postlist", postUserList);

app.post("/register", registerUser);

app.get("/userlist", getAllUser)

app.put("/update", updateUser)

app.get("/getbyid", handleGetById)

// app.put("/editUser", editUserById)
app.patch(
    "/:id",
    asyncHandler(editUserById)
  );


module.exports = app