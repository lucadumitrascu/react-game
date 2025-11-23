import { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import { removeGhost } from "../redux/slices/mapSlice";
import { setIntroEnded, setOutroEnded } from "../redux/slices/gameSlice";
import { useAddEnemies } from "../hooks/useAddEnemies";
import ghostImg from "../assets/ghost.png";
import playerImg from "../assets/playerStripes/playerDown.png";
import ghostControllerStyles from "./GhostController.module.css";
import modalStyles from "./Modal.module.css";

function GhostController() {
    const MySwal = withReactContent(Swal);
    const dispatch = useDispatch();

    const player = useSelector((state) => state.player);
    const game = useSelector((state) => state.game);

    const noEnemies = useSelector(state => state.enemy.enemies.length === 0);
    const addEnemies = useAddEnemies();

    const introDialogue = [
        { text: 'Ghost: "Bohohoho!"', img: ghostImg },
        { text: 'Player: "A GHOST???"', img: playerImg },
        { text: 'Ghost: "Yes, I am the spirit of someone who once tried to navigate this place."', img: ghostImg },
        { text: 'Player: "What happened to you?"', img: playerImg },
        { text: 'Ghost: "I was here before you. I didn’t make it. The enemies here are ruthless."', img: ghostImg },
        { text: 'Player: "Is there any way to escape?"', img: playerImg },
        { text: 'Ghost: "Only those who are brave and vigilant can survive."', img: ghostImg },
        { text: 'Player: "I must continue, I have no choice."', img: playerImg },
        { text: 'Ghost: "Wait! Oh no, I can feel it... An enemy is here! We can’t talk anymore, you must fight! Good luck!"', img: ghostImg }
    ];

    const outroDialogue = [
        { text: 'Ghost: "Wow... You really did it!"', img: ghostImg },
        { text: 'Player: "It was a great adventure!"', img: playerImg },
        { text: 'Ghost: "You can leave the dungeon if you go down, or... you can explore the map by going back."', img: ghostImg },
        { text: 'Player: "I think I\'ll take a moment to rest before deciding."', img: playerImg },
        { text: 'Ghost: "Whatever you choose, know that you\'ve done something remarkable. Farewell, brave adventurer."', img: ghostImg },
    ];

    const showDialogue = (dialogue, isIntro) => {
        const showDialogueStep = (step) => {
            if (step >= dialogue.length) {
                if (isIntro) {
                    dispatch(setIntroEnded(true));
                    addEnemies(1, 5, 1);
                } else {
                    dispatch(setOutroEnded(true));
                }
                dispatch(removeGhost());
                return;
            }

            MySwal.fire({
                html: (
                    <div>
                        <img src={dialogue[step].img} alt="Character"
                            className={ghostControllerStyles["dialogue-character-img"]} />
                        <p>{dialogue[step].text}</p>
                        <button
                            onClick={() => {
                                MySwal.close();
                                showDialogueStep(step + 1);
                            }}>
                            {step < dialogue.length - 1 ? "Next" : "Continue"}
                        </button>
                    </div>
                ),
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showClass: { popup: ghostControllerStyles["dialogue-modal-slide-in"] },
                customClass: {
                    popup: `${ghostControllerStyles["dialogue-modal"]} ${modalStyles["base-modal"]}`,
                },
            });
        };

        showDialogueStep(0);
    };

    const introPositions = [{ x: 6, y: 2 }, { x: 7, y: 1 }, { x: 7, y: 3 }];
    const outroPositions = [{ x: 6, y: 2 }, { x: 8, y: 2 }, { x: 7, y: 3 }];

    const isAtPosition = (positions, player) => positions.some(pos => pos.x === player.x && pos.y === player.y);

    useEffect(() => {
        const canTriggerIntro = game.level === 0 && !game.introEnded && isAtPosition(introPositions, player);
        const canTriggerOutro = game.level === 4 && !game.outroEnded && noEnemies && isAtPosition(outroPositions, player);

        if (canTriggerIntro) {
            showDialogue(introDialogue, true);
        }
        if (canTriggerOutro) {
            showDialogue(outroDialogue, false);
        }
    }, [player.x, player.y, game.level, game.introEnded, game.outroEnded, noEnemies]);
}

export default GhostController;