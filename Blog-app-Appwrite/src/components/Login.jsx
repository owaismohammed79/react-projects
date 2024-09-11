import {useState} from 'react'
import {Input, Button, Logo} from './index'
import {useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import authService from '.././appwrite (service)/auth'
import {login as authLogin} from '../store/authSlice'
import {useForm} from 'react-hook-form'

function Login() {
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm() //Idhar handleSubmit is predefined fn name he change nahi kar sakte
    //register ek function he jo ki kuch i/p leke kuch props inject karta he us component me taaki usko monitor kar sake

    const handleLogin = async (data) => { //useForm use karne ka yahi use case he ki saara data ko validate karo and
      //i/p boxes se data collect karke object ke form me send karta he
      setError("")
      try { //try catch again yaad karo ki agar appwrite me koi server errors and stuff ke lie
        const session = await authService.login(data) //Saare appwrite operations async he soo
        if(session){ //userData extract is lie karte he ki session management, security and access details ke lie
          const userData = await authService.getCurrentUser()
          if(userData) dispatch(authLogin(userData)) //Agar userData milega nahi to store me dispatch hi nahi hoga ki logged in he
          navigate("/")
        }
      } catch (error) {
        setError(error.message)
      }
    } 

  return (
    <div className='flex items-center justify-center w-full'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
              <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link to="/signup" className="font-medium text-primary transition-all duration-200 hover:underline">
              Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(handleLogin)} className='mt-8'>
          <div className='space-y-5'>
            <Input
            label="Email: "
            placeholder="Enter your email"
            type="email"
            {...register("email", { //Here email is unique name of the i/p field, 2nd arg is an object trying to do validation 
                required: true,
                validate: {
                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                } //Regex can be generated online for @ and .com and stuff if doesn't contain then error msg and see that there's
                //.test(value) to check if it is in the format or not and Regex start and end with /
            })}
            />
            <Input
            label="Password: "
            type="password"
            placeholder="Enter your password"
            {...register("password", { //Here ... is the syntax that is how you should use in all i/p fields
                required: true,
                validate: {
                  matchPattern: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value) ||
                  "Password should be at least 8 characters long with lower, upperCase alphabets and number"
                }
            })}
            />
            <Button type="submit" className="w-full"> Sign in </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login