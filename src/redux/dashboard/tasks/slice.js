import { createSlice } from "@reduxjs/toolkit";
import { createTask, deleteTask, updateTask } from "./operations";

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
                    task => task._id === action.payload
                );
                state.tasks.splice(index, 1);
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const updatedTask = action.payload
                const index = state.tasks.findIndex(
                    task => task._id === updatedTask._id
                );
                state.tasks[index] = updatedTask;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload)
            })
    }
})


export const { writeToState } = tasksSlice.actions

export const tasksReducer = tasksSlice.reducer