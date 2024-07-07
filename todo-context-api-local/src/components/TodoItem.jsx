import PropTypes from 'prop-types';
import { useState } from 'react';
import {useTodo} from '../hooks/useTodo'

//Because we are using the prop types to validate the props that are being passed to the component.
//If the props are not passed correctly, it will throw an error in the console.
//This is a good practice to validate the props that are being passed to the component.
//Why was it not a part of react earlier on?
//It was a part of react earlier on but it was removed from the core library and moved to a separate library called prop-types.
//This was done to reduce the size of the react library.



TodoItem.propTypes = { 
    todo: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
    }).isRequired
}


function TodoItem({ todo }) {
    const [todoMsg, setTodoMsg] = useState(todo.title); //This state is for the new message that the user will give you
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const {updateTodo, toggleCompleted, deleteTodo } = useTodo();

    const editTodo = () => {
        updateTodo(todo.id,{...todo, title: todoMsg})
        setIsTodoEditable(!isTodoEditable)
    }

    const toggle = ()=>{
        toggleCompleted(todo.id)
    }

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={toggle}
            />
            {/*Todo Message */}
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.completed ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (isTodoEditable) {  
                        editTodo();
                    } 
                    else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodo(todo.id)}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;
