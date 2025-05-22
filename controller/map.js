import ErrorHandler from "../utils/errorClass.js";
import { getAddressCoordinate, getDrivingDistanceTime, TryCatch } from "../utils/features.js";
import dotenv from "dotenv";

dotenv.config({});

const getCoordinates = async (req, res) => {

    const { address } = req.query;
    const coordinates = await getAddressCoordinate(address);

    return res.status(200).json({
        success: true,
        coordinates
    });
};

const getDistanceTime = TryCatch(async (req, res, next) => {
    const { origin, destination } = req.query;

    if (!origin || !destination) {
        return next(new ErrorHandler(400, "Origin and destination are required"));
    }

    const originCoordinates = await getAddressCoordinate(origin);
    const destinationCoordinates = await getAddressCoordinate(destination);

    const { distance, duration } = await getDrivingDistanceTime(
        originCoordinates,
        destinationCoordinates
    );

    return res.status(200).json({
        success: true,
        origin,
        destination,
        distanceInKm: (distance / 1000).toFixed(2),
        durationInMin: (duration / 60).toFixed(2),
    });
});

const getSuggestedLocations = TryCatch(async (req, res, next) => {
    const { address } = req.query;

    if (!address) {
        return next(new ErrorHandler(400, "Address is required"));
    }

    const coordinates = await getAddressCoordinate(address);

    if (!coordinates) {
        return next(new ErrorHandler(400, "Coordinates not found"));
    }

    const { lat, lng } = coordinates;
    const url = `https://api.openrouteservice.org/geocode/reverse?point.lat=${lat}&point.lon=${lng}`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: process.env.ORS_API_KEY,
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    return res.status(200).json({
        success: true,
        data,
    });
});

export {
    getCoordinates,
    getDistanceTime,
    getSuggestedLocations
};

