// import { useContext, createContext, useState} from "react";
 import PropTypes from "prop-types";

// const TodoContext = createContext({
//     todos: [],
//     addTodo: (title) => {},
//     updateTodo: (id, updatedTodo) => {},
//     toggleCompleted: (id) => {},
//     deleteTodo: (id) => {}
// });

// export const TodoProvider = TodoContext.Provider;

// export const useTodo = () => {
//     return useContext(TodoContext);
// }

//The above method has been deprecated and isn't running at all



import { createContext, useContext, useState } from "react";

const TodoContext = createContext();

export const useTodo = () => {
    return useContext(TodoContext);
}

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]); //Here if you give some default value, remember that the local storage stops working

    const addTodo = (title) => {
        const newTodo = {
            id: Date.now(),
            title,
            completed: false
        };
        setTodos([...todos, newTodo]);
    };

    const updateTodo = (id, updatedTodo) => {
        setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    };

    const toggleCompleted = (id) => {
        setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <TodoContext.Provider value={{ todos, setTodos, addTodo, updateTodo, toggleCompleted, deleteTodo }}>
            {children}
        </TodoContext.Provider>
    );
};


TodoProvider.propTypes = {
    children: PropTypes.node
};