const express = require("express")
const router = express.Router()
const adminController = require("../controllers/admin-controller")
const {authCheck,adminCheck} = require("../middlewares/authen")

router.patch("/order-status",authCheck,adminCheck,adminController.changeOrderStatus)
router.get("/orders",authCheck,adminCheck,adminController.getOrders)

module.exports = router