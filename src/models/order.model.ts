import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,   //Guest account can also place order that is why its false
    },

    guestId: {

        type: String,
        required: false

    },

    guestName: {
        type: String,
        trim: true,
    },

    tableNumber: {
        type: Number,
        required: false
    },


    items: [{
        food: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Food",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,

        },

        priceAtOrder: {  //for price at the time of order, because price can change in future
            type: Number,
            required: true,

        },


    },
    ],

    totalAmount: {
        type: Number,
        required: true,
    },

    status: {
        type: String,
        enum: [
            "pending",
            "accepted",
            "preparing",
            "ready",
            "completed",
            "cancelled",
        ],
        default: "pending",
    },

    orderType: {
        type: String,
        enum: [
            "dine_in",
            "takeaway",
            "delivery"
        ],
        default: "dine_in"
    }

}, {
    timestamps: true,
})

export const Order = mongoose.model("Order", orderSchema)