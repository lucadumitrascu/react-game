import { useEffect, useRef } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Provider, useSelector } from "react-redux";
import store from "../redux/store";
import { useDispatch } from "react-redux";
import CombatCard from "./CombatCard";
import CombatAnimation from "./CombatAnimation";
import { setEnemyCombatCardStyle, setEnemyCombatAnimStyle, setEnemyHp, removeEnemy, setPaused } from "../redux/slices/enemySlice";
import { setPlayerCombatCardStyle, setPlayerCombatAnimStyle, setPlayerHp, setPlayerX, setPlayerY } from "../redux/slices/playerSlice";
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
    const enemyInCombatId = useRef(-1);
    const inCombat = useRef(false);

    useEffect(() => {
        if (inCombat.current) return;

        const enemyInCombat = enemy.enemies.find(
            enemy => player.playerX === enemy.enemyX && player.playerY === enemy.enemyY
        );
        if (enemyInCombat) {
            inCombat.current = true;
            enemyInCombatId.current = enemyInCombat.id;
            dispatch(setPaused(true));
            showCombatModal();
            startCombat();
        }
    }, [player.playerX, player.playerY, enemy.enemies]);

    const startCombat = () => {
        const combatLoop = () => {
            const playerHp = store.getState().player.hp;
            const enemy = store.getState().enemy.enemies.find(e => e.id === enemyInCombatId.current);

            if (checkCombatStatus(playerHp, enemy.hp)) {
                return;
            }
            attackTurn.current = Math.random() > 0.5 ? "player" : "enemy";

            if (attackTurn.current === "player") {
                performPlayerAttack(enemy.hp);
            }
            else {
                performEnemyAttack(playerHp, enemy.str);
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
                    dispatch(setPaused(false));
                    inCombat.current = false;
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
                }).then(() => {
                    dispatch(removeEnemy({ id: enemyInCombatId.current }))
                    dispatch(setPaused(false));
                    enemyInCombatId.current = -1;
                    inCombat.current = false;
                });
            }
            return true;
        }
        return false;
    };

    const performPlayerAttack = (enemyHp) => {
        dispatch(setPlayerCombatCardStyle("player-pre-attack"));
        attackBtnRef.current.disabled = false;

        setTimeout(() => {
            attackBtnRef.current.disabled = true;
            dispatch(setPlayerCombatAnimStyle("player-attack"));
            dispatch(setPlayerCombatCardStyle(""));

            if (attackClicked.current) {
                setTimeout(() => {
                    dispatch(setEnemyCombatAnimStyle("enemy-damage"));
                    const damage = Math.floor(Math.random() * 5 + 1);
                    dispatch(setEnemyHp({ id: enemyInCombatId.current, hp: enemyHp - player.str * damage }));
                    setTimeout(() => {
                        dispatch(setPlayerCombatAnimStyle(""));
                        dispatch(setEnemyCombatAnimStyle(""));
                    }, 250)
                }, 650);
                attackClicked.current = false;
            } else {
                setTimeout(() => {
                    dispatch(setEnemyCombatAnimStyle("enemy-defense"));
                    setTimeout(() => {
                        dispatch(setPlayerCombatAnimStyle(""));
                        dispatch(setEnemyCombatAnimStyle(""));
                    }, 250)
                }, 650);
            }
        }, 500);
    };

    const performEnemyAttack = (playerHp, enemyStr) => {
        dispatch(setEnemyCombatCardStyle("enemy-pre-attack"));
        defendBtnRef.current.disabled = false;

        setTimeout(() => {
            dispatch(setEnemyCombatCardStyle(""));
            dispatch(setEnemyCombatAnimStyle("enemy-attack"));
            defendBtnRef.current.disabled = true;

            if (!defendClicked.current) {
                setTimeout(() => {
                    dispatch(setPlayerCombatAnimStyle("player-damage"));
                    const damage = Math.floor(Math.random() * 5 + 1);
                    dispatch(setPlayerHp(playerHp - enemyStr * damage));
                    setTimeout(() => {
                        dispatch(setPlayerCombatAnimStyle(""));
                        dispatch(setEnemyCombatAnimStyle(""));
                    }, 250);
                }, 600);
            } else {
                setTimeout(() => {
                    dispatch(setPlayerCombatAnimStyle("player-defense"));
                    setTimeout(() => {
                        dispatch(setPlayerCombatAnimStyle(""));
                        dispatch(setEnemyCombatAnimStyle(""));
                    }, 250);
                    defendClicked.current = false;
                }, 600);
            }
        }, 500);
    };

    const handleCombatDidOpen = () => {
        attackBtnRef.current.disabled = true;
        defendBtnRef.current.disabled = true;
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
                                <button ref={defendBtnRef}
                                    className={`${styles["combat-action"]} ${styles["defend-action"]}`}
                                    onClick={() => { defendClicked.current = true; }}>
                                    Defend
                                </button>
                                <button
                                    ref={attackBtnRef}
                                    className={`${styles["combat-action"]} ${styles["attack-action"]}`}
                                    onClick={() => { attackClicked.current = true; }}>
                                    Attack
                                </button>
                            </div>
                        </div>
                        <CombatCard isPlayer={false} enemyInCombatId={enemyInCombatId.current} />
                    </div>
                </Provider >
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
