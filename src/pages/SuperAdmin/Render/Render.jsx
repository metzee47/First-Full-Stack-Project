import { useEffect, useState } from "react";
import './Render.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";


// icon imports
import { FaDeleteLeft } from "react-icons/fa6";
import { AiFillEdit } from "react-icons/ai";
import { FaLock, FaUser,FaPhoneAlt } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { MdAdd } from "react-icons/md";
import { BiSolidHide } from "react-icons/bi";
import { useRef } from "react";



export function RenderAllUsers({addButton,indexDb, inputValues, setInputValues, path, hidePassword,handleClick}){


    const [userData, setUserData] = useState([])
    const [showUpdate, setShowUpdate] = useState(false)

    const navigate = useNavigate()

    useEffect(()=>{
        fetch(`http://localhost:8080/${path}`)
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
          const response = await axios.delete(`http://localhost:8080/superadmin/${path}/${id}`)
            fetch(`http://localhost:8080/${path}`)
                .then(res => res.json())
                .then(data => {
                    setUserData(data)
                })
                .catch(err => console.error('Error:', err));
            return response.data
        } catch (error) {
          console.error('Erreur lors de la suppression des données:', error)
        } 
      }

    



    const handleUpdate = (e) => {

        e.preventDefault()
        setTimeout(()=> {
            setShowUpdate(false)
            containerRef.current.className = 'opacity'
        }, 2000)
        /*
        axios.put(`http://localhost:8080/superadmin/users/update-${inputValues.id}`, inputValues)
        .then(res => res)           
        .catch (error => console.log('Erreur lors de la modification des données:', error)) 
        */    
        
    } 

    

    const containerRef = useRef()
    const formRef = useRef()

    return(   
        <div className="container">
            <div className="opacity" ref={containerRef}>
                <button
                    type="button" 
                    className="add-user" 
                    onClick={()=> {
                        navigate('/superadmin/users/new-user')
                        }}>
                    <MdAdd/>{addButton}
                </button>
                <table >
                    <thead>
                        <tr>
                            {indexDb.map(i=>{
                                return <td >{i}</td>
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {userData.map(user=>{

                            return <tr key={user.id_User} id={user.id_User}>
                                <td >{user.id_User}</td>
                                <td >{user.login_User}</td>
                                <td >{user.nom_User}</td>
                                <td >{user.prenom_User}</td>
                                <td >{user.tel_User}</td>
                                <td ><BiSolidHide onClick={(e)=> {
                                    setShowPassword(!showPassword)
                                    }}/>{showPassword ? user.password_User : hidePassword(user.password_User)}</td>
                                <td >{user.type_User}</td>
                                <td >{user.note_User}</td>
                                <div className="icon-button">
                                    <span onClick={(e)=> 
                                        handleDelete(e.currentTarget.parentNode.parentNode.id)}>
                                            <FaDeleteLeft className="delete-icon icon" /></span>
                                    <span 
                                        className='id'
                                        id={user.id_User}
                                        onClick={(e)=>{
                                            handleClick(e.currentTarget.id)
                                            containerRef.current.className = 'container-opacity'
                                            setShowUpdate(true)                                                                        
                                            }}>
                                            <AiFillEdit className="edit-icon icon"/></span>
                                </div>

                            </tr>
                        })}
                    </tbody>
                </table>
            </div>

            {
                showUpdate && 
                <form action="POST" onSubmit={handleUpdate} className="update-user" ref={formRef}>
                    <input 
                        type="text" 
                        id="email"
                        className='login-input'
                        placeholder="mail user"
                        value={inputValues.email}
                        onChange={(e)=> setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))}
                        required/>

                    <input 
                        type="text" 
                        id="name"
                        placeholder="votre nom"
                        className='login-input'
                        value={inputValues.name}
                        onChange={(e)=> setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))}
                        required/>
                    <input 
                        type="text" 
                        id="prename"
                        placeholder="votre prenom"
                        className='login-input'
                        value={inputValues.prename}
                        onChange={(e)=> setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))}
                        required/>

                    <input 
                        type="text" 
                        id="tel"
                        placeholder="telephone"
                        className='login-input'
                        value={inputValues.tel}
                        onChange={(e)=> setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))}
                        required/>
                    
                    <input 
                        type="text" 
                        id="password"
                        placeholder="mot de passe"
                        className='login-input'
                        value={inputValues.password}
                        onChange={(e)=> setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))}
                        required/>

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

                    <input 
                        type="text" 
                        id="note"
                        placeholder="note user"
                        className='login-input'
                        value={inputValues.note}
                        onChange={(e)=> setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))}
                        required/>
                    
                    <button type="submit">Update</button>

                </form>
            }

        </div>

    )
}


export function AddNewUser(){  
    
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
        
    }

    return (
        <div className="add-user-container">
            <Add_UpInterface 
                handleSubmit={handleSubmit} 
                button='Add user' 
                inputValues={inputValues} 
                setInputValues={setInputValues}/>
        </div>
    ) 
}


function Add_UpInterface({handleSubmit,button, inputValues, setInputValues}){

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
                    {button}
                    </button>
                    
        
                </form>
            </div>
    )
}


