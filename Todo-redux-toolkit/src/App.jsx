import AddTodo from './components/AddTodo'
import Todos from './components/Todos'
import useInputFocus from './hooks/useInputFocus'

function App() { //Check main.jsx
  const  { setInputRef, inputFocus } = useInputFocus();
  return (
    <div className='min-w-svw min-h-svh overflow-auto bg-zinc-500 text-center m-0 p-5'>
      <AddTodo setInputRef={setInputRef}/>
      <Todos inputFocus={inputFocus}/>
    </div>
  )
}

export default App
