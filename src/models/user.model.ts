import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        minlength: 3,
        trim: true,
        required ():boolean{
            return this.role !== 'guest'
        }

    },
    
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        sparse: true,
        required ():boolean{
            return this.role !== 'guest'
        }


    },
    password: {
        type: String,
        minlength: 6,
        select: false,
        required ():boolean{
            return this.role !== 'guest'
        }

    },

    role: {
        type: String,
        enum: ['client', 'admin'],
        default: 'client'
    },

   


}, {
    timestamps: true
})

export const userModel = mongoose.model('User', userSchema)