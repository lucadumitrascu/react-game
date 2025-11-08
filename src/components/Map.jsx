import { useSelector } from "react-redux";
import CombatModal from "./CombatModal";
import MapController from "./MapController";
import playerStyles from "./PlayerController.module.css";
import enemyStyles from "./EnemyController.module.css";
import styles from "./Map.module.css";

function Map() {
    const player = useSelector((state) => state.player);
    const enemy = useSelector((state) => state.enemy);
    const map = useSelector((state) => state.map);
    const enemies = enemy.enemies;
    const noEnemies = enemies.length === 0;

    const getCellClass = (cell, rowIndex, colIndex, enemy) => {
        if (cell === 2) {
            return `${styles["images-base"]} ${noEnemies ? styles["door-opened"] : styles["door-closed"]}`;
        }
        if (cell === 1) {
            return `${styles["images-base"]} ${styles["map-border"]}`;
        }
        if (rowIndex === player.y && colIndex === player.x) {
            return playerStyles[player.playerStyle];
        }
        if (enemy) {
            return enemyStyles[enemy.enemyStyle];
        }
        return styles["map-cell"];
    };

    const renderMap = (map) => (
        <table className={`${styles["map"]} ${styles[map.currentMapStyle]}`}>
            <tbody>
                {map.maps[map.currentMapIndex].map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, colIndex) => {
                            const enemy = enemies.find((enemy) => enemy.x === colIndex && enemy.y === rowIndex);
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
            <MapController />
        </div>
    );
}

export default Map;
