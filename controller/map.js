import ErrorHandler from "../utils/errorClass.js";
import { getAddressCoordinate, getDrivingDistanceTime, TryCatch } from "../utils/features.js";

const getCoordinates = async (req, res) => {

    const { address } = req.query;
    const coordinates = await getAddressCoordinate(address);

    return res.status(200).json({
        success: true,
        coordinates
    });
};

const getDistanceTime = TryCatch(async (req, res) => {
    const { origin, destination } = req.query;

    if (!origin || !destination) {
        return new ErrorHandler(400, "Origin and destination are required");
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

const getSuggestedLocations = async (req, res) => {}

export {
    getCoordinates,
    getDistanceTime,
    getSuggestedLocations
};
