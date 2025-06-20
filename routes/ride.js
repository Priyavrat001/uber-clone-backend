import express from "express";
import { isAuthenticated, isCaptainAuthenticated } from "../middleware/auth.js";
import { confirmRide, getFarePrice, newRide, startRide } from "../controller/ride.js";

const app = express.Router();

app.post("/new-ride", isAuthenticated, newRide);
app.get("/get-fare-price", isAuthenticated, getFarePrice);
app.post("/confirm-ride", isCaptainAuthenticated, confirmRide);
app.post("/start-ride", isCaptainAuthenticated, startRide);

export default app;