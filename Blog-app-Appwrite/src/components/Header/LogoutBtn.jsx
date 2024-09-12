import {useDispatch} from 'react-redux'
import authService from '../../appwrite (service)/auth'
import {logout} from '../../store/authSlice'
import {useNavigate} from 'react-router-dom'

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function logoutHandler(){
    authService.logout().then(()=>{
      dispatch(logout);
      navigate('/login');
    })
  }

  return (
    <div className='w-full'>
      <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler}>
        Logout
      </button>
    </div>
  )
}



export default LogoutBtn