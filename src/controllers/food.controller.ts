import { Food } from "../models/food.model.js";
import type { Request, Response, NextFunction } from 'express'
import imagekit from "../config/imagekit.js";



export async function createFood(req: Request, res: Response, next: NextFunction) {

    try {

        const { description, dishName, category, price, availability } = req.body;


         if(!req.file){
            return res.status(400).json({
                message: "Image is required"

            })
        }

         const uploadImage = await imagekit.files.upload({
            file: req.file.buffer.toString("base64"),
            fileName: req.file.originalname,
            folder: "/cafe/foods"
        })

        if(!uploadImage.url){
            return res.status(500).json({
                message: "Image upload failed"
            })
        }

        const food = await Food.create({
            description,
            images: [uploadImage.url],  //uploading data direct to imagekit 
            dishName,
            category,
            price,
            availability
        })

    
        res.status(201).json({
            message: "Food created successfully",
            food
           
        })

    } catch (error) {
        next(error) 
    }

}


export async function getAllFood(req: Request, res: Response, next: NextFunction) {

    try {

        const foods = await Food.find()

        res.status(200).json({
            message: "Foods fetch successfully",
            foods
        })



    } catch (error) {
        next(error)

    }

}


export async function getSingleFood(req: Request, res: Response, next: NextFunction) {

    
    try{
        const singleFood = await Food.findById(req.params.id)

         if (!singleFood) {
        return res.status(404).json({
            message: "Food is not found"
        })
    }

    res.status(200).json({
        message: "Food fetched successfully",
        food: singleFood
    })

    }catch(error){

        next(error)

    }

}


export async function updateFood(req: Request, res: Response, next: NextFunction) {

    try{

        const updateFood = await Food.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
        if(!updateFood){
            return res.status(404).json({
                message: "Food not found"
            })
        }

        return res.status(200).json({
            message: "Food updated successfully",
           food: updateFood
        })

    }catch(error){
        next(error)
    }



}

export async function deleteFood(req: Request, res: Response, next: NextFunction){

    try{

        const deleteFood = await Food.findByIdAndDelete(
            req.params.id
        )


        if(!deleteFood){
            return res.status(404).json({
                message: "Food not found"
            })
        }

        return res.status(200).json({
            message: "Food deleted successfully",
            deleteFood
        })
    


    }catch(error){
        next(error)
    }

}