const express = require("express");

console.log("commonjs reached");

const app = express();
app.get("/", (req, res) => res.send("ok"));

app.listen(5000, () => {
    console.log("listening on 5000");
});