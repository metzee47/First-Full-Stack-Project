import { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { SignUpForm } from './components/SignUpForm';
import './App.css';


function App() {

  const [wantSignUp, setWantSignUp] = useState(false)
  const [wantLogin, setWantLogin] = useState(true) 

  // login identifiant
  const [nameUser, setNameUser] = useState('')
  const [passwordUser, setPasswordUser] = useState('')

  // sign-up identifiant
  const [name, setName] = useState('')
    const [prename, setPreName] = useState('')
    const [tel, setTel] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

  // onclick login button
  const handleLogin = () => {
    setWantSignUp(false)
    setWantLogin(true)
  }

  // onclick sign up button
  const handleSignUp = () => {
    setWantLogin(false)
    setWantSignUp(true)
  }


  return <div className='log-interface'>
    {
    wantSignUp && 
    <SignUpForm 
      handleLogin={handleLogin}
      name={name}
      setName={setName}
      prename={prename}
      setPreName={setPreName}
      tel={tel}
      setTel={setTel}
      password={password}
      setPassword={setPassword}
      passwordConfirm={passwordConfirm}
      setPasswordConfirm={setPasswordConfirm}

      />}

    {
      wantLogin && 
      <LoginForm 
        handleSignUp={handleSignUp} 
        login={nameUser} 
        password={passwordUser} 
        setName={setNameUser} 
        setPassword={setPasswordUser}
      />
    }
  </div>
  
}

export default App;
