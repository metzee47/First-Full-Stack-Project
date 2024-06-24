import { FaLock, FaUser } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


import './LoginSignUp.css'
import { Header } from "./Header";
import axios from "axios";


export function LoginForm(){

    // login identifiant
    const [inputValues, setInputValues] = useState({
        email: '',
        password: ''
    })

    const [correctLogs, setCorrectLogs] = useState(true)

    const navigate = useNavigate()


    const handleSubmit = async (e) =>{
        e.preventDefault()


        try {

            const response = await axios.post('http://localhost:5050/', inputValues);
                localStorage.setItem('login', true)
                navigate('/superadmin/users')
            
        } catch (error) {
            console.error('Une erreur s\'est produite : ', error);
            setCorrectLogs(false)
                setTimeout(()=>{
                    setCorrectLogs(true)
                    setInputValues(inputValues =>({...inputValues, ['email']: '', ['password']: ''}))
                }, 1500)
                
                loginRef.current.focus()
        }

        /*
        axios.post('http://localhost:5050/', inputValues)
        .then(res => {
            setLogin(true)
            navigate('/superadmin/users')
            return res
        })
        .catch(err => {
            setCorrectLogs(false)
            setTimeout(()=>{
                setInputValues(inputValues =>({...inputValues, ['email']: '', ['password']: ''}))
                setCorrectLogs(true)
            }, 1500)

            loginRef.current.focus()
            console.log(err)

        })
        */

    }

    const loginRef = useRef()

    useEffect(()=>{
        loginRef.current.focus()
    }, [])


    return <main>
        <Header title='Se connecter'/>
        <form onSubmit={handleSubmit} method="post" className="form">

            {
                !correctLogs && 
                <div className="check-log">
                    <ImCross className="cross-icon"/>
                    <span> Login ou mot de passe incorrect</span>
                </div>
            }

            <div className="login-section">
                <label htmlFor="email">Login</label>
                <input 
                    ref={loginRef}
                    id="email"
                    className='login-input'
                    type='email'
                    placeholder='Saisir votre @mail'
                    value={inputValues.email}
                    onChange={(e)=> setInputValues(inputValues =>({...inputValues, [e.target.id]: e.target.value}))}
                    required
                    />
                    <FaUser className="icon"/>
            </div>

            <div className="password-section">
                <label htmlFor="password">Mot de passe</label>
                <input 
                    id="password"
                    className='password-input'
                    type='password'
                    placeholder='Saisir votre mot de passe'
                    value={inputValues.password}
                    onChange={(e)=> setInputValues(inputValues =>({...inputValues, [e.target.id]: e.target.value}))}
                    required
                    />
                    <FaLock className="icon"/>
            </div>

            <div className="log-button">
                <button type="submit">Me connecter</button>
                <a href="">Mot de passe oublié ?</a>
            </div>

            <div className="sign-up-button">
                <a onClick={()=>navigate('/sign-up')}>Je n'ai pas de compte</a>
                <button type="button" onClick={()=>navigate('/sign-up')}>M'inscrire</button>
            </div>
        </form>  
        
    
    </main>
}