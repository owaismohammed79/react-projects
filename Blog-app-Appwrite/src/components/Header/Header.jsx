import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header({isActive, setIsActive}) {
  const auth = useSelector((state) => state.auth) 
  const navigate = useNavigate()
  const authStatus = auth.status

  //Watch how every nav item also has a active status and SLUG 
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: authStatus,
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]


  return (
    <header className='py-3 shadow bg-indigo-600'>
      <Container>
        <nav className='flex'>
        
          <div className='flex items-center'>
            <Link to='/'>
              <Logo width='80' height='56' />
            </Link>
          </div>

          <ul className='flex ml-auto items-center'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                {/*On clicking the nav buttons, we'll navigate to the desired slug*/}
                <button
                onClick={() => {
                  navigate(`${item.slug}`)
                  setIsActive(item.slug)
                }}
                className={`flex mt-2 px-6 py-2 text-white duration-200 hover:bg-indigo-400 rounded-full gap-1 ${isActive ===item.slug ? 'bg-indigo-400' : ''}`}>
                  <div>{item.name}</div>
                </button>
              </li>
            ) : null
            )}
            
            {//Checking the authStatus and then displaying the logout button
              authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header