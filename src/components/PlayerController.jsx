import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sleep } from '../utils/sleep'
import {
    increasePlayerX, increasePlayerY,
    decreasePlayerX, decreasePlayerY, setPlayerStyle
} from '../redux/slices/playerSlice'
import styles from './PlayerController.module.css'

function PlayerController() {
    const dispatch = useDispatch()
    const player = useSelector((state) => state.player)
    const map = useSelector((state) => state.map);
    const currentMap = map.maps[map.currentMapIndex];
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

    const walkableTiles = [0, 2, 5];

    const canMoveTo = (x, y) => {
        return walkableTiles.includes(currentMap[y][x]);
    };

    const clicked = useRef(false);
    const handleLeftDirection = async () => {
        if (!clicked.current && canMoveTo(player.x - 1, player.y)) {
            clicked.current = true;
            dispatch(setPlayerStyle("player-left-anim"));
            await sleep(moveTime);
            dispatch(decreasePlayerX());
            dispatch(setPlayerStyle("player-left"));
            clicked.current = false;
        }
    };

    const handleRightDirection = async () => {
        if (!clicked.current && canMoveTo(player.x + 1, player.y)) {
            clicked.current = true;
            dispatch(setPlayerStyle("player-right-anim"));
            await sleep(moveTime);
            dispatch(increasePlayerX());
            dispatch(setPlayerStyle("player-right"));
            clicked.current = false;
        }
    };

    const handleUpDirection = async () => {
        if (!clicked.current && canMoveTo(player.x, player.y - 1)) {
            clicked.current = true;
            dispatch(setPlayerStyle("player-up-anim"));
            await sleep(moveTime);
            dispatch(decreasePlayerY());
            dispatch(setPlayerStyle("player-up"));
            clicked.current = false;
        }
    };

    const handleDownDirection = async () => {
        if (!clicked.current && canMoveTo(player.x, player.y + 1)) {
            clicked.current = true;
            dispatch(setPlayerStyle("player-down-anim"));
            await sleep(moveTime);
            dispatch(increasePlayerY());
            dispatch(setPlayerStyle("player-down"));
            clicked.current = false;
        }
    };

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
