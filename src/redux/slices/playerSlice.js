import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
    name: "player",
    initialState: {
        x: 5,
        y: 5,
        hp: 5,
        str: 1,
        level: 0,
        playerStyle: "player-down",
        playerCombatCardStyle: "combat-card",
        playerCombatAnimStyle: "",
    },
    reducers: {
        setPlayerX: (state, action) => {
            state.x = action.payload;
        },
        setPlayerY: (state, action) => {
            state.y = action.payload;
        },
        increasePlayerX: (state) => {
            state.x += 1;
        },
        increasePlayerY: (state) => {
            state.y += 1;
        },
        decreasePlayerX: (state) => {
            state.x -= 1;
        },
        decreasePlayerY: (state) => {
            state.y -= 1;
        },
        setPlayerStyle: (state, action) => {
            state.playerStyle = action.payload;
        },
        setPlayerCombatCardStyle: (state, action) => {
            state.playerCombatCardStyle = action.payload;
        },
        setPlayerCombatAnimStyle: (state, action) => {
            state.playerCombatAnimStyle = action.payload;
        },
        setPlayerHp: (state, action) => {
            state.hp = action.payload;
        },
        setPlayerLevel: (state, action) => {
            state.level = action.payload;
        }
    },
});

export const {
    setPlayerX, setPlayerY,
    increasePlayerX, increasePlayerY,
    decreasePlayerX, decreasePlayerY,
    setPlayerStyle, setPlayerCombatCardStyle, setPlayerCombatAnimStyle,
    setPlayerHp, setPlayerLevel
} = playerSlice.actions;

export default playerSlice.reducer;
