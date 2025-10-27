import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    increaseEnemyX, increaseEnemyY,
    decreaseEnemyX, decreaseEnemyY, setEnemyStyle
} from '../redux/slices/enemySlice'

function EnemyController() {
    const dispatch = useDispatch()
    const enemy = useSelector((state) => state.enemy)
    const map = useSelector((state) => state.map.maps);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomMove = Math.floor(Math.random() * 4);
            switch (randomMove) {
                case 0:
                    handleUpDirection();
                    break;
                case 1:
                    handleDownDirection();
                    break;
                case 2:
                    handleLeftDirection();
                    break;
                case 3:
                    handleRightDirection();
                    break;
                default:
                    break;
            }
        }, 400);

        return () => clearInterval(interval);
    }, [dispatch, enemy]);

    const handleLeftDirection = () => {
        if (enemy.enemyX > 0) {
            if (map[enemy.enemyY][enemy.enemyX - 1] === 0) {
                dispatch(setEnemyStyle("enemy-left-anim"));
                setTimeout(() => {
                    dispatch(decreaseEnemyX());
                    dispatch(setEnemyStyle("enemy-left"));
                }, 400);
            }
        }
    }
    const handleRightDirection = () => {
        if (map[enemy.enemyY][enemy.enemyX + 1] === 0) {
            dispatch(setEnemyStyle("enemy-right-anim"));
            setTimeout(() => {
                dispatch(increaseEnemyX());
                dispatch(setEnemyStyle("enemy-right"));
            }, 400);
        }
    }

    const handleUpDirection = () => {
        if (map[enemy.enemyY - 1][enemy.enemyX] === 0) {
            dispatch(setEnemyStyle("enemy-up-anim"));
            setTimeout(() => {
                dispatch(decreaseEnemyY());
                dispatch(setEnemyStyle("enemy-up"));
            }, 400);
        }
    }

    const handleDownDirection = () => {
        if (map[enemy.enemyY + 1][enemy.enemyX] === 0) {
            dispatch(setEnemyStyle("enemy-down-anim"));
            setTimeout(() => {
                dispatch(increaseEnemyY());
                dispatch(setEnemyStyle("enemy-down"));
            }, 400);
        }
    }

    return null;
}

export default EnemyController
