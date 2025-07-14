import { signOut } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../auth/firebase'
import { useCart } from '../context/CartContext'

const ADMIN_UID = 'btXg6Ucfj2XU0nHJ1dHTUkhkdQl1' //aca debería ir el uid del admin en firebase.

function Header () {
  const user = auth.currentUser
  const navigate = useNavigate()
  const { cart } = useCart()

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
        {user?.uid === ADMIN_UID && <Link to='/admin'>Admin</Link>}
        <Link to='/cart'>Carrito{cart.length > 0 && ` (${cart.length})`}</Link>
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