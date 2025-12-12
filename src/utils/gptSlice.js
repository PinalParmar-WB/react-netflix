import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name : "gpt",
    initialState : {
        showGptSearch : false,
        gptMovieNames : null,
        gptMovies : null
    },
    reducers : {
        toggleGptSearchView : (state, action) => {
            state.showGptSearch = !state.showGptSearch;
        },
        addGptMovies : (state, action) => {
            const { names, movies} = action.payload;
            state.gptMovieNames = names;
            state.gptMovies = movies;
        }
    }
});

export const { toggleGptSearchView , addGptMovies} = gptSlice.actions;
export default gptSlice.reducer;