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

                {isPlayer && (
                    <div className={styles["stat"]}>
                        <p className={`${styles["stat-label"]} ${styles["stat-pos"]}`}>POS</p>
                        <p>X: {entity.playerX} Y: {entity.playerY}</p>
                    </div>
                )}
            </div>
        </div>

    );
};

export default StatsSection;