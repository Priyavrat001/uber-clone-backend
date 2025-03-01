import dotenv from "dotenv";
import { TryCatch } from "../utils/features.js";
import jwt from "jsonwebtoken";

dotenv.config({});

const isAuthenticated = TryCatch(async(req, res, next)=>{
    const token = req.cookies["authToken"];

    if(!token){
        return res.status(400).json({
            success:false,
            message:"Please login for access this route"
        });

    }
    const decodeToken = jwt.verify(token, process.env.JWT_STR);

    req.user = decodeToken._id;

    next();
});

const isCaptainAuthenticated = TryCatch(async(req, res, next)=>{
    const token = req.cookies["captainToken"];


    if(!token){
        return res.status(401).json({
            success:false,
            message:"Unautherized user"
        });
    };

    const decodeData = jwt.verify(token, process.env.JWT_CAPTAIN_STR);
    // Todo saving dicode data in req.captain._id;
    req.captain = decodeData._id;

    next();

});


export {
    isAuthenticated,
    isCaptainAuthenticated
};