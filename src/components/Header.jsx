import { signOut } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../auth/firebase'

function Header ({ cart }) {
  const user = auth.currentUser
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/')
  }

  return (
    <header>
      <nav className='navbar'>
        <Link to='/'>Inicio</Link>
        <Link to='/products'>Productos</Link>
        <Link to='/about'>Nosotros</Link>
        <Link to='/contact'>Contacto</Link>
        <Link to='/admin'>Admin</Link>
        <Link to='/cart'>
          Carrito{cart.length > 0 && ` (${cart.length})`}
        </Link>
        {!user ? (
          <Link to='/login'>Login</Link>
        ) : (
          <button onClick={handleLogout}>Cerrar sesión</button>
        )}
      </nav>
    </header>
  )
}

export default Header
