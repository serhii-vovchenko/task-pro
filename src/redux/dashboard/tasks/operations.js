import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, setToken } from "../../../config/api";

export const deleteTask = createAsyncThunk('task/delete',
    async (taskId, thunkAPI) => {

        const state = thunkAPI.getState()
        const accessToken = state.auth.token
        try {
            setToken(accessToken)
            const response = await api.delete(`/tasks/${taskId}`, taskId)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const updateTask = createAsyncThunk('task/update',
    async ({taskId, values}, thunkAPI) => {
        const state = thunkAPI.getState()
        const accessToken = state.auth.token
        
        try {
            setToken(accessToken)
            const response = await api.patch(`/tasks/${taskId}`, values)
            return response.data
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)