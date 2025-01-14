import { Captain } from "../models/captain.js";
import { cookieOptions, TryCatch } from "../utils/features.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({});

const getCaptain = TryCatch(async (req, res) => {
    const captain = await Captain.findById(req.captain);

    if (!captain) {
        return res.status(400).json({
            success: false,
            message: "Not able to find the user",
        });
    }

    return res.status(200).json({
        success: true,
        captain,
    });
});

const logoutCaptain = TryCatch(async (_, res) => {
    res.cookie("captainToken", "", { ...cookieOptions, maxAge: 0 });

    return res.status(200).json({
        success: true,
        message: "Logout successfully",
    });
});

const newCaptain = TryCatch(async (req, res) => {
    const { firstname, lastname, email, password, vehicle, color, plate, capacity, vehicleType } = req.body;

    if (!firstname || !lastname || !email || !password || !vehicle || !color || !plate || !capacity || !vehicleType) {
        return res.status(400).json({
            success: false,
            message: "Please enter valid field",
        });
    }

    const captain = await Captain.findOne({ email });

    if (captain) {
        return res.status(400).json({
            success: false,
            message: "User exist on this credentials",
        });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await Captain.create({
        fullname: {
            firstname,
            lastname,
        },
        email,
        password: hashPassword,
        vehicle: [{
            color,
            plate,
            capacity,
            vehicleType
        }]
    });

    return res.status(200).json({
        success: true,
        message: "Captain created successfully",
    });
});

const loginCaptain = TryCatch(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please enter valid field",
        });
    }

    const captain = await Captain.findOne({ email }).select("+password");

    if (!captain) {
        return res.status(400).json({
            success: false,
            message: "Captain not exist",
        });
    }

    const isMatchPassword = await bcrypt.compare(password, captain.password);

    if (!isMatchPassword) {
        return res.status(400).json({
            success: false,
            message: "Invalid credentails",
        });
    }

    const token = jwt.sign({ _id: captain._id }, process.env.JWT_CAPTAIN_STR);

    res.cookie("captainToken", token, cookieOptions);

    return res.status(200).json({
        success: true,
        message: "Captain login successully",
    });
});

export {
    getCaptain,
    logoutCaptain,
    newCaptain,
    loginCaptain
};
