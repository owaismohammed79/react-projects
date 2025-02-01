import {useState} from 'react'
import {Link, useNavigate } from 'react-router-dom'
import {Button, Logo, Input} from './index'
import { useForm } from 'react-hook-form'
import authService from '../appwrite (service)/auth'
import {login as authLogin} from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useOutletContext } from 'react-router-dom'

function Signup() {
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { setIsActive } = useOutletContext();
    const {register, handleSubmit, formState: {errors}} = useForm()

    const create = async ({email, password}) => {
        setError("")
        try {
            const session = await authService.createAccount({email, password})
            if(session){
                const userData = await authService.getCurrentUser()
                if(userData) {
                    dispatch(authLogin(userData))
                    navigate("/")
                } else {
                    setError("Failed to get user data after account creation")
                }
            } else {
                setError("An account with this email already exists")
            }
        } catch (error) {
            setError(error.message || "An error occurred during signup")
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-200 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        onClick={()=>setIsActive('/login')}
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        {errors.email && <p className="text-red-600 mt-8 text-center">{errors.email.message}</p>}
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", { 
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        {errors.password && <p className="text-red-600 mt-8 text-center">{errors.password.message}</p>}
                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", { 
                            required: true,
                            validate: {
                            matchPattern: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value) ||
                            "Password should be at least 8 characters long with lower, upperCase alphabets and number"
                            }
                        })}
                        />
                        <Button type="submit" className="w-full"> Create Account </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup