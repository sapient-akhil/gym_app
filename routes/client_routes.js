const express = require("express");
const router = express.Router();
const Schema = require("../validation/schema")
const Validators = require("../validation/validation")

//client login
const clientController = require("../controller/client/client_login")

router.post("/clientLogin", Validators.forReqBody(Schema.clientLoginSchema), clientController.clientLogin)

//mealPlan routes
const mealPlanController = require("../controller/client/meal_controller")

router.get("/allMealPlan", mealPlanController.allMealPlan);
router.get("/oneMealplan/:id", Validators.forParams(Schema.params), mealPlanController.oneMealplan);

//workOut routes
const workOutController = require("../controller/client/workOut_controller")

router.get("/allWorkOut", workOutController.allWorkOut);
router.get("/oneWorkOut/:id", Validators.forParams(Schema.params), workOutController.oneWorkOut);

//unit routes
const unitController = require("../controller/client/unit_controller")

router.post("/unitCreate", Validators.forReqBody(Schema.unitSchema), unitController.unitCreate);
router.get("/allUnit", unitController.allUnit);
router.get("/oneUnit/:id", Validators.forParams(Schema.params), unitController.oneUnit);
router.delete("/deleteUnit/:id", Validators.forParams(Schema.params), unitController.deleteUnit);
router.put("/updateUnit/:id", Validators.forParams(Schema.params), Validators.forReqBody(Schema.unitSchema), unitController.updateUnit);

//bodyPart routes
const bodyPartController = require("../controller/client/bodyPart_controller")

router.post("/bodyPartCreate", Validators.forReqBody(Schema.bodyPartSchema), bodyPartController.bodyPartCreate);
router.get("/allBodyPart", bodyPartController.allBodyPart);
router.get("/oneBodyPart/:id", Validators.forParams(Schema.params), bodyPartController.oneBodyPart);
router.delete("/deleteBodyPart/:id", Validators.forParams(Schema.params), bodyPartController.deleteBodyPart);
router.put("/updateBodyPart/:id", Validators.forParams(Schema.params), Validators.forReqBody(Schema.bodyPartSchema), bodyPartController.updateBodyPart)

//measurment routes
const measurmentController = require("../controller/client/measurment_controller")

router.post("/measurmentCreate", Validators.forReqBody(Schema.measurmentSchema), measurmentController.measurmentCreate);
router.get("/allMeasurmentData", measurmentController.allMeasurmentData);
router.get("/oneBodyPart/:id", Validators.forParams(Schema.params), measurmentController.oneBodyPartData);
router.get("/bodyPart/:bodyPartId", Validators.forParams(Schema.bodyPartId), measurmentController.particularBodyPartByDate);
router.delete("/deleteMeasurmentData/:id", Validators.forParams(Schema.params), measurmentController.deleteMeasurmentData);
router.put("/updateMeasurmentData/:id", Validators.forParams(Schema.params), Validators.forReqBody(Schema.measurmentSchema), measurmentController.updateMeasurmentData)

module.exports = router;
