import express from "express";
import { getCaptain, loginCaptain, logoutCaptain, newCaptain } from "../controller/captain.js";
import { isCaptainAuthenticated } from "../middleware/auth.js";

const app = express.Router();


app.get("/me",isCaptainAuthenticated, getCaptain)
app.get("/logout",isCaptainAuthenticated, logoutCaptain)
app.post("/new", newCaptain);
app.post("/login", loginCaptain);


export default app;