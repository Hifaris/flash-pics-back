const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth-controller")
const authen = require("../middlewares/authen")
const {registerValidator,loginValidator} = require("../middlewares/validator")

router.post("/register",registerValidator,authController.register)
router.post("/login",loginValidator,authController.login)
router.post("/current-user",authen,authController.currentUser)
router.post("/current-admin",authController.currentAdmin)
router.get("/allUsers",authController.getUser)
router.get("/me",authen,authController.getMe)

module.exports = router