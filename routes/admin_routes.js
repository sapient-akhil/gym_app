const express = require("express");
const router = express.Router();
const Schema = require("../validation/schema")
const Validators = require("../validation/validation")
const { verifyAccessTokenforAdmin, verifyAccessTokenforTrainer } = require("../helper/token")

// trainer routes
const adminController = require("../controller/admin/trainer_controller")

router.post("/createTrainerByAdmin", Validators(Schema.trainerSchema), adminController.createTrainerByAdmin)
router.post("/adminLogin", Validators(Schema.loginSchema), adminController.adminLogin)
router.get("/allTrainer", verifyAccessTokenforAdmin, adminController.allTrainer)
router.get("/oneTrainer/:id", adminController.oneTrainer)
router.delete("/deleteTrainerByAdmin/:id", verifyAccessTokenforAdmin, adminController.deleteTrainerByAdmin)
// router.get("/createMealPlanForClient", adminController.getClientMeal)

// client routes
const clientController = require("../controller/client_controller")

router.post("/createClient", Validators(Schema.clientSchema), clientController.createClient)
router.post("/clientLogin", Validators(Schema.clientLoginSchema), clientController.clientLogin)
router.get("/allClient", clientController.allClient)
router.get("/oneClient/:id", clientController.oneClient)
router.delete("/deleteClient/:id", clientController.deleteClient)
router.put("/updateClient/:id", Validators(Schema.clientSchema), clientController.updateClient)

// meal items routes
const mealController = require("../controller/admin/items_controller")

router.post("/mealItemCreate", Validators(Schema.mealItemSchema), mealController.mealItemCreate);
router.get("/allMealItem", mealController.allMealItem);
router.get("/oneMealItems/:id", mealController.oneMealItems);
router.delete("/deleteMealItems/:id", mealController.deleteMealItems)
router.put("/updateMealItems/:id", Validators(Schema.mealItemSchema), mealController.updateMealItems)

// meal plan routes
const mealPlanController = require("../controller/admin/meal_controller");

router.post("/mealPlanCreate", Validators(Schema.mealPlanSchema), mealPlanController.mealPlanCreate);
router.get("/allMealPlan", mealPlanController.allMealPlan);
router.get("/oneMealplan/:id", mealPlanController.oneMealplan);
router.delete("/deleteMealPlan/:id", mealPlanController.deleteMealPlan);
router.put("/updateMealPlan/:id", Validators(Schema.mealPlanSchema), mealPlanController.updateMealPlan);

// exercises routes
const exercisesController = require("../controller/admin/exercises_controller")

router.post("/exercisesCreate", Validators(Schema.exercisesSchema), exercisesController.exercisesCreate);
router.get("/allExercises", exercisesController.allExercises);
router.get("/oneExercise/:id", exercisesController.oneExercise);
router.delete("/deleteExercise/:id", exercisesController.deleteExercise);
router.put("/updateExercise/:id", Validators(Schema.exercisesSchema), exercisesController.updateExercise);

//workout routes
const workOutController = require("../controller/admin/workOut_controller")

router.post("/workOutCreate", Validators(Schema.workOutSchema), workOutController.workOutCreate);
router.get("/allWorkOut", workOutController.allWorkOut);
router.get("/oneWorkOut/:id", workOutController.oneWorkOut);
router.delete("/deleteWorkOut/:id", workOutController.deleteWorkOut);
router.put("/updateWorkOut/:id", Validators(Schema.workOutSchema), workOutController.updateWorkOut);

//bodyWeight routes
const bodyWeightController = require("../controller/admin/bodyWeight_controller")

router.post("/bodyWeight", Validators(Schema.bodyWeightSchema), bodyWeightController.bodyWeightCreate);
router.get("/getAllBodyWeight", bodyWeightController.getAllBodyWeight);
router.post("/findWeightByDateRang", bodyWeightController.findWeightByDateRang);
router.post("/deleteBodyWeight", bodyWeightController.deleteBodyWeight);
router.post("/updateBodyWeight", Validators(Schema.bodyWeightSchema), bodyWeightController.updateBodyWeight);

//waist routes
const waistController = require("../controller/admin/waist_controller")

router.post("/waistCreate", Validators(Schema.waistSchema), waistController.waistCreate);
router.get("/getAllWaistData", waistController.getAllWaistData);
router.post("/findWaistByDateRang", waistController.findWaistByDateRang);
router.delete("/deleteWaistPlan/:id", waistController.deleteWaistPlan);
router.put("/updateWaistPlan/:id", Validators(Schema.waistSchema), waistController.updateWaistPlan);

//bodyFat routes
const bodyFatController = require("../controller/admin/bodyFat_controller")

router.post("/bodyFatCreate", Validators(Schema.bodyFatSchema), bodyFatController.bodyFatCreate);
router.get("/getAllBodyFat", bodyFatController.getAllBodyFat);
router.post("/findFatByDateRang", bodyFatController.findFatByDateRang);
router.delete("/deleteBodyFat/:id", bodyFatController.deleteBodyFat);
router.put("/updateBodyFat/:id", Validators(Schema.bodyFatSchema), bodyFatController.updateBodyFat);

//shoulder routes
const shoulderController = require("../controller/admin/shoulder_controller")

router.post("/shoulderCreate", Validators(Schema.shoulderSchema), shoulderController.shoulderCreate);
router.get("/getAllshoulderData", shoulderController.getAllshoulderData);
router.post("/findshoulderByDateRang", shoulderController.findshoulderByDateRang);
router.delete("/deleteshoulder", shoulderController.deleteshoulder);
router.put("/updateshoulder", Validators(Schema.shoulderSchema), shoulderController.updateshoulder);

module.exports = router;