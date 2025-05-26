import { signOut } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'
import { auth } from '../auth/firebase'
import Footer from './Footer'

function Layout({ children, cart }) {
  const user = auth.currentUser
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/')
  }

  return (
    <div className='layout'>
      <header>
        <nav className='navbar'>
          <Link to='/'>Inicio</Link>
          <Link to='/products'>Productos</Link>
          <Link to='/about'>Nosotros</Link>
          <Link to='/contact'>Contacto</Link>
          <Link to='/admin'>Admin</Link>
          <Link to='/cart'>Carrito ({cart.length})</Link>
          {!user ? (
            <Link to='/login'>Login</Link>
          ) : (
            <button onClick={handleLogout}>Cerrar sesión</button>
          )}
        </nav>
      </header>
      <main className='main-content'>
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default Layout