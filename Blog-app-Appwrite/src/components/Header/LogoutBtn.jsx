import {useDispatch} from 'react-redux'
import authService from '../../appwrite (service)/auth'
import {logout} from '../../store/authSlice'
import {useNavigate} from 'react-router-dom'

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function logoutHandler(){
    try {
      authService.logout()
        dispatch(logout()); //Idhar galti kar raha tha, function ko karna hota he
        navigate('/login');
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <div className='w-full'>
      <button className='px-3 mt-2 py-4 text-white duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler}>
        Logout
      </button>
    </div>
  )
}



export default LogoutBtn