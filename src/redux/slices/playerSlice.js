import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
    name: "player",
    initialState: {
        playerX: 5,
        playerY: 5
    },
    reducers: {
        setPlayerX: (state, action) => {
            state.playerX = action.payload;
        },
        setPlayerY: (state, action) => {
            state.playerY = action.payload;
        },
        increasePlayerX: (state) => {
            state.playerX += 1;
        },
        increasePlayerY: (state) => {
            state.playerY += 1;
        },
        decreasePlayerX: (state) => {
            state.playerX -= 1;
        },
        decreasePlayerY: (state) => {
            state.playerY -= 1;
        }
    },
});

export const { setPlayerX, setPlayerY, increasePlayerX, increasePlayerY, decreasePlayerX, decreasePlayerY } = playerSlice.actions;

export default playerSlice.reducer;
