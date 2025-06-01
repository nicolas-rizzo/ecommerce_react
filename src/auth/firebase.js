import { initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'

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

export function crearUsuario(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    console.log("Credenciales de usuario:", userCredential);
    const user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.error("Error al crear usuario:", errorCode, errorMessage);
    // ..
  });
}