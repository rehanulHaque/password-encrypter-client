import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isauthenticated: false,
    name: ''
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isauthenticated = true
            state.name = action.payload
        },
        logout: (state) =>{
            state.isauthenticated = false
            state.name = ''
        }
    }
})

export const {login , logout} = userSlice.actions
export default userSlice.reducer