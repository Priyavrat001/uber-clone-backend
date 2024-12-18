import dotenv from "dotenv";
import axios from "axios";

dotenv.config({});

const cookieOptions = {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "stric",
    httpOnly: true,
    secure: process.env.NODE_ENV
}

const TryCatch = (func)=> async(req, res, next)=>{
    try {
        await func(req, res, next);
    } catch (error) {
        next(error)
    }
};

// adding map features here

const getAddressCoordinate = TryCatch(async(address)=>{
    const api_key = process.env.GEOCLOUD_API;

    if(!address){
        throw new Error("Please provide the address");
    };

    const url = `https://geocode.maps.co/search?q=${address}&api_key=${api_key}`;

    const response = await axios.get(url);

    if(response.data.status !== "OK"){
        return res.status(400).json({
            success:false,
            message:"Not able to fetch the address"
        });
    }else{
        const location = response.data.results[0].geometry.location;

        return{
            ltd: location.ltd,
            lng: location.lng
        }
    };
})

export {
    TryCatch,
    cookieOptions,
    getAddressCoordinate,
}