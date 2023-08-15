import { createSlice } from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
    name: 'page',
    initialState: [],
    reducers: {
        initCategories: (state, action) => {
            const categories = action.payload;
            return categories;
        },
    },
});

export const { initCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
