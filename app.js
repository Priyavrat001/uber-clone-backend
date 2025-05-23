import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectMongoDB } from "./utils/db.js";
import userRoute from "./routes/user.js"
import captainRoute from "./routes/captain.js"
import errorMiddleware from "./middleware/error.js";
import mapRoute from "./routes/map.js";
import rideRoute from "./routes/ride.js";

dotenv.config({});

const app = express();
const port = process.env.PORT || 4000;

connectMongoDB();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials:true
    })
);

app.get("/", (_, res) => {
    res.send("working just fine...");
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/captain", captainRoute);
app.use("/api/v1/map", mapRoute);
app.use("/api/v1/ride", rideRoute);

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`port is running on ${port}`);
});
