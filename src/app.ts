import express from "express";
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js";
import foodRouter from "./routes/food.routes.js";


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




app.get("/health",(req,res)=>{
    res.status(200).json({
        status: 'ok'
    })
})


export default app