import { Ride } from "../models/ride.js";
import ErrorHandler from "../utils/errorClass.js";
import { getFare, TryCatch, getOtp, getCaptainLocation } from "../utils/features.js";
import {sendMessageToSocketId} from "../utils/socketHelper.js"

const newRide = TryCatch(async (req, res, next) => {
    const { pickUp, destination, vechicleType } = req.body;

    if (!pickUp || !destination || !vechicleType) {
        return next(new ErrorHandler("Please provide all the fields", 400));
    }

    const fareObj = await getFare(pickUp, destination);

    let fare = fareObj[vechicleType.toLowerCase()];

    if (!fare) {
        return next(new ErrorHandler("Invalid vehicle type", 400));
    };

    const ride = await Ride.create({
        user: req.user,
        pickUp,
        destination,
        otp:getOtp(4),
        fare
    });


    const user = await Ride.findOne({_id:ride._id}).populate("user");

    res.status(201).json({
        success: true,
        message: "Ride created successfully",
        ride
    });

    getCaptainLocation(pickUp).then((captainData)=>{

        let id = "";

        for(let item of captainData){
            id = item.socketId
        }

        ride.otp = "";

        sendMessageToSocketId(id, {
            event:"new-ride",
            data:user
        })
    }) 
});


const getFarePrice = TryCatch(async(req, res, next) => {
    const {pickUp, destination} = req.query;

    if(!pickUp || !destination) {
        return next(new ErrorHandler("Please provide both pickup and destination", 400));
    };


    const fareObj = await getFare(pickUp, destination);

    if(!fareObj) {
        return next(new ErrorHandler("Unable to calculate fare", 500));
    };

    return res.status(200).json({
        success: true,
        fare: fareObj
    });

})

export {
    newRide,
    getFarePrice
};

