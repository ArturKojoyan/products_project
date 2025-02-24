import type { Request, Response } from "express";
import userService from "../service/user";
import userRepo from "../repositories/user.repository";

async function getAllUsers(_req: Request, res: Response) {
  const users = await userService.getUsers();
  res.sendStatus(200).json(users);
}

async function getUserById(req: Request, res: Response) {
  const { userId } = req.params;
  if (!userId) {
    res.sendStatus(400).json("userId is not provided!");
    return;
  }
  const user = await userRepo.getUserById(+userId);
  res.sendStatus(200).json(user);
  return;
}

async function updateUser(req: Request, res: Response) {
  const payload = req.body;
  const { userId } = req.params;
  if (Object.keys(payload).length === 0) {
    res.status(400).json({ error: "Request payload must not be empty!" });
    return;
  }
  if (!userId) {
    res.status(400).json({ error: "userId is required!" });
    return;
  }

  try {
    const updatedUser = await userRepo.update(+userId, payload);
    res
      .status(200)
      .json({ message: "User data successfully updated!", updatedUser });
  } catch (error) {
    res.sendStatus(500).json({ error });
  }
}

export default { getAllUsers, getUserById, updateUser };
