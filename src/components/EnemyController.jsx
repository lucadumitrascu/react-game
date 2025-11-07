import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    increaseEnemyX, increaseEnemyY,
    decreaseEnemyX, decreaseEnemyY, setEnemyStyle
} from '../redux/slices/enemySlice'

function EnemyController() {
    const dispatch = useDispatch()
    const paused = useSelector((state) => state.enemy.paused);
    const enemies = useSelector((state) => state.enemy.enemies);
    const map = useSelector((state) => state.map.maps);
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

    const handleLeftDirection = (enemy) => {
        if (map[enemy.enemyY][enemy.enemyX - 1] === 0) {
            dispatch(setEnemyStyle({ id: enemy.id, style: "enemy-left-anim" }));
            setTimeout(() => {
                dispatch(decreaseEnemyX({ id: enemy.id }));
                dispatch(setEnemyStyle({ id: enemy.id, style: "enemy-left" }));
            }, moveTime);
        }
    };

    const handleRightDirection = (enemy) => {
        if (map[enemy.enemyY][enemy.enemyX + 1] === 0) {
            dispatch(setEnemyStyle({ id: enemy.id, style: "enemy-right-anim" }));
            setTimeout(() => {
                dispatch(increaseEnemyX({ id: enemy.id }));
                dispatch(setEnemyStyle({ id: enemy.id, style: "enemy-right" }));
            }, moveTime);
        }
    };

    const handleUpDirection = (enemy) => {
        if (map[enemy.enemyY - 1][enemy.enemyX] === 0) {
            dispatch(setEnemyStyle({ id: enemy.id, style: "enemy-up-anim" }));
            setTimeout(() => {
                dispatch(decreaseEnemyY({ id: enemy.id }));
                dispatch(setEnemyStyle({ id: enemy.id, style: "enemy-up" }));
            }, moveTime);
        }
    };

    const handleDownDirection = (enemy) => {
        if (map[enemy.enemyY + 1][enemy.enemyX] === 0) {
            dispatch(setEnemyStyle({ id: enemy.id, style: "enemy-down-anim" }));
            setTimeout(() => {
                dispatch(increaseEnemyY({ id: enemy.id }));
                dispatch(setEnemyStyle({ id: enemy.id, style: "enemy-down" }));
            }, moveTime);
        }
    };

    return null;
}

export default EnemyController
