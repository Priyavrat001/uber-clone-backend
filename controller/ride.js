import { Ride } from "../models/ride.js";
import ErrorHandler from "../utils/errorClass.js";
import { getFare, TryCatch, getOtp } from "../utils/features.js";

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

    return res.status(201).json({
        success: true,
        message: "Ride created successfully",
        ride
    });
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

