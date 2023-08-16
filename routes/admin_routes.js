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
router.put("/updateTrainerByAdmin/:id",verifyAccessTokenforAdmin, Validators.forParams(Schema.params), Validators.forReqBody(Schema.trainerSchema), trainerController.updateTrainerByAdmin)

// client routes
const clientController = require("../controller/client_controller")

router.post("/createClient",verifyAccessTokenforTrainer, Validators.forReqBody(Schema.clientSchema), clientController.createClient)
router.post("/clientLogin",verifyAccessTokenforTrainer, Validators.forReqBody(Schema.clientLoginSchema), clientController.clientLogin)
router.get("/allClient",verifyAccessTokenforTrainer, clientController.allClient)
router.get("/oneClient/:id",verifyAccessTokenforTrainer, Validators.forParams(Schema.params), clientController.oneClient)
router.delete("/deleteClient/:id",verifyAccessTokenforTrainer, Validators.forParams(Schema.params), clientController.deleteClient)
router.put("/updateClient/:id", Validators.forParams(Schema.params), Validators.forReqBody(Schema.clientSchema), clientController.updateClient)

// meal items routes
const mealController = require("../controller/admin/items_controller")

router.post("/mealItemCreate",verifyAccessTokenforTrainer,Validators.forReqBody(Schema.mealItemSchema), mealController.mealItemCreate);
router.get("/allMealItem",verifyAccessTokenforTrainer, mealController.allMealItem);
router.get("/oneMealItem/:id",verifyAccessTokenforTrainer, Validators.forParams(Schema.params), mealController.oneMealItems);
router.get("/trainerMealItems/:trainer_id",verifyAccessTokenforTrainer, mealController.trainerMealItems)
router.delete("/deleteMealItems/:id",verifyAccessTokenforTrainer, Validators.forParams(Schema.params), mealController.deleteMealItems)
router.put("/updateMealItems/:id", Validators.forParams(Schema.params), Validators.forReqBody(Schema.mealItemSchema), mealController.updateMealItems)

// meal plan routes
const mealPlanController = require("../controller/admin/meal_controller");

router.post("/mealPlanCreate",verifyAccessTokenforTrainer,Validators.forReqBody(Schema.mealPlanSchema), mealPlanController.mealPlanCreate);
router.get("/allMealPlan", mealPlanController.allMealPlan);
router.get("/oneMealplan/:id", Validators.forParams(Schema.params), mealPlanController.oneMealplan);
router.delete("/deleteMealPlan/:id",verifyAccessTokenforTrainer, Validators.forParams(Schema.params), mealPlanController.deleteMealPlan);
router.put("/updateMealPlan/:id", Validators.forParams(Schema.params), Validators.forReqBody(Schema.mealPlanSchema), mealPlanController.updateMealPlan);

// exercises routes
const exercisesController = require("../controller/admin/exercises_controller")

router.post("/exercisesCreate",verifyAccessTokenforTrainer, Validators.forReqBody(Schema.exercisesSchema), exercisesController.exercisesCreate);
router.get("/allExercises",verifyAccessTokenforTrainer, exercisesController.allExercises);
router.get("/oneExercise/:id",verifyAccessTokenforTrainer, Validators.forParams(Schema.params), exercisesController.oneExercise);
router.delete("/deleteExercise/:id",verifyAccessTokenforTrainer, Validators.forParams(Schema.params), exercisesController.deleteExercise);
router.put("/updateExercise/:id",verifyAccessTokenforTrainer, Validators.forParams(Schema.params), Validators.forReqBody(Schema.exercisesSchema), exercisesController.updateExercise);

//workout routes
const workOutController = require("../controller/admin/workOut_controller")

router.post("/workOutCreate",verifyAccessTokenforTrainer, Validators.forReqBody(Schema.workOutSchema), workOutController.workOutCreate);
router.post("/allWorkOut", workOutController.allWorkOut);
router.get("/oneWorkOut/:id", Validators.forParams(Schema.params), workOutController.oneWorkOut);
router.delete("/deleteWorkOut/:id",verifyAccessTokenforTrainer, Validators.forParams(Schema.params), workOutController.deleteWorkOut);
router.put("/updateWorkOut/:id",verifyAccessTokenforTrainer, Validators.forParams(Schema.params), Validators.forReqBody(Schema.workOutSchema), workOutController.updateWorkOut);

//unit routes
const unitController = require("../controller/admin/unit_controller")

router.post("/unitCreate",verifyAccessTokenforTrainer, Validators.forReqBody(Schema.unitSchema), unitController.unitCreate);
router.get("/allUnit",verifyAccessTokenforTrainer, unitController.allUnit);
router.get("/oneUnit/:id",verifyAccessTokenforTrainer, Validators.forParams(Schema.params), unitController.oneUnit);
router.delete("/deleteUnit/:id",verifyAccessTokenforTrainer, Validators.forParams(Schema.params), unitController.deleteUnit);
router.put("/updateUnit/:id",verifyAccessTokenforTrainer, Validators.forParams(Schema.params), Validators.forReqBody(Schema.unitSchema), unitController.updateUnit);

//bodyPart routes
const bodyPartController = require("../controller/admin/bodyPart_controller")

router.post("/bodyPartCreate",verifyAccessTokenforTrainer, Validators.forReqBody(Schema.bodyPartSchema), bodyPartController.bodyPartCreate);
router.get("/allBodyPart",verifyAccessTokenforTrainer, bodyPartController.allBodyPart);
router.get("/oneBodyPart/:id",verifyAccessTokenforTrainer, Validators.forParams(Schema.params), bodyPartController.oneBodyPart);
router.delete("/deleteBodyPart/:id",verifyAccessTokenforTrainer, Validators.forParams(Schema.params), bodyPartController.deleteBodyPart);
router.put("/updateBodyPart/:id",verifyAccessTokenforTrainer, Validators.forParams(Schema.params), Validators.forReqBody(Schema.bodyPartSchema), bodyPartController.updateBodyPart);

//measurment routes
const measurmentController = require("../controller/admin/measurment_controller")

router.post("/measurmentCreate", Validators.forReqBody(Schema.measurmentSchema), measurmentController.measurmentCreate);
router.get("/allMeasurmentData", measurmentController.allMeasurmentData);
router.get("/oneBodyPart/:id", Validators.forParams(Schema.params), measurmentController.oneBodyPartData);
router.get("/bodyPart/:bodyPartId",Validators.forParams(Schema.bodyPartId), measurmentController.bodyPartData);
router.delete("/deleteMeasurmentData/:id", Validators.forParams(Schema.params), measurmentController.deleteMeasurmentData);
router.put("/updateMeasurmentData/:id", Validators.forParams(Schema.params), Validators.forReqBody(Schema.measurmentSchema), measurmentController.updateMeasurmentData);

module.exports = router;