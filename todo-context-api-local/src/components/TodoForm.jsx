import { useState } from "react";
import { useTodo } from "../contexts/TodoContext";

function TodoForm() {
    const [todoTitle, setTodoTitle] = useState("")
    const   {addTodo} = useTodo();

    const add = (e) => {
        e.preventDefault();
        if(!todoTitle) return;
        addTodo(todoTitle) //We aren't passing the id coz we are already setting it in the addTodo fn
        setTodoTitle("");
    }

    return (
        <form  onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                value={todoTitle}
                onChange={(e)=> setTodoTitle(e.target.value)}
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;

