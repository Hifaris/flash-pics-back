const express = require("express")
const router = express.Router()
const {listUsers} = require("../controllers/user-controller")
const authenticate = require("../middlewares/authen")


router.get("/",authenticate,listUsers)
router.post("/chang-status",)
router.post("/chang-role",)

router.post("/cart",)
router.get("/cart",)
router.delete("/cart",)

router.post("/order",)
router.get("/order",)

module.exports = router