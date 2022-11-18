import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAppContext } from '../../contexts/AppContext'
import PrimaryButton from '../../components/button'
import Input from '../../components/input'
import "./auth.css"
import Swal from 'sweetalert2';
const SignInPage = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const context = useAppContext()
  const navigate = useNavigate()
  const handleLogin = () => {
    if (email.length === 0) {
      showError("Por favor, insira o e-mail")
    }
    else if (password.length < 6) {
      showError("por favor insira a senha")
    }
    else {
      setLoading(true)
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          setLoading(false)
          const user = userCredential.user;
          context.setAuth(user)
          navigate("/users")
        })
        .catch((error) => {
          setLoading(false)
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage)
          showError("Por favor, insira e-mail e senha válidos")
        });
    }
  }

  const showError = (msg) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: msg,
    })
  }
  return (
    <div className='auth-main w-screen h-full min-h-screen flex bg-opacity-60'>
      <div className='w-full flex flex-1 items-center justify-center px-4 bg-black bg-opacity-10'>
        <div className='rounded-xl bg-black bg-opacity-80 w-full sm:w-3/4 md:w-600  px-12 py-8'>
          <div className='flex flex-col gap-6'>
            <img src="assets/image/logo_brand.png" alt='brand' className='w-10/12 md:w-1/2 mx-auto ' />
            <Input value={email} setValue={setEmail} className="outline-none" type="email" label="E-mail do usuário" />
            <Input value={password} setValue={setPassword} className="outline-none" type="password" label="Senha do usuário" />
            {loading ? <img src="/assets/image/rocketgif-small.gif" alt="logo" className='w-32 animate-bounce mx-auto mt-2'/> :
              <PrimaryButton className="mt-12 uppercase" onClick={() => { handleLogin() }}>Conecte-se</PrimaryButton>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInPage