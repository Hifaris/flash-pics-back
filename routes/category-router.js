const express = require("express")
const router = express.Router()
const {getCategory,createCategory,getOneCategory,deleteCategory,userGetCategory} = require("../controllers/category-controller")
const { adminCheck, authCheck } = require("../middlewares/authen")
const upload = require("../middlewares/upload")


router.get("/",authCheck,adminCheck,getCategory)
router.get("/home",userGetCategory)
router.get("/:id",authCheck,getOneCategory)
router.post("/",authCheck,adminCheck,upload.single("file"),createCategory)
router.delete("/:id",authCheck,adminCheck,deleteCategory)


module.exports = router