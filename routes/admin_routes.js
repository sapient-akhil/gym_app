const express = require("express");
const router = express.Router();
const Schema = require("../validation/schema")
const Validators = require("../validation/validation")
const { verifyAccessTokenforAdmin, verifyAccessTokenforTrainer } = require("../helper/token")

//admin routes
const adminController = require("../controller/admin/admin_login")

router.post("/adminLogin", Validators.forReqBody(Schema.loginSchema), adminController.adminLogin)

// trainer routes
const trainerController = require("../controller/admin/trainer_controller")

router.post("/trainerLogin", Validators.forReqBody(Schema.loginSchema), trainerController.trainerLogin)
router.post("/createTrainerByAdmin", Validators.forReqBody(Schema.trainerSchema), trainerController.createTrainerByAdmin)
router.get("/allTrainer", verifyAccessTokenforAdmin, trainerController.allTrainer)
router.get("/oneTrainer/:id", verifyAccessTokenforAdmin, Validators.forParams(Schema.params), trainerController.oneTrainer)
router.delete("/deleteTrainerByAdmin/:id", verifyAccessTokenforAdmin, Validators.forParams(Schema.params), trainerController.deleteTrainerByAdmin)
router.put("/updateTrainerByAdmin/:id", verifyAccessTokenforAdmin, Validators.forParams(Schema.params), Validators.forReqBody(Schema.trainerSchema), trainerController.updateTrainerByAdmin)

// client routes
const clientController = require("../controller/admin/client_controller")

router.post("/createClient", verifyAccessTokenforTrainer, Validators.forReqBody(Schema.clientSchema), clientController.createClient)
// router.post("/clientLogin",verifyAccessTokenforTrainer, Validators.forReqBody(Schema.clientLoginSchema), clientController.clientLogin)
router.get("/allClient", clientController.allClient)
router.get("/oneClient/:id", Validators.forParams(Schema.params), clientController.oneClient)
router.delete("/deleteClient/:id", verifyAccessTokenforTrainer, Validators.forParams(Schema.params), clientController.deleteClient)
router.put("/updateClient/:id", verifyAccessTokenforTrainer, Validators.forParams(Schema.params), Validators.forReqBody(Schema.clientSchema), clientController.updateClient)

// meal items routes
const mealController = require("../controller/admin/mealItems_controller")

router.post("/mealItemCreate", verifyAccessTokenforTrainer, Validators.forReqBody(Schema.mealItemSchema), mealController.mealItemCreate);
router.get("/allMealItem", verifyAccessTokenforTrainer, mealController.allMealItem);
router.get("/oneMealItem/:id", verifyAccessTokenforTrainer, Validators.forParams(Schema.params), mealController.oneMealItems);
router.get("/trainerMealItems/:trainer_id", verifyAccessTokenforTrainer, mealController.trainerMealItems)
router.delete("/deleteMealItems/:id", verifyAccessTokenforTrainer, Validators.forParams(Schema.params), mealController.deleteMealItems)
router.put("/updateMealItems/:id", verifyAccessTokenforTrainer, Validators.forParams(Schema.params), Validators.forReqBody(Schema.mealItemSchema), mealController.updateMealItems)

// meal plan routes
const mealPlanController = require("../controller/admin/mealPlan_controller");

router.post("/mealPlanCreate", Validators.forReqBody(Schema.mealPlanSchema), mealPlanController.mealPlanCreate);
router.get("/allMealPlan", verifyAccessTokenforTrainer, mealPlanController.allMealPlan);
router.get("/oneMealplan/:id", verifyAccessTokenforTrainer, Validators.forParams(Schema.params), mealPlanController.oneMealplan);
router.delete("/deleteMealPlan/:id", verifyAccessTokenforTrainer, Validators.forParams(Schema.params), mealPlanController.deleteMealPlan);
router.put("/updateMealPlan/:id", verifyAccessTokenforTrainer, Validators.forParams(Schema.params), Validators.forReqBody(Schema.mealPlanSchema), mealPlanController.updateMealPlan);

// exercises routes
const exercisesController = require("../controller/admin/exercises_controller")

router.post("/exercisesCreate", verifyAccessTokenforTrainer, Validators.forReqBody(Schema.exercisesSchema), exercisesController.exercisesCreate);
router.get("/allExercises", verifyAccessTokenforTrainer, exercisesController.allExercises);
router.get("/oneExercise/:id", verifyAccessTokenforTrainer, Validators.forParams(Schema.params), exercisesController.oneExercise);
router.delete("/deleteExercise/:id", verifyAccessTokenforTrainer, Validators.forParams(Schema.params), exercisesController.deleteExercise);
router.put("/updateExercise/:id", verifyAccessTokenforTrainer, Validators.forParams(Schema.params), Validators.forReqBody(Schema.exercisesSchema), exercisesController.updateExercise);

//workout routes
const workOutController = require("../controller/admin/workOut_controller")

router.post("/workOutCreate", verifyAccessTokenforTrainer, Validators.forReqBody(Schema.workOutSchema), workOutController.workOutCreate);
router.get("/allWorkOut", verifyAccessTokenforTrainer, workOutController.allWorkOut);
router.get("/oneWorkOut/:id", verifyAccessTokenforTrainer, Validators.forParams(Schema.params), workOutController.oneWorkOut);
router.delete("/deleteWorkOut/:id", verifyAccessTokenforTrainer, Validators.forParams(Schema.params), workOutController.deleteWorkOut);
router.put("/updateWorkOut/:id", verifyAccessTokenforTrainer, Validators.forParams(Schema.params), Validators.forReqBody(Schema.workOutSchema), workOutController.updateWorkOut);

//measurment routes
const measurmentController = require("../controller/admin/measurment_controller")

router.get("/allMeasurmentData", measurmentController.allMeasurmentData);
router.get("/oneMeasurmentData/:id", Validators.forParams(Schema.params), measurmentController.oneBodyPartData);
router.get("/particularPart/:bodyPartId", Validators.forParams(Schema.bodyPartId), measurmentController.bodyPartData);

module.exports = router;

