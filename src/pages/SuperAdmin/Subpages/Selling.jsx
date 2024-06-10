import { useState } from "react";
import { AddNew, RenderAll } from "../../../components/Render";

export function AllSellings(){

    const tableTitles = ['Id Vente', 'Date de vente', ' Quantite vendu', 'Prix unitaire vente', 'Prix unitaire achat', 'Id Produit', 'Id Utilisateur', 'Id Client' ,'Note Vente']
    const indexDb = ['id_Vente', 'date_Vente', 'qte_Vente', 'pu_Vente', 'pu_Achat', 'id_Produit', 'id_User', 'id_Client' ,'note_Vente']
     
    const [inputValues, setInputValues] = useState(
        {
            id: undefined,
            date: '',
            qte: '',
            puV: '',
            puA: '',
            produit: '',
            user: '',
            client: '',
            note: ''
            
        }
    )

    const inputKeys = Object.keys(inputValues)

    return <RenderAll
        buttonText={'vente'}
        titles={tableTitles}
        inputValues={inputValues}
        setInputValues={setInputValues}
        path={'sellings'}
        subPath={'sellings/new-selling'}
        indexDb={indexDb}
        inputKeys={inputKeys}
    />

}


export function AddSelling(){

    const [inputValues, setInputValues] = useState(
        {
            id: undefined,
            date: '',
            qte: '',
            puV: '',
            puA: '',
            produit: '',
            user: '',
            client: '',
            note: ''
            
        }
    )

    const inputKeys = Object.keys(inputValues)

    return(
        <AddNew
        inputKeys={inputKeys}
        inputValues={inputValues}
        setInputValues={setInputValues}
        path={'sellings/new-selling'}
        subPath={'sellings'}
        buttonText={'vente'}
        />
    )
}