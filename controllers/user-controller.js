const { date } = require("joi")
const prisma = require("../config/prisma")
const createError = require("../utils/createError")

exports.listUsers = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                role: true,
                enable: true
            }
        })
        res.json({ users })
    } catch (err) {
        next(err)
    }
}
exports.changStatus = async (req, res, next) => {
    try {

        const { id, enable } = req.body

        const user = await prisma.user.update({
            where: { id: +id },
            data: { enable: enable }

        })
        res.json("Update status successful")
    } catch (err) {
        next(err)
    }
}
exports.changRole = async (req, res, next) => {
    try {
        const { id, role } = req.body

        const user = await prisma.user.update({
            where: { id: +id },
            data: { role: role }

        })
        res.json("Update role successful")
    } catch (err) {
        next(err)
    }
}
exports.createUserCart = async (req, res, next) => {
    try {
        const { cart } = req.body
        // console.log(req.user.user.id)

        const user = await prisma.user.findFirst({
            where: { id: req.user.user.id }
        })

        //delete old cart item
        await prisma.photoOnCart.deleteMany({
            where: {
                cart: {
                    userId: user.id
                }
            }
        })

        //delete old cart
        await prisma.cart.deleteMany({
            where: { userId: user.id }
        })

        // prepare photo
        let products = cart.map((item) => ({
            photoId: item.id,
            price: item.price
        }))

        //cartTotal
        let cartTotal = products.reduce((acc, prv) => acc + prv.price * 1, 0)

        const newCart = await prisma.cart.create({
            data: {
                cartPhotos: {
                    create: products
                },
                cartTotal: cartTotal,
                userId: user.id
            },

        })
        console.log(products)
        console.log(newCart)
        res.json("user cart")
    } catch (err) {
        next(err)
    }
}
exports.getUserCart = async (req, res, next) => {
    try {

        const cart = await prisma.cart.findFirst({
            where: {
                userId: req.user.user.id
            },
            // select:{
            //     id:true,
            //     cartTotal: true,
            //     userId: true,
            //     cartPhotos:{
            //         select: {photoId: true,price:true}
            //     }

            // }
            include: {
                cartPhotos: {
                    select: {
                        id: true,
                        photoId: true,
                        createdAt: true,
                        price: true,
                        photos: {
                            select: {
                                id: true,
                                title: true,
                                url: true

                            }
                        }

                    },
                }
            }
        })
        res.json({
            CartDetail: cart.cartPhotos,
            cartTotal: cart.cartTotal
        })
    } catch (err) {
        next(err)
    }
}
exports.deleteUserCart = async (req, res, next) => {
    try {

        const cart = await prisma.cart.findFirst({
            where: { userId: req.user.user.id }
        })

        if (!cart) {
            return createError(400, "No cart exist")
        }

        await prisma.photoOnCart.deleteMany({
            where: {
                cartId: cart.id
            }
        })

        const result = await prisma.cart.deleteMany({
            where: { userId: req.user.user.id }
        })
        res.json({ message: "remove success" })
    } catch (err) {
        next(err)
    }
}
exports.saveOrder = async (req, res, next) => {
    try {

        const userCart = await prisma.cart.findFirst({
            where: {
                userId: req.user.user.id
            }, include: {
                cartPhotos: true

            }
        })
      console.log("usercattttt",userCart)
        
        if(!userCart || userCart.cartPhotos.length === 0){
            return createError(400,"Cart is empty")
        }
        
        //create new order
        const order = await prisma.order.create({
            data:{
                photoOrders:{
                    create: userCart.cartPhotos.map((el)=>({
                        photoId: el.photoId,
                        price: el.price,
                    }))
                },
                userId: req.user.user.id,
                total: userCart.cartTotal

            }
        })
       

        // update photo in the cart
        const update = userCart.cartPhotos.map((el)=>({
            where: {id:el.photoId },
            data:{
                sold: {increment: +1}
            }
        }))
        
        

        // console.log("order1111",typeof(order.paymentStatus))

     // check payment status
        if(order.paymentStatus === "CONFIRM"){

            await Promise.all(
                update.map((el)=>prisma.photo.update(el))
            )
        }
        
        
        await prisma.cart.deleteMany({
            where: {userId: req.user.user.id}
        })


        // console.log(userCart)
        res.json({order})
    } catch (err) {
        next(err)
    }
}
exports.getOrder = async (req, res, next) => {
    try {

        const order = await prisma.order.findMany({
            where:{
                userId : req.user.user.id
            },
            include:{
                photoOrders:{
                    include:{
                        photo:true  
                    }
                } 
            }
        })
        
        if(order.length === 0) {
            return createError(400,"No order")
        }

        res.json({order})
    } catch (err) {
        next(err)
    }
}