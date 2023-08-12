const express = require("express");
const app = express();
require("dotenv").config()
const PORT = process.env.PORT || 3000;
require("./config/mongodb")
const createError = require("http-errors")
const fileupload = require("express-fileupload")
app.use(fileupload());
const bodyParser = require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send("gym is open...")
});

app.all('/', (req, res) => { return res.status(200).send("mongodb Connected...") })

app.use("/admin", require("./routes/admin_routes"));
// app.use("/trainer", require("./routes/trainer_routes"));
app.use("/client", require("./routes/client_routes"));

app.use(async (req, res, next) => {
    const err = createError.BadRequest("URL not found")
    next(err);
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    })
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})