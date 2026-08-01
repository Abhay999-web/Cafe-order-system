import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({

    category: {
        type: String,
        required: true,

    },

    dishName: {
        type: String,
        required: true,
        trim: true

    },
    images: [{
        type: String,

    }],
    price: {
        type: Number,
        required: true,
        min: 0
    },


    availability: {
        type: Boolean,
        default : true,
    }



},{
    timestamps: true
})


export const Food = mongoose.model('Food', foodSchema)