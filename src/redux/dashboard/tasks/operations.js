import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../config/api";



// export const getTasks = createAsyncThunk('/tasks',
//     async (_, thunkAPI) => {
//         try {
            
//         } catch (error) {
            
//         }
//     }
// )

export const deleteTask = createAsyncThunk('task/delete',
    async (taskId, thunkAPI) => {
        try {
            const state = thunkAPI.getState()
            const token = state.auth.token

            const {data} = await api.delete(`/tasks/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            return data.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)