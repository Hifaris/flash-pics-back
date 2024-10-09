const express = require("express")
const router = express.Router()


router.get("/",(req,res)=>{

    res.json('Category')
})


module.exports = router