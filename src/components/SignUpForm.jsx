import { Header } from "./Header";
import { FaLock, FaUser,FaPhoneAlt } from "react-icons/fa";
import './LoginSignUp.css'


export function SignUpForm({handleLogin, name, prename, tel, password, passwordConfirm,
    setName, setPreName, setTel, setPassword, setPasswordConfirm
}){

    const handleSubmit = (e)=>{
        e.preventDefault()
    }

    return <main>
        <Header title="S'inscrire"/>
        <form onSubmit={handleSubmit}>
            <div className="login-section">
                <label htmlFor="nom">Nom</label>
                <input 
                    id="nom"
                    autoComplete="off"
                    className='login-input'
                    type='text'
                    placeholder="Nom d'utilisateur"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    required
                    />
                    <FaUser className="icon"/>
            </div>

            <div className="login-section">
                <label htmlFor="prenom">Prenom</label>
                <input 
                    id="prenom"
                    autoComplete="off"
                    className='login-input'
                    type='text'
                    placeholder="Prenom d'utilisateur"
                    value={prename}
                    onChange={(e)=> setPreName(e.target.value)}
                    required
                    />
                    <FaUser className="icon"/>
            </div>

            <div className="login-section">
                <label htmlFor="telephone">Telephone</label>
                <input 
                    id="telephone"
                    autoComplete="off"
                    className='login-input'
                    type='text'
                    placeholder="+212745345697"
                    value={tel}
                    onChange={(e)=> setTel(e.target.value)}
                    required
                    />
                    <FaPhoneAlt className="icon"/>
            </div>

            <div className="password-section">
                <label htmlFor="password">Mot de passe</label>
                <input 
                    className='password-input'
                    autoComplete="off"
                    type='password'
                    placeholder='Saisir votre mot de passe'
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    required
                    />
                    <FaLock className="icon"/>
            </div>

            <div className="password-section">
                <label htmlFor="password">Confirmation mot de passe</label>
                <input 
                    autoComplete="off"
                    className='password-input'
                    type='password'
                    placeholder='Confirmer mot de passe'
                    value={passwordConfirm}
                    onChange={(e)=> setPasswordConfirm(e.target.value)}
                    required
                    />
                    <FaLock className="icon"/>
            </div>

            <div className="log-button">
                <button type="button">M'inscrire</button>
            </div>

            <div className="sign-up-button">
                <a onClick={handleLogin}>J'ai déjà un compte</a>
                <button type="button" onClick={handleLogin}>Me connecter</button>
            </div>
    </form>
    </main>
}