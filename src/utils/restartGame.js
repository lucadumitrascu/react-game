import store from "../redux/store";
import { setPlayerX, setPlayerY, setPlayerHp, } from "../redux/slices/playerSlice";
import { removeAllEnemies, setPaused } from "../redux/slices/enemySlice";
import { setCurrentMapIndex, resetMaps } from "../redux/slices/mapSlice";
import { setEnemyHp, setEnemyStr } from "../redux/slices/enemySlice";
import { setLevel, setIntroEnded, setOutroEnded } from "../redux/slices/gameSlice";

export const restartGame = () => {
    const dispatch = store.dispatch;
    dispatch(setPlayerX(4));
    dispatch(setPlayerY(8));
    dispatch(setPlayerHp(5));
    dispatch(setPaused(false));
    dispatch(removeAllEnemies());
    dispatch(setCurrentMapIndex(0));
    dispatch(setEnemyHp(5));
    dispatch(setEnemyStr(1));
    dispatch(setLevel(0));
    dispatch(setIntroEnded(false));
    dispatch(setOutroEnded(false));
    dispatch(resetMaps());
};