const express = require("express")
const router = express.Router()
const {listUsers,changStatus,changRole,createUserCart,getUserCart,deleteUserCart,saveOrder,getOrder} = require("../controllers/user-controller")
const {authCheck,adminCheck} = require("../middlewares/authen")



router.get("/",authCheck,adminCheck,listUsers)
router.post("/chang-status",authCheck,adminCheck,changStatus)
router.post("/chang-role",authCheck,adminCheck,changRole)

router.post("/cart",authCheck,createUserCart)
router.get("/cart",authCheck,getUserCart)
router.delete("/cart",authCheck,deleteUserCart)

router.post("/order",authCheck,saveOrder)
router.get("/order",authCheck,getOrder)

module.exports = router