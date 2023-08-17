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
            state.discount = action.payload.discount || {
                code: null,
                amount: 0,
            };
        },
        addToCheckout: (state, action) => {
            const product = action.payload;
            let products = state.products.slice();
            let p = products?.find((prod) => prod.id === product.id);
            if (p) p.quantity += product.quantity;
            else products.push(product);
            state.products = products;
        },
        updateCheckout: (state, action) => {
            const product = action.payload;
            let products = state.products.slice();
            let p = products?.find((prod) => prod.id === product.id);
            if (p) p.quantity = product.quantity;
            else return;
            state.products = products;
        },
        removeProductInCheckOut: (state, action) => {
            const id = action.payload;
            let products = state.products.slice();
            let index = products?.findIndex((prod) => prod.id === id);
            if (index === -1) return;
            products.splice(index, 1);
            state.products = products;
        },
        resetCheckout: (state, action) => {
            state.products = [];
            state.discount = {
                code: null,
                amount: 0,
            };
        },
    },
});

export const {
    initialCheckout,
    resetCheckout,
    addToCheckout,
    removeProductInCheckOut,
    updateCheckout,
} = checkoutSlice.actions;
export default checkoutSlice.reducer;
