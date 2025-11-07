import { createSlice } from "@reduxjs/toolkit";

export const enemySlice = createSlice({
    name: "enemy",
    initialState: {
        enemies: [
            {
                id: 1,
                hp: 5,
                str: 1,
                enemyX: 2,
                enemyY: 3,
                enemyStyle: "enemy-down",
            },
            {
                id: 2,
                hp: 5,
                str: 1,
                enemyX: 5,
                enemyY: 6,
                enemyStyle: "enemy-down",
            },
            {
                id: 3,
                hp: 5,
                str: 1,
                enemyX: 7,
                enemyY: 8,
                enemyStyle: "enemy-down",
            },
        ],
        hp: 5,
        str: 1,
        enemyCombatCardStyle: "combat-card",
        enemyCombatAnimStyle: "",
        paused: false,
    },
    reducers: {
        setEnemyX: (state, action) => {
            const { id, value } = action.payload;
            const enemy = state.enemies.find(e => e.id === id);
            if (enemy && value > 0 && value < 9) {
                enemy.enemyX = value;
            }
        },
        setEnemyY: (state, action) => {
            const { id, value } = action.payload;
            const enemy = state.enemies.find(e => e.id === id);
            if (enemy && value > 0 && value < 9) {
                enemy.enemyY = value;
            }
        },
        increaseEnemyX: (state, action) => {
            const { id } = action.payload;
            const enemy = state.enemies.find(e => e.id === id);
            if (enemy && enemy.enemyX < 8) {
                enemy.enemyX += 1;
            }
        },
        increaseEnemyY: (state, action) => {
            const { id } = action.payload;
            const enemy = state.enemies.find(e => e.id === id);
            if (enemy && enemy.enemyY < 8) {
                enemy.enemyY += 1;
            }
        },
        decreaseEnemyX: (state, action) => {
            const { id } = action.payload;
            const enemy = state.enemies.find(e => e.id === id);
            if (enemy && enemy.enemyX > 1) {
                enemy.enemyX -= 1;
            }
        },
        decreaseEnemyY: (state, action) => {
            const { id } = action.payload;
            const enemy = state.enemies.find(e => e.id === id);
            if (enemy && enemy.enemyY > 1) {
                enemy.enemyY -= 1;
            }
        },
        setEnemyStyle: (state, action) => {
            const { id, style } = action.payload;
            const enemy = state.enemies.find(e => e.id === id);
            if (enemy) {
                enemy.enemyStyle = style;
            }
        },
        setEnemyCombatCardStyle: (state, action) => {
            state.enemyCombatCardStyle = action.payload;
        },
        setEnemyCombatAnimStyle: (state, action) => {
            state.enemyCombatAnimStyle = action.payload;
        },
        setEnemyHp: (state, action) => {
            const { id, hp } = action.payload;
            const enemy = state.enemies.find(e => e.id === id);
            if (enemy) {
                enemy.hp = hp;
            }
        },
        setPaused: (state, action) => {
            state.paused = action.payload;
        },
        removeEnemy: (state, action) => {
            state.enemies = state.enemies.filter(enemy => enemy.id !== action.payload.id);
        },
    },
});

export const {
    setEnemyX, setEnemyY,
    increaseEnemyX, increaseEnemyY,
    decreaseEnemyX, decreaseEnemyY,
    setEnemyStyle, setEnemyCombatCardStyle, setEnemyCombatAnimStyle,
    setEnemyHp, setPaused, removeEnemy,
} = enemySlice.actions;

export default enemySlice.reducer;
