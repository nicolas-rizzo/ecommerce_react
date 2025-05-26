import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDTleK142TZdafVzGRPFk38sG_2v4xPNlM",
  authDomain: "pruebaauth-8d84a.firebaseapp.com",
  projectId: "pruebaauth-8d84a",
  storageBucket: "pruebaauth-8d84a.firebasestorage.app",
  messagingSenderId: "146045145989",
  appId: "1:146045145989:web:d738e839d9e89bf9d52aec"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)