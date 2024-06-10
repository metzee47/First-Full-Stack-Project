import { useState } from "react"
import { AddNew, RenderAll } from "../../../components/Render"

export function AllSuppliers(){

    const tableTitles = ['Id Fournisseur', 'nom Fournisseur', 'Adresse Fournisseur', 'Telephone Fournisseur']
    const indexDb = ['id_Fournisseur', 'nom_Fournisseur', 'adresse_Fournisseur', 'tel_Fournisseur']

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
            buttonText={'supplier'}
            path={'suppliers'}
            subPath={'suppliers/new-supplier'}
            
            />
    )
}


export function AddSupplier(){

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
            path={'suppliers/new-supplier'} 
            subPath={'suppliers'}
            buttonText={'supplier'}
            inputKeys={inputKeys}/>
    )
}