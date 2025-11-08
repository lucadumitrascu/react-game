import { useDispatch } from "react-redux";
import { addEnemy } from "../redux/slices/enemySlice";

export function useAddEnemies() {
    const dispatch = useDispatch();

    const addEnemies = (amount, hp, str) => {
        for (let i = 0; i < amount; i++) {
            const newEnemy = {
                id: i,
                x: i + 1,
                y: 5,
                hp,
                str,
                enemyStyle: "enemy-down",
            };
            dispatch(addEnemy(newEnemy));
        }
    };
    return addEnemies;
}