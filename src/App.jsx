import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPlayerX, setPlayerY, increasePlayerX, increasePlayerY, decreasePlayerX } from './redux/slices/playerSlice'
import './App.css'

function App() {
  return (
    <div>
      React Game
    </div>
  )
}

export default App
