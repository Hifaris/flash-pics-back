const prisma = require("../config/prisma")
const createError = require("../utils/createError") 


const stripe = require('stripe')(process.env.STRPIE_SECRET_KEY)
//  และนำเข้า Secret Key เพื่อให้เซิร์ฟเวอร์สามารถเชื่อมต่อกับ API ของ Stripe ได้

exports.getConfig = (req,res,next) =>{
    res.send({publishableKey:process.env.STRPIE_PUBLISHABLE_KEY})
}
//ส่ง Publishable Key กลับไปยัง Frontend

exports.createPayment = async(req,res,next) =>{
    try {
        const {amount} = req.body
        if (!amount || amount <= 0) {
            return createError(400,"Invalid amount")
        }
        
        //สร้าง Payment Intent บน Stripe ซึ่งรับข้อมูลจำนวนเงิน (amount) จากผู้ใช้ แล้วส่ง clientSecret กลับไปยัง Frontend
        const paymentIntent = await stripe.paymentIntents.create({
            amount:+amount,
            currency:'thb',
            automatic_payment_methods:{
                enabled:true
            }
        })
  //Payment Intent will sent amount and currency to Stripe API
        res.send({clientSecret : paymentIntent.client_secret})
        //stripe.confirmPayment เพื่อยืนยันการชำระเงิน

        //Backend สร้าง Payment Intent ผ่าน Stripe และส่ง clientSecret กลับไปยัง Frontend
        //clientSecret ในการยืนยันและจัดการการชำระเงินใน Stripe
    } catch (error) {
        next(error)
    }
}