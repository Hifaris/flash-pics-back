
const prisma = require("../config/prisma")
const jwt = require("jsonwebtoken")
const createError = require("../utils/createError")
module.exports = async (req,res,next) => {
  try {
  
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return createError(401, "Token missing")
    }

    const token = authHeader.split(" ")[1]
    
    jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
      if(err){
        return createError(400, "Token invalid")
      }
      console.log(decode)
      req.user = decode

    })

    next()
} catch (err) {
    next(err)
}
}