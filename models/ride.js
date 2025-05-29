import mongoose from "mongoose";

const schema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true, "User id is required"]
    },
    captain:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Captain",
    },

    pickup:{
        type:String,
        required:[true, "Pickup location is required"]
    },

    destination:{
        type:String,
        required:[true, "Destination location is required"]
    },
    fare:{
        type:Number,
        required:[true, "Fare is required"]
    },
    status:{
        type:String,
        enum:["pending", "accepted", "ongoing", "completed", "cancelled"],
        default:"pending"
    },

    duration:{
        type:Number
    }, //in seconds

    distance:{
        type:Number
    }, //in meters
    paymentId:{
        type:String
    },

    orderId:{
        type:String
    },

    signature:{
        type:String
    },

    otp:{
        type:String,
        select:false,
        required:true
    }
});

export const Ride = mongoose.model("Ride", schema);