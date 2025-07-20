import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './AuthSlice/index.js';
import AdminProductSlice from './Admin/product.js'
import adminOrderSlice from './Admin/order-slice/index.js'
import shoppingProductSlice from './Shop/product-slice/index.js'
import shopCartSlice from './Shop/cart-slice/index.js'
import shopAddressSlice from './Shop/address-slice/index.js'
import shopOrderSlice from './Shop/order-slice/index.js'
import shopSearchSlice from './Shop/search-slice/index.js'
import shopReviewSlice from './Shop/review-slice/index.js'
import commonFeatureSlice from './commonSlice/index.js'

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    adminProducts: AdminProductSlice,
    adminOrder: adminOrderSlice,
    shopingProductSlice: shoppingProductSlice,
    shopCart: shopCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
    shopSearch: shopSearchSlice,
    shopReview: shopReviewSlice,
    commonFeature: commonFeatureSlice

  },
});

export default store;
