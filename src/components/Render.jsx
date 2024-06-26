import { useEffect, useState } from "react";
import './Render.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";


// icon imports
//import { FaUserGear } from "react-icons/fa6";
//import { IoMdMail } from "react-icons/io";
//import { BiSolidHide } from "react-icons/bi";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { AiFillEdit } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { useRef } from "react";

function RenderAll({buttonText,titles, indexDb, inputKeys, inputValues, 
    setInputValues, path, hidePassword, showPassword, setShowPassword,
    subPath}){


    const [userData, setUserData] = useState([])
    const [showUpdate, setShowUpdate] = useState(false)
    const [sortBy, setSortBy] = useState('Id User')

    // Obteir tous les donnees a partir de la base
    // const [idProduit, setIdProduit] = useState([])
    // const [idFournisseur, setIdFournisseur] = useState([])
    // const [idUser, setIdUser] = useState([])
    // const [idClient, setIdClient] = useState([])


    // useEffect(()=>{
    //     fetch(`http://localhost:5050/products`)
    //             .then(res => res.json())
    //             .then(data => {
    //                 let products = []
    //                 data.map(d => {
    //                     products.push(d['id_Produit'])
    //                 })
    //                 setIdProduit(products)
    //             })
    //     .catch(err => console.error('Error:', err));
    // }, [])

    // useEffect(()=>{
    //     fetch(`http://localhost:5050/suppliers`)
    //             .then(res => res.json())
    //             .then(data => {
    //                 let suppliers = []
    //                 data.map(d => {
    //                     suppliers.push(d['id_Fournisseur'])
    //                 })
    //                 setIdFournisseur(suppliers)
    //             })
    //     .catch(err => console.error('Error:', err));
    // }, [])

    // useEffect(()=>{
    //     fetch(`http://localhost:5050/users`)
    //             .then(res => res.json())
    //             .then(data => {
    //                 let users = []
    //                 data.map(d => {
    //                     users.push(d['id_User'])
    //                 })
    //                 setIdUser(users)
    //             })
    //     .catch(err => console.error('Error:', err));
    // }, [])

    // useEffect(()=>{
    //     fetch(`http://localhost:5050/clients`)
    //             .then(res => res.json())
    //             .then(data => {
    //                 let clients = []
    //                 data.map(d => {
    //                     clients.push(d['id_Client'])
    //                 })
    //                 setIdClient(clients)
    //             })
    //     .catch(err => console.error('Error:', err));
    // }, [])



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

    
    //sort function for all data render by id, ...
    const Sort = () =>{

        const sortedBy = userData
        if(sortBy === 'Id User'){
            sortedBy.sort((user1, user2) => {
                if(user1.id_User < user2.id_User) return -1
                else if(user1.id_User > user2.id_User) return 1
                return 0
            })

            setSortBy('Id User')
        
        }

        else if(sortBy === 'Login User'){
            sortedBy.sort((user1, user2) => {
                if(user1.login_User < user2.login_User) return -1
                else if(user1.login_User > user2.login_User) return 1
                return 0
            })
            setSortBy('Login User')
        
        }

        else if (sortBy === 'Type User'){
            sortedBy.sort((user1, user2) => {
                if(user1.type_User < user2.type_User) return -1
                else if(user1.type_User > user2.type_User) return 1
                return 0
            })
            setSortBy('Type User')
        
        }

        setUserData(sortedBy)

        /*
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
            console.log(userDataUsertype)
            setUserData(userDataUsertype)
        }

        else if(sortBy === 'Login User'){
            let userDataLoginUser = []
            userDataLoginUser = userData.sort((firstUser,lastUser) => {
                const firstUsertype = firstUser.login_User.toUpperCase()
                const lastUserType = lastUser.login_User.toUpperCase()

                if (firstUsertype < lastUserType)
                    return 1

                if(firstUsertype > lastUserType)
                    return -1

                return 0
            })
            console.log(userDataLoginUser)
            setUserData(userDataLoginUser)
        }

        else if(sortBy === 'Id User'){
            console.log(data)
            setUserData(data)
        }

        */
    }

    useEffect(()=>{
        Sort()
    },[sortBy])

    // delete a user from the db
    const handleDelete = async (id) => {

        if(window.confirm(`Voulez vous vraiment supprimer l'enregistrement ${id} de votre base de donnees ?`)){

            try {
                const response = await axios.delete(`http://localhost:5050/superadmin/${path}/${id}`)
                  getInfos()
                  return response.data
              } catch (error) {
                console.error('Erreur lors de la suppression des données:', error)
              } 
            }

        }

    // set user infos
    const handleUpdate = (e) => {

        e.preventDefault()
        handleQuit()

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

    // go back to the previous tab
    const handleQuit = () => {
        setTimeout(()=> {
            setShowUpdate(false)
            containerRef.current.className = 'opacity'
        }, 2000)
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
                        <MdAdd/>Add {buttonText}
                    </button>

                    <div className="sort-by">
                        <span>Sort By  </span>
                        <select 
                            name="sort" 
                            id="sort"
                            value={sortBy}
                            onChange={(e)=> {
                                setSortBy(e.target.value)
                                }}>
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
                                {indexDb.map(index=> {
                                    if(index.includes('date_')){
                                        const date = new Date(user[index])
                                        return <td key={user[index]}>{date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}</td>

                                    }
                                    else
                                        return <td key={user[index]}>{user[index]}</td>
                                    })}
                                
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
                <section className="pagination">
                    <FaAngleDoubleLeft className='icon'/>
                    <span>1</span>
                    <span>...</span>
                    <span>{userData.length}</span>
                    <FaAngleDoubleRight className = 'icon'/>
                </section>
            </div>

            {
                showUpdate && 
                <form action="POST" onSubmit={handleUpdate} className="update-form" ref={formRef}>

                    <div className="update-user">
                        <button onClick={handleQuit} className="quit-button">Fermer</button>

                        {inputKeys.map((inputKey)=> {

                            switch(inputKey){
                                case 'password': 
                                    return <input 
                                            type="password"
                                            id={inputKey}
                                            className='login-input'
                                            placeholder={`${inputKey} ${buttonText}`}
                                            value={inputValues[inputKey]}
                                            onChange={(e)=> setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))}
                                            required/>
                                case 'usertype': 
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

                                case 'email':
                                    return <input 
                                    type="email" 
                                    id={inputKey}
                                    className='login-input'
                                    placeholder={`mail@mail.com`}
                                    value={inputValues[inputKey]}
                                    onChange={(e)=> setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))}
                                    required/>

                                case 'date':
                                    return <input 
                                    type="date" 
                                    id={inputKey}
                                    className='login-input'
                                    placeholder={`Date d'${inputKey}`}
                                    value={inputValues[inputKey]}
                                    onChange={(e)=> setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))}
                                    required/>

                                // case 'produit':
                                //     return <select 
                                //     className={inputKey}
                                //     id={inputKey}
                                //     value={inputValues[inputKey]} 
                                //     onChange={(e)=> {
                                //         setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))
                                        
                                //     }
                                //     }
                                //     >
                                //         <option value="">...</option>
                                        
                                //         {idProduit.map(id => <option value={id}>{id}</option>)}
                                // </select>

                                // case 'fournisseur':
                                //     return <select 
                                //     className={inputKey}
                                //     id={inputKey}
                                //     value={inputValues[inputKey]} 
                                //     onChange={(e)=> {
                                //         setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))
                                        
                                //     }
                                //     }
                                //     >
                                //         <option value="">...</option>
                                        
                                //         {idFournisseur.map(id => <option value={id}>{id}</option>)}
                                // </select>

                                // case 'client':
                                //     return <select 
                                //     className={inputKey}
                                //     id={inputKey}
                                //     value={inputValues[inputKey]} 
                                //     onChange={(e)=> {
                                //         setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))
                                        
                                //     }
                                //     }
                                //     >
                                //         <option value="">...</option>
                                        
                                //         {idClient.map(id => <option value={id}>{id}</option>)}
                                // </select>

                                // case 'user':
                                //     return <select 
                                //     className={inputKey}
                                //     id={inputKey}
                                //     value={inputValues[inputKey]} 
                                //     onChange={(e)=> {
                                //         setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))
                                        
                                //     }
                                //     }
                                //     >
                                //         <option value="">...</option>
                                        
                                //         {idUser.map(id => <option value={id}>{id}</option>)}
                                // </select>

                                case inputKeys[0]: return

                                default:
                                    return <input 
                                    type="text" 
                                    id={inputKey}
                                    className='login-input'
                                    placeholder={`${inputKey} ${buttonText}`}
                                    value={inputValues[inputKey]}
                                    onChange={(e)=> setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))}
                                    required/>
                            }

                            }

                        )}

                        <button type="submit" className="update-button">Update</button>

                    </div>    

                </form>
            }

        </div>

    )
}


