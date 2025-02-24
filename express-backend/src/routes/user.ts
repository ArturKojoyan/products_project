import express from "express";
import userController from "../controllers/user";
import checkAuth from "../middlewares/checkAuth";
const router = express.Router();

// user routes
router.get("/", userController.getAllUsers);
router.get("/:userId", checkAuth, userController.getUserById);
router.patch("/:userId/edit", checkAuth, userController.updateUser);

export default router;
