const express = require("express")
const router = express.Router()


router.get("/keyword")
router.get("/keyword/:keywordId")
router.post("/keyword")
router.delete("/keyword/:id")

module.exports = router