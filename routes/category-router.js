const express = require("express")
const router = express.Router()
const {getCategory,createCategory,getOneCategory,deleteCategory} = require("../controllers/category-controller")


router.get("/",getCategory)
router.get("/:id",getOneCategory)
router.post("/",createCategory)
router.delete("/:id",deleteCategory)


module.exports = router