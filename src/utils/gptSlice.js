import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gpt",
    initialState: {
        gptSearchToggle: false,
        movieNames: null,
        movieResults: null,
    },
    reducers: {
        toggleGptSearch: (state, action) => {
            state.gptSearchToggle = action.payload;
        },
        addMovieResults: (state, action) => {
            const {movieNames, movieResults} = action.payload;
            state.movieNames = movieNames;
            state.movieResults = movieResults
        }
    }
})

export const { toggleGptSearch, addMovieResults } = gptSlice.actions;
export default gptSlice.reducer;
