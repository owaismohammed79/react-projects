import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
//Outlet is used to render the child components of the parent component in the router, Also elements are rendered in the place of Outlet dynamically


function Layout() {
  return (
    <>
        <Header />
        <Outlet /> 
        <Footer />
    </>
  )
}

export default Layout