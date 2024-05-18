import { useEffect, useState } from "react";
import './Render.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";


// icon imports
//import { FaLock, FaUser,FaPhoneAlt } from "react-icons/fa";
//import { FaUserGear } from "react-icons/fa6";
//import { IoMdMail } from "react-icons/io";
//import { BiSolidHide } from "react-icons/bi";
import { FaDeleteLeft } from "react-icons/fa6";
import { AiFillEdit } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { useRef } from "react";



function RenderAll({addButton,titles, indexDb, inputKeys, inputValues, 
    setInputValues, path, hidePassword, showPassword, setShowPassword,
    subPath}){


    const [userData, setUserData] = useState([])
    const [showUpdate, setShowUpdate] = useState(false)
    const [sortBy, setSortBy] = useState('Id User')

    const navigate = useNavigate()

    // get users, products, fournisseurs, vente or achat infos from backend
    const getInfos = () =>{
        fetch(`http://localhost:5050/${path}`)
                .then(res => res.json())
                .then(data => {
                    setUserData(data)
                })
        .catch(err => console.error('Error:', err));
    }

    // load users infos from database
    useEffect(()=>{
        getInfos()
    }, [])

    
    /*

    useEffect(()=>{
        if(sortBy === 'Type User'){
            let userDataUsertype = []
            userDataUsertype = userData.sort((firstUser,lastUser) => {
                const firstUsertype = firstUser.type_User.toUpperCase()
                const lastUserType = lastUser.type_User.toUpperCase()

                if (firstUsertype < lastUserType)
                    return 1

                if(firstUsertype > lastUserType)
                    return -1

                return 0
            })

            setUserData(userDataUsertype)
            console.log(userData)
        }

        if(sortBy === 'Id User'){
            setUserData(userData)
        }

    }, [sortBy])

    */


    // delete a user from the db
    const handleDelete = async (id) => {

        try {
          const response = await axios.delete(`http://localhost:5050/superadmin/${path}/${id}`)
            getInfos()
            return response.data
        } catch (error) {
          console.error('Erreur lors de la suppression des données:', error)
        } 
      }

    

    // set user infos

    const handleUpdate = (e) => {

        e.preventDefault()
        setTimeout(()=> {
            setShowUpdate(false)
            containerRef.current.className = 'opacity'
        }, 2000)
        
        axios.put(`http://localhost:5050/superadmin/${path}/update-${inputValues.id}`, inputValues)
        .then(res => {
            getInfos()
            return res
        })           
        .catch (error => console.log('Erreur lors de la modification des données:', error))           
        
    } 

    // get all infos of user in the update champs
    const handleClick = (id) => {

        const get = userData.filter(user => user[indexDb[0]] == id)[0]

        inputKeys.map((inputKey,i)=>{

            setInputValues(inputValues => ({...inputValues, [inputKey]: get[indexDb[i]]}))
        })

    }

    const containerRef = useRef()
    const formRef = useRef()

    return(   
        <div className="container">
            <div className="opacity" ref={containerRef}>
                <section className="before-table">
                    <button
                        type="button" 
                        className="add-user" 
                        onClick={()=> {
                            navigate(`/superadmin/${subPath}`)
                            }}>
                        <MdAdd/>{addButton}
                    </button>

                    <div className="sort-by">
                        <span>Sort By  </span>
                        <select 
                            name="sort" 
                            id="sort"
                            value={sortBy}
                            onChange={(e)=> setSortBy(e.target.value)}>
                                <option value="Id User">Id User</option>
                                <option value="Login User">Login User</option>
                                <option value="Type User">Type User</option>

                        </select>
                    </div>
                </section>
                <table >
                    <thead>
                        <tr>
                            {titles.map(title=>{
                                return <td key={title} >{title}</td>
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {userData.map(user=>{

                            return <tr key={user[indexDb[0]]} id={user[indexDb[0]]}>
                                {indexDb.map(index=> <td key={user[index]}>{user[index]}</td>)}
                                
                                <td className="icon-button">
                                    <span onClick={(e)=> 
                                        handleDelete(e.currentTarget.parentNode.parentNode.id)}>
                                            <FaDeleteLeft className="delete-icon icon" /></span>
                                    <span 
                                        className='id'
                                        id={user[indexDb[0]]}
                                        onClick={(e)=>{
                                            handleClick(e.currentTarget.id)
                                            containerRef.current.className = 'container-opacity'
                                            setShowUpdate(true)                                                                        
                                            }}>
                                            <AiFillEdit className="edit-icon icon"/></span>
                                </td>

                            </tr>
                        })}
                    </tbody>
                </table>
            </div>

            {
                showUpdate && 
                <form action="POST" onSubmit={handleUpdate} className="update-user" ref={formRef}>
                    {inputKeys.map((inputKey)=> {
                    
                        if(inputKey === 'password')
                            return <input 
                                type="password"
                                id={inputKey}
                                className='login-input'
                                placeholder={`${inputKey} utilisateur`}
                                value={inputValues[inputKey]}
                                onChange={(e)=> setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))}
                                required/>

                        else if(inputKey === 'usertype')
                            return <select 
                                className="usertype"
                                id="usertype"
                                value={inputValues[inputKey]} 
                                onChange={(e)=> {
                                    setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))
                                    
                                }
                                }
                                >
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Super admin">Super admin</option>
                            </select>

                        else if(inputKey === inputKeys[0])
                            return

                        else if(inputKey === 'email')
                            return <input 
                                type="email" 
                                id={inputKey}
                                className='login-input'
                                placeholder={`mail@mail.com`}
                                value={inputValues[inputKey]}
                                onChange={(e)=> setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))}
                                required/>

                        else
                            return <input 
                                type="text" 
                                id={inputKey}
                                className='login-input'
                                placeholder={`${inputKey} utilisateur`}
                                value={inputValues[inputKey]}
                                onChange={(e)=> setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))}
                                required/>

                    }
                        
                    )}
                    
                    <button type="submit">Update</button>

                </form>
            }

        </div>

    )
}


