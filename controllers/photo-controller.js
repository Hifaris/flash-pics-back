const { query } = require("express")
const prisma = require("../config/prisma")
const createError = require("../utils/createError")

exports.createPhoto = async (req, res, next) => {
    try {
        const { title, url, price, categoryId, userId } = req.body
        const rs = await prisma.photo.create({
            data: {
                title: title,
                url: url,
                // asset_id,   
                // public_id,    
                // secure_url,
                price: Number(price),
                categoryId: Number(categoryId),
                userId: +userId
            }
        })
        res.json({ result: rs })
    } catch (err) {
        next(err)
    }
}
exports.allPhotos = async (req, res, next) => {
    try {
        const allPhotos = await prisma.photo.findMany({
            select: {
                title: true,
                url: true,
                sold: true,
                category: {
                    select: {
                        name: true
                    }
                }
            }
        })
        res.json({ allPhotos })
    } catch (err) {
        next(err)
    }
}


exports.listPhoto = async (req, res, next) => {
    try {

        const { count } = req.params
        const photos = await prisma.photo.findMany({
            take: +count,
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                title: true,
                url: true,
                createdAt: true,
                category: {
                    select: { name: true }
                }
            },

        })
        res.json({photos})
    } catch (err) {
        next(err)
    }
}
exports.sortPhotos = async (req, res, next) => {
    try {
        const { sort, order, limit } = req.body

        const photos = await prisma.photo.findMany({
            take: limit,
            orderBy: { [sort]: order },
            include: {
                category: true
            }
        })
        res.json({ photos })
    } catch (err) {
        next(err)
    }
}
exports.updatePhoto = async (req, res, next) => {
    try {
        const { id } = req.params
        const { title } = req.body
        const photo = await prisma.photo.update({
            where: {
                id: +id
            },
            data: {
                title: title
            }
        })
        res.json('Update photo')
    } catch (err) {
        next(err)
    }
}
exports.deletePhoto = async (req, res, next) => {
    try {

        const { id } = req.params
        const photo = await prisma.photo.delete({
            where: {
                id: +id
            }
        })
        res.json('Delete photo')
    } catch (err) {
        next(err)
    }
}

const handleQuery = async (req, res, next, query) => {
    try {
        const products = await prisma.photo.findMany({
            where: {
                title: {
                    contains: query,
                }
            },
            include:{
                category:{
                    select:{
                        id: true,
                        name: true
                    }
                }
            }
        })
        res.json(products)
    } catch (err) {
        next(err)
    }
}

const handleCategory = async (req,res,category)=>{
    try {
        const products = await prisma.photo.findMany({
            where:{
                categoryId: {
                    in: category.map((id)=> Number(id))
                }
            },
            include:{
                category:{
                    select:{
                        id: true,
                        name: true
                    }
                }
            }
           
        })
        res.json(products)
    } catch (err) {
        console.log(err)
    }
}

const handlePrice = async(req,res,price)=>{
    try {
        const products = await prisma.photo.findMany({
            where:{
                price:{
                    gte: price[0],
                    lte: price[1]
                }
            },
            include:{
                category:{
                    select: {id:true,name: true}
                }
            }
        })
        res.json({products})
    } catch (err) {
        console.log(err)
    }
}
exports.searchPhotos = async (req, res, next) => {
    try {

        const { query, category, price } = req.body

        if (query) {
            console.log("filter query",query)
            await handleQuery(req,res,query)
        }
        if (category) {
            console.log("search by category",category)
            await handleCategory(req,res,category)
        }
        if (price) {
            console.log("search by price",price)
            await handlePrice(req,res,price)
        }
        

        // res.json('search')
    } catch (err) {
        next(err)
    }
}
