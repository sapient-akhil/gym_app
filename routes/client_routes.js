const express = require("express");
const router = express.Router();
const Schema = require("../validation/schema")
const Validators = require("../validation/validation")

//client login
const clientController = require("../controller/client/client_login")

router.post("/client-login", Validators.forReqBody(Schema.clientLoginSchema), clientController.clientLogin)

//mealPlan routes
const mealPlanController = require("../controller/client/meal_controller")

router.get("/all-mealPlan", mealPlanController.allMealPlan);
router.get("/one-mealplan/:id", Validators.forParams(Schema.params), mealPlanController.oneMealplan);

//workOut routes
const workOutController = require("../controller/client/workOut_controller")

router.get("/all-workOut", workOutController.allWorkOut);
router.get("/one-workOut/:id", Validators.forParams(Schema.params), workOutController.oneWorkOut);

//unit routes
const unitController = require("../controller/client/unit_controller")

router.post("/create-update-unit", Validators.forReqBody(Schema.unitSchema), unitController.createUpdateUnit);
router.get("/all-unit", unitController.allUnit);
router.get("/one-unit/:id", Validators.forParams(Schema.params), unitController.oneUnit);
router.delete("/delete-unit/:id", Validators.forParams(Schema.params), unitController.deleteUnit);

//bodyPart routes
const bodyPartController = require("../controller/client/bodyPart_controller")

router.post("/create-update-bodyPart", Validators.forReqBody(Schema.bodyPartSchema), bodyPartController.createUpdateBodyPart);
router.get("/all-bodyPart", bodyPartController.allBodyPart);
router.get("/one-bodyPart/:id", Validators.forParams(Schema.params), bodyPartController.oneBodyPart);
router.delete("/delete-bodyPart/:id", Validators.forParams(Schema.params), bodyPartController.deleteBodyPart);

//measurment routes
const measurmentController = require("../controller/client/measurment_controller")

router.post("/create-update-measurment", Validators.forReqBody(Schema.measurmentSchema), measurmentController.createUpdatemeasurment);
router.get("/all-measurmentData", measurmentController.allMeasurmentData);
router.get("/one-measurmentData/:id", Validators.forParams(Schema.params), measurmentController.oneMeasurmentData);
router.get("/particular-bodyPart/:bodyPartId", Validators.forParams(Schema.bodyPartId), measurmentController.particularBodyPart);
router.post("/bodyPart/:bodyPartId", Validators.forParams(Schema.bodyPartId), measurmentController.particularBodyPartByDate);
router.delete("/delete-measurmentData/:id", Validators.forParams(Schema.params), measurmentController.deleteMeasurmentData);

module.exports = router;
