import { useSelector } from "react-redux";
import styles from "./CombatAnimation.module.css";

function CombatAnimation() {
    const playerCombatAnimStyle = useSelector((state) => state.player.playerCombatAnimStyle);
    const enemyCombatAnimStyle = useSelector((state) => state.enemy.enemyCombatAnimStyle);

    return (
        <div className={styles["combat-anim"]}>
            <div className={`${styles["combat-player"]} ${styles[playerCombatAnimStyle]}`}></div>
            <div className={`${styles["combat-enemy"]} ${styles[enemyCombatAnimStyle]}`}></div>
        </div>
    );
}

export default CombatAnimation;
