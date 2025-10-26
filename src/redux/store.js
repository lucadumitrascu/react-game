import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './slices/playerSlice'

export default configureStore({
    reducer: {
        player: playerReducer,
    },
})