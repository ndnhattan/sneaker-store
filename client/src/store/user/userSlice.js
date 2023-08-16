import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetCurrent } from "../../apis/";

export const getCurrent = createAsyncThunk(
  "user/current",
  async (data, { rejectWithValue }) => {
    const user = await apiGetCurrent(data);

    if (user.message !== "Success")
      return rejectWithValue("Cannot get current user");

    return user.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    current: null,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.current = null;
      state.token = null;
    },
    changeCurrent: (state, action) => {
      state.current = action.payload;
    },
    changeToken: (state, action) => {
      state.token = action.payload;
    },
    resetState: (state) => {
      state.current = null;
      state.isLoggedIn = false;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrent.fulfilled, (state, action) => {
      state.current = action.payload;
    });
    builder.addCase(getCurrent.rejected, (state) => {
      state.current = null;
      state.isLoggedIn = false;
      state.token = null;
    });
  },
});

export const { login, logout, changeCurrent, changeToken, resetState } =
  userSlice.actions;

export default userSlice.reducer;
