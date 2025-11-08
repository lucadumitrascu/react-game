import { createSlice } from "@reduxjs/toolkit";

export const enemySlice = createSlice({
    name: "enemy",
    initialState: {
        enemies: [
            {
                id: 1,
                x: 2,
                y: 3,
                hp: 5,
                str: 1,
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
        increaseEnemyX: (state, action) => {
            const { id } = action.payload;
            const enemy = state.enemies.find(e => e.id === id);
            enemy.x += 1;
        },
        increaseEnemyY: (state, action) => {
            const { id } = action.payload;
            const enemy = state.enemies.find(e => e.id === id);
            enemy.y += 1;
        },
        decreaseEnemyX: (state, action) => {
            const { id } = action.payload;
            const enemy = state.enemies.find(e => e.id === id);
            enemy.x -= 1;

        },
        decreaseEnemyY: (state, action) => {
            const { id } = action.payload;
            const enemy = state.enemies.find(e => e.id === id);
            enemy.y -= 1;
        },
        setEnemyStyle: (state, action) => {
            const { id, style } = action.payload;
            const enemy = state.enemies.find(e => e.id === id);
            enemy.enemyStyle = style;
        },
        setEnemyCombatCardStyle: (state, action) => {
            state.enemyCombatCardStyle = action.payload;
        },
        setEnemyCombatAnimStyle: (state, action) => {
            state.enemyCombatAnimStyle = action.payload;
        },
        setEnemyInCombatHp: (state, action) => {
            const { id, hp } = action.payload;
            const enemy = state.enemies.find(e => e.id === id);
            enemy.hp = hp;
        },
        setEnemyHp: (state, action) => {
            state.hp = action.payload;
        },
        setEnemyStr: (state, action) => {
            state.str = action.payload;
        },
        setPaused: (state, action) => {
            state.paused = action.payload;
        },
        addEnemy: (state, action) => {
            state.enemies.push(action.payload);
        },
        removeEnemy: (state, action) => {
            state.enemies = state.enemies.filter(enemy => enemy.id !== action.payload.id);
        },
        removeAllEnemies: (state) => {
            state.enemies = [];
        }
    },
});

export const {
    increaseEnemyX, increaseEnemyY,
    decreaseEnemyX, decreaseEnemyY,
    setEnemyStyle, setEnemyCombatCardStyle, setEnemyCombatAnimStyle,
    setEnemyInCombatHp, setEnemyHp, setEnemyStr,
    setPaused, addEnemy, removeEnemy, removeAllEnemies
} = enemySlice.actions;

export default enemySlice.reducer;
