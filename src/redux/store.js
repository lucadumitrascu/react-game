import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './slices/gameSlice';
import mapReducer from './slices/mapSlice';
import playerReducer from './slices/playerSlice';
import enemyReducer from './slices/enemySlice';

export default configureStore({
    reducer: {
        game: gameReducer,
        map: mapReducer,
        player: playerReducer,
        enemy: enemyReducer,
    },
})