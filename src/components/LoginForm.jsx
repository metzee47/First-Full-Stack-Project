import { FaLock, FaUser } from "react-icons/fa";


import './LoginSignUp.css'
import { Header } from "./Header";


export function LoginForm({handleSignUp, login, password, setName, setPassword}){

    


    const handleSubmit = (e)=>{
        e.preventDefault()
    }


    return <main>
        <Header title='Se connecter'/>
        <form onSubmit={handleSubmit}>
            <div className="login-section">
                <label htmlFor="login">Nom d'utilisateur</label>
                <input 
                    id="login"
                    className='login-input'
                    type='text'
                    placeholder='Saisir votre nom'
                    value={login}
                    onChange={(e)=> setName(e.target.value)}
                    required
                    />
                    <FaUser className="icon"/>
            </div>

            <div className="password-section">
                <label htmlFor="password">Mot de passe</label>
                <input 
                    className='password-input'
                    type='password'
                    placeholder='Saisir votre mot de passe'
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    required
                    />
                    <FaLock className="icon"/>
            </div>

            <div className="log-button">
                <button type="button">Me connecter</button>
                <a href="">Mot de passe oublié ?</a>
            </div>

            <div className="sign-up-button">
                <a onClick={handleSignUp}>Je n'ai pas de compte</a>
                <button type="button" onClick={handleSignUp}>M'inscrire</button>
            </div>
    </form>
    </main>
}