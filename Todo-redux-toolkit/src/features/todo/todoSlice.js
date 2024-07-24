//This file has name as todoSlice coz it is a naming convention and ppl know that you've used redux toolkit.
//Slices are a bigger super-set of reducers

import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit"; //This is used to generate a unique id everytime as previously we had used Date.now as the id but this shouldn't be used to create keys.Keys should mostly be provided from the backend

const initialState = { //This is the initial state of the slice, it can be an array or an object
    todos: [{id: 1, title: "1st Todo", editState: false}],
    editTodoId: -1
}

//Any reducer gets the access of these 2 arguments by default and they are enough for us to
//perform all our tasks. The state variable gives the current state of the slice and actions
//provides us the access of whatever the user has passed us or whatever we pass from other 
//components      .Payload is aobject which has various properties that we can access 

function addNewTodo(state, action){ 
    if(action.payload === "") return;
    const todo = {                  
        id: nanoid(),               
        title: action.payload,
        editState: false
    }                               //Don't put comma here coz this is a function and not an object
    state.todos.push(todo);         //So here the same name what we have used in the initialState should be used and we can simply use the .push function and it will add the todo in the current todos array
}

export const todoSlice = createSlice({ //This also takes in an object as an argument
    name: "todo",
    initialState,
    reducers: {
        addTodo: addNewTodo, //Realize that we are just passing the reference here
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload) //Component se sirf id hi pass kar rhe he payload me so . laga ke kuch nahi karna h
        },
        editTitle: (state, action) => {
            state.todos = state.todos.map((todo) => todo.id === action.payload.id ? {...todo, title: action.payload.title, editState: false} : todo)
        },
        setEditState: (state, action) => {
            state.todos = state.todos.map((todo) => todo.id === action.payload.id ? {...todo, editState: action.payload} : todo)
        },
        setEditTodoId: (state, action) => {
            state.editTodoId = action.payload
        }
    }
})//All the key value names like the name and reducers are the ones provided by redux-toolkit those aren't our custom names

export const {addTodo, removeTodo, editTitle, setEditState, setEditTodoId} = todoSlice.actions //.actions hai bhai not action
//These individual functionalities need to be exported as they will be useful in components

export default todoSlice.reducer 
//Ye tum export kar rahe ho kyu ki store sabko access nahi deta he na values change ya update karne ke lie wo un reducers ko hi access deta jo reducers tum register karoge store me to isiliye export kar rhe h

//Similarly we can create various kinds of slices like authSlice etc and then we would have to export both the reducers individually and as a whole in todoSlice.reducer