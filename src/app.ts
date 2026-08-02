import express from "express";
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js";


const app = express()

/* Json body */
app.use(express.json())

/* Cookies */
app.use(cookieParser())


/* Routes */

app.use("/api/auth", authRouter)

app.get("/health",(req,res)=>{
    res.status(200).json({
        status: 'ok'
    })
})


export default app