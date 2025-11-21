import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLevel } from "../redux/slices/gameSlice";
import { setPlayerX, setPlayerY } from "../redux/slices/playerSlice";
import { setEnemyStr, setEnemyHp } from "../redux/slices/enemySlice";
import { setCurrentMapIndex } from "../redux/slices/mapSlice";
import { useAddEnemies } from "../hooks/useAddEnemies";

function MapController() {
    const dispatch = useDispatch();
    const player = useSelector((state) => state.player);
    const map = useSelector((state) => state.map);
    const game = useSelector((state) => state.game);
    const level = game.level;

    const noEnemies = useSelector(state => state.enemy.enemies.length === 0);
    const addEnemies = useAddEnemies();

    useEffect(() => {
        if (map.currentMapIndex === 0) { // MAP 1
            if (noEnemies && player.x === 8 && player.y === 0) {
                if (level === 0) {
                    dispatch(setLevel(1));
                    dispatch(setEnemyHp(10));
                    dispatch(setEnemyStr(2));
                    addEnemies(2, 10, 2);
                }
                dispatch(setPlayerY(8));
                dispatch(setCurrentMapIndex(1));

            } else if (!noEnemies && player.x === 8 && player.y === 0) {
                dispatch(setPlayerY(1));
            }

        } else if (map.currentMapIndex === 1) { // MAP 2
            if (noEnemies && player.x === 0 && player.y === 1) {
                if (level === 1) {
                    dispatch(setLevel(2));
                    dispatch(setEnemyHp(15));
                    dispatch(setEnemyStr(3));
                    addEnemies(3, 15, 3);
                }
                dispatch(setPlayerX(8));
                dispatch(setCurrentMapIndex(2));
            } else if (!noEnemies && player.x === 0 && player.y === 1) {
                dispatch(setPlayerX(1));
            }

            if (noEnemies && player.x === 8 && player.y === 9) {
                dispatch(setCurrentMapIndex(0));
                dispatch(setPlayerY(1));
            } else if (!noEnemies && player.x === 8 && player.y === 9) {
                dispatch(setPlayerY(8));
            }
            
        } else if (map.currentMapIndex === 2) { // MAP 3
            if (noEnemies && player.x === 1 && player.y === 9) {
                if (level === 2) {
                    dispatch(setLevel(3));
                    dispatch(setEnemyHp(20));
                    dispatch(setEnemyStr(4));
                    addEnemies(4, 20, 4);
                }
                dispatch(setPlayerY(1));
                dispatch(setCurrentMapIndex(3));
            } else if (!noEnemies && player.x === 1 && player.y === 9) {
                dispatch(setPlayerY(8));
            }

            if (noEnemies && player.x === 9 && player.y === 1) {
                dispatch(setCurrentMapIndex(1));
                dispatch(setPlayerX(1));
            } else if (!noEnemies && player.x === 9 && player.y === 1) {
                dispatch(setPlayerX(8));
            }

        } else if (map.currentMapIndex === 3) { // MAP 4
            if (noEnemies && player.x === 9 && player.y === 8) {
                if (level === 3) {
                    dispatch(setLevel(4));
                    dispatch(setEnemyHp(25));
                    dispatch(setEnemyStr(5));
                    addEnemies(5, 25, 5);
                }
                dispatch(setPlayerX(1));
                dispatch(setCurrentMapIndex(4));
            } else if (!noEnemies && player.x === 9 && player.y === 8) {
                dispatch(setPlayerX(8));
            }

            if (noEnemies && player.x === 1 && player.y === 0) {
                if (level === 4) {
                    dispatch(setLevel(5));
                }
                dispatch(setCurrentMapIndex(2));
                dispatch(setPlayerY(8));
            } else if (!noEnemies && player.x === 1 && player.y === 0) {
                dispatch(setPlayerY(1));
            }

        } else if (map.currentMapIndex === 4) { // MAP 5
            if (noEnemies && player.x === 0 && player.y === 8) {
                dispatch(setPlayerX(8));
                dispatch(setCurrentMapIndex(3));
            } else if (!noEnemies && player.x === 0 && player.y === 8) {
                dispatch(setPlayerX(1));
            }
        }
    }, [player.x, player.y, map.currentMapIndex, noEnemies]);
}

export default MapController;
