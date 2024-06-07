const express = require("express");

const app = express();

app.get("/data", (req, res) => {
    res.status(200).send({
        name: "admin"
    })
});



module.exports = app