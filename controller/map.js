import { TryCatch } from "../utils/features.js";

const getCoordinates = TryCatch(async(req, res)=>{

    const {address} = req.body;
    const coordinates = await getCoordinates(address);

    return res.status(200).json({
        succeess:true,
        coordinates
    });
});

export {
    getCoordinates,
}