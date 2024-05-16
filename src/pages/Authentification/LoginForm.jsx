import { FaLock, FaUser } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import './LoginSignUp.css'
import { Header } from "./Header";
import axios from "axios";


export function LoginForm({setLogin}){

    // login identifiant
    const [inputValues, setInputValues] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()


    const handleSubmit = (e)=>{
        e.preventDefault()

        axios.post('http://localhost:8080/', inputValues)
        .then(res => {
            setLogin(true)
            navigate('/superadmin')
            return res
        })
        .catch(err => console.log(err))


    }


    return <main>
        <Header title='Se connecter'/>
        <form onSubmit={handleSubmit} method="post" className="form">
            <div className="login-section">
                <label htmlFor="email">Login</label>
                <input 
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