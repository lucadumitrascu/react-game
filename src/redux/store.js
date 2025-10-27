import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './slices/playerSlice'
import enemyReducer from './slices/enemySlice'
import mapReducer from './slices/mapSlice'

export default configureStore({
    reducer: {
        player: playerReducer,
        enemy: enemyReducer,
        map: mapReducer,
    },
})