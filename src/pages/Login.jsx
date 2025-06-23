import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../auth/firebase'

function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/')
    } catch (err) {
      console.error('Error de autenticación:', err.message, err.code)
      
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-email' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Usuario o contraseña invalidos, reintente nuevamente.')
      } else {
        setError('Ocurrió un error al iniciar sesión. Inténtalo de nuevo más tarde.')
      }
    }
  }

  return (
    <section className='login'>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Contraseña'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit'>Ingresar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </section>
  )
}

export default Login