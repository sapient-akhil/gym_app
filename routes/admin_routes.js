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

router.post("/trainer-login",verifyAccessTokenforAdmin, Validators.forReqBody(Schema.loginSchema), trainerController.trainerLogin)
router.post("/create-update-trainer",verifyAccessTokenforAdmin, Validators.forReqBody(Schema.trainerSchema), trainerController.createUpdateTrainerByAdmin)
router.get("/all-trainer",verifyAccessTokenforAdmin, trainerController.allTrainer)
router.get("/one-trainer/:id",verifyAccessTokenforAdmin, Validators.forParams(Schema.params), trainerController.oneTrainer)
router.delete("/delete-trainer/:id",verifyAccessTokenforAdmin, Validators.forParams(Schema.params), trainerController.deleteTrainerByAdmin)

// client routes
const clientController = require("../controller/admin/client_controller")

router.post("/create-update-client",verifyAccessTokenforTrainer, Validators.forReqBody(Schema.clientSchema), clientController.createUpdateClient)
router.get("/all-client",verifyAccessTokenforTrainer, clientController.allClient)
router.get("/one-client/:id",verifyAccessTokenforTrainer, Validators.forParams(Schema.params), clientController.oneClient)
router.delete("/delete-client/:id",verifyAccessTokenforTrainer, Validators.forParams(Schema.params), clientController.deleteClient)

// meal items routes
const mealController = require("../controller/admin/items_controller")

router.post("/create-update-mealItem",verifyAccessTokenforTrainer, Validators.forReqBody(Schema.mealItemSchema), mealController.createUpdateMealItem);
router.get("/all-mealItem",verifyAccessTokenforTrainer, mealController.allMealItem);
router.get("/one-mealItem/:id",verifyAccessTokenforTrainer, Validators.forParams(Schema.params), mealController.oneMealItems);
router.get("/trainer-mealItems/:trainer_id",verifyAccessTokenforTrainer, mealController.trainerMealItems)
router.delete("/delete-mealItems/:id",verifyAccessTokenforTrainer, Validators.forParams(Schema.params), mealController.deleteMealItems)

// meal plan routes
const mealPlanController = require("../controller/admin/meal_controller");

router.post("/create-update-mealPlan",verifyAccessTokenforTrainer, Validators.forReqBody(Schema.mealPlanSchema), mealPlanController.createUpdateMealPlan);
router.get("/all-mealPlan", mealPlanController.allMealPlan);
router.get("/one-mealplan/:id", Validators.forParams(Schema.params), mealPlanController.oneMealplan);
router.delete("/delete-mealPlan/:id",verifyAccessTokenforTrainer, Validators.forParams(Schema.params), mealPlanController.deleteMealPlan);

// exercises routes
const exercisesController = require("../controller/admin/exercises_controller")

router.post("/create-update-exercises",verifyAccessTokenforTrainer, Validators.forReqBody(Schema.exercisesSchema), exercisesController.createUpdateExercise);
router.get("/all-exercises",verifyAccessTokenforTrainer, exercisesController.allExercises);
router.get("/one-exercise/:id",verifyAccessTokenforTrainer, Validators.forParams(Schema.params), exercisesController.oneExercise);
router.delete("/delete-exercise/:id",verifyAccessTokenforTrainer, Validators.forParams(Schema.params), exercisesController.deleteExercise);

//workout routes
const workOutController = require("../controller/admin/workOut_controller")

router.post("/create-update-workOut",verifyAccessTokenforTrainer, Validators.forReqBody(Schema.workOutSchema), workOutController.createUpdateWorkOut);
router.get("/all-workOut", workOutController.allWorkOut);
router.get("/one-workOut/:id", Validators.forParams(Schema.params), workOutController.oneWorkOut);
router.delete("/delete-workOut/:id",verifyAccessTokenforTrainer, Validators.forParams(Schema.params), workOutController.deleteWorkOut);

//measurment routes
const measurmentController = require("../controller/admin/measurment_controller")

router.get("/all-measurmentData", measurmentController.allMeasurmentData);
router.get("/one-measurmentData/:id", Validators.forParams(Schema.params), measurmentController.oneMeasurmentData);
router.get("/bodyPart/:bodyPartId", Validators.forParams(Schema.bodyPartId), measurmentController.particularBodyPartData);

module.exports = router;

