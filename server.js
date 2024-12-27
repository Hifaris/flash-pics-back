require("dotenv").config()
const express = require("express")
const app = express()
const authRouter = require("./routes/auth-router")
const categoryRouter = require("./routes/category-router")
const productRouter = require("./routes/photo-router")
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user")
const paymentRouter = require("./routes/payment")
const notFoundHandler = require("./middlewares/not-found")
const errorHandler = require("./middlewares/error")
const morgan = require("morgan")
const cors = require("cors")

app.use(express.json())
app.use(morgan('dev'))
app.use(cors({
    origin:[process.env.ORIGIN,process.env.DEVELOP],
    method:['GET','POST','PATCH','PUT','DELETE'],
    credentials:true,
}))

app.use("/auth",authRouter)
app.use("/category",categoryRouter)
app.use("/photo",productRouter)
app.use("/user",userRouter)
app.use("/admin",adminRouter)
app.use("/payment",paymentRouter)

app.use(errorHandler)
app.use("*",notFoundHandler)

const port = process.env.PORT || 8000
app.listen(port,()=>console.log("Server is running on",port))