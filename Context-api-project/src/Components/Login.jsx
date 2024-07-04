import { useState, useContext } from 'react'
import UserContext from '../Context/UserContext'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {setUser} = useContext(UserContext); //This is how we access the variables from the global context

    function handleSubmit(e){
        e.preventDefault()
        setUser({username, password}) //This is the way to send the data to the global context
    }
  return (
    <div>
        <h2>Login</h2>
        <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Username' />
        <br /> <br />
        <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' />
        <br /> <br />
        <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Login