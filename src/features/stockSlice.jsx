import { createSlice } from "@reduxjs/toolkit";

const stockSlice = createSlice({
  name: "stock",

  initialState: {
    purchases: null,
    sales: null,
    brands: null,
    firms: null,
    products: null,
    categories: null,
    loading: false,
    error: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    // firms, sales, purchases vs birçok kısım için veri çekme yapacağız. her biri için ayrı ayrı kod yazmamak için burada payloadı data ve url olarak böldük. değişken olduğu için de [url] şeklinde yazdık.
    getSuccess: (state, { payload: { data, url } }) => {
      state.loading = false;
      state[url] = data;
    },

    getProCatBrandSuccess: (state, { payload }) => {
      state.loading = false
      state.products = payload[0]
      state.categories = payload[1]
      state.brands = payload[2]
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, getSuccess, fetchFail, getProCatBrandSuccess } =
  stockSlice.actions
export default stockSlice.reducer
