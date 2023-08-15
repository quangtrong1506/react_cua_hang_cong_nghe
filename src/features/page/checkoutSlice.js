import { createSlice } from '@reduxjs/toolkit';

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        products: [],
        discount: {
            code: null,
            amount: 0,
        },
    },
    reducers: {
        initialCheckout: (state, action) => {
            state.products = action.payload.products;
            state.discount = action.payload.discount;
        },
        resetCheckout: (state, action) => {
            state = {
                products: [],
                discount: {
                    code: null,
                    amount: 0,
                },
            };
        },
    },
});

export const { initialCheckout, resetCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
