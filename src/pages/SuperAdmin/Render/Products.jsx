import { useState } from "react";
import { AddNew, RenderAll } from "./Render";

export function AllProducts(){

    const tableTitles = ['Id produit', 'Prix unitaire', 'Type produit', 'Prix de vente', 'Note produit', 'Code Barre', 'Numero de Serie', 'Unite', 'Statut']
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

    const inputKeys = Object.keys(inputValues)

    return <RenderAll
        addButton={'Add product'}
        titles={tableTitles}
        inputValues={inputValues}
        setInputValues={setInputValues}
        path={'products'}
        subPath={'products/new-product'}
        indexDb={indexDb}
        inputKeys={inputKeys}
    />

}


export function AddProduct(){

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

    const inputKeys = Object.keys(inputValues)

    return(
        <AddNew
        inputKeys={inputKeys}
        inputValues={inputValues}
        setInputValues={setInputValues}
        path={'products/new-product'}
        subPath={'products'}
        button={'Add product'}
        />
    )
}