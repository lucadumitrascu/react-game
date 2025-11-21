import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
    name: "game",
    initialState: {
        level: 0,
        introEnded: false,
        outroEnded: false,
    },
    reducers: {
        setLevel: (state, action) => {
            state.level = action.payload;
        },
        setIntroEnded: (state, action) => {
            state.introEnded = action.payload;
        },
        setOutroEnded: (state, action) => {
            state.outroEnded = action.payload;
        }
    },
});

export const {
    setLevel, setIntroEnded, setOutroEnded
} = gameSlice.actions;

export default gameSlice.reducer;