import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TodoProvider } from './contexts/TodoContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(//Bhai sahab ye react.strict mode ke wajah se do baar render ho rahe the todos aur keys conflict ho rahe the render hone time
    <TodoProvider>
      <App />
    </TodoProvider>
)
