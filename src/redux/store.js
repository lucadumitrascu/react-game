import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './slices/playerSlice'
import mapReducer from './slices/mapSlice'

export default configureStore({
    reducer: {
        player: playerReducer,
        map: mapReducer,
    },
})