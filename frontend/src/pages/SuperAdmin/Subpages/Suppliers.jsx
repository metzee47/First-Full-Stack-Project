import { useState } from "react"
import { AddNew, RenderAll } from "../../../components/Render"
import { useInputSearch } from "../../../components/useContext"
import { Routes, Route } from "react-router-dom"


export function Suppliers(){
    const [inputSearch, setInputSearch] = useInputSearch()


    const tableTitles = ['Identifiant', 'Nom', 'Adresse', 'Contact']
    const indexDb = ['id_Fournisseur', 'nom_Fournisseur', 'adresse_Fournisseur', 'tel_Fournisseur']

    const [inputValues, setInputValues] = useState(
        {
            id: undefined,
            nom: '',
            adresse: '',
            telephone: '',
        }
    )

    //Pages path
    const PATH = '/'
    const  SUBPATH = 'new-supplier'
 
    // sub pages path
    const buttonText = 'supplier'
    const path = 'suppliers'
    const subPath = 'suppliers/new-supplier'

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
