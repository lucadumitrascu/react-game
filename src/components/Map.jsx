import { useSelector } from "react-redux";
import styles from "./Map.module.css";
import playerStyles from "./PlayerController.module.css";
import enemyStyles from "./EnemyController.module.css";

function Map() {
    const player = useSelector((state) => state.player);
    const enemy = useSelector((state) => state.enemy);
    const map = useSelector((state) => state.map.maps);

    const renderMap = (map) => (
        <table className={`${styles["images-base"]} ${styles["map"]}`}>
            <tbody>
                {map.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <td key={colIndex}
                                className={
                                    cell === 1 ? `${styles["images-base"]} ${styles["map-border"]}` :
                                        rowIndex === player.playerY && colIndex === player.playerX ? playerStyles[player.playerStyle]
                                            : rowIndex === enemy.enemyY && colIndex === enemy.enemyX ? enemyStyles[enemy.enemyStyle]
                                                : styles["map-cell"]}
                            >

                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );


    return (
        <div>
            {renderMap(map)}
        </div>
    );
}

export default Map;