import { Order } from "../models/order.model.js";
import { Food } from "../models/food.model.js";
import type { Request, Response, NextFunction } from "express";


export async function createOrder(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const { tableNumber, items, orderType , } = req.body;


        // Check authentication
        if (!req.user) {
            return res.status(401).json({
                message: "Authorization required"
            });
        }


        // Only client and guest can create order
        if (
            req.user.role !== "client" &&
            req.user.role !== "guest"
        ) {
            return res.status(403).json({
                message: "Only client and guest can place order"
            });
        }


        // Check items
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                message: "Order must contain at least one item"
            });
        }


        const orderItems = [];

        let totalAmount = 0;


        // Process every food item
        for (const item of items) {

            const food = await Food.findById(item.food);


            // Food doesn't exist
            if (!food) {
                return res.status(404).json({
                    message: `Food not found: ${item.food}`
                });
            }


            // Food unavailable
            if (!food.availability) {
                return res.status(400).json({
                    message: `${food.dishName} is currently unavailable`
                });
            }


            // Quantity
            if (
                typeof item.quantity !== "number" ||
                item.quantity < 1
            ) {
                return res.status(400).json({
                    message: "Quantity must be at least 1"
                });
            }


            // Save current food price
            const priceAtOrder = food.price;


            // Calculate item total
            const itemTotal =
                priceAtOrder * item.quantity;


            totalAmount += itemTotal;


            // Prepare item for Order
            orderItems.push({
                food: food._id,
                quantity: item.quantity,
                priceAtOrder: priceAtOrder
            });

        }


        // Prepare order data
        const orderData: any = {

            items: orderItems,

            totalAmount: totalAmount,

            orderType: orderType || "dine_in",

            tableNumber: tableNumber

        };


        // Registered client
        if (req.user.role === "client") {

            if (!req.user.id) {
                return res.status(401).json({
                    message: "User ID not found"
                });
            }

            orderData.user = req.user.id;
        }


        // Guest
        if (req.user.role === "guest") {

            if (!req.user.guestId) {
                return res.status(401).json({
                    message: "Guest ID not found"
                });
            }

            orderData.guestId = req.user.guestId;
        }


        // Create order
        const order = await Order.create(orderData);


        return res.status(201).json({
            message: "Order created successfully",
            order
        });


    } catch (error) {

        next(error);

    }

}

export async function getMyOrders(req:Request , res:Response , next:NextFunction){

    try{
        if(!req.user){
            return res.status(401).json({
                message: "Authorization required"
            })
        }

        //client
        if(req.user.role === "client"){
           const orders = await Order.find({
            guestId: req.user.guestId,

           }).populate("items.food")
           return res.status(200).json({
            orders
           })
        }

        //guest
        if(req.user.role === "guest"){
            const orders = await Order.find({
                user: req.user.guestId,
            }).populate("items.food")
            return res.status(200).json({
            orders
           })
        }

        return res.status(403).json({
            message: "Only client or guest can view their orders"
        })


    }catch(error){
        next(error)
    }



}


export async function getAllOrders(req:Request , res:Response , next:NextFunction){


    try{
    const orders = await Order.find()
    .populate("user", "username email")
    .populate( "items.food")

    return res.status(200).json({
        orders
    })
}catch(error){
    next(error)
}


}

export async function updateOrderStatus(req:Request , res:Response , next:NextFunction){
    try{

        const {status} = req.body

        const order = await Order.findByIdAndUpdate(

            req.params.id,
            {status},
            {
                new: true,
                runValidators: true
            }
        )

        if(!order){
            return res.status(404).json({
                message: "Order not found"
            })
        }

        return res.status(200).json({
            message: "Order status updated successfully",
            order
        })
    }catch(error){
        next(error)
    }
}