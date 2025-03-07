import express from "express";
import authController from "../controllers/auth";
const router = express.Router();

// auth routes
router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", authController.logout);
router.post("/verifyToken", authController.verifyToken);

export default router;
