const prisma = require("../config/prisma")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const createError = require("../utils/createError")


exports.register = async(req,res)=>{
    try {
        const {email,password,confirmPassword} = req.input

        //1 Validate req.body****joi
        
        //2 check in db email already exist
        const user = await prisma.user.findUnique({
            where:{
                email: email
            }
        })
        if(user){
            return createError(400,"User is already exist")
        }
        
        //3 encrypt password with bcryptjs
        const hashPassword = await bcrypt.hash(password,10)
        // console.log(hashPassword)

        //4 register success
        const newUser = await prisma.user.create({
            data:{
                email,
                password:hashPassword,
            }
        })
        console.log(newUser)
        res.json(`Register successfully ${newUser.email}`)
    } catch (err) {
         next(err)
    }
}
exports.login = async(req,res,next)=>{
    try {
        const {email,password} = req.input
         //1 validate with ****joi
         const user = await prisma.user.findUnique({
            where:{
                email: email
            }
         })
        //  console.log(user)
         
         //2 check in Db already exist
         if(!user){
            return createError(400,"Email or password is invalid")
         }
         //3 check password is match

         const isMatch = await bcrypt.compare(password,user.password)
        //  console.log(isMatch)

         if(!isMatch){
            return createError(400,"Password is not match!!")
         }
         //4 create Payload
         const payload ={
            user:{
                id: user.id,
                email: user.email,
                role: user.role
            }
         }
         //5 Generate token
         const genToken = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn: "30d"
         })
         
         res.json({
             user: payload.user,
             token: genToken
            })


    } catch (err) {
        next(err)
    }
}

exports.getUser = async(req,res,next) =>{
    try {
          const rs = await prisma.user.findMany({
            select: {
                id: true,
                email:true,
                createdAt: true
            }
        })
        res.json({ result: rs })
    } catch (err) {
        next(err)
    }
}
exports.getMe = async(req,res,next) =>{
    try {
       
        console.log(req.user)
        const email= req.user.user.email
        const userDetail = await prisma.user.findFirst({
            where:{
                email: email
            },
            select:{
                id: true,
                email: true,
                role: true
            }

        })
        res.json({ userDetail })
    } catch (err) {
        next(err)
    }
}
