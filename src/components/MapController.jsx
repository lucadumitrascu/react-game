import { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSelector, useDispatch } from "react-redux";
import { useAddEnemies } from "../hooks/useAddEnemies";
import { useRestartGame } from "../hooks/useRestartGame";
import { useProcessQuest } from "../hooks/useProcessQuest";
import { setLevel } from "../redux/slices/gameSlice";
import { setPlayerX, setPlayerY, setHasChestKey } from "../redux/slices/playerSlice";
import { setEnemyStr, setEnemyHp } from "../redux/slices/enemySlice";
import { setCurrentMapIndex } from "../redux/slices/mapSlice";
import modalStyles from "./Modal.module.css";

function MapController() {
    const MySwal = withReactContent(Swal);

    const dispatch = useDispatch();
    const player = useSelector((state) => state.player);
    const map = useSelector((state) => state.map);
    const game = useSelector((state) => state.game);
    const level = game.level;

    const noEnemies = useSelector(state => state.enemy.enemies.length === 0);
    const addEnemies = useAddEnemies();
    const processQuest = useProcessQuest();
    const restartGame = useRestartGame();

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
        },
        {
            fromMap: 4, exitPos: { x: 8, y: 0 },
            toMap: 5 // END of GAME
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
            if (activeTransition.toMap === 5) {
                MySwal.fire({
                    title: <strong>Congratulations!</strong>,
                    text: "You have completed the game",
                    confirmButtonText: "Restart",
                    buttonsStyling: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    customClass: {
                        popup: modalStyles["base-modal"],
                    },
                }).then(() => {
                    restartGame();
                });
                return;
            }

            if (activeTransition.nextLevel && level === activeTransition.nextLevel - 1) {
                dispatch(setLevel(activeTransition.nextLevel));
                processQuest(activeTransition.nextLevel);
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

    const openChestPositions = [{ x: 5, y: 2 }, { x: 4, y: 1 }, { x: 6, y: 1 }];
    const isAtPosition = (positions, player) => positions.some(pos => pos.x === player.x && pos.y === player.y);

    useEffect(() => {
        const tile = map.maps[map.currentMapIndex][player.y][player.x];

        if (tile === 5 && !player.hasChestKey) {
            dispatch(setHasChestKey(true));
        }

        if (map.currentMapIndex === 0 && isAtPosition(openChestPositions, player) && player.hasChestKey) {
            processQuest(0);
        }
    }, [player.x, player.y, map.currentMapIndex, player.hasChestKey]);
}

export default MapController;
