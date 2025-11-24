import { useDispatch } from "react-redux";
import { 
    setPlayerX, setPlayerY, setPlayerHp, 
    setPlayerStr, setHasChestKey 
} from "../redux/slices/playerSlice";
import { removeAllEnemies, setPaused } from "../redux/slices/enemySlice";
import { setCurrentMapIndex, resetMaps } from "../redux/slices/mapSlice";
import { setEnemyHp, setEnemyStr } from "../redux/slices/enemySlice";
import { setLevel, setIntroEnded, setOutroEnded } from "../redux/slices/gameSlice";
import { resetQuests } from "../redux/slices/questSlice";

export function useRestartGame() {
    const dispatch = useDispatch();

    const restartGame = () => {
        dispatch(setPlayerX(4));
        dispatch(setPlayerY(8));
        dispatch(setPlayerHp(5));
        dispatch(setPlayerStr(1));
        dispatch(setPaused(false));
        dispatch(removeAllEnemies());
        dispatch(setCurrentMapIndex(0));
        dispatch(setEnemyHp(5));
        dispatch(setEnemyStr(1));
        dispatch(setLevel(0));
        dispatch(setIntroEnded(false));
        dispatch(setOutroEnded(false));
        dispatch(resetMaps());
        dispatch(resetQuests());
        dispatch(setHasChestKey(false));
    };

    return restartGame;
}
