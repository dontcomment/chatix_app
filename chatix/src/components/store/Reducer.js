import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    logged: false,
}

export const handleLogin = createSlice({
    name: "logging",
    initialState,
    reducers: {
        login: (state) => {
            state.logged = true
        },
        logout: (state) => {
            state.logged = false
        },
    },
})

export const { login, logout } = handleLogin.actions

export default handleLogin.reducer