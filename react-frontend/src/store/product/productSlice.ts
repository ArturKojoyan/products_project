import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProducts, getProductById } from "../../services/product.service";
import type { EmptyObject, ProductT, ProductsT } from "../../types";
import { RootState } from "../";

type Initial = {
  products: ProductsT;
  currentProduct: ProductT | EmptyObject;
  loading: boolean;
  error: string;
};

const initialState: Initial = {
  products: [],
  currentProduct: {},
  loading: false,
  error: "",
};

export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async (userId?: number) => {
    const resp = await getAllProducts(userId);
    return resp.data;
  }
);

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (productId: string) => {
    const resp = await getProductById(productId);
    return resp.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateProducts: (currentState, action: PayloadAction<ProductT>) => {
      currentState.products = currentState.products.map((item) => {
        if (item.id === action.payload.id) {
          item = action.payload;
        }
        return item;
      });
    },
    setProducts: (currentState, action: PayloadAction<ProductT>) => {
      currentState.products.push(action.payload);
    },
    setCurrentDevice: (currentState, action: PayloadAction<ProductT>) => {
      currentState.currentProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    // fetchAllProducts
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = "";
    });
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message || "";
    });

    // fetchProduct
    builder.addCase(fetchProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.currentProduct = action.payload;
      state.error = "";
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.loading = false;
      state.currentProduct = {};
      state.error = action.error.message || "";
    });
  },
});

export const getProducts = (state: RootState) => state.product.products;
export const getCurrentProduct = (state: RootState) =>
  state.product.currentProduct;
export const isLoading = (state: RootState) => state.product.loading;
export const getError = (state: RootState) => state.product.error;

export const { setProducts, updateProducts, setCurrentDevice } =
  productSlice.actions;

export default productSlice.reducer;
