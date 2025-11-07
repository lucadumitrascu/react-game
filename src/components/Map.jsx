import { useSelector } from "react-redux";
import CombatModal from "./CombatModal";
import styles from "./Map.module.css";
import playerStyles from "./PlayerController.module.css";
import enemyStyles from "./EnemyController.module.css";

function Map() {
    const player = useSelector((state) => state.player);
    const enemyState = useSelector((state) => state.enemy);
    const map = useSelector((state) => state.map.maps);
    const enemies = enemyState.enemies;

    const getCellClass = (cell, rowIndex, colIndex, enemy) => {
        if (cell === 1) {
            return `${styles["images-base"]} ${styles["map-border"]}`;
        }
        if (rowIndex === player.playerY && colIndex === player.playerX) {
            return playerStyles[player.playerStyle];
        }
        if (enemy) {
            return enemyStyles[enemy.enemyStyle];
        }
        return styles["map-cell"];
    };

    const renderMap = (map) => (
        <table className={`${styles["images-base"]} ${styles["map"]}`}>
            <tbody>
                {map.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, colIndex) => {
                            const enemy = enemies.find((enemy) => enemy.enemyX === colIndex && enemy.enemyY === rowIndex);
                            return (
                                <td key={colIndex} className={getCellClass(cell, rowIndex, colIndex, enemy)}></td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div>
            {renderMap(map)}
            <CombatModal />
        </div>
    );
}

export default Map;
