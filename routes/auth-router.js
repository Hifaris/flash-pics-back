const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth-controller")
const {authCheck,adminCheck} = require("../middlewares/authen")
const {registerValidator,loginValidator} = require("../middlewares/validator")

router.post("/register",registerValidator,authController.register)
router.post("/login",loginValidator,authController.login)
router.patch("/update",authCheck,authController.updateUser)
router.post("/current-user",authCheck,authController.currentUser)
router.post("/current-admin",authCheck,adminCheck,authController.currentAdmin)
router.get("/allUsers",authController.getUser)
router.get("/me",authCheck,authController.getMe)

module.exports = router