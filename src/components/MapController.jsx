import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPlayerX, setPlayerY, setPlayerLevel } from "../redux/slices/playerSlice";
import { setEnemyStr, setEnemyHp } from "../redux/slices/enemySlice";
import { setCurrentMapIndex } from "../redux/slices/mapSlice";
import { useAddEnemies } from "../hooks/useAddEnemies";

function MapController() {
    const dispatch = useDispatch();
    const player = useSelector((state) => state.player);
    const enemy = useSelector((state) => state.enemy);
    const map = useSelector((state) => state.map);
    const level = player.level;

    const addEnemies = useAddEnemies();

    useEffect(() => {
        const noEnemies = enemy.enemies.length === 0;
        if (map.currentMapIndex === 0) { // MAP 1
            if (noEnemies && player.x === 8 && player.y === 0) {
                if (level === 0) {
                    dispatch(setPlayerLevel(1));
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
                    dispatch(setPlayerLevel(2));
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
                    dispatch(setPlayerLevel(3));
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
                    dispatch(setPlayerLevel(4));
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
                    dispatch(setPlayerLevel(5));
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
    }, [player.x, player.y, map.currentMapIndex, enemy.enemies.length]);
}

export default MapController;
