import { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch } from "react-redux";
import { setPaused } from "../redux/slices/enemySlice";
import CombatCard from "./CombatCard";
import styles from "./CombatModal.module.css";

function CombatModal({ player, enemy }) {

    const MySwal = withReactContent(Swal);
    const dispatch = useDispatch();

    useEffect(() => {
        if (player.playerX === enemy.enemyX && player.playerY === enemy.enemyY) {
            showCombatModal();
            dispatch(setPaused(true));
        }
    }, [player.playerX, player.playerY, enemy.enemyX, enemy.enemyY]);

    const showCombatModal = () => {
        MySwal.fire({
            title: <strong>Combat!</strong>,
            html: (
                <div className={styles["combat-modal"]}>
                    <CombatCard entity={player} isPlayer={true} />
                    <div>
                        <button className={` ${styles["combat-action"]} ${styles["defend-action"]}`}>Defend</button>
                        <button className={` ${styles["combat-action"]} ${styles["attack-action"]}`}>Attack</button>
                    </div>
                    <CombatCard entity={enemy} isPlayer={false} />
                </div>
            ),
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            customClass: {
                popup: styles["custom-popup"]
            }
        });
    };
}

export default CombatModal;
