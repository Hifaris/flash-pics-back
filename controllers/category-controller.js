const prisma = require("../config/prisma")
const createError = require("../utils/createError")


exports.userGetCategory = async(req,res,next)=>{
    try {
        const allCategory = await prisma.category.findMany({
            select:{
                id: true,
                name: true,
                createdAt: true
            }
        })

        res.json({allCategory})
    } catch (err) {
        next(err)
    }
}
exports.getCategory = async(req,res,next)=>{
    try {
        const allCategory = await prisma.category.findMany({
            select:{
                id: true,
                name: true,
                createdAt: true
            }
        })

        res.json({allCategory})
    } catch (err) {
        next(err)
    }
}
exports.getOneCategory = async(req,res,next)=>{
    try {
         const {id} = req.params
        
        const oneCategory = await prisma.category.findFirst({
            where:{
            id: +id
            },
            include:{
               Photos: {
                select:{
                    id: true,
                    title: true,
                    url: true
                }
               }
            }
        })

        res.json({result: oneCategory})
    } catch (err) {
        next(err)
    }
}
exports.createCategory = async(req,res,next)=>{
    try {

        const {name} = req.body

        const crateCategory = await prisma.category.findFirst({
            where:{
                name:name
            }
        })
        if(crateCategory) {
            return createError(400, "This category already exist")
        }
        const category = await prisma.category.create({
            data:{
                name:name
            }
        })
        res.json({msg: "Create successfully"})
    } catch (err) {
        next(err)
    }
}
exports.deleteCategory = async(req,res,next)=>{

    try {
        
        const {id} = req.params

        const checkCategory = await prisma.category.findFirst({
            where:{
                id: +id
            }
        })

        if(!checkCategory) {
            return createError(400, "This category not exist")
        }

        const result = await prisma.category.delete({
            where:{
                id:+id
            }
        })
        res.json({msg: "Delete successfully"})
    } catch (err) {
        next(err)
    }
}




