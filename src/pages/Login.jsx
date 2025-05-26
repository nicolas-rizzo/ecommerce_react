import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/config'

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
        console.error('Error de autenticación:', err)
      setError('Credenciales inválidas')
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