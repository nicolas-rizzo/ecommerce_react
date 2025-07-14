import { signOut } from 'firebase/auth'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { auth } from '../auth/firebase'
import { useCart } from '../context/CartContext'

function Header () {
  const user = auth.currentUser
  const navigate = useNavigate()
  const location = useLocation()
  const { cart } = useCart()

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/')
  }

  const isActive = (path) => location.pathname === path ? 'active-link' : ''

  return (
    <header>
      <nav className='navbar'>
        <Link to='/' className={isActive('/')}>Inicio</Link>
        <Link to='/products' className={isActive('/products')}>Productos</Link>
        <Link to='/about' className={isActive('/about')}>Nosotros</Link>
        <Link to='/contact' className={isActive('/contact')}>Contacto</Link>
        {user !== null && <Link to='/admin' className={isActive('/admin')}>Admin</Link>}
        <Link to='/cart' className={isActive('/cart')}>
          Carrito{cart.length > 0 && ` (${cart.length})`}
        </Link>
        {!user ? (
          <Link to='/login' className={isActive('/login')}>Login</Link>
        ) : (
          <button onClick={handleLogout}>Cerrar sesión</button>
        )}
      </nav>
    </header>
  )
}

export default Header
