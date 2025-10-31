import { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch } from "react-redux";
import { setPaused } from "../redux/slices/enemySlice";
import styles from "./CombatModal.module.css";

function CombatModal({ playerX, playerY, enemyX, enemyY }) {

    const MySwal = withReactContent(Swal);
    const dispatch = useDispatch();

    useEffect(() => {
        if (playerX === enemyX && playerY === enemyY) {
            showCombatModal();
            dispatch(setPaused(true));
        }
    }, [playerX, playerY, enemyX, enemyY]);

    const showCombatModal = () => {
        MySwal.fire({
            title: <strong>Combat!</strong>,
            html: (
                <div>

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
