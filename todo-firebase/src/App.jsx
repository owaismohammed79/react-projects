import {getDatabase, ref, get} from 'firebase/database'
import {app} from './firebase'
import { useEffect } from "react";
import { useTodo } from "./hooks/useTodo";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

const db = getDatabase(app);//Creating a database reference

function App() {
  const { todos, setTodos } = useTodo();

  useEffect(() => {
    get(ref(db, 'test/')).then((snapshot) => {
      if(snapshot.exists()) {
        const todos = snapshot.val();
        let todoValues = 0;
        if(todos) {
           todoValues = Object.values(todos)
        }
        for(let i=0; i < todoValues.length; i++) {
          setTodos((prevTodos) => [...prevTodos, todoValues[i]]);
        }
      }
      else {
        console.log('No data available');
      }
    }).catch((error) => {
      console.error(error);
    })
  }, []);

  //To remove a specific todo
  // remove(ref(db, 'test/1'));
  


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
  )
}

export default App
