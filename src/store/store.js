import { configureStore } from '@reduxjs/toolkit'
import navResReducer from './navRes/navResSlice'
import authReducer from './auth/authSlice'
import commentManagerReducer from './manager/commentmanagerSlice'
import baivietManagerReducer from './manager/baivietmanagerSlice'
import userManagerReducer from './manager/usermanagerSlice'
import authorManReducer from './manager/authormanagerSlice'
import detailUserReducer from './detailUser/detailUserSlice'
import salesReducer from './manager/saleSlice'

export const store = configureStore({
    reducer: {
        navRes: navResReducer,
        auth: authReducer,
        userMan: userManagerReducer,
        baivietMan: baivietManagerReducer,
        commentMan: commentManagerReducer,
        authorMan: authorManReducer,
        detailUser: detailUserReducer,
        sale: salesReducer,
    }
})