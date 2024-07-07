import { useEffect } from "react";
import { useTodo } from "./hooks/useTodo";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const { todos, setTodos } = useTodo(); //This is simply to display the todos on the UI

  //This useEffect is used to get the todos from the local storage and set it to the todos state
  //We have to use JSON.parse because the local storage stores data as a string so we are converting it back to an array
  //We always do the getItem before setItem because we want to get the data from the local storage and set it to the state 
  useEffect(() => {
    const todosString = localStorage.getItem("todos");
    if (todosString) {
      const todos = JSON.parse(todosString);
      setTodos(todos);
    }
  }, [setTodos]);


    //This useEffect is used to set the todos to the local storage
    //We have to use JSON.stringify because the local storage stores data as a string so we are converting it to a string
   //It takes in 2 arguments, the key and value.
   //The key we have used here should be unique and same as the key we have used in the getItem
   //The value we have used here is the todos state which we are converting to a string
  //We are having two different useEffects coz if we put both of them together then it will go into an infinite loop because it will have both setTodos and todos as dependencies
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  return (
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}

export default App;

