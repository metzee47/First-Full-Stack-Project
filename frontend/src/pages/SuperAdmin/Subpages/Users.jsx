import { useState } from "react"
import { AddNew, RenderAll } from "../../../components/Render"
import { useInputSearch } from "../../../components/useContext"
import { Routes, Route } from "react-router-dom"


export function Users(){

    const indexDb = ['id_User', 'login_User', 'nom_User', 'prenom_User', 'tel_User', 'password_User', 'type_User', 'note_User']
    const tableTitles = ['Identifiant', 'Email', 'Nom', 'Prenom', 'Telephone', 'Password', 'Type Utilisateur', 'Note']
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

    // search context for the main search bar
    const [inputSearch, setInputSearch] = useInputSearch()


    //Pages path
    const PATH = '/'
    const  SUBPATH = 'new-user'
 
    // sub pages path
    const buttonText = 'user'
    const path = 'users'
    const subPath = 'users/new-user'

    return <Routes>
        <Route
            path={PATH}
            element={<RenderAll 
                titles={tableTitles} 
                inputValues={inputValues} 
                setInputValues={setInputValues}
                buttonText={buttonText}
                path={path}
                subPath={subPath}
                inputSearch={inputSearch}
                indexDb={indexDb}
            />}
        />

        <Route
            path={SUBPATH}
            element={<AddNew 
                inputValues={inputValues} 
                setInputValues = {setInputValues}
                path={subPath} 
                subPath={path}
                buttonText={buttonText}
                titles={tableTitles}
            />}
        />
    </Routes>
    

}
// function AllUsers({tableTitles,inputValues, setInputValues}){


//     const [inputSearch, setInputSearch] = useInputSearch()

//     // const tableTitles = ['Identifiant', 'Email', 'Nom', 'Prenom', 'Telephone', 'Password', 'Type Utilisateur', 'Note']
//     // const indexDb = ['id_User', 'login_User', 'nom_User', 'prenom_User', 'tel_User', 'password_User', 'type_User', 'note_User']
//     //show or hide password 
//     // const [showPassword, setShowPassword] = useState(false)

//     // const [inputValues, setInputValues] = useState(
//     //     {
//     //         id: undefined,
//     //         email: '',
//     //         nom: '',
//     //         prenom: '',
//     //         telephone: '',
//     //         password: '',
//     //         usertype: 'User',
//     //         note: '',
//     //     }
//     // )

//     // const hidePassword = (password) => {
//     //     for(let i=0; i<password.length; i++)
//     //         password = password.replace(password[i], '*')
//     //     return password
//     // }

//     // const inputKeys = Object.keys(inputValues)

//     return(
//         <RenderAll
//             titles={tableTitles} 
//             // indexDb={indexDb}
//             inputValues={inputValues} 
//             setInputValues={setInputValues}
//             // inputKeys={inputKeys}
//             // showPassword={showPassword} 
//             // setShowPassword={setShowPassword}
//             buttonText={'user'}
//             path={'users'}
//             // hidePassword={hidePassword}
//             subPath={'users/new-user'}
//             inputSearch={inputSearch}
//             />
//     )
// }


// function AddUser(){

//     const [inputValues, setInputValues] = useState(
//         {
//             id: undefined,
//             nom: '',
//             prenom: '',
//             telephone: '',
//             email: '',
//             password: '',
//             note: '',
//             usertype: 'User',
//         }
//     )

//     const tableTitles = ['Identifiant', 'Email', 'Nom', 'Prenom', 'Telephone', 'Password', 'Type Utilisateur', 'Note']

//     // const inputKeys = Object.keys(inputValues)


//     return (
//         <AddNew 
//             inputValues={inputValues} 
//             setInputValues = {setInputValues}
//             path={'users/new-user'} 
//             subPath={'users'}
//             buttonText={'user'}
//             // inputKeys={inputKeys}
//             titles={tableTitles}/>
//     )
// }