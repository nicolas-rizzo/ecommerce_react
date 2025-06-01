import { auth } from '../auth/firebase'

function Admin() {
  const user = auth.currentUser

  if (!user) {
    return (
      <div className='cta'>
        <h2>Acceso restringido</h2>
        <p>Debés iniciar sesión como administrador para acceder a esta sección.</p>
        <a className='btn-primary' href='/login'>Iniciar sesión</a>
      </div>
    )
  }

  return (
    <div className='admin-page'>
      <h2>Panel de administración</h2>
      <p>Bienvenido, {user.email}.</p>
    </div>
  )
}

export default Admin
