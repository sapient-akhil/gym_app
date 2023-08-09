const express = require("express");
const router = express.Router();
const trainerController = require("../controller/trainer_controller");

router.post("/trainerLogin", trainerController.trainerLogin)

module.exports = router