import { useDispatch, useSelector } from "react-redux";
import store from "../redux/store";
import { setQuestCompleted, increaseQuestProgress } from "../redux/slices/questSlice";
import { setPlayerHp, setPlayerStr } from "../redux/slices/playerSlice";
import { toast } from "react-toastify";
import toastBackground from "../assets/statsPanel.jpeg";

export function useProcessQuest() {

    const dispatch = useDispatch();
    const quests = useSelector((state) => state.quest.quests);
    const player = useSelector((state) => state.player);

    const processQuest = (index) => {
        if (!quests[index] || quests[index].completed) return;

        if (index !== 6) {
            dispatch(setQuestCompleted(index));
        } else {
            dispatch(increaseQuestProgress(index));
        }

        const completed = store.getState().quest.quests[index].completed;

        const showToast = (message) => {
            toast.success(message, {
                position: "bottom-right",
                theme: "dark",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                closeButton: false,
                style: {
                    backgroundImage: `url(${toastBackground})`,
                    fontWeight: "bold",
                    width: "max-content",
                },
            });
        };

        if (completed) {
            switch (index) {
                case 0:
                    dispatch(setPlayerHp(player.hp + 5));
                    showToast("Open the chest quest completed! +5 HP");
                    break;
                case 1:
                    dispatch(setPlayerHp(player.hp + 5));
                    showToast("Finish level 1 quest completed! +5 HP");
                    break;
                case 2:
                    dispatch(setPlayerHp(player.hp + 10));
                    showToast("Finish level 2 quest completed! +10 HP");
                    break;
                case 3:
                    dispatch(setPlayerStr(player.str + 1));
                    showToast("Finish level 3 quest completed! +1 STR");
                    break;
                case 4:
                    dispatch(setPlayerHp(player.hp + 15));
                    showToast("Finish level 4 quest completed! +15 HP");
                    break;
                case 5:
                    dispatch(setPlayerStr(player.str + 1));
                    showToast("Deal 1 critical hit quest completed! +1 STR");
                    break;
                case 6:
                    dispatch(setPlayerStr(player.str + 1));
                    showToast("Defeat 5 enemies quest completed! +1 STR");
                    break;
                default:
                    break;
            }
        }
    };
    
    return processQuest;
}
