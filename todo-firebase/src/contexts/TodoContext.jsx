 import PropTypes from "prop-types";
import { set, ref, getDatabase} from "firebase/database";
import { createContext, useState } from "react";
import { app } from "../firebase";

const db = getDatabase(app);

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);

    const addTodo = (title) => {
        const newTodo = {
            id: Date.now(),
            title,
            completed: false
        };
        setTodos([...todos, newTodo]);
        set(ref(db, `test/${newTodo.id}`), newTodo)
    };

    const updateTodo = (id, updatedTodo) => {
        setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
        set(ref(db, `test/${id}`), updatedTodo)
    };

    const toggleCompleted = (id) => {
        const myTodo = todos.find(todo => todo.id === id);
        setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
        set(ref(db, `test/${id}/completed`), !myTodo.completed)
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
        set(ref(db, `test/${id}`), null)
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