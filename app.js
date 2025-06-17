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
import {createServer} from "http";
import { Server } from "socket.io";
import { corsOptions } from "./utils/features.js";
import { User } from "./models/user.js";
import { Captain } from "./models/captain.js";

dotenv.config({});

const app = express();
const port = process.env.PORT || 4000;

const server = createServer(app);
export const io = new Server(server, {
    cors:corsOptions
})

connectMongoDB();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors(corsOptions)
);

app.get("/", (_, res) => {
    res.send("working just fine...");
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/captain", captainRoute);
app.use("/api/v1/map", mapRoute);
app.use("/api/v1/ride", rideRoute);


io.on("connection", (socket)=>{

    socket.on("join", async(data)=>{
        const {userId, userType} = data;

        if(userType === "user"){
            await User.findByIdAndUpdate(userId,{
                socketId:socket.id
            })
        }else if(userType === "captain"){
            await Captain.findByIdAndUpdate(userId, {
                socketId: socket.id
            })
        };
    });

    socket.on("update-location-captain", async(data)=>{
        const {captainId, location} = data;

        if(!location || !location.ltd || !location.lng){
            socket.emit("error", {
                message: "Invalid location data"
            });
        }

        await Captain.findByIdAndUpdate(captainId, {
            location: {
                ltd:location.ltd,
                lng:location.lng
            }
        });
    })

    socket.on("disconnect", ()=>{
        console.log("user disconnected");
    })
})

app.use(errorMiddleware);

server.listen(port, () => {
    console.log(`port is running on ${port}`);
});
