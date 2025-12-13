import express from "express";
import { login, logout, register } from "../controllers/userController.js";
import { hasToken } from "../middleware/hasToken.js";
import { verification } from "../middleware/tokenVerification.js";

const userRoute = express.Router();

userRoute.post("/register", register);
userRoute.get("/verify", verification);
userRoute.post("/login", login);
userRoute.delete("/logout", hasToken, logout);

export default userRoute;