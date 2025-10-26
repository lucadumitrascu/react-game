import { useDispatch, useSelector } from 'react-redux'
import {
    setPlayerX, setPlayerY, increasePlayerX,
    increasePlayerY, decreasePlayerX, decreasePlayerY
} from '../redux/slices/playerSlice'
import styles from './PlayerController.module.css'

function PlayerController() {
    const dispatch = useDispatch()
    const player = useSelector((state) => state.player)

    return (
        <>
            <div className={styles["player-position-card"]}>
                <h2>Player Position</h2>
                <p>X: {player.playerX} | Y: {player.playerY}</p>
            </div>
            <div className={styles["player-controls"]}>
                <div>
                    <button onClick={() => dispatch(increasePlayerY())}> &#5123;</button>
                </div>
                <div>
                    <button onClick={() => dispatch(decreasePlayerX())}> &#5130;</button>
                    <button onClick={() => dispatch(decreasePlayerY())}> &#5121;</button>
                    <button onClick={() => dispatch(increasePlayerX())}> &#5125;</button>
                </div>
            </div>
        </>
    )
}

export default PlayerController
