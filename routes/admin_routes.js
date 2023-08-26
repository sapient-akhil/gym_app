const express = require("express");
const router = express.Router();
const Schema = require("../validation/schema")
const Validators = require("../validation/validation")
const { verifyAccessTokenforAdmin, verifyAccessTokenforTrainer } = require("../helper/token")

//admin routes
const adminController = require("../controller/admin/admin_controller")

router.post("/admin-login", Validators.forReqBody(Schema.loginSchema), adminController.adminLogin)
router.post("/create-update-admin", Validators.forReqBody(Schema.trainerSchema), adminController.createUpdateAdmin)
router.get("/all-admin", adminController.allAdmin)
router.get("/one-admin/:id", Validators.forParams(Schema.params), adminController.oneAdmin)
router.delete("/delete-admin/:id", Validators.forParams(Schema.params), adminController.deleteAdmin)

// trainer routes
const trainerController = require("../controller/admin/trainer_controller")

router.post("/trainer-login", Validators.forReqBody(Schema.loginSchema), trainerController.trainerLogin)
router.post("/create-update-trainer", Validators.forReqBody(Schema.trainerSchema), trainerController.createUpdateTrainerByAdmin)
router.get("/all-trainer", trainerController.allTrainer)
router.get("/one-trainer/:id", Validators.forParams(Schema.params), trainerController.oneTrainer)
router.delete("/delete-trainer/:id", Validators.forParams(Schema.params), trainerController.deleteTrainerByAdmin)

// client routes
const clientController = require("../controller/admin/client_controller")

router.post("/create-update-client",verifyAccessTokenforTrainer, Validators.forReqBody(Schema.clientSchema), clientController.createUpdateClient)
router.get("/all-client", clientController.allClient)
router.get("/one-client/:id", Validators.forParams(Schema.params), clientController.oneClient)
router.delete("/delete-client/:id", Validators.forParams(Schema.params), clientController.deleteClient)

// meal items routes
const mealController = require("../controller/admin/items_controller")

router.post("/create-update-mealItem", Validators.forReqBody(Schema.mealItemSchema), mealController.createUpdateMealItem);
router.get("/all-mealItem", mealController.allMealItem);
router.get("/one-mealItem/:id", Validators.forParams(Schema.params), mealController.oneMealItems);
router.get("/trainer-mealItems/:trainer_id", mealController.trainerMealItems)
router.delete("/delete-mealItems/:id", Validators.forParams(Schema.params), mealController.deleteMealItems)

// meal plan routes
const mealPlanController = require("../controller/admin/meal_controller");

router.post("/create-update-mealPlan", Validators.forReqBody(Schema.mealPlanSchema), mealPlanController.createUpdateMealPlan);
router.get("/all-mealPlan", mealPlanController.allMealPlan);
router.get("/one-mealplan/:id", Validators.forParams(Schema.params), mealPlanController.oneMealplan);
router.delete("/delete-mealPlan/:id", Validators.forParams(Schema.params), mealPlanController.deleteMealPlan);

// exercises routes
const exercisesController = require("../controller/admin/exercises_controller")

router.post("/create-update-exercises", Validators.forReqBody(Schema.exercisesSchema), exercisesController.createUpdateExercise);
router.get("/all-exercises", exercisesController.allExercises);
router.get("/one-exercise/:id", Validators.forParams(Schema.params), exercisesController.oneExercise);
router.delete("/delete-exercise/:id", Validators.forParams(Schema.params), exercisesController.deleteExercise);

//workout routes
const workOutController = require("../controller/admin/workOut_controller")

router.post("/create-update-workOut", Validators.forReqBody(Schema.workOutSchema), workOutController.createUpdateWorkOut);
router.get("/all-workOut", workOutController.allWorkOut);
router.get("/one-workOut/:id", Validators.forParams(Schema.params), workOutController.oneWorkOut);
router.delete("/delete-workOut/:id", Validators.forParams(Schema.params), workOutController.deleteWorkOut);

//measurment routes
const measurmentController = require("../controller/admin/measurment_controller")

router.get("/all-measurmentData", measurmentController.allMeasurmentData);
router.get("/one-measurmentData/:id", Validators.forParams(Schema.params), measurmentController.oneMeasurmentData);
router.get("/bodyPart/:bodyPartId", Validators.forParams(Schema.bodyPartId), measurmentController.particularBodyPartData);

module.exports = router;

