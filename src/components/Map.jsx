import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { sleep } from "../utils/sleep";
import CombatModal from "./CombatModal";
import MapController from "./MapController";
import GhostController from "./GhostController";
import playerStyles from "./PlayerController.module.css";
import enemyStyles from "./EnemyController.module.css";
import styles from "./Map.module.css";

function Map() {
    const player = useSelector((state) => state.player);
    const enemy = useSelector((state) => state.enemy);
    const map = useSelector((state) => state.map);
    const game = useSelector((state) => state.game);
    const enemies = enemy.enemies;
    const noEnemies = enemies.length === 0;

    const [doorStyle, setDoorStyle] = useState();
    useEffect(() => {
        const handleDoorAnimations = async () => {
            if (noEnemies && doorStyle !== "door-opened") {
                setDoorStyle("door-opened");
                await sleep(750);
                setDoorStyle("door-opened-static");
            } else if (!noEnemies) {
                setDoorStyle("door-closed");
            }
        };

        handleDoorAnimations();
    }, [noEnemies]);

    const getCellClass = (cell, rowIndex, colIndex, enemy) => {
        if (cell === 2) {
            return `${styles["images-base"]} ${styles[doorStyle]}`;
        }
        else if (cell === 1) {
            return `${styles["images-base"]} ${styles["map-border"]}`;
        }
        else if (cell === 4 && noEnemies) {
            return `${styles["images-base"]} ${styles["ghost"]}`;
        }
        else if (rowIndex === player.y && colIndex === player.x) {
            return playerStyles[player.playerStyle];
        }
        else if (enemy) {
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
                            const enemy = enemies.find(
                                (enemy) => enemy.x === colIndex && enemy.y === rowIndex
                            );
                            return (
                                <td
                                    key={colIndex}
                                    className={getCellClass(cell, rowIndex, colIndex, enemy)}
                                ></td>
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
            <GhostController />
        </div>
    );
}

export default Map;
