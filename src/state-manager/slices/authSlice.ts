import { authState } from "@/types/auth-types/authstate";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/helper/axiosinstance";
import { RegistrationFormSchema } from "@/pages/auth/register";
import { z } from "zod";
import { LoginSchema } from "@/pages/auth/login";

const initialState: authState = {
  isLoading: false,
  isLoggedIn: false,
  userinfo: null,
};
export const Register = createAsyncThunk(
  "auth/register",
  async (formData: RegistrationFormSchema, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/register", formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const Login = createAsyncThunk(
  "auth/login",
  async (formData: z.infer<typeof LoginSchema>, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/login", formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      console.log("this is a error while user is login", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const Logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/user/logout",
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(Register.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.userinfo = action.payload.user;
      state.isLoading = false;
    });
    builder.addCase(Register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(Register.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(Login.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(Login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(Login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.userinfo = action.payload.user;
      state.isLoading = false;
    });
    builder.addCase(Logout.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(Logout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(Logout.fulfilled, (state) => {
      state.isLoggedIn = false;

      state.isLoading = false;
    });
  },
});
export const {} = authSlice.actions;
export default authSlice.reducer;
