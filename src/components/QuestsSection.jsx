import { useSelector } from "react-redux";
import styles from "./QuestsSection.module.css";

function QuestsSection() {
    const quests = useSelector((state) => state.quest.quests);
    return (
        <div>
            <div className={styles["quests-section"]}>
                <h1>Quests</h1>

                {quests.map((quest, index) => (
                    <div key={index} className={styles["quest"]}>
                        <p className={styles["quest-title"]}>{quest.title}</p>
                        {quest.target ? (
                            <p className={styles["quest-progress"]}>
                                {`${quest.progress} / ${quest.target}`}
                            </p>
                        ) : (
                            <p className={styles["quest-progress"]}>
                                {quest.completed ? "1" : "0"} / 1
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestsSection;