import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gpt",
    initialState: {
        gptSearchToggle: false,
    },
    reducers: {
        toggleGptSearch: (state, action) => {
            state.gptSearchToggle = action.payload
        }
    }
})

export const { toggleGptSearch } = gptSlice.actions;
export default gptSlice.reducer;
