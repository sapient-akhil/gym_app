const mealItemsModel = require("../../model/meal_items_model")
const createError = require("http-errors")

module.exports ={
    mealItemCreate : async (req, res, next) => {
        try {
            const { trainer_id, mealItem, calary, description, ingredients } = req.body
    
            const array = JSON.parse(ingredients);
            // const array1 = JSON.parse(mealItem);
    
            const item = new mealItemsModel({ trainer_id, mealItem, calary, description, ingredients: array })
    
            const itemData = await mealItemsModel.create(item)
    
            res.status(201).send({
                success: true,
                message: "mealItems is created...",
                data: itemData
            })
        } catch (error) {
            next(error)
        }
    },
    
    allMealItem : async (req, res, next) => {
        try {
            const page = parseInt({ active: true }, req.query.page || 1);
            const perPage = 7
    
            const mealItems = await mealItemsModel.find(req.query.search ? {
                active: true,
                $or:
                    [
                        { mealItem: { $regex: req.query.search, $options: 'i' } },
                        { ingredients: { $regex: req.query.search, $options: 'i' } },
                        { calary: { $regex: req.query.search, $options: 'i' } }
                    ]
            } : { active: true })
                .limit(perPage * 1)
                .skip((page - 1) * perPage)
                .exec();
    
            if (mealItems.length === 0) throw createError.NotFound("Not found mealItems..")
    
            res.status(201).send({
                success: true,
                message: "get mealItems",
                data: mealItems
            })
        } catch (error) {
            next(error)
        }
    },
    
    trainerMealItems : async (req, res, next) => {
        try {
    
            const { trainer_id } = req.params
    
            const itemData = await mealItemsModel.findOne({ trainer_id })
            if (!itemData) throw createError.NotFound("ENTER VALID ID..")
    
            res.status(201).send({
                success: true,
                message: "get all mealItems",
                data: itemData
            })
        } catch (error) {
            next(error)
        }
    },
    
    oneMealItems : async (req, res, next) => {
        try {
    
            const { id } = req.params
    
            const itemData = await mealItemsModel.findById(id)
            if (!itemData) throw createError.NotFound("ENTER VALID ID..")
            if (itemData.active === false) throw createError.NotFound("item not found...")
    
            res.status(201).send({
                success: true,
                message: "get all mealItems",
                data: itemData
            })
        } catch (error) {
            next(error)
        }
    },
    deleteMealItems : async (req, res, next) => {
        try {
    
            const { id } = req.params
    
            const itemData = await mealItemsModel.findByIdAndUpdate(id, { active: false })
    
            if (!itemData) throw createError.NotFound("ENTER VALID ID..")
    
            res.status(201).send({
                success: true,
                message: "user delete successfully",
                data: itemData
            })
        } catch (error) {
            next(error)
        }
    },
    
    updateMealItems : async (req, res, next) => {
        try {
    
            const { id } = req.params
    
            const { mealItem, calary, description, ingredients } = req.body
    
            const array = JSON.parse(ingredients)
    
            const itemData = await mealItemsModel.findByIdAndUpdate(id, { $set: { mealItem, calary, description, ingredients: array } })
    
            if (!itemData) throw createError.NotFound("ENTER VALID ID..")
    
            res.status(201).send({
                success: true,
                message: "mealItems update successfully",
                data: itemData
            })
    
        } catch (error) {
            next(error)
        }
    }
}



