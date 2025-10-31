import playerCardImage from "../assets/playerStripes/playerDown.png";
import enemyCardImage from "../assets/enemyStripes/enemyDown.png";
import styles from "./CombatCard.module.css";

function CombatCard({ entity, isPlayer }) {

    const cardImage = isPlayer ? playerCardImage : enemyCardImage;

    return (
        <div className={[styles["combat-card"]]}>
            <img src={cardImage} alt="combat character" />
            <div className={styles["stat"]}>
                <p className={styles["stat-label"]}>HP</p>
                <p className={`${styles["stat-hp"]} ${styles["stat-value"]}`}>{entity.hp} </p>
            </div>
            <div className={styles["stat"]}>
                <p className={styles["stat-label"]}>STR</p>
                <p className={`${styles["stat-str"]} ${styles["stat-value"]}`}>{entity.str}</p>
            </div>
        </div>
    );
}
export default CombatCard;