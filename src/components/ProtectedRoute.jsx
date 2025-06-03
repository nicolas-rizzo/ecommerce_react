import { Navigate } from 'react-router-dom'
import { auth } from '../auth/firebase'

function ProtectedRoute ({ children }) {
  const user = auth.currentUser

  if (!user) {
    return <Navigate to='/login' replace />
  }

  if (user.email !== 'nicolasrizzo@gmail.com') {
    return <Navigate to='/' replace />
  }

  return children
}

export default ProtectedRoute
