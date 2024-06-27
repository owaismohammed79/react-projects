import './index.css'
import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null); //useRef password element ka reference directly le leta h

  const passwordGenerator = useCallback(() => { //useCallback is used to prevent the function from being created again and again on re-render
    let password = "";
    let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(numberAllowed) characters += "0123456789";
    if(charAllowed) characters += "!@#$%^&*()_+";
    for(let i =   1; i <= length; i++){
      password += characters.charAt(Math.floor(Math.random() * characters.length +1));
    }
    setPassword(password);
  },[charAllowed, length, numberAllowed, setPassword]) //setPassword is not a dependency but it is added to remove the warning

  useEffect(() => {passwordGenerator()}, [charAllowed, length, numberAllowed]);

  const Copy_fn = useCallback(() => {
    window.navigator.clipboard.writeText(password); //I have access to the window object it's ultimately going to convert into JS and run in the browser, if I do the same in Next.js (all places where server side rendering happens, we don't have access to the window object)
    passwordRef.current?.select(); //setSelectionRange(0, 100) bhi de sakte he to specifically select 100 characters
    //Also isko ham useRef ke madad se highlight wagera kar sakte the aur maine ye function ke dependencies me password ki jagah passwordGenerator likh diya tha to wo previous value ko copy kar rha tha kyunki abhi tak passwordGenerator run nahi hua tha aur hamne previous value ko copy kar diya tha
  },[password]); 

  return (
    <div className='w-dvw h-dvh box-border bg-black text-white  flex justify-center items-center'>
      <div className='bg-gray-700 rounded-2xl p-10 font-medium'>
        <h1 className='text-4xl'>Password Generator</h1>
        <div className="placeholder flex items-center h-10 rounded-md my-2">
          <input type="text" value={password} className='text-black text-2xl rounded-l-lg text-center h-full'  ref= {passwordRef}  placeholder='password' readOnly />
          {/*name nahi balki value use karna hai  saari jagah 
          Aur ref ={passwordRef} input box me diya he taaki usko uthao bhai tum*/}
          <button className='bg-blue-700 rounded-r-lg text-xl h-full px-2 outline-none'onClick={Copy_fn}>Copy</button>
        </div>
        <div className="additional flex items-center justify-around my-2 w-[27rem]">
          <input type="range" value={length} min={8} max= {100}  onChange={(e)=> setLength(e.target.value)}/> 
          <label htmlFor='length' className='text-orange-500 px-1'>Length ({length})</label>
          <input type="checkbox" defaultChecked={numberAllowed} name="number" onClick={()=> setNumberAllowed(!numberAllowed)} />
          <label htmlFor='number' className='text-orange-500 px-1'>Numbers</label>
          <input type="checkbox" defaultChecked={charAllowed} name="char" onClick={()=>setCharAllowed(!charAllowed)} />
          <label htmlFor='char' className='text-orange-500 px-1'>Characters</label>
        </div> 
      </div>
    </div>
  )
}

export default App
