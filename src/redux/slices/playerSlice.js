import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
    name: "player",
    initialState: {
        playerX: 5,
        playerY: 5,
        hp: 5,
        str: 1,
        playerStyle: "player-down",
        playerCardStyle: "combat-card",
    },
    reducers: {
        setPlayerHp: (state, action) => {
            state.hp = action.payload;
        },
        setPlayerX: (state, action) => {
            const value = action.payload;
            if (value > 0 && value < 9) {
                state.playerX = value;
            }
        },
        setPlayerY: (state, action) => {
            const value = action.payload;
            if (value > 0 && value < 9) {
                state.playerY = value;
            }
        },
        increasePlayerX: (state) => {
            if (state.playerX < 8) state.playerX += 1;
        },
        increasePlayerY: (state) => {
            if (state.playerY < 8) state.playerY += 1;
        },
        decreasePlayerX: (state) => {
            if (state.playerX > 1) state.playerX -= 1;
        },
        decreasePlayerY: (state) => {
            if (state.playerY > 1) state.playerY -= 1;
        },
        setPlayerStyle: (state, action) => {
            state.playerStyle = action.payload;
        },
        setPlayerCardStyle: (state, action) => {
            state.playerCardStyle = action.payload;
        }
    },
});

export const {
    setPlayerHp,
    setPlayerX, setPlayerY,
    increasePlayerX, increasePlayerY,
    decreasePlayerX, decreasePlayerY,
    setPlayerStyle, setPlayerCardStyle
} = playerSlice.actions;

export default playerSlice.reducer;
