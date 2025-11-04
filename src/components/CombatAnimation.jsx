import { useSelector } from "react-redux";
import styles from "./CombatAnimation.module.css";

function CombatAnimation() {
    const playerAnimStyle = useSelector((state) => state.player.playerAnimStyle);
    const enemyAnimStyle = useSelector((state) => state.enemy.enemyAnimStyle);

    return (
        <div className={styles["combat-anim"]}>
            <div className={`${styles["combat-player"]} ${styles[playerAnimStyle]}`}></div>
            <div className={`${styles["combat-enemy"]} ${styles[enemyAnimStyle]}`}></div>
        </div>
    );
}

export default CombatAnimation;
