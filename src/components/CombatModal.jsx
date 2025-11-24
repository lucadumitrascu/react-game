import { useEffect, useRef } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import store from "../redux/store";
import { Provider, useSelector, useDispatch } from "react-redux";
import { useProcessQuest } from "../hooks/useProcessQuest";
import { sleep } from "../utils/sleep";
import { useRestartGame } from "../hooks/useRestartGame";
import CombatCard from "./CombatCard";
import CombatAnimation from "./CombatAnimation";
import {
    setEnemyCombatCardStyle, setEnemyCombatAnimStyle,
    setEnemyInCombatHp, removeEnemy, setPaused
} from "../redux/slices/enemySlice";
import {
    setPlayerCombatCardStyle, setPlayerCombatAnimStyle, setPlayerHp,
} from "../redux/slices/playerSlice";
import combatModalStyles from "./CombatModal.module.css";
import modalStyles from "./Modal.module.css";

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

    const processQuest = useProcessQuest();
    const restartGame = useRestartGame();
    
    useEffect(() => {
        if (inCombat.current) return;

        const enemyInCombat = enemy.enemies.find(
            enemy => player.x === enemy.x && player.y === enemy.y
        );
        if (enemyInCombat) {
            inCombat.current = true;
            enemyInCombatId.current = enemyInCombat.id;
            dispatch(setPaused(true));
            showCombatModal();
            startCombat();
        }
    }, [player.x, player.y, enemy.enemies]);

    const startCombat = () => {
        const combatLoop = async () => {
            const playerHp = store.getState().player.hp;
            const enemy = store.getState().enemy.enemies.find(e => e.id === enemyInCombatId.current);

            if (checkCombatStatus(playerHp, enemy.hp)) return;

            attackTurn.current = Math.random() > 0.5 ? "player" : "enemy";

            if (attackTurn.current === "player") {
                await performPlayerAttack(enemy.hp);
            } else {
                await performEnemyAttack(playerHp, enemy.str);
            }

            await sleep(Math.floor(Math.random() * 500 + 1500));
            combatLoop();
        };

        sleep(1500).then(combatLoop);
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
                        popup: `${modalStyles["base-modal"]}`,
                    },
                }).then(() => {
                    restartGame();
                    enemyInCombatId.current = -1;
                    inCombat.current = false;
                });
            } else if (enemyHp <= 0) {
                MySwal.fire({
                    title: <strong>Congratulations!</strong>,
                    text: "You won this battle",
                    confirmButtonText: "Continue",
                    buttonsStyling: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    customClass: {
                        popup: modalStyles["base-modal"],
                    },
                }).then(() => {
                    dispatch(removeEnemy({ id: enemyInCombatId.current }))
                    dispatch(setPaused(false));
                    processQuest(6);
                    enemyInCombatId.current = -1;
                    inCombat.current = false;
                });
            }
            return true;
        }
        return false;
    };

    const performPlayerAttack = async (enemyHp) => {
        dispatch(setPlayerCombatCardStyle("player-pre-attack"));
        attackBtnRef.current.disabled = false;

        await sleep(500);
        attackBtnRef.current.disabled = true;
        dispatch(setPlayerCombatAnimStyle("player-attack"));
        dispatch(setPlayerCombatCardStyle(""));

        if (attackClicked.current) {
            await sleep(600);
            dispatch(setEnemyCombatAnimStyle("enemy-damage"));

            const damage = Math.floor(Math.random() * 5 + 1);
            if (damage === 5) processQuest(5);
            dispatch(setEnemyInCombatHp({
                id: enemyInCombatId.current,
                hp: enemyHp - player.str * damage
            }));
            await sleep(250);
            dispatch(setPlayerCombatAnimStyle(""));
            dispatch(setEnemyCombatAnimStyle(""));
            attackClicked.current = false;
        } else {
            await sleep(600);
            dispatch(setEnemyCombatAnimStyle("enemy-defense"));
            await sleep(250);
            dispatch(setPlayerCombatAnimStyle(""));
            dispatch(setEnemyCombatAnimStyle(""));
        }
    };

    const performEnemyAttack = async (playerHp, enemyStr) => {
        dispatch(setEnemyCombatCardStyle("enemy-pre-attack"));
        defendBtnRef.current.disabled = false;

        await sleep(500);
        dispatch(setEnemyCombatCardStyle(""));
        dispatch(setEnemyCombatAnimStyle("enemy-attack"));
        defendBtnRef.current.disabled = true;

        if (!defendClicked.current) {
            await sleep(600);
            dispatch(setPlayerCombatAnimStyle("player-damage"));
            const damage = Math.floor(Math.random() * 5 + 1);
            dispatch(setPlayerHp(playerHp - enemyStr * damage));
            await sleep(250);
            dispatch(setPlayerCombatAnimStyle(""));
            dispatch(setEnemyCombatAnimStyle(""));
        } else {
            await sleep(600);
            dispatch(setPlayerCombatAnimStyle("player-defense"));
            await sleep(250);
            dispatch(setPlayerCombatAnimStyle(""));
            dispatch(setEnemyCombatAnimStyle(""));
            defendClicked.current = false;
        }
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
                    <div className={combatModalStyles["combat-modal-container"]}>
                        <CombatCard isPlayer={true} />
                        <div>
                            <CombatAnimation />
                            <div>
                                <button ref={defendBtnRef}
                                    className={`${combatModalStyles["combat-action"]} ${combatModalStyles["defend-action"]}`}
                                    onClick={() => { defendClicked.current = true; }}>
                                    Defend
                                </button>
                                <button
                                    ref={attackBtnRef}
                                    className={`${combatModalStyles["combat-action"]} ${combatModalStyles["attack-action"]}`}
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
                popup: `${combatModalStyles["combat-modal"]} ${modalStyles["base-modal"]}`
            },
            didOpen: handleCombatDidOpen,
        });
    };
}

export default CombatModal;
