import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sleep } from '../utils/sleep'
import {
    increaseEnemyX, increaseEnemyY,
    decreaseEnemyX, decreaseEnemyY, setEnemyStyle
} from '../redux/slices/enemySlice'

function EnemyController() {
    const dispatch = useDispatch()
    const enemy = useSelector((state) => state.enemy);
    const enemies = enemy.enemies;
    const paused = enemy.paused;
    const map = useSelector((state) => state.map);
    const currentMap = map.maps[map.currentMapIndex];
    const moveTime = 400;

    useEffect(() => {
        const interval = setInterval(() => {
            enemies.forEach(enemy => {
                if (paused) return;
                const randomMove = Math.floor(Math.random() * 4);
                switch (randomMove) {
                    case 0:
                        handleUpDirection(enemy);
                        break;
                    case 1:
                        handleDownDirection(enemy);
                        break;
                    case 2:
                        handleLeftDirection(enemy);
                        break;
                    case 3:
                        handleRightDirection(enemy);
                        break;
                    default:
                        break;
                }
            });
        }, moveTime);

        return () => clearInterval(interval);
    }, [dispatch, paused, enemies]);

    const handleLeftDirection = async (enemy) => {
        if (currentMap[enemy.y][enemy.x - 1] === 0) {
            dispatch(setEnemyStyle({ id: enemy.id, style: "enemy-left-anim" }));
            await sleep(moveTime);
            dispatch(decreaseEnemyX({ id: enemy.id }));
            dispatch(setEnemyStyle({ id: enemy.id, style: "enemy-left" }));
        }
    };

    const handleRightDirection = async (enemy) => {
        if (currentMap[enemy.y][enemy.x + 1] === 0) {
            dispatch(setEnemyStyle({ id: enemy.id, style: "enemy-right-anim" }));
            await sleep(moveTime);
            dispatch(increaseEnemyX({ id: enemy.id }));
            dispatch(setEnemyStyle({ id: enemy.id, style: "enemy-right" }));
        }
    };

    const handleUpDirection = async (enemy) => {
        if (currentMap[enemy.y - 1][enemy.x] === 0) {
            dispatch(setEnemyStyle({ id: enemy.id, style: "enemy-up-anim" }));
            await sleep(moveTime);
            dispatch(decreaseEnemyY({ id: enemy.id }));
            dispatch(setEnemyStyle({ id: enemy.id, style: "enemy-up" }));
        }
    };

    const handleDownDirection = async (enemy) => {
        if (currentMap[enemy.y + 1][enemy.x] === 0) {
            dispatch(setEnemyStyle({ id: enemy.id, style: "enemy-down-anim" }));
            await sleep(moveTime);
            dispatch(increaseEnemyY({ id: enemy.id }));
            dispatch(setEnemyStyle({ id: enemy.id, style: "enemy-down" }));
        }
    };

    return null;
}

export default EnemyController
