import { useState } from "react"
import { AddNew, RenderAll } from "../../../components/Render"

export function AllUsers(){

    const tableTitles = ['Id user', 'Login user', 'Nom user', 'Prenom user', 'Telephone user', 'Password user', 'Type user', 'Note user']
    const indexDb = ['id_User', 'login_User', 'nom_User', 'prenom_User', 'tel_User', 'password_User', 'type_User', 'note_User']
    //show or hide password 
    const [showPassword, setShowPassword] = useState(false)

    const [inputValues, setInputValues] = useState(
        {
            id: undefined,
            email: '',
            nom: '',
            prenom: '',
            telephone: '',
            password: '',
            usertype: 'User',
            note: '',
        }
    )

    const hidePassword = (password) => {
        for(let i=0; i<password.length; i++)
            password = password.replace(password[i], '*')
        return password
    }

    const inputKeys = Object.keys(inputValues)

    

    return(
        <RenderAll
            titles={tableTitles} 
            indexDb={indexDb}
            inputValues={inputValues} 
            setInputValues={setInputValues}
            inputKeys={inputKeys}
            showPassword={showPassword} 
            setShowPassword={setShowPassword}
            buttonText={'user'}
            path={'users'}
            hidePassword={hidePassword}
            subPath={'users/new-user'}
            
            />
    )
}


export function AddUser(){

    const [inputValues, setInputValues] = useState(
        {
            id: undefined,
            nom: '',
            prenom: '',
            telephone: '',
            email: '',
            password: '',
            note: '',
            usertype: 'User',
        }
    )

    const inputKeys = Object.keys(inputValues)


    return (
        <AddNew 
            inputValues={inputValues} 
            setInputValues = {setInputValues}
            path={'users/new-user'} 
            subPath={'users'}
            buttonText={'user'}
            inputKeys={inputKeys}/>
    )
}