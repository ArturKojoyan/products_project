import type { AxiosResponse } from "axios";
import api from "../http";
import { UserT } from "../types";

type UpdateResp = {
  message: string;
  updatedUser: UserT;
}

export async function getUserById(userId: number) {
  return api.get(`/users/${userId}`);
}

export async function updateProfile(
  userId: number,
  payload: UserT
): Promise<AxiosResponse<UpdateResp>> {
  return api.patch(`/users/${userId}/edit`, payload);
}
