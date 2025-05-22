import express from "express";
import { getCoordinates, getDistanceTime, getSuggestedLocations } from "../controller/map.js";
import { isAuthenticated } from "../middleware/auth.js";

const app = express.Router();

app.get("/get-cordinates",isAuthenticated, getCoordinates);
app.get("/get-distance",isAuthenticated, getDistanceTime);
app.get("/get-suggested-locations",isAuthenticated, getSuggestedLocations);

export default app;