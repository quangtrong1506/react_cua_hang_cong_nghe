import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        count: 0,
        total: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            let products = state.products.slice();
            let p = products?.find((prod) => prod.id === product.id);
            if (p) p.quantity += product.quantity;
            else products.push(product);
            state.products = products;
            state.total = products.reduce((result, prod) => {
                return result + prod.quantity * prod.price;
            }, 0);
            state.count = products.reduce((result, prod) => {
                return result + prod.quantity;
            }, 0);
        },
        updateCart: (state, action) => {
            const product = action.payload;
            let products = state.products.slice();
            let p = products?.find((prod) => prod.id === product.id);
            if (p) p.quantity = product.quantity;
            else return;
            state.products = products;
            state.total = products.reduce((result, prod) => {
                return result + prod.quantity * prod.price;
            }, 0);
            state.count = products.reduce((result, prod) => {
                return result + prod.quantity;
            }, 0);
        },
        removeProduct: (state, action) => {
            const id = action.payload;
            let products = state.products.slice();
            let index = products?.findIndex((prod) => prod.id === id);
            if (index === -1) return;
            products.splice(index, 1);
            state.products = products;
            state.total = products.reduce((result, prod) => {
                return result + prod.quantity * prod.price;
            }, 0);
            state.count = products.reduce((result, prod) => {
                return result + prod.quantity;
            }, 0);
        },
    },
});

export const { addToCart, updateCart, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
