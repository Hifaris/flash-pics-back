const prisma = require("../config/prisma")
const createError = require("../utils/createError")

exports.changeOrderStatus = async(req,res,next)=>{
    try {

        const {orderId, paymentStatus} = req.body
        const orderUpdate = await prisma.order.update({
            where:{
              id:orderId
            },
            data:{
                paymentStatus: paymentStatus
            }
        })
         
       res.json({orderUpdate}) 
    } catch (err) {
        next(err)
    }
}
exports.getOrders = async(req,res,next)=>{
    try {

        const orders = await prisma.order.findMany({
            include:{
                photoOrders:{
                    include:{
                        photo:true
                    }
                },
                // userId:{
                //     select:{
                //         id: true,
                //         firstName: true,
                //         email: true
                //     }
                // }
            }
        })
        res.json({orders}) 
    } catch (err) {
        next(err)
    }
}