function AddNew({inputValues, setInputValues, path, subPath, buttonText, inputKeys}){  
        
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()            

        const checkIsValid = () =>{

            let isValid = true

            inputKeys.map(inputKey => {
                if(inputValues[inputKey] !== '')
                    return
                else
                    isValid = false
                
            })

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

    const [idProduit, setIdProduit] = useState([])
    const [idFournisseur, setIdFournisseur] = useState([])
    const [idUser, setIdUser] = useState([])
    const [idClient, setIdClient] = useState([])


    useEffect(()=>{
        fetch(`http://localhost:5050/products`)
                .then(res => res.json())
                .then(data => {
                    let products = []
                    data.map(d => {
                        products.push(d['id_Produit'])
                    })
                    setIdProduit(products)
                })
        .catch(err => console.error('Error:', err));
    }, [])

    useEffect(()=>{
        fetch(`http://localhost:5050/suppliers`)
                .then(res => res.json())
                .then(data => {
                    let suppliers = []
                    data.map(d => {
                        suppliers.push(d['id_Fournisseur'])
                    })
                    setIdFournisseur(suppliers)
                })
        .catch(err => console.error('Error:', err));
    }, [])

    useEffect(()=>{
        fetch(`http://localhost:5050/users`)
                .then(res => res.json())
                .then(data => {
                    let users = []
                    data.map(d => {
                        users.push(d['id_User'])
                    })
                    setIdUser(users)
                })
        .catch(err => console.error('Error:', err));
    }, [])

    useEffect(()=>{
        fetch(`http://localhost:5050/clients`)
                .then(res => res.json())
                .then(data => {
                    let clients = []
                    data.map(d => {
                        clients.push(d['id_Client'])
                    })
                    setIdClient(clients)
                })
        .catch(err => console.error('Error:', err));
    }, [])

    



    return (
        <div className="add-user-container">
            <div className="container">
                <form method="POST" className="add-form" onSubmit={handleSubmit}>
                    
                    <button className="quit-button" onClick={()=> navigate(`/superadmin/${subPath}`)}>Fermer</button>
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
                            else if(inputKey === 'produit')
                                return <div className="add-user-section">
                                    <label htmlFor={inputKey}>Id Produit Achete</label>                               
                                    <select 
                                        className="produit"
                                        id="produit"
                                        value={inputValues[inputKey]} 
                                        onChange={(e)=> {
                                            setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))
                                            
                                        }
                                        }
                                        >
                                            <option value="">...</option>
                                            {idProduit.map(id => <option value={id}>{id}</option>)}
                                    </select>
                                </div>

                            else if(inputKey === 'fournisseur')
                                return <div className="add-user-section">
                                    <label htmlFor={inputKey}>Id Fournisseur</label>                               
                                    <select 
                                        className="fournisseur"
                                        id="fournisseur"
                                        value={inputValues[inputKey]} 
                                        onChange={(e)=> {
                                            setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))
                                            
                                        }
                                        }
                                        >
                                            <option value="">...</option>                                        
                                            {idFournisseur.map(id => <option value={id}>{id}</option>)}
                                    </select>
                                </div>

                            else if(inputKey === 'client')
                                return <div className="add-user-section">
                                    <label htmlFor={inputKey}>Id Client</label>                               
                                    <select 
                                        className="client"
                                        id="client"
                                        value={inputValues[inputKey]} 
                                        onChange={(e)=> {
                                            setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))
                                            
                                        }
                                        }
                                        >
                                            <option value="">...</option>                                        
                                            {idClient.map(id => <option value={id}>{id}</option>)}
                                    </select>
                                </div>

                            else if(inputKey === 'user')
                                return <div className="add-user-section">
                                    <label htmlFor={inputKey}>Id Utilisateur</label>                               
                                    <select 
                                        className="user"
                                        id="user"
                                        value={inputValues[inputKey]} 
                                        onChange={(e)=> {
                                            setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))
                                            
                                        }
                                        }
                                        >
                                            <option value="">...</option>                                          
                                            {idUser.map(id => <option value={id}>{id}</option>)}
                                    </select>
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

                                else if(inputKey === 'date'){
                                    return <div className="add-user-section">
                                        <label htmlFor={inputKey}>Date d'{buttonText}</label>  
                                        <input 
                                            type="date" 
                                            id={inputKey}
                                            className='login-input date-input'
                                            placeholder={`Date d'${inputKey}`}
                                            value={inputValues[inputKey]}
                                            onChange={(e)=> setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))}
                                            required/>
                                        </div>
                                    }

                            else
                                return <div className="add-user-section">
                                <label htmlFor={inputKey}>{inputKey}</label>                               
                                <input 
                                    type="text" 
                                    id={inputKey}
                                    className='login-input'
                                    placeholder={`${inputKey} ${buttonText}`}
                                    value={inputValues[inputKey]}
                                    onChange={(e)=> setInputValues(inputValues => ({...inputValues, [e.target.id]: e.target.value}))}
                                    required/>
                                </div>
                        }
                        
                    )}
                    
                    <button 
                        type="submit" 
                        className="add-button">
                        Add {buttonText}
                    </button>
                    
        
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