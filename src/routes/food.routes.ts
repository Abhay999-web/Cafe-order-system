import express from "express";
import { allowRoles } from "../middleware/role.middleware.js";
import { identifyUser } from '../middleware/auth.middleware.js'
import {createFood, getAllFood, getSingleFood, updateFood, deleteFood} from "../controllers/food.controller.js"
import { upload } from "../middleware/upload.middleware.js";


const foodRouter = express.Router()


// For User and Guest
foodRouter.get("/", getAllFood);

foodRouter.get("/:id", getSingleFood);



// For Admin only  
// User should be admin 
foodRouter.post("/", identifyUser , allowRoles("admin") ,upload.single("image") , createFood) 

foodRouter.put("/:id", identifyUser , allowRoles("admin") , updateFood)

foodRouter.delete("/:id", identifyUser , allowRoles("admin") , deleteFood)







export default foodRouter;