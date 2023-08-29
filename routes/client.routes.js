const express = require("express");
const router = express.Router();
const Schema = require("../validation/schema")
const Validators = require("../validation/validation")

//client login
const clientController = require("../controller/client/client.login")

router.post("/client-login", Validators.forReqBody(Schema.clientLoginSchema), clientController.clientLogin)

//mealPlan routes
const mealPlanController = require("../controller/client/mealplan")

router.get("/all-mealplan", mealPlanController.allMealPlan);
router.get("/one-mealplan/:id", Validators.forParams(Schema.params), mealPlanController.oneMealplan);

//workout routes
const workOutController = require("../controller/client/workout")

router.get("/all-workout", workOutController.allWorkOut);
router.get("/one-workout/:id", Validators.forParams(Schema.params), workOutController.oneWorkOut);

//unit routes
const unitController = require("../controller/client/unit")

router.post("/create-update-unit", Validators.forReqBody(Schema.unitSchema), unitController.createUpdateUnit);
router.get("/all-unit", unitController.allUnit);
router.get("/one-unit/:id", Validators.forParams(Schema.params), unitController.oneUnit);
router.delete("/delete-unit/:id", Validators.forParams(Schema.params), unitController.deleteUnit);

//bodypart routes
const bodyPartController = require("../controller/client/bodypart")

router.post("/create-update-bodypart", Validators.forReqBody(Schema.bodyPartSchema), bodyPartController.createUpdateBodyPart);
router.get("/all-bodypart", bodyPartController.allBodyPart);
router.get("/one-bodypart/:id", Validators.forParams(Schema.params), bodyPartController.oneBodyPart);
router.delete("/delete-bodypart/:id", Validators.forParams(Schema.params), bodyPartController.deleteBodyPart);

//measurment routes
const measurmentController = require("../controller/client/measurment")

router.post("/create-update-measurment", Validators.forReqBody(Schema.measurmentSchema), measurmentController.createUpdatemeasurment);
router.get("/all-measurmentdata", measurmentController.allMeasurmentData);
router.get("/one-measurmentdata/:id", Validators.forParams(Schema.params), measurmentController.oneMeasurmentData);
router.get("/particular-bodypart/:bodyPartId", Validators.forParams(Schema.bodyPartId), measurmentController.particularBodyPart);
router.post("/bodypartbydate/:bodyPartId", Validators.forParams(Schema.bodyPartId), Validators.forReqBody(Schema.bodyPartByDate), measurmentController.particularBodyPartByDate);
router.delete("/delete-measurmentdata/:id", Validators.forParams(Schema.params), measurmentController.deleteMeasurmentData);

module.exports = router;
