import playerCardImage from "../assets/playerStripes/playerDown.png";
import enemyCardImage from "../assets/enemyStripes/enemyDown.png";
import styles from "./CombatCard.module.css";
import { useSelector } from "react-redux";

function CombatCard({ isPlayer }) {

    const { hp, str, playerCardStyle, enemyCardStyle } = useSelector((state) =>
        isPlayer ? state.player : state.enemy
    );

    const cardStyle = isPlayer ? playerCardStyle : enemyCardStyle;
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