import playerCardImage from "../assets/playerStripes/playerDown.png";
import enemyCardImage from "../assets/enemyStripes/enemyDown.png";
import styles from "./CombatCard.module.css";
import { useSelector } from "react-redux";

function CombatCard({ isPlayer, enemyInCombatId = null }) {

    const { hp, str, playerCombatCardStyle } = useSelector((state) =>
        isPlayer ? state.player : state.enemy.enemies.find(enemy => enemy.id === enemyInCombatId)
    );

    const enemyCombatCardStyle = useSelector((state) => state.enemy.enemyCombatCardStyle);
    const cardStyle = isPlayer ? playerCombatCardStyle : enemyCombatCardStyle;
    const cardImage = isPlayer ? playerCardImage : enemyCardImage;

    return (
        <div className={`${styles["combat-card"]} ${styles[cardStyle]} `}>
            <img src={cardImage} alt="combat character" />
            <div className={styles["stat"]}>
                <p className={styles["stat-label"]}>HP</p>
                <p className={`${styles["stat-hp"]} ${styles["stat-value"]}`}>{hp} </p>
            </div>
            <div className={styles["stat"]}>
                <p className={styles["stat-label"]}>STR</p>
                <p className={`${styles["stat-str"]} ${styles["stat-value"]}`}>{str}</p>
            </div>
        </div>
    );
}
export default CombatCard;