function AddNew({inputValues, setInputValues, path, subPath, button, inputKeys}){  
        
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
            axios.post(`http://localhost:5050/superadmin/${path}`, inputValues)
                .then(res => {
                    navigate(`/superadmin/${subPath}`)
                    return res
                })
                .catch(err => console.log(err))     
        }
        
    }

    return (
        <div className="add-user-container">
            <div className="container">
                <form method="POST" className="add-form" onSubmit={handleSubmit}>
                    
                        {inputKeys.map((inputKey)=> {
                            if(inputKey === inputKeys[0])
                                return 

                            else if(inputKey === 'password')
                                return <div className="add-user-section">
                                    <label htmlFor={inputKey}>{inputKey}</label>                               
                                    <input 
                                        type="password"
                                        id={inputKey}
                                        className='login-input'
                                        placeholder={`Mot de passe`}
                                        value={inputValues[inputKey]}
                                        onChange={(e)=> setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))}
                                        required/>
                                    </div>

                            else if(inputKey === 'usertype')
                                return <div className="add-user-section">
                                    <label htmlFor={inputKey}>Type Utilisateur</label>                               
                                    <select 
                                        className="usertype"
                                        id="usertype"
                                        value={inputValues[inputKey]} 
                                        onChange={(e)=> {
                                            setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))
                                            
                                        }
                                        }
                                        >
                                            <option value="User">User</option>
                                            <option value="Admin">Admin</option>
                                            <option value="Super admin">Super admin</option>
                                    </select>
                                </div>

                            else
                                return <div className="add-user-section">
                                <label htmlFor={inputKey}>{inputKey}</label>                               
                                <input 
                                    type="text" 
                                    id={inputKey}
                                    className='login-input'
                                    placeholder={`${inputKey} utilisateur`}
                                    value={inputValues[inputKey]}
                                    onChange={(e)=> setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))}
                                    required/>
                                </div>
                        }
                        
                    )}
                    
                    <div>
                        <button 
                            type="submit" 
                            className="add-user-button">
                            {button}
                        </button>
                    </div>
                    
        
                </form>
            </div>
        </div>
    ) 
}


export {AddNew, RenderAll}




/*
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
*/