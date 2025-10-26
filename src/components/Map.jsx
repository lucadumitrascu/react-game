import { useSelector } from "react-redux";
import styles from "./Map.module.css";

function Map() {
    const player = useSelector((state) => state.player);
    const map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]

    const renderMap = (map) => (
        <table className={styles["map"]}>
            <tbody>
                {map.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <td key={colIndex}
                                className={
                                    cell === 1 ? styles["map-border"] :
                                        rowIndex === player.playerY && colIndex === player.playerX ? styles["map-player"]
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