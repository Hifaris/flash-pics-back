const prisma = require("../config/prisma")
const createError = require("../utils/createError")

exports.getAllKeywords= async(req,res,next)=>{
try {
    res.json({message: "All keywords"})
} catch (err) {
    next(err)
}
}

exports.getKeyword= async(req,res,next)=>{
try {
    res.json({message: "Keyword"})
} catch (err) {
    next(err)
}
}
exports.CreateKeyword= async(req,res,next)=>{
try {
    res.json({message: "Create Keyword"})
} catch (err) {
    next(err)
}
}
exports.deleteKeyword= async(req,res,next)=>{
try {
    res.json({message: "Delete Keyword"})
} catch (err) {
    next(err)
}
}