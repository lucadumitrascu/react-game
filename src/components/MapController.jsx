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

    const mapTransitions = [
        {
            fromMap: 0, exitPos: { x: 8, y: 0 },
            toMap: 1, spawnPos: { x: 8, y: 8 },
            nextLevel: 1, enemyConfig: { hp: 10, str: 2, count: 2 }
        },
        {
            fromMap: 1, exitPos: { x: 0, y: 1 },
            toMap: 2, spawnPos: { x: 8, y: 1 },
            nextLevel: 2, enemyConfig: { hp: 15, str: 3, count: 3 }
        },
        {
            fromMap: 1, exitPos: { x: 8, y: 9 },
            toMap: 0, spawnPos: { x: 8, y: 1 }
        },
        {
            fromMap: 2, exitPos: { x: 1, y: 9 },
            toMap: 3, spawnPos: { x: 1, y: 1 },
            nextLevel: 3, enemyConfig: { hp: 20, str: 4, count: 4 }
        },
        {
            fromMap: 2, exitPos: { x: 9, y: 1 },
            toMap: 1, spawnPos: { x: 1, y: 1 }
        },
        {
            fromMap: 3, exitPos: { x: 9, y: 8 },
            toMap: 4, spawnPos: { x: 1, y: 8 },
            nextLevel: 4, enemyConfig: { hp: 25, str: 5, count: 5 }
        },
        {
            fromMap: 3, exitPos: { x: 1, y: 0 },
            toMap: 2, spawnPos: { x: 1, y: 8 },
            nextLevel: 5
        },
        {
            fromMap: 4, exitPos: { x: 0, y: 8 },
            toMap: 3, spawnPos: { x: 8, y: 8 }
        }
    ];

    useEffect(() => {
        const activeTransition = mapTransitions.find(t => t.fromMap === map.currentMapIndex &&
            player.x === t.exitPos.x && player.y === t.exitPos.y);

        if (!activeTransition) return;

        if (noEnemies) {
            if (activeTransition.nextLevel && level === activeTransition.nextLevel - 1) {
                dispatch(setLevel(activeTransition.nextLevel));
                if (activeTransition.enemyConfig) {
                    const enemyConfig = activeTransition.enemyConfig;
                    dispatch(setEnemyHp(enemyConfig.hp));
                    dispatch(setEnemyStr(enemyConfig.str));
                    addEnemies(enemyConfig.count, enemyConfig.hp, enemyConfig.str);
                }
            }

            dispatch(setPlayerX(activeTransition.spawnPos.x));
            dispatch(setPlayerY(activeTransition.spawnPos.y));
            dispatch(setCurrentMapIndex(activeTransition.toMap));
        } else {
            if (activeTransition.exitPos.x === 0) {
                dispatch(setPlayerX(1));
                return;
            } else if (activeTransition.exitPos.x === 9) {
                dispatch(setPlayerX(8));
                return;
            }
            if (activeTransition.exitPos.y === 0) {
                dispatch(setPlayerY(1));
                return;
            } else if (activeTransition.exitPos.y === 9) {
                dispatch(setPlayerY(8));
                return;
            }
        }
    }, [player.x, player.y, map.currentMapIndex, noEnemies, level]);
}

export default MapController;
