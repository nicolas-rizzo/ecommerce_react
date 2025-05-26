import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Swal from 'sweetalert2'
import Layout from './components/Layout'
import { auth } from './firebase/config'
import About from './pages/About'
import Admin from './pages/Admin'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetail'
import Products from './pages/Products'

function App () {
  const [user, setUser] = useState(null)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart')
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setCheckingAuth(false)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id)
      if (exists) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: `Se agregó otra unidad de "${product.name}"`,
          showConfirmButton: false,
          timer: 1500
        })
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: `Producto "${product.name}" agregado al carrito`,
          showConfirmButton: false,
          timer: 1500
        })
        return [...prev, { ...product, quantity: 1 }]
      }
    })
  }

  if (checkingAuth) return <p>Cargando autenticación...</p>

  return (
    <Router>
      <Layout cart={cart}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products addToCart={addToCart} />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/admin' element={user?.email === 'admin@midominio.com' ? <Admin /> : <Navigate to='/' />} />
          <Route path='/product/:id' element={<ProductDetail addToCart={addToCart} />} />
          <Route path='/cart' element={<Cart cart={cart} setCart={setCart} />} />
          <Route path='/login' element={<Login />} />
          <Route
            path='/protected'
            element={user ? <h2>Ruta protegida</h2> : <Navigate to='/login' />}
          />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
