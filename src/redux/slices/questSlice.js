import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quests: [
        { title: "Open the chest", completed: false },
        { title: "Finish level 1", completed: false },
        { title: "Finish level 2", completed: false },
        { title: "Finish level 3", completed: false },
        { title: "Finish level 4", completed: false },
        { title: "Deal 1 critical hit", completed: false },
        { title: "Defeat 5 enemies", completed: false, progress: 0, target: 5 }
    ]
};

export const questSlice = createSlice({
    name: "quest",
    initialState,
    reducers: {
        setQuestCompleted: (state, action) => {
            state.quests[action.payload].completed = true;
        },
        increaseQuestProgress: (state, action) => {
            state.quests[action.payload].progress += 1;
            if (state.quests[action.payload].progress === state.quests[action.payload].target) {
                state.quests[action.payload].completed = true;
            }
        },
        resetQuests: () => initialState,
    },
});


export const {
    setQuestCompleted, increaseQuestProgress, resetQuests
} = questSlice.actions;

export default questSlice.reducer;