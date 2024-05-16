import { RenderAllUsers } from "./Render"

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

    const handleClick = (id) => {

        const get = userData.filter(user => user.id_User == id)[0]
        setInputValues(inputValues => ({...inputValues, 
            ['id']: get.id_User, 
            ['name']: get.nom_User, 
            ['prename']: get.prenom_User, 
            ['tel']: get.tel_User, 
            ['email']: get.login_User, 
            ['password']: get.password_User, 
            ['usertype']: get.type_User, 
            ['note']: get.note_User                                     
        }))
    }


    return(
        <RenderAllUsers 
            indexDb={index} 
            inputValues={inputValues} 
            setInputValues={setInputValues} 
            showPassword={showPassword} 
            setShowPassword={setShowPassword}
            addButton={'Add user'}
            path={'users'}
            hidePassword={hidePassword}
            handleClick={handleClick}/>
    )
}