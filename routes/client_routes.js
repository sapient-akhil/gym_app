const express = require("express");
const router = express.Router();
const clientController = require("../controller/client_controller")

router.post("/clientLogin", clientController.clientLogin)

module.exports = router;