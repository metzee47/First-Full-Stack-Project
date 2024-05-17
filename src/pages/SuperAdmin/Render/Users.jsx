import { useState } from "react"
import { AddNew, RenderAll } from "./Render"

export function AllUsers(){

    const index = ['Id user', 'Login user', 'Nom user', 'Prenom user', 'Telephone user', 'Password user', 'Type User', 'Note user']

    //show or hide password 
    const [showPassword, setShowPassword] = useState(false)

    const [inputValues, setInputValues] = useState(
        {
            id: undefined,
            name: '',
            prename: '',
            tel: '',
            email: '',
            password: '',
            note_User: '',
            usertype: 'User',
        }
    )

    const hidePassword = (password) => {
        for(let i=0; i<password.length; i++)
            password = password.replace(password[i], '*')
        return password
    }


    return(
        <RenderAll
            indexDb={index} 
            inputValues={inputValues} 
            setInputValues={setInputValues}
            showPassword={showPassword} 
            setShowPassword={setShowPassword}
            addButton={'Add user'}
            path={'users'}
            hidePassword={hidePassword}
            />
    )
}


export function AddUser(){

    const [inputValues, setInputValues] = useState(
        {
            id: undefined,
            name: '',
            prename: '',
            tel: '',
            email: '',
            password: '',
            note_User: '',
            usertype: 'User',
        }
    )

    return (
        <AddNew 
            inputValues={inputValues} 
            setInputValues = {setInputValues}
            path={'/users/new-user'} 
            subPath={'/users'}/>
    )
}