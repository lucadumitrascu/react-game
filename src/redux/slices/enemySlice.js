import { createSlice } from "@reduxjs/toolkit";

export const enemySlice = createSlice({
    name: "enemy",
    initialState: {
        enemyX: 1,
        enemyY: 1,
        hp: 5,
        str: 1,
        enemyStyle: "enemy-down",
        paused: false,
    },
    reducers: {
        setEnemyX: (state, action) => {
            const value = action.payload;
            if (value > 0 && value < 9) {
                state.enemyX = value;
            }
        },
        setEnemyY: (state, action) => {
            const value = action.payload;
            if (value > 0 && value < 9) {
                state.enemyY = value;
            }
        },
        increaseEnemyX: (state) => {
            if (state.enemyX < 8) state.enemyX += 1;
        },
        increaseEnemyY: (state) => {
            if (state.enemyY < 8) state.enemyY += 1;
        },
        decreaseEnemyX: (state) => {
            if (state.enemyX > 1) state.enemyX -= 1;
        },
        decreaseEnemyY: (state) => {
            if (state.enemyY > 1) state.enemyY -= 1;
        },
        setEnemyStyle: (state, action) => {
            state.enemyStyle = action.payload;
        },
        setEnemyMoveTime: (state, action) => {
            state.enemyMoveTime = action.payload;
        },
        setPaused: (state, action) => {
            state.paused = action.payload;
        }
    },
});

export const {
    setEnemyX, setEnemyY,
    increaseEnemyX, increaseEnemyY,
    decreaseEnemyX, decreaseEnemyY,
    setEnemyStyle, setPaused
} = enemySlice.actions;

export default enemySlice.reducer;
