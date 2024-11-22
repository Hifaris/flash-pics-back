
const prisma = require("../config/prisma")
const jwt = require("jsonwebtoken")
const createError = require("../utils/createError")
exports.authCheck = async (req,res,next) => {
  try {
  
    const authHeader = req.headers.authorization
    // console.log(authHeader)

    if (!authHeader) {
        return createError(401, "Token missing")
    }
    

    const token = authHeader.split(" ")[1]
    
    jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
      if(err){
        return createError(400, "Token invalid")
      }
      req.user = decode
      
    })
    const user = await prisma.user.findFirst({
      where:{
        email: req.user.user.email
      }
    })

    // if(!user.enable){
    //   return createError(400,"user invalid")
    // }
    console.log(user)


    next()
} catch (err) {
    next(err)
}
}

exports.adminCheck = async(req,res,next)=>{

  try {
    const {email} = req.user.user
    // console.log(email)
    const adminUser = await prisma.user.findFirst({
      where:{email:email}
    })
    if(!adminUser || adminUser.role !== "ADMIN"){
      return createError(403, "This account can not access")
    }
    console.log("adminnnn",adminUser.role)
    next()
  } catch (err) {
    next(err)
  }
}