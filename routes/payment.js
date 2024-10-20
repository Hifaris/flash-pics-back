const express = require("express")
const {getConfig,createPayment} = require("../controllers/payment-controller")

const router = express.Router()


router.get("/config",getConfig)
router.post("/create-payment-intent",createPayment)


module.exports = router