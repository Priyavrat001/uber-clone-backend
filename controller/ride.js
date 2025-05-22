import { Ride } from "../models/ride.js";
import ErrorHandler from "../utils/errorClass.js";
import { getFare, TryCatch } from "../utils/features.js";

const newRide = TryCatch(async (req, res, next) => {
    const { pickup, destination, vechicleType } = req.body;

    if (!pickup || !destination || !vechicleType) {
        return next(new ErrorHandler("Please provide all the fields", 400));
    }

    const fareObj = await getFare(pickup, destination);

    let fare = fareObj[vechicleType.toLowerCase()];

    if (!fare) {
        return next(new ErrorHandler("Invalid vehicle type", 400));
    };

    const ride = await Ride.create({
        user: req.user,
        pickup,
        destination,
        fare
    });

    return res.status(201).json({
        success: true,
        message: "Ride created successfully",
        ride
    });
});

export {
    newRide
};

