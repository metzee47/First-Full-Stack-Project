import { useState } from "react";
import { AddNew, RenderAll } from "../../../components/Render";
import { useInputSearch } from "../../../components/useContext";
import { Routes, Route } from "react-router-dom"


export function Products(){
    const [inputSearch, setInputSearch] = useInputSearch()

    const tableTitles = ['Identifiant', 'Prix unitaire', 'Designation', 'Prix de vente', 'Rating', 'Code Barre', 'Numero de Serie', 'Unite', 'Statut']
    const indexDb = ['id_Produit', 'pu_Produit', 'type_Produit', 'prix_Vente', 'note_Produit', 'code_Barre', 'numero_Serie', 'unite', 'statut']
     
    const [inputValues, setInputValues] = useState(
        {
            id: undefined,
            pu: '',
            type: '',
            prix: '',
            note: '',
            codeBarre: '',
            numSerie: '',
            unite: '',
            statut: ''
        }
    )


    //Pages path
    const PATH = '/'
    const  SUBPATH = 'new-product'
 
    // sub pages path
    const buttonText = 'product'
    const path = 'products'
    const subPath = 'products/new-product'

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
