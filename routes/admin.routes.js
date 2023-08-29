const express = require("express");
const router = express.Router();
const Schema = require("../validation/schema")
const Validators = require("../validation/validation")
const { verifyAccessTokenforAdmin, verifyAccessTokenforTrainer, verifyAccessTokenforSuperAdmin } = require("../helper/token")

//admin routes
const adminController = require("../controller/admin/admin")

router.get("/check-super-admin", adminController.checkSuperAdmin)
router.post("/create-super-admin", Validators.forReqBody(Schema.trainerSchema), adminController.createSuperAdmin)
router.post("/admin-login", Validators.forReqBody(Schema.loginSchema), adminController.adminLogin)
router.post("/create-update-admin", verifyAccessTokenforSuperAdmin, Validators.forReqBody(Schema.trainerSchema), adminController.createUpdateAdmin)
router.get("/all-admin", adminController.allAdmin)
router.get("/one-admin/:id", verifyAccessTokenforSuperAdmin, Validators.forParams(Schema.params), adminController.oneAdmin)
router.delete("/delete-admin/:id", verifyAccessTokenforSuperAdmin, Validators.forParams(Schema.params), adminController.deleteAdmin)

// trainer routes
const trainerController = require("../controller/admin/trainer")

router.post("/trainer-login", Validators.forReqBody(Schema.loginSchema), trainerController.trainerLogin)
router.post("/create-update-trainer", verifyAccessTokenforAdmin, Validators.forReqBody(Schema.trainerSchema), trainerController.createUpdateTrainerByAdmin)
router.get("/all-trainer", trainerController.allTrainer)
router.get("/one-trainer/:id", verifyAccessTokenforAdmin, Validators.forParams(Schema.params), trainerController.oneTrainer)
router.delete("/delete-trainer/:id", verifyAccessTokenforAdmin, Validators.forParams(Schema.params), trainerController.deleteTrainerByAdmin)

// client routes
const clientController = require("../controller/admin/client")

router.post("/create-update-client", verifyAccessTokenforTrainer, Validators.forReqBody(Schema.clientSchema), clientController.createUpdateClient)
router.get("/all-client", clientController.allClient)
router.get("/one-client/:id", verifyAccessTokenforTrainer, Validators.forParams(Schema.params), clientController.oneClient)
router.delete("/delete-client/:id", verifyAccessTokenforTrainer, Validators.forParams(Schema.params), clientController.deleteClient)

// meal items routes
const mealController = require("../controller/admin/mealitems")

router.post("/create-update-mealitem", Validators.forReqBody(Schema.mealItemSchema), mealController.createUpdateMealItem);
router.get("/all-mealitem", mealController.allMealItem);
router.get("/one-mealitem/:id", verifyAccessTokenforTrainer, Validators.forParams(Schema.params), mealController.oneMealItems);
router.get("/trainer-mealitems/:trainer_id", verifyAccessTokenforTrainer, mealController.trainerMealItems)
router.delete("/delete-mealitems/:id", verifyAccessTokenforTrainer, Validators.forParams(Schema.params), mealController.deleteMealItems)

// meal plan routes
const mealPlanController = require("../controller/admin/mealplan");

router.post("/create-update-mealplan", verifyAccessTokenforTrainer, Validators.forReqBody(Schema.mealPlanSchema), mealPlanController.createUpdateMealPlan);
router.get("/all-mealplan", mealPlanController.allMealPlan);
router.get("/one-mealplan/:id", Validators.forParams(Schema.params), mealPlanController.oneMealplan);
router.delete("/delete-mealplan/:id", verifyAccessTokenforTrainer, Validators.forParams(Schema.params), mealPlanController.deleteMealPlan);

// exercises routes
const exercisesController = require("../controller/admin/exercises")

router.post("/create-update-exercises", verifyAccessTokenforTrainer, Validators.forReqBody(Schema.exercisesSchema), exercisesController.createUpdateExercise);
router.get("/all-exercises", exercisesController.allExercises);
router.get("/one-exercise/:id", verifyAccessTokenforTrainer, Validators.forParams(Schema.params), exercisesController.oneExercise);
router.delete("/delete-exercise/:id", verifyAccessTokenforTrainer, Validators.forParams(Schema.params), exercisesController.deleteExercise);

//workout routes
const workOutController = require("../controller/admin/workout")

router.post("/create-update-workout", verifyAccessTokenforTrainer, Validators.forReqBody(Schema.workOutSchema), workOutController.createUpdateWorkOut);
router.get("/all-workout", workOutController.allWorkOut);
router.get("/one-workout/:id", Validators.forParams(Schema.params), workOutController.oneWorkOut);
router.delete("/delete-workout/:id", verifyAccessTokenforTrainer, Validators.forParams(Schema.params), workOutController.deleteWorkOut);

//measurment routes
const measurmentController = require("../controller/admin/measurment")

router.get("/all-measurmentdata", measurmentController.allMeasurmentData);
router.get("/one-measurmentdata/:id", Validators.forParams(Schema.params), measurmentController.oneMeasurmentData);
router.post("/bodypartbydate/:bodyPartId", Validators.forParams(Schema.bodyPartId), Validators.forReqBody(Schema.bodyPartByDate), measurmentController.particularBodyPartData);

module.exports = router;

