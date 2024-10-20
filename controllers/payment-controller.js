const prisma = require("../config/prisma")
const createError = require("../utils/createError") 


const stripe = require('stripe')(process.env.STRPIE_SECRET_KEY)

exports.getConfig = (req,res,next) =>{
    res.send({publishableKey:process.env.STRPIE_PUBLISHABLE_KEY})
}

exports.createPayment = async(req,res,next) =>{
    try {
    const {amount} = req.body
    if (!amount || amount <= 0) {
        return createError(400,"Invalid amount")
    }

        const paymentIntent = await stripe.paymentIntents.create({
            amount:+amount,
            currency:'thb',
            automatic_payment_methods:{
                enabled:true
            }
        })

        res.send({clientSecret : paymentIntent.client_secret})
    } catch (error) {
        next(error)
    }
}