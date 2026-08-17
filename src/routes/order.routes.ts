import express from "express";
import { identifyUser } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";
import { getAllOrders, getMyOrders, updateOrderStatus } from "../controllers/order.controller.js";




const orderRouter = express.Router()

/* For User */
orderRouter.get("/my-order", identifyUser, allowRoles("client", "guest"), getMyOrders )


/* For Admin */
orderRouter.get("/", identifyUser, allowRoles("admin"), getAllOrders )


orderRouter.patch("/:id", identifyUser, allowRoles("admin"), updateOrderStatus )



export default orderRouter