const express = require("express")
const router = express.Router()
const {getCategory,createCategory,deleteCategory} = require("../controllers/category-controller")


router.get("/",getCategory)
router.post("/",createCategory)
router.delete("/:categoryId",deleteCategory)


module.exports = router