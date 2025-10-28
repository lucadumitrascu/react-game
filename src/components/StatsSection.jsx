import styles from "./StatsSection.module.css";

function StatsSection({ entity, isPlayer }) {
    return (
        <div>
            <div className={styles["stats-section"]}>
                <h1 className={styles["stats-title"]}>{isPlayer ? "Player" : "Enemy"}</h1>
                <div className={styles["stat"]}>
                    <p className={`${styles["stat-label"]} ${styles["stat-hp"]}`}>HP</p>
                    <p>{entity.hp}</p>
                </div>
                <div className={styles["stat"]}>
                    <p className={`${styles["stat-label"]} ${styles["stat-str"]}`}>STR</p>
                    <p>{entity.str}</p>
                </div>
                <div className={styles["stat"]}>
                    <p className={`${styles["stat-label"]} ${styles["stat-pos"]}`}>POS</p>
                    <p>X: {isPlayer ? entity.playerX : entity.enemyX} Y: {isPlayer ? entity.playerY : entity.enemyY}</p>
                </div>
            </div>
        </div>
    );
};

export default StatsSection;