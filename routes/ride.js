import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { newRide } from "../controller/ride.js";

const app = express.Router();

app.post("/new-ride", isAuthenticated, newRide);

export default app;