import {useState} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { addTodo, editTitle, setEditTodoId} from '../features/todo/todoSlice'
import PropTypes from 'prop-types'

//AddTodo means we are adding todos inside the store so we need to dispatch something from here so we need to use useDispatch from REACT-REDUX
function AddTodo({setInputRef}) { 
  const [input, setInput] = useState('')
  const editTodoId = useSelector(state => state.editTodoId)
  const dispatch = useDispatch() //This is a hook which is used to dispatch actions
  //It returns a reference to the dispatch function from the Redux store. You may use it to dispatch actions as needed.
  

    //Dispatch function is used to take in a reducer as an argument and making use of the reducer makes changes in the store

    const addTodoHandler = (e) => {
        e.preventDefault()
        if(input === "") return
        if(editTodoId){
            dispatch(editTitle({id: editTodoId, title: input}))
            dispatch(setEditTodoId(null))
            setInput('')
            return
        }
        dispatch(addTodo(input))
        setInput('')//Clearing the input field after adding the todo
    }

  return (
    <form onSubmit={addTodoHandler} className="space-x-3 mt-12">
      <input 
        ref ={setInputRef}
        id = "txt-box"
        type="text"
        className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        Add Todo
      </button>
    </form>
  )
}

AddTodo.propTypes = {
  setInputRef : PropTypes.func.isRequired
}

export default AddTodo