import express from "express";
import { isAuthenticated, isCaptainAuthenticated } from "../middleware/auth.js";
import { confirmRide, getFarePrice, newRide } from "../controller/ride.js";

const app = express.Router();

app.post("/new-ride", isAuthenticated, newRide);
app.get("/get-fare-price", isAuthenticated, getFarePrice);
app.post("/confirm-ride", isCaptainAuthenticated, confirmRide);

export default app;