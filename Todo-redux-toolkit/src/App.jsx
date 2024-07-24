import AddTodo from './components/AddTodo'
import Todos from './components/Todos'
import useInputFocus from './hooks/useInputFocus'

function App() { //Check main.jsx
  const  { setInputRef, inputFocus } = useInputFocus();
  return (
    <>
      <AddTodo setInputRef={setInputRef}/>
      <Todos inputFocus={inputFocus}/>
    </>
  )
}

export default App
