import { createSlice } from "@reduxjs/toolkit";
import { deleteTask } from "./operations";

const initialState = {
    tasks: []
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        writeToState: (state, action) => {
            state.tasks = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(deleteTask.fulfilled, (state, action) => {
                const index = state.tasks.findIndex(
                    task => task._id === action.payload._id
                );
                state.tasks.splice(index, 1);
            })
    }
})


export const {writeToState} = tasksSlice.actions