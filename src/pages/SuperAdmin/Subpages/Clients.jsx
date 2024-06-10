import { useState } from "react"
import { AddNew, RenderAll } from "../../../components/Render"

export function AllClients(){

    const tableTitles = ['Id Client', 'Nom Client', 'Adresse Client', 'Telephone Client']
    const indexDb = ['id_Client', 'nom_Client', 'adresse_Client', 'tel_Client']

    const [inputValues, setInputValues] = useState(
        {
            id: undefined,
            nom: '',
            adresse: '',
            telephone: '',
        }
    )

    const inputKeys = Object.keys(inputValues)

    

    return(
        <RenderAll
            titles={tableTitles} 
            indexDb={indexDb}
            inputValues={inputValues} 
            setInputValues={setInputValues}
            inputKeys={inputKeys}
            buttonText={'client'}
            path={'clients'}
            subPath={'clients/new-client'}
            
            />
    )
}


export function AddClient(){

    const [inputValues, setInputValues] = useState(
        {
            id: undefined,
            nom: '',
            adresse: '',
            telephone: '',
        }
    )

    const inputKeys = Object.keys(inputValues)


    return (
        <AddNew 
            inputValues={inputValues} 
            setInputValues = {setInputValues}
            path={'clients/new-client'} 
            subPath={'clients'}
            buttonText={'client'}
            inputKeys={inputKeys}/>
    )
}