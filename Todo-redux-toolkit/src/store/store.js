import {configureStore} from '@reduxjs/toolkit'
import todoReducer from '../features/todo/todoSlice'
//todoSlice.reducer is exported as default so we can name it anything while importing

export const store = configureStore({
    reducer: todoReducer
});        //Takes in object as input