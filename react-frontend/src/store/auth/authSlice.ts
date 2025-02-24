import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../";
import type { UserT } from "../../types";
import { getUserById } from "../../services/user.service";

type AuthState = {
  isAuth: boolean;
  user: UserT | null;
  loading: boolean;
  error: string;
};

const initialState: AuthState = {
  isAuth: false,
  user: null,
  loading: false,
  error: "",
};

export const fetchProfile = createAsyncThunk(
  "product/fetchProfile",
  async (userId: number) => {
    const resp = await getUserById(userId);
    return resp.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // fetchProfile
    builder.addCase(fetchProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = "";
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.error.message || "";
    });
  },
});

export const isAuthSelector = (state: RootState) => state.auth.isAuth;
export const userSelector = (state: RootState) => state.auth.user;

export const { toggleIsAuth, setUser } = authSlice.actions;

export default authSlice.reducer;
