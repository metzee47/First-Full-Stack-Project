import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import './Render.css'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


// icon imports
import { FaDeleteLeft } from "react-icons/fa6";
import { AiFillEdit } from "react-icons/ai";
import { FaLock, FaUser,FaPhoneAlt } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";



export function RenderAllUsers(){

    const index = ['Id user', 'Login user', 'Nom user', 'Prenom user', 'Telephone user', 'Password user', 'Type User', 'Note user']

    const [userData, setUserData] = useState([])

    const navigate = useNavigate()

    useEffect(()=>{
        fetch('http://localhost:8080/users')
        .then(res => res.json())
        .then(data => {
            setUserData(data)
        })
        .catch(err => console.error('Error:', err));
    }, [])

    // delete user
    /*
    const handleDelete = () =>{

        axios.delete(`http://localhost:8080/superadmin/users`,{
            params: {
                id:currentId
            }
        })
          .then(res => res)
          .catch(err => console.log(err))
    }

    */

    const handleDelete = async (id) => {

        try {
          const response = await axios.delete(`http://localhost:8080/superadmin/users/${id}`)
          return response.data
        } catch (error) {
          console.error('Erreur lors de la suppression des données:', error)
        } 
      }

    return(   
        <div className="container">
            <button
                type="button" 
                className="add-user" 
                onClick={()=> {
                    navigate('/superadmin/users/new-user')
                    }}>
                <MdAdd/>Add new user
            </button>
            <table >
                <thead>
                    <tr>
                        {index.map(i=>{
                            return <td >{i}</td>
                        })}
                    </tr>
                </thead>

                <tbody>
                    {userData.map(user=>{

                        return <tr key={user.id_User} id={user.id_User}>
                            <td >{user.id_User} </td>
                            <td >{user.login_User}</td>
                            <td >{user.nom_User}</td>
                            <td >{user.prenom_User}</td>
                            <td >{user.tel_User}</td>
                            <td >{user.password_User}</td>
                            <td >{user.type_User}</td>
                            <td >{user.note_User}</td>
                            <td onClick={(e)=> 
                                handleDelete(e.currentTarget.parentNode.id)}>
                                    <FaDeleteLeft className="delete-icon icon" /></td>
                            <td><AiFillEdit className="edit-icon icon"/></td>

                        </tr>
                    })}
                </tbody>
            </table>

        </div>

    )
}


export function AddNewUser(){


    const AddUserInterface = () =>{

        const [inputValues, setInputValues] = useState(
            {
                name: '',
                prename: '',
                tel: '',
                email: '',
                password: '',
                usertype: 'User',
            }
        )

        const navigate = useNavigate()

        const handleSubmit = (e) => {
            e.preventDefault()            

            const checkIsValid = () =>{

                const isValid = 
                    inputValues.name !== '' &&
                    inputValues.prename !== '' &&
                    inputValues.tel !== '' &&
                    inputValues.email !== '' &&
                    inputValues.password !== ''

                return isValid
            }

            if(checkIsValid()){
                axios.post('http://localhost:8080/superadmin/users/new-user', inputValues)
                    .then(res => {
                        navigate('/superadmin/users')
                        return res
                    })
                    .catch(err => console.log(err))     
            }
            
            console.log(inputValues)

        }

        return (
            <div className="container">
                <form method="POST" className="add-form" onSubmit={handleSubmit}>
                    <div className="add-user-section">
                        <label htmlFor="nom">Nom</label>
                        <input 
                            id="name"
                            className='login-input'
                            type='text'
                            value={inputValues.name}
                            onChange={(e)=> setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))}
                            required
                            />
                            <FaUser className="icon"/>
                    </div>
        
                    <div className="add-user-section">
                        <label htmlFor="prenom">Prenom</label>
                        <input 
                            id="prename"
                            className='login-input'
                            type='text'
                            value={inputValues.prename}
                            onChange={(e)=> setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))}
                            required
                            />
                            <FaUser className="icon"/>
                    </div>
        
                    <div className="add-user-section">
                        <label htmlFor="email">Email</label>
                        <input 
                            id="email"
                            className='login-input'
                            type='text'
                            value={inputValues.email}
                            onChange={(e)=> setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))}
                            required
                            />
                            <IoMdMail className="icon"/>
                    </div>
        
                    <div className="add-user-section">
                        <label htmlFor="telephone">Telephone</label>
                        <input 
                            id="tel"
                            className='login-input'
                            type='text'
                            value={inputValues.tel}
                            onChange={(e)=> setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))}
                            required
                            />
                            <FaPhoneAlt className="icon"/>
                    </div>
        
                    <div className="add-user-section">
                        <label htmlFor="password">Mot de passe</label>
                        <input 
                            id="password"
                            className='password-input'
                            autoComplete="off"
                            type='password'
                            value={inputValues.password}
                            onChange={(e)=> setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))}
                            required
                            />
                            <FaLock className="icon"/>
        
                    </div>
        
                    <div className="add-user-section">
                        <label htmlFor="userType">Type d'utilisateur</label>
                        <select 
                            id="usertype"
                            value={inputValues.usertype} 
                            onChange={(e)=> {
                                setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))
                                
                            }
                            }
                            >
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                                <option value="Super admin">Super admin</option>
                        </select>
                            <FaUserGear className="icon"/>
                    </div>
            
        
                    <button 
                        type="submit" 
                        className="add-user-button">
                    Add user
                    </button>
                    
        
                </form>
            </div>
        )
    }

    


    return (
        <div className="add-user-container">
            <AddUserInterface/>
        </div>
    )
}


