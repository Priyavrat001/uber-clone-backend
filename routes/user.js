import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { getUser, login, logout, newUser } from "../controller/user.js";

const app = express.Router();


app.get("/me", isAuthenticated, getUser);
app.get("/logout", isAuthenticated, logout);
app.post("/new", newUser);
app.post("/login", login);


export default app;