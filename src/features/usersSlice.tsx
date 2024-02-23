import { createSlice } from "@reduxjs/toolkit";
import users from './../assets/usersData.json';

const initialState = users;

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.push(action.payload)
        },
        updateUser: (state, action) => {
            const updatedUser = action.payload;
            const userToUpdate = state.find(user => user.id === updatedUser.id);
            if (userToUpdate) {
                userToUpdate.name = updatedUser.name;
                userToUpdate.email = updatedUser.email;
            }
        },
        deleteUser: (state, action) => {
            return state.filter(user => user.id !== action.payload);
        }
    }
})

export const { addUser, updateUser, deleteUser } = usersSlice.actions
export default usersSlice.reducer;