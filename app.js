import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectMongoDB } from "./utils/db.js";

dotenv.config({});

const app = express();
const port = process.env.PORT || 4000;

connectMongoDB();

app.use(express.json());
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials:true
    })
);

app.get("/", (_, res) => {
    res.send("working just fine...");
});

app.listen(port, () => {
    console.log(`port is running on ${port}`);
});
