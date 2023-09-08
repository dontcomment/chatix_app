import { configureStore } from '@reduxjs/toolkit'
import handleLogin from './Reducer.js'

export const store = configureStore({
    reducer: {
        logged: handleLogin
    },
});
