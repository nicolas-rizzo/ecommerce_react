import { signOut } from 'firebase/auth'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'
import { auth } from '../auth/firebase'

function Header ({ cart }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const user = auth.currentUser
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/')
  }

  const toggleMenu = () => setMenuOpen(prev => !prev)

  return (
    <header>
      <button className='menu-toggle' onClick={toggleMenu}>
        ☰
      </button>
      <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
        <Link to='/' onClick={() => setMenuOpen(false)}>Inicio</Link>
        <Link to='/products' onClick={() => setMenuOpen(false)}>Productos</Link>
        <Link to='/about' onClick={() => setMenuOpen(false)}>Nosotros</Link>
        <Link to='/contact' onClick={() => setMenuOpen(false)}>Contacto</Link>
        {user?.uid === import.meta.env.VITE_ADMIN_UID && (
          <Link to='/admin' onClick={() => setMenuOpen(false)}>Admin</Link>
        )}
        <Link to='/cart' onClick={() => setMenuOpen(false)}>
          Carrito{cart.length > 0 && ` (${cart.length})`}
        </Link>
        {!user ? (
          <Link to='/login' onClick={() => setMenuOpen(false)}>Login</Link>
        ) : (
          <button onClick={() => { handleLogout(); setMenuOpen(false) }}>Cerrar sesión</button>
        )}
      </nav>
    </header>
  )
}

export default Header
