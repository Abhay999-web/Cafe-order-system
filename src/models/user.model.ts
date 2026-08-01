import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,

    },
    
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true

    },

    role: {
        type: String,
        enum: ['client', 'admin'],
        default: 'client'
    },

    isGuest:{
        type: Boolean,
        default: false
    }


}, {
    timestamps: true
})

export const userModel = mongoose.model('User', userSchema)