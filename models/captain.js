import mongoose from "mongoose";

const schema = new mongoose.Schema({
    firstname: {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required:true
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },

    status: {
        type: String,
        enum: [ 'active', 'inactive' ],
        default: 'inactive',
    },

    vehicle: [{
        color: {
            type: String,
            required: true,
        },
        plate: {
            type: String,
            required: true,
        },
        capacity: {
            type: Number,
            required: true,
        },
        vehicleType: {
            type: String,
            required: true,
            enum: [ 'car', 'motorcycle', 'auto' ],
        }
    }],

    location: {
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
});

export const Captain = mongoose.model("Captain", schema);