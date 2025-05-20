import dotenv from "dotenv";
import axios from "axios";
import ErrorHandler from "./errorClass.js";

dotenv.config({});

const cookieOptions = {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
    httpOnly: true,
    secure: process.env.NODE_ENV
}

const TryCatch = (func) => async (req, res, next) => {
    try {
        await func(req, res, next);
    } catch (error) {
        next(error)
    }
};

// adding map features here

const getAddressCoordinate = async (address) => {
    const api_key = process.env.GEOCLOUD_API;

    if (!address) return new ErrorHandler(400, "Not able to find the address");

    const url = `https://geocode.maps.co/search?q=${encodeURIComponent(address)}&api_key=${api_key}`;

    const response = await axios.get(url);

    const data = response.data;

    if (!data || data.length === 0) {
        throw new Error("Address not found");
    }

    const location = data[0];

    return {
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lon),
    };
};

// calculating distance and time using open route service
// using ORS API
const getDrivingDistanceTime = async (origin, destination) => {
  const apiKey = process.env.ORS_API_KEY;

  const url = `https://api.openrouteservice.org/v2/directions/driving-car`;
  const body = {
    coordinates: [
      [origin.lng, origin.lat],
      [destination.lng, destination.lat],
    ],
  };

  const headers = {
    Authorization: apiKey,
    "Content-Type": "application/json",
  };

  const response = await axios.post(url, body, { headers });
  const data = response.data;

  const distance = data.routes[0].summary.distance; // in meters
  const duration = data.routes[0].summary.duration; // in seconds

  return {
    distance,
    duration,
  };
};

export {
    TryCatch,
    cookieOptions,
    getAddressCoordinate,
    getDrivingDistanceTime
}