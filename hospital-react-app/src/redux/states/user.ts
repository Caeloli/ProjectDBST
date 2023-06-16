import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "../../models";
import { Roles} from "../../models/roles";

export const EmptyUserState: UserInfo = {
    id: 0,
    nombre: "",
    email: "",
    tipo: Roles.NO_LOGGED
}

export const persistLocalStorageUser = (userInfo: UserInfo) => {
    localStorage.setItem('user', JSON.stringify({...userInfo}));
}

export const clearLocalStorageUser = () => {
    localStorage.removeItem('user');
}
export const userSlice = createSlice({
    name: "user",
    initialState: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : EmptyUserState,
    reducers: {
        createUser: (state, action) =>{
            persistLocalStorageUser(action.payload);
            return action.payload;
        },
        updateUser: (state, action) => {
            const result = { ...state, ...action.payload};
            persistLocalStorageUser(result);
            return result;
        },
        resetUser: () => {
            clearLocalStorageUser();
            return EmptyUserState
        }
        
    }
})

export const { createUser, updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer