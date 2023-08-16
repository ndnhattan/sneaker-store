import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetProducts } from "../../apis/";

export const getProducts = createAsyncThunk(
  "app/products",
  async (data, { rejectWithValue }) => {
    const newProducts = await apiGetProducts({
      limit: 12,
    });
    const saleProducts = await apiGetProducts({
      sort: "-discount",
      limit: 12,
    });

    if (newProducts.message !== "Success" || saleProducts.message !== "Success")
      return rejectWithValue("Cannot get products");

    return [
      newProducts.data,
      saleProducts.data.filter((item) => item.discount > 0),
    ];
  }
);

const appSlice = createSlice({
  name: "app",
  initialState: {
    newProducts: [],
    saleProducts: [],
    isShowModal: false,
    modalChildren: null,
  },
  reducers: {
    setModal: (state, action) => {
      state.isShowModal = action.payload.isShowModal;
      state.modalChildren = action.payload.modalChildren;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.newProducts = action.payload[0];
      state.saleProducts = action.payload[1];
    });
  },
});

export const { setModal } = appSlice.actions;

export default appSlice.reducer;
