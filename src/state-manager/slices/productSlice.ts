import axiosInstance from "@/helper/axiosinstance";
import { productType } from "@/pages/product/createproduct";
import { updateproductSchema } from "@/pages/product/update-product";
import { productState } from "@/types/product-types/productSlice";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { z } from "zod";
const initialState: productState = {
  isLoading: false,
  products: [],
};
export const fetchProducts = createAsyncThunk(
  "product/products",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/product", {
        withCredentials: true,
      });
      console.log("this is a response data of the products :", response.data);
      return response.data;
    } catch (error: any) {
      console.log("this is a error :", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const PriceLessThanValue = createAsyncThunk(
  "product/price",
  async (value: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/product/price/${value}`);
      console.log("this is a response data of the products :", response.data);
      return response.data;
    } catch (error: any) {
      console.log("this is a error :", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const RatingHigherThanValue = createAsyncThunk(
  "product/rating",
  async (value: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/product/rating/${value}`);
      console.log("this is a response data of the products :", response.data);
      return response.data;
    } catch (error: any) {
      console.log("this is a error :", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const createProduct = createAsyncThunk(
  "/product/create",
  async (data: productType, { rejectWithValue }) => {
    try {
      console.log("this is a formdata :", data);
      const response = await axiosInstance.post("/product/create", data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "/product/delete",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/product/delete/${productId}`,
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
export const OnlyFeatured = createAsyncThunk(
  "product/featured",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/product/featured");
      console.log("this is a response data of the products :", response.data);
      return response.data;
    } catch (error: any) {
      console.log("this is a error :", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const updateProduct = createAsyncThunk(
  "product/update",
  async (
    formdata: {
      productId: string;
      data: z.infer<typeof updateproductSchema>;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(
        `/product/update/${formdata.productId}`,
        formdata.data,
        {
          withCredentials: true,
        }
      );
      console.log("this is a response data of the products :", response.data);
      return response.data;
    } catch (error: any) {
      console.log("this is a error :", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload?.products;
      state.isLoading = false;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(OnlyFeatured.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(OnlyFeatured.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(OnlyFeatured.fulfilled, (state, action) => {
      state.products = action.payload?.featuredProducts;
      state.isLoading = false;
    });
    builder.addCase(PriceLessThanValue.fulfilled, (state, action) => {
      state.products = action.payload?.products;
      state.isLoading = false;
    });
    builder.addCase(PriceLessThanValue.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(PriceLessThanValue.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(RatingHigherThanValue.fulfilled, (state, action) => {
      state.products = action.payload?.products;
      state.isLoading = false;
    });
    builder.addCase(RatingHigherThanValue.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(RatingHigherThanValue.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteProduct.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createProduct.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createProduct.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProduct.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateProduct.fulfilled, (state) => {
      state.isLoading = false;
    });
  },
});
export const {} = productSlice.actions;
export default productSlice.reducer;
