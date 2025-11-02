import { useEffect, useRef } from "react";
import Swal from "sweetalert2";
import ReactDOM from "react-dom/client";
import withReactContent from "sweetalert2-react-content";
import { Provider, useSelector } from "react-redux";
import store from "../redux/store";
import { useDispatch } from "react-redux";
import CombatCard from "./CombatCard";
import { setEnemyCardStyle, setEnemyHp, setEnemyX, setEnemyY, setPaused } from "../redux/slices/enemySlice";
import { setPlayerCardStyle, setPlayerHp, setPlayerX, setPlayerY } from "../redux/slices/playerSlice";
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
    const attackInterval = useRef(1500);
    const combatInterval = useRef(null);

    useEffect(() => {
        return () => {
            if (combatInterval.current) {
                clearTimeout(combatInterval.current);
            }
        };
    }, []);

    useEffect(() => {
        if (player.playerX === enemy.enemyX && player.playerY === enemy.enemyY) {
            dispatch(setPaused(true));
            showCombatModal();
            startCombat();
        }
    }, [player.playerX, player.playerY, enemy.enemyX, enemy.enemyY]);

    const startCombat = () => {
        combatInterval.current = setInterval(() => {
            attackTurn.current = Math.floor(Math.random() * 2) === 1 ? "player" : "enemy";
            attackInterval.current = Math.floor(Math.random() * 2000 + 500);

            const playerHp = store.getState().player.hp;
            const enemyHp = store.getState().enemy.hp;
            checkCombatStatus(playerHp, enemyHp);
            if (attackTurn.current === "player") {
                performPlayerAttack(enemyHp);
            } else {
                performEnemyAttack(playerHp);
            }
        }, attackInterval.current);
    }

    const checkCombatStatus = (playerHp, enemyHp) => {
        if (playerHp <= 0 || enemyHp <= 0) {
            if (combatInterval.current) {
                clearInterval(combatInterval.current);
                combatInterval.current = null;
            }

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
        }
    }

    const performPlayerAttack = (enemyHp) => {
        dispatch(setPlayerCardStyle("player-pre-attack"));
        attackBtnRef.current.disabled = false;
        setTimeout(() => {
            dispatch(setPlayerCardStyle(""));
            attackBtnRef.current.disabled = true;
            if (attackClicked.current) {
                const damage = Math.floor(Math.random() * 5 + 1);
                dispatch(setEnemyHp(enemyHp - player.str * damage));
                attackClicked.current = false;
            }
        }, 500);
    };

    const performEnemyAttack = (playerHp) => {
        dispatch(setEnemyCardStyle("enemy-pre-attack"));
        defendBtnRef.current.disabled = false;
        setTimeout(() => {
            dispatch(setEnemyCardStyle(""));
            defendBtnRef.current.disabled = true;
            if (!defendClicked.current) {
                const damage = Math.floor(Math.random() * 5 + 1);
                dispatch(setPlayerHp(playerHp - player.str * damage));
            } else {
                defendClicked.current = false;
            }
        }, 500);
    };

    const handleCombatDidOpen = () => {
        const playerCard = ReactDOM.createRoot(document.getElementById("player-card"));
        const enemyCard = ReactDOM.createRoot(document.getElementById("enemy-card"));

        playerCard.render(
            <Provider store={store}>
                <CombatCard isPlayer={true} />
            </Provider>
        );

        enemyCard.render(
            <Provider store={store}>
                <CombatCard isPlayer={false} />
            </Provider>
        );

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
            html: `
              <div class="${styles["combat-modal-container"]}">
               <div id="player-card"></div>
                <div>
                 <button id="defend-btn" class="${styles["combat-action"]} ${styles["defend-action"]}">Defend</button>
                 <button id="attack-btn" class="${styles["combat-action"]} ${styles["attack-action"]}">Attack</button>
                </div>
               <div id="enemy-card"></div>
              </div>
            `,
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
