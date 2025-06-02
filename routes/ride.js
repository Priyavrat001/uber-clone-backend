import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { getFarePrice, newRide } from "../controller/ride.js";

const app = express.Router();

app.post("/new-ride", isAuthenticated, newRide);
app.get("/get-fare-price", isAuthenticated, getFarePrice);

export default app;