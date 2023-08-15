import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../features/page/categorySlice';
import cartReducer from '../features/page/cartSlice';
import checkoutReducer from '../features/page/checkoutSlice';

export default configureStore({
    reducer: {
        categories: categoryReducer,
        cart: cartReducer,
        checkout: checkoutReducer,
    },
});
