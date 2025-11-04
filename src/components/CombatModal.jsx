import { useEffect, useRef } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Provider, useSelector } from "react-redux";
import store from "../redux/store";
import { useDispatch } from "react-redux";
import CombatCard from "./CombatCard";
import CombatAnimation from "./CombatAnimation";
import { setEnemyCardStyle, setEnemyAnimStyle, setEnemyHp, setEnemyX, setEnemyY, setPaused } from "../redux/slices/enemySlice";
import { setPlayerCardStyle, setPlayerAnimStyle, setPlayerHp, setPlayerX, setPlayerY } from "../redux/slices/playerSlice";
import styles from "./CombatModal.module.css";

function CombatModal() {
    const MySwal = withReactContent(Swal);
    const dispatch = useDispatch();
    const player = useSelector((state) => state.player);
    const enemy = useSelector((state) => state.enemy);

    const attackBtnRef = useRef(null);
    const defendBtnRef = useRef(null);
    const attackClicked = useRef(false);
    const defendClicked = useRef(false);
    const attackTurn = useRef("player");

    useEffect(() => {
        if (player.playerX === enemy.enemyX && player.playerY === enemy.enemyY) {
            dispatch(setPaused(true));
            showCombatModal();
            startCombat();
        }
    }, [player.playerX, player.playerY, enemy.enemyX, enemy.enemyY]);

    const startCombat = () => {
        const combatLoop = () => {
            const playerHp = store.getState().player.hp;
            const enemyHp = store.getState().enemy.hp;

            if (checkCombatStatus(playerHp, enemyHp)) {
                return;
            }
            attackTurn.current = Math.random() > 0.5 ? "player" : "enemy";

            if (attackTurn.current === "player") {
                performPlayerAttack(enemyHp);
            }
            else {
                performEnemyAttack(playerHp);
            }

            setTimeout(combatLoop, Math.floor(Math.random() * 500 + 500) + 1350);
        };
        setTimeout(combatLoop, 1500);
    };

    const checkCombatStatus = (playerHp, enemyHp) => {
        if (playerHp <= 0 || enemyHp <= 0) {
            if (playerHp <= 0) {
                MySwal.fire({
                    title: <strong>You died!</strong>,
                    text: "Restart game",
                    confirmButtonText: "Continue",
                    buttonsStyling: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    customClass: {
                        popup: `${styles["combat-modal"]} ${styles["end-combat-modal"]}`,
                        confirmButton: styles["confirm-button"],
                    },
                }).then(() => {
                    dispatch(setPlayerX(4));
                    dispatch(setPlayerY(8));
                    dispatch(setPlayerHp(5));
                    dispatch(setEnemyX(1));
                    dispatch(setEnemyY(1));
                    dispatch(setEnemyHp(5));
                    dispatch(setPaused(false));
                });
            } else if (enemyHp <= 0) {
                MySwal.fire({
                    title: <strong>Congratulations!</strong>,
                    text: "You won this battle!",
                    confirmButtonText: "Continue",
                    buttonsStyling: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    customClass: {
                        popup: `${styles["combat-modal"]} ${styles["end-combat-modal"]}`,
                        confirmButton: styles["confirm-button"],
                    },
                });
            }
            return true;
        }
        return false;
    };

    const performPlayerAttack = (enemyHp) => {
        dispatch(setPlayerCardStyle("player-pre-attack"));
        attackBtnRef.current.disabled = false;

        setTimeout(() => {
            attackBtnRef.current.disabled = true;
            dispatch(setPlayerAnimStyle("player-attack"));
            dispatch(setPlayerCardStyle(""));

            if (attackClicked.current) {
                setTimeout(() => {
                    dispatch(setEnemyAnimStyle("enemy-damage"));
                    const damage = Math.floor(Math.random() * 5 + 1);
                    dispatch(setEnemyHp(enemyHp - player.str * damage));
                    setTimeout(() => {
                        dispatch(setPlayerAnimStyle(""));
                        dispatch(setEnemyAnimStyle(""));
                    }, 250)
                }, 650);
                attackClicked.current = false;
            } else {
                setTimeout(() => {
                    dispatch(setEnemyAnimStyle("enemy-defense"));
                    setTimeout(() => {
                        dispatch(setPlayerAnimStyle(""));
                        dispatch(setEnemyAnimStyle(""));
                    }, 250)
                }, 650);
            }
        }, 500);
    };

    const performEnemyAttack = (playerHp) => {
        dispatch(setEnemyCardStyle("enemy-pre-attack"));
        defendBtnRef.current.disabled = false;

        setTimeout(() => {
            dispatch(setEnemyCardStyle(""));
            dispatch(setEnemyAnimStyle("enemy-attack"));
            defendBtnRef.current.disabled = true;

            if (!defendClicked.current) {
                setTimeout(() => {
                    dispatch(setPlayerAnimStyle("player-damage"));
                    const damage = Math.floor(Math.random() * 5 + 1);
                    dispatch(setPlayerHp(playerHp - enemy.str * damage));
                    setTimeout(() => {
                        dispatch(setPlayerAnimStyle(""));
                        dispatch(setEnemyAnimStyle(""));
                    }, 250);
                }, 600);
            } else {
                setTimeout(() => {
                    dispatch(setPlayerAnimStyle("player-defense"));
                    setTimeout(() => {
                        dispatch(setPlayerAnimStyle(""));
                        dispatch(setEnemyAnimStyle(""));
                    }, 250);

                    defendClicked.current = false;
                }, 600);
            }
        }, 500);
    };

    const handleCombatDidOpen = () => {
        attackBtnRef.current = document.getElementById("attack-btn");
        defendBtnRef.current = document.getElementById("defend-btn");
        attackBtnRef.current.disabled = true;
        defendBtnRef.current.disabled = true;
        attackBtnRef.current.addEventListener("click", () => {
            attackClicked.current = true;
        });

        defendBtnRef.current.addEventListener("click", () => {
            defendClicked.current = true;
        });
    };

    const showCombatModal = () => {
        MySwal.fire({
            title: <strong>Combat!</strong>,
            html: (
                <Provider store={store}>
                    <div className={styles["combat-modal-container"]}>
                        <CombatCard isPlayer={true} />
                        <div>
                            <CombatAnimation />
                            <div>
                                <button id="defend-btn" className={`${styles["combat-action"]} ${styles["defend-action"]}`}>
                                    Defend
                                </button>
                                <button id="attack-btn" className={`${styles["combat-action"]} ${styles["attack-action"]}`}>
                                    Attack
                                </button>
                            </div>
                        </div>
                        <CombatCard isPlayer={false} />
                    </div>
                </Provider>
            ),
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            customClass: {
                popup: styles["combat-modal"]
            },
            didOpen: handleCombatDidOpen,
        });
    };
}

export default CombatModal;
