const prisma = require("../config/prisma")
const createError = require("../utils/createError")

exports.getCategory = async(req,res,next)=>{
    try {
        res.json({msg: "ALL Category"})
    } catch (err) {
        next(err)
    }
}
exports.createCategory = async(req,res,next)=>{
    try {
        res.json({msg: "Create successfully"})
    } catch (err) {
        next(err)
    }
}
exports.deleteCategory = async(req,res,next)=>{
    try {
        res.json({msg: "Delete successfully"})
    } catch (err) {
        next(err)
    }
}




