import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import  axios  from 'axios'
import { Header } from "./Header";
import { FaLock, FaUser,FaPhoneAlt } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import './LoginSignUp.css'


export function SignUpForm(){

    // sign-up user data
    const [inputValues, setInputValues] = useState(
        {
            name: '',
            prename: '',
            tel: '',
            email: '',
            password: '',
            
        }
    )

    const [passwordConfirm, setPasswordConfirm] = useState('')
    // const [userTypePassword, setUserTypePassword] = useState('')
    // const [showUserTypePassword, setShowUserTypePassword] = useState(false)

    /*
    useEffect(()=>{
        if(inputValues.userType == 'Admin' || inputValues.userType == 'Super admin')
            setShowUserTypePassword(true)
        if(inputValues.userType === 'User')
            setShowUserTypePassword(false)

    }, [inputValues.userType])

    */

    // useNavigate here
    const navigate = useNavigate()

    // check if passwords matching or empty champ existing
    const checkIsValid = () =>{

        /*

        const rightUserTypePassword = () => {
            if(inputValues.userType ==='Admin')
                return userTypePassword === 'adminUser'
            else if(inputValues.userType ==='Super admin')
                return userTypePassword === 'superAdminUser'
            else
                return true
        }

        */

        const emptyChamp = 
        inputValues.name !== '' && 
        inputValues.prename !== '' && 
        inputValues.email !== '' &&
        inputValues.tel !== '' &&
        inputValues.password !== '' &&
        passwordConfirm !== '' &&
        inputValues.userType !== '' 
        // rightUserTypePassword()
        
        const passwordMatching = inputValues.password === passwordConfirm

        if(!passwordMatching) alert('Passwords dont matching')
        // if(!rightUserTypePassword) alert ('Mot de passe admin ou super admin incorrect')

        return (emptyChamp && passwordMatching)
        
    }   

    // handle submitting form to the backend
    const handleSubmit = (e)=>{
        e.preventDefault()

        if (checkIsValid()){
                       
            axios.post('http://localhost:8080/sign-up', inputValues)
            .then(res => {
                navigate('/')
                return res
            })
            .catch(err => console.log(err))
        }
       
    }
    
    return <main>
        <Header title="S'inscrire"/>
        <form method="POST" onSubmit={handleSubmit}>
            <div className="login-section">
                <label htmlFor="nom">Nom</label>
                <input 
                    id="name"
                    autoComplete="off"
                    className='login-input'
                    type='text'
                    placeholder="Nom d'utilisateur"
                    value={inputValues.name}
                    onChange={(e)=> setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))}
                    required
                    />
                    <FaUser className="icon"/>
            </div>

            <div className="login-section">
                <label htmlFor="prenom">Prenom</label>
                <input 
                    id="prename"
                    autoComplete="off"
                    className='login-input'
                    type='text'
                    placeholder="Prenom d'utilisateur"
                    value={inputValues.prename}
                    onChange={(e)=> setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))}
                    required
                    />
                    <FaUser className="icon"/>
            </div>

            <div className="login-section">
                <label htmlFor="email">Email</label>
                <input 
                    id="email"
                    autoComplete="off"
                    className='login-input'
                    type='text'
                    placeholder="nom@fadesol.ma"
                    value={inputValues.email}
                    onChange={(e)=> setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))}
                    required
                    />
                    <IoMdMail className="icon"/>
            </div>

            <div className="login-section">
                <label htmlFor="telephone">Telephone</label>
                <input 
                    id="tel"
                    autoComplete="off"
                    className='login-input'
                    type='text'
                    placeholder="+212745345697"
                    value={inputValues.tel}
                    onChange={(e)=> setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))}
                    required
                    />
                    <FaPhoneAlt className="icon"/>
            </div>

            <div className="password-section">
                <label htmlFor="password">Mot de passe</label>
                <input 
                    id="password"
                    className='password-input'
                    autoComplete="off"
                    type='password'
                    placeholder='Saisir votre mot de passe'
                    value={inputValues.password}
                    onChange={(e)=> setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))}
                    required
                    />
                    <FaLock className="icon"/>
            </div>

            <div className="password-section">
                <label htmlFor="passwordConfirm">Confirmation mot de passe</label>
                <input 
                    id="passwordConfirm"
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
                <button type="submit">M'inscrire</button>
            </div>

            <div className="sign-up-button">
                <a onClick={()=>navigate('/')}>J'ai déjà un compte</a>
                <button type="button" onClick={()=>navigate('/')}>Me connecter</button>
            </div>
        </form>

    </main>
}

// setting of userType

/*

            <div className="password-section">
                <label htmlFor="userType">Type d'utilisateur</label>
                <select 
                    id="userType"
                    value={inputValues.userType} 
                    onChange={(e)=> {
                        setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))
                        
                    }
                    }>
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                        <option value="Super admin">Super admin</option>
                </select>
                    <FaUserGear className="icon"/>
            </div>

{
    showUserTypePassword && 
    <div className="password-section">
    <label htmlFor="userTypePassword">Mot de passe {inputValues.userType}</label>
    <input 
        id="userTypePassword"
        autoComplete="off"
        className='password-input'
        type='password'
        placeholder='Saisir mot de passe'
        value={userTypePassword}
        onChange={(e)=> {setUserTypePassword(e.target.value)}}
        required
        />
        <FaLock className="icon"/>
</div>
}

*/