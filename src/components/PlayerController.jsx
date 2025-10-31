import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    increasePlayerX, increasePlayerY,
    decreasePlayerX, decreasePlayerY, setPlayerStyle
} from '../redux/slices/playerSlice'
import styles from './PlayerController.module.css'

function PlayerController() {
    const dispatch = useDispatch()
    const player = useSelector((state) => state.player)
    const map = useSelector((state) => state.map.maps);
    const moveTime = 400;
    
    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case "ArrowUp":
                    handleUpDirection();
                    break;
                case "ArrowDown":
                    handleDownDirection();
                    break;
                case "ArrowLeft":
                    handleLeftDirection();
                    break;
                case "ArrowRight":
                    handleRightDirection();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [dispatch, player]);

    const clicked = useRef(false);
    const handleLeftDirection = () => {
        if (!clicked.current && (map[player.playerY][player.playerX - 1] === 0)) {
            clicked.current = true;
            dispatch(setPlayerStyle("player-left-anim"));
            setTimeout(() => {
                dispatch(decreasePlayerX());
                dispatch(setPlayerStyle("player-left"));
                clicked.current = false;
            }, moveTime);
        }
    }

    const handleRightDirection = () => {
        if (!clicked.current && (map[player.playerY][player.playerX + 1] === 0)) {
            clicked.current = true;
            dispatch(setPlayerStyle("player-right-anim"));
            setTimeout(() => {
                dispatch(increasePlayerX());
                dispatch(setPlayerStyle("player-right"));
                clicked.current = false;
            }, moveTime);
        }
    }

    const handleUpDirection = () => {
        if (!clicked.current && (map[player.playerY - 1][player.playerX] === 0)) {
            clicked.current = true;
            dispatch(setPlayerStyle("player-up-anim"));
            setTimeout(() => {
                dispatch(decreasePlayerY());
                dispatch(setPlayerStyle("player-up"));
                clicked.current = false;
            }, moveTime);
        }
    }

    const handleDownDirection = () => {
        if (!clicked.current && (map[player.playerY + 1][player.playerX] === 0)) {
            clicked.current = true;
            dispatch(setPlayerStyle("player-down-anim"));
            setTimeout(() => {
                dispatch(increasePlayerY());
                dispatch(setPlayerStyle("player-down"));
                clicked.current = false;
            }, moveTime);
        }
    }

    return (
        <div className={styles["player-controller-container"]}>
            <div className={styles["player-controls"]}>
                <div>
                    <button onClick={() => handleUpDirection()}> &#5123;</button>
                </div>
                <div>
                    <button onClick={() => handleLeftDirection()}> &#5130;</button>
                    <button onClick={() => handleDownDirection()}> &#5121;</button>
                    <button onClick={() => handleRightDirection()}> &#5125;</button>
                </div>
            </div>
        </div>
    )
}

export default PlayerController
