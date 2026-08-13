import express from "express";
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js";
import foodRouter from "./routes/food.routes.js";
import orderRouter from "./routes/order.routes.js";


const app = express()

/* Json body */
app.use(express.json())

/* Cookies */
app.use(cookieParser())


/* Routes */

/* Authetication */
app.use("/api/auth", authRouter)


/* Food  */

app.use("/api/food", foodRouter)


/* Order */
app.use("api/order", orderRouter)



app.get("/health",(req,res)=>{
    res.status(200).json({
        status: 'ok'
    })
})


export default app