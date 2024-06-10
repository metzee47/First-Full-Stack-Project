import { useEffect, useRef, useState } from "react";
import axios from "axios";


//icons import
import { MdAdd } from "react-icons/md";
import { MdMoreHoriz } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";
import { BiHide } from "react-icons/bi";



export function AllPurchase(){

    const tableTitles = ['Id Achat', 'Date Achat', ' Quantite', 'Fournisseur', 'Utilisateur' ,'Note', 'Statut']
    const indexDb = ['id_Achat', 'date_Achat', 'qte_Achat', 'id_Fournisseur', 'id_User' , 'note_Achat', 'statut']

    const [allPurchase, setAllPurchase] = useState([])
    
    const [userData, setUserData] = useState([])        

    // gerer la quqntite livree pour chaque produit de l'achat
    const [deliveryQuantity, setDeliveryQuantity] = useState({})
    // gerer les regles d'affichage de la quantite livree du produit en question
    const [showDeliveryQuantity, setShowDeliveryQuantity] = useState(undefined)

    // pas besoin d'explication
    const navigate = useNavigate()

    // get users, products, fournisseurs, vente or achat infos from backend
    const getInfos = () =>{
        fetch(`http://localhost:5050/purchases/`)
                .then(res => res.json())
                .then(data => {
                    setUserData(data)
                })
        .catch(err => console.error('Error:', err));
    }

    // load page infos from database
    useEffect(()=>{
        getInfos()

        const getDataFromStorage = JSON.parse(localStorage.getItem('purchases'))
        setAllPurchase(getDataFromStorage)

        console.log('Les nouvelles donnees', getDataFromStorage)
        

    }, [])    


    // delete a user from the db
    const handleDelete = async (id) => {

        if(window.confirm(`Voulez vous vraiment supprimer l'enregistrement ${id} de votre base de donnees ?`)){

            try {
                const response = await axios.delete(`http://localhost:5050/superadmin/purchases/${id}`)
                    getInfos()
                    return response.data
                } catch (error) {
                    console.error('Erreur lors de la suppression des données:', error)
                } 

                const purchases = allPurchase.filter(purchase => Object.keys(purchase)[0] != id)
                setAllPurchase(purchases)
                localStorage.setItem('purchases', JSON.stringify(allPurchase))
            }

        

    }

    // chercher et trouver l'achat qui match dans le storage
    const [matchingPurchase, setMatchingPurchase] = useState([])

    // regles d'affichage des produits de l'achat
    const [showMeStatement, setShowMeStatement] = useState(false)
    const [showMeAllStatement, setShowMeAllStatement] = useState(false)

    // afficher tous les produits de l'achat en question
    const ShowStatement = async (id) =>{
        const match = allPurchase.filter(purchase => Object.keys(purchase)[0] == id)
        setMatchingPurchase(match[0][id])
        setShowMeStatement(true)
        containerRef.current.className = 'container-opacity'

        // for(let i=0; i <matchingPurchase.length; i++)
        //     

        matchingPurchase.map(purchase => setDeliveryQuantity(deliveryQuantity => ({...deliveryQuantity, [purchase.codeProduit]: purchase.neededQte})))

    }

    // gerer les produits livres pour chaque achat
    const handleDeliveryState = (key, produit) =>{

        // console.log(key, typeof key)

        if(key == 'Enter'){
            if(Number(produit.neededQte) >= Number(deliveryQuantity[produit.codeProduit])){
                const leftQuantity = produit.neededQte - Number(deliveryQuantity[produit.codeProduit])
                produit.deliveryStatut = leftQuantity > 0 ? `Livree (${deliveryQuantity[produit.codeProduit]})`: 'LIVREE'
                setMatchingPurchase(matchingPurchase => {
                    const match = matchingPurchase.filter(purchase => purchase.codeProduit != produit.codeProduit)
                    return [...match, produit]
                    
                })

                let match = allPurchase
                for (let i=0; i < match.length; i++){
                    if(produit.achat == Object.keys(match)[i]){
                        match[i][produit.achat] = matchingPurchase
                        break
                    }
                }

                setAllPurchase(match)
                // update localstorage
                localStorage.setItem('purchases', JSON.stringify(match))

                // check if all products are successfully delivered
                const isPurchaseDelivered = matchingPurchase.filter(purchase => purchase.deliveryStatut != 'LIVREE')
                // console.log('etat de livraison achat ===>',isPurchaseDelivered)
                if(isPurchaseDelivered.length === 0){
                    axios.put(`http://localhost:5050/superadmin/purchases/update-${produit.achat}`)
                    .then(res => {
                        getInfos()
                        return res
                    })           
                    .catch (error => console.log('Erreur lors de la modification des données:', error))  
                    // console.log('tout a ete livre')
                }

                setShowDeliveryQuantity(undefined)

            }

            else if(!Number(deliveryQuantity[produit.codeProduit]))
                alert('Veuillez saisir la quantite livrée en chiffre')
            else
                alert('La quantite saisie est superieur à la quantite achetée')
        }

        // setAllPurchase(allPurchase => [...allPurchase])        

    }

    // regle d'affichage
    const [deliveryButton, setDeliveryButton] = useState('Voir livraison')
    // afficher que les produits deja livres
    const handleShowDeliveryPurchase = (button) => {
        if(button == 'Voir livraison'){
            const delivered = userData.filter(data => data.statut == 'Livrée')
            setUserData(delivered)
            setDeliveryButton('All purchases')
        }

        if(button == 'All purchases'){
            getInfos()
            setDeliveryButton('Voir livraison')
        }
        
    }


    const containerRef = useRef()
    // const formRef = useRef()

    return(   
        <div className="container">
            <div className="opacity" ref={containerRef}>
                <section className="before-table">
                    <button
                        type="button" 
                        className="add-user" 
                        onClick={()=> {
                            navigate(`/superadmin/purchases/new-purchase`)
                            }}>
                        <MdAdd/>Add command
                    </button>

                    <div className="sort-by">
                    <button
                        type="button" 
                        className="add-user" 
                        onClick={(e)=> {
                            handleShowDeliveryPurchase(deliveryButton)
                            }}>
                        {deliveryButton}
                    </button>
                        
                    </div>
                </section>
                <table >
                    <thead>
                        <tr>
                            {tableTitles.map((title,i)=>{
                                return <td key={title + i}>{title}</td>
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {userData.map(user=>{

                            return <>
                            <tr key={user[indexDb[0]]} id={user[indexDb[0]]}>
                                
                                {indexDb.map(index=> {
                                    if(index.includes('date_')){
                                        const date = new Date(user[index])
                                        return <td key={user[index]}>{date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}</td>    
                                    }
                                    else
                                        return <td key={user[index]}>{user[index]}</td>
                                    })}
                                
                                <td className="icon-button">
                                    <span onClick={(e)=> 
                                        handleDelete(e.currentTarget.parentNode.parentNode.id)}>
                                            <FaDeleteLeft className="delete-icon icon" /></span>
                                    
                                    <span onClick={(e)=> 
                                        ShowStatement(e.currentTarget.parentNode.parentNode.id)}>
                                        <BiHide className="icon"/>
                                    </span>
                                </td>

                            </tr>

                            

                            </>
                            
                        })}
                    </tbody>
                </table>
            </div>

            {
                showMeStatement &&
            
                <table className={`statement-table`}>

                    <tr className="show-more" onClick={()=> {
                        setShowMeAllStatement(true)
                        setShowMeStatement(false)
                    }}><MdMoreHoriz className="icon"/></tr>

                    <tr className="leave" onClick={()=> {
                        setShowMeStatement(false)
                        containerRef.current.className = 'opacity'                            
                    }}><FaAngleLeft className="icon"/></tr>

                    <thead>
                        <tr>
                            <td>Designation</td>
                            <td>Quantite </td>
                            <td>Nom Projet</td>
                            <td>Etat de livraison</td>
        
                        </tr>
                    </thead>
                
                    <tbody>
                                
                        {matchingPurchase.map((data) => {
                            return <tr key={data.codeProduit}>
                                <td>{data.nomProduit}</td>
                                <td>{data.neededQte}</td>
                                <td>{data.nomProjet}</td>
                                <td className={`${data.deliveryStatut == 'LIVREE' && 'delivered'}`}>{data.deliveryStatut}</td>
                                <td className="delivery-icon"
                                    onClick={()=> {
                                        if(data.deliveryStatut != 'LIVREE')
                                            setShowDeliveryQuantity(data.codeProduit)
                                    }}
                                    //onClick={()=> handleDeliveryState(data.codeProduit, data.id_Achat, data.nomProduit)}
                                ><CiDeliveryTruck className={`icon ${data.deliveryStatut == 'LIVREE' && 'delivered'}`}/></td>                                      
                                    <td className="input-td">
                                        <input 
                                            className={`input ${showDeliveryQuantity == data.codeProduit && 'input-del-qte'}`}
                                            type="text" 
                                            value={deliveryQuantity[data.codeProduit]}
                                            onChange = {(e)=> setDeliveryQuantity(deliveryQuantity => ({...deliveryQuantity, [data.codeProduit]: e.target.value}))}
                                            onKeyDown={(e)=> handleDeliveryState(e.key, data)}
                                        />
                                    </td>   
                                            

                            </tr>
                        })}
        
                    </tbody>

                </table>
            
            }

            {
                showMeAllStatement &&
            
                <table className={`statement-table`}>

                    <tr className="show-more" onClick={()=>{
                        setShowMeAllStatement(false)
                        setShowMeStatement(true)
                    }}><MdMoreHoriz className="icon"/></tr>

                    <tr className="leave" onClick={()=> {
                        setShowMeAllStatement(false)
                        containerRef.current.className = 'opacity'                            
                    }}><FaAngleLeft className="icon"/></tr>

                    <thead>
                        <tr>
                            <td>Code Achat</td>
                            <td>Code Article</td>
                            <td>Designation</td>
                            <td>Quantite demande</td>
                            <td>Fournisseur</td>
                            <td>Code projet</td>
                            <td>Nom Projet</td>
                            <td>Etat de livraison</td>
        
                        </tr>
                    </thead>
                
                    <tbody>
                                
                    {matchingPurchase.map(data => {
                            return <tr key={data.codeProduit}>
                                <td>{data.achat}</td>
                                <td>{data.codeProduit}</td>
                                <td>{data.nomProduit}</td>
                                <td>{data.neededQte}</td>
                                <td>{data.fournisseur}</td>
                                <td>{data.codeProjet}</td>
                                <td>{data.nomProjet}</td>
                                <td className={`${data.deliveryStatut == 'LIVREE' && 'delivered'}`}>{data.deliveryStatut}</td>       
                                <td className="delivery-icon"
                                    onClick={()=> {
                                        if(data.deliveryStatut != 'LIVREE')
                                            setShowDeliveryQuantity(data.codeProduit)
                                    }}
                                    //onClick={()=> handleDeliveryState(data.id_Produit, data.id_Achat, data.nom_Produit)}
                                ><CiDeliveryTruck className={`icon ${data.deliveryStatut == 'LIVREE' && 'delivered'}`}/></td> 
                                <td className="input-td">
                                        <input 
                                            className={`input ${showDeliveryQuantity == data.codeProduit && 'input-del-qte'}`}
                                            type="text" 
                                            value={deliveryQuantity[data.codeProduit]}
                                            onChange = {(e)=> setDeliveryQuantity(deliveryQuantity => ({...deliveryQuantity, [data.codeProduit]: e.target.value}))}
                                            onKeyDown={(e)=> handleDeliveryState(e.key, data)}
                                        />
                                    </td>   
                            </tr>
                        })}
        
                        
                    </tbody>

                </table>
            
            }

        </div>

    )
    

}


export function AddPurchase(){

    const [entries, setEntries] = useState([])
    const [showOptions, setShowOptions] = useState(false)
    const [allPurchase, setAllPurchase] = useState([])

    // generate an id for achat after each first render
    useEffect(()=>{

        const id = Math.floor(Math.random() * 10001)
        setSendToDb(sendToDb => ({...sendToDb, ['id']: id}))  
        setStatement(statement => ({...statement, ['achat']: id })) 
                
        const getDataFromStorage = JSON.parse(localStorage.getItem('purchases'))

        setAllPurchase(getDataFromStorage)
         
    },[])

    // etat de l'achat actuel
    const [sendToDb, setSendToDb] =  useState({
        id: undefined,
        date: undefined,
        qte: undefined,
        fournisseur: '',
        user: '',
        produit: '',
        note: 'Pas urgent',
        statut: 'Pending...',
    })

    // etat du produit ajoute dans l'achat
    const [statement, setStatement ] =  useState({
        achat: undefined,
        fournisseur: undefined,
        date: undefined,
        codeProduit: '',
        nomProduit: '',
        stockedQte: '',
        neededQte: '',
        codeProjet: '',
        nomProjet: '',
        deliveryStatut: 'Pending...',
    })    
    

    // const [unitprice, setUnitPrice] = useState(0)
    // const [total, setTotal] = useState(0)

    const [quantity, setQuantity] = useState(0)
    // mis a jour de la quantite totale de l'achat en cours
    useEffect(()=>{
        let newQuantity = 0;
        // let newUnitPrice = 0;
        // let newTotal = 0;
    
        entries.forEach(entry => {
            newQuantity += Number(entry.neededQte);
            // newUnitPrice += Number(entry[3]);
            // newTotal += Number(entry[4]);
        });
    
        setQuantity(newQuantity);
        setSendToDb(sendToDb => ({...sendToDb, ['qte']: newQuantity}))
        // setUnitPrice(newUnitPrice);
        // setTotal(newTotal);
    
        setShowOptions(entries.length > 0);
    
    }, [entries])


    // mis a jour de localstorage a chaque fois que l'etat d'allPurchase change
    useEffect(()=>{
        if(allPurchase.length > 0){
            localStorage.setItem('purchases', JSON.stringify(allPurchase))
            console.log('Donnees localstorage mis a jours')
        }
    }, [allPurchase])


    // Poursuivre l'achat
    const handleAddPurchase = (event) =>{
        const canContinue = sendToDb.fournisseur !== '' && sendToDb.date !== '' && sendToDb.user !== ''

        if(canContinue){
            setAddPurchase(true)
            setStatement(statement=> ({...statement, ['date']: sendToDb.date})) 
            event.currentTarget.parentElement.className = 'button button-hide'
        }

        else{
            alert('Veuillez remplir tous les champs !!!')
        }
           
    }

    // ajouter un produit dans la demande d'achat en cours
    const addWishes = () =>{
        setEntries(entries=> [...entries, statement])        
    }

    // supprimer le produit dans la demande d'achat en cours
    const handleDelete = (id) => {        
        const new_tab = entries.filter(entry => (entry.codeProduit != id))
        setEntries(new_tab)
    }
    
    // obtenir tous  les fournisseurs
    const [supplierInfos, setSupplierInfos] = useState([])
    useEffect(()=>{
        fetch(`http://localhost:5050/suppliers`)
            .then(res => res.json())
            .then(data => {
                setSupplierInfos(data)
                
            })
        .catch(err => console.error('Error:', err));
    }, [])


    // obtenir tous  les utilsateurs
    const [userInfos, setUserInfos] = useState([])
    useEffect(()=>{
        fetch(`http://localhost:5050/users`)
            .then(res => res.json())
            .then(data => {
                setUserInfos(data)
            })
        .catch(err => console.error('Error:', err));
    }, [])


    // obtenir tous  les produits
    const [productInfos, setProductInfos] = useState([])
    useEffect(()=>{
        fetch(`http://localhost:5050/products`)
            .then(res => res.json())
            .then(data => {
                setProductInfos(data)
            })
        .catch(err => console.error('Error:', err));
    }, [])


    // obtenir tous  les projets
    const [projectInfos, setProjectInfos] = useState([])
    useEffect(()=>{
        fetch(`http://localhost:5050/projects`)
            .then(res => res.json())
            .then(data => {
                setProjectInfos(data)
            })
        .catch(err => console.error('Error:', err));
    }, [])

    // regle d'affichage de statement
    const [addPurchase, setAddPurchase] = useState(false)

    // l'ensemble des produits, fournisseurs ou users trouves par la recherche
    const [searchSuppliers, setSearchSuppliers] = useState([])
    const [searchUsers, setSearchUsers] = useState([])
    const [searchProducts, setSearchProducts] = useState([])
    const [searchProjects, setSearchProjects] = useState([])

    // regles d'affichage des produits
    const [showSupplier, setShowSupplier] = useState(false)
    const [showUser, setShowUser] = useState(false)
    const [showProduct, setShowProduct] = useState(false)
    const [showProject, setShowProject] = useState(false)

    // input search from database
    const handleSearch = (e, table) => {

        if(table === supplierInfos){
            const found = table.filter(t => t.id_Fournisseur.toString().includes(e.target.value) || t.nom_Fournisseur.toLowerCase().includes(e.target.value.toLowerCase()))
            if(e.target.value !== '')
                setSearchSuppliers(found)
            else
                setSearchSuppliers([])
        }
        
        if(table === userInfos ){
            const found = table.filter(t => t.id_User.toString().includes(e.target.value) || t.nom_User.toLowerCase().includes(e.target.value.toLowerCase()) || t.prenom_User.toLowerCase().includes(e.target.value.toLowerCase()))
            if(e.target.value !== '')
                setSearchUsers(found)
            else
                setSearchUsers([])
        }

        if(table === productInfos ){
            const found = table.filter(t => t.id_Produit.toString().includes(e.target.value) || t.type_Produit.toLowerCase().includes(e.target.value.toLowerCase()) || t.code_Barre.includes(e.target.value))
            if(e.target.value !== '')
                setSearchProducts(found)
            else
                setSearchProducts([])
        }

        if(table === projectInfos ){
            const found = table.filter(t => t.id_Projet.toString().includes(e.target.value) || t.nom_Projet.toLowerCase().includes(e.target.value.toLowerCase()))
            if(e.target.value !== '')
                setSearchProjects(found)
            else
                setSearchProjects([])
        }
            
        setSendToDb(sendToDb=> ({...sendToDb, [e.target.id]: e.target.value}))
        
    }


    // submit datas to database
    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post(`http://localhost:5050/superadmin/purchases/new-purchase`, sendToDb)
            .then(res => {
                return res
            })
            .catch(err => console.log(err))  
        
        setAllPurchase(allPurchase => {
            // const filteredPurchase = allPurchase.filter(item => Object.keys(item)[0] != sendToDb.id)
            return [...allPurchase, { [sendToDb.id]: entries }]
        });

        e.currentTarget.parentElement.className = 'options options-hide'


        setTimeout(()=> {
            navigate(`/superadmin/purchases`)            
        }, 2000);

                 
    }

    // pas besoin d'expliquer, right ?
    const navigate = useNavigate()
    

    return <div className="container">
        <div className="in-out-container">
            <div className="items">
                
                <div className="item">
                    <label htmlFor="Achat">id Fournisseur</label>
                    <div className="search">
                        <input type="text" 
                            id="fournisseur"
                            value={sendToDb.fournisseur}
                            onChange={(e)=> {
                                handleSearch(e, supplierInfos)
                            }}
                            onKeyDown={()=>setShowSupplier(true)}
                            placeholder="Fournisseur: id, nom"/>
                        {showSupplier &&
                        <div className="search-list" onMouseOver={()=>setShowSupplier(true)} onMouseOut={()=>setShowSupplier(false)}>
                        {searchSuppliers.map(supplier => <div key={supplier.id_Fournisseur} onClick={(e)=> {
                            setSendToDb(sendToDb=> ({...sendToDb, ['fournisseur']: supplier.id_Fournisseur}))
                            setStatement(statement => ({...statement, ['fournisseur']: supplier.id_Fournisseur}))
                            }}>
                                {supplier.id_Fournisseur}, {supplier.nom_Fournisseur}</div>)}
                        </div>}
                    </div>                    
                </div>
                <div className="item"            >
                    <label htmlFor="Achat">Date Achat</label>
                    <div className="search">
                    <input type="date"
                        id="date"
                        value={sendToDb.date}
                        onChange={(e)=> setSendToDb(sendToDb => ({...sendToDb, [e.target.id]: e.target.value}))}/>
                    </div>
                </div>
                <div className="item">
                    <label htmlFor="Achat">id Utilisateur</label>
                    <div className="search">
                        <input type="text" 
                            id="user"
                            value={sendToDb.user}
                            onChange={(e)=> {
                                handleSearch(e, userInfos)
                            }}
                            onKeyDown={()=>setShowUser(true)}
                            placeholder="User: id, nom, prenom"/>
                        {showUser &&
                        <div className="search-list" onMouseOver={()=>setShowUser(true)} onMouseOut={()=>setShowUser(false)}>
                        {searchUsers.map(user => <div key={user.id_User} onClick={(e)=> setSendToDb(sendToDb=> ({...sendToDb, ['user']: user.id_User}))}>{user.id_User}, {user.nom_User} {user.prenom_User}</div>)}
                    </div>}
                    </div>                    
                </div>
                <div className="item">
                    <label htmlFor="Achat">Note</label>
                    <div className="search">
                        <input type="text" 
                            id="note"
                            value={sendToDb.note}
                            onChange={(e)=> {
                                setSendToDb(sendToDb=> ({...sendToDb, [e.target.id]: e.target.value}))
                            }}
                            
                            placeholder="Section remarques, avis, priorite"/>
                    </div>                    
                </div>
                
                <div className="button"><button onClick={(e) => handleAddPurchase(e)} disabled={addPurchase}>Continuer</button></div>
            </div>       

            {addPurchase && 
            <div className="entry">
                <div className="search">
                    <input type="text" 
                        id="produit"
                        value={sendToDb.produit}
                        onChange={(e)=> {
                            handleSearch(e, productInfos)
                        }}
                        onKeyDown={()=>setShowProduct(true)}
                        placeholder="Produit: id, code barre, nom"/>
                    {showProduct &&
                    <div className="search-list" onMouseOver={()=>setShowProduct(true)} onMouseOut={()=>setShowProduct(false)}>
                    {searchProducts.map(product => <div key={product.id_User} onClick={(e)=> 
                        {setStatement(statement=> ({...statement, ['codeProduit']: product.id_Produit, ['nomProduit']: product.type_Produit, ['stockedQte']: product.statut})) 
                        setSendToDb(sendToDb=> ({...sendToDb, ['produit']: product.code_Barre}))}}>{product.code_Barre}, {product.type_Produit}, {product.statut}</div>)}
                    </div>}
                </div>
                <input 
                    type="text" 
                    placeholder="Quantite"
                    id={'neededQte'}
                    value={statement.neededQte}
                    onChange={(e)=> setStatement(statement => ({...statement, [e.target.id]: e.target.value}))}
                    required/>
                <div className="search">
                    <input type="text" 
                        id="projet"
                        value={sendToDb.projet}
                        onChange={(e)=> {
                            handleSearch(e, projectInfos)
                        }}
                        onKeyDown={()=>setShowProject(true)}
                        placeholder="Produit: id, code barre, nom"/>
                    {showProject &&
                    <div className="search-list" onMouseOver={()=>setShowProject(true)} onMouseOut={()=>setShowProject(false)}>
                    {searchProjects.map(project => <div key={project.id_Projet} onClick={(e)=> {
                        setStatement(statement=> ({...statement, ['codeProjet']: project.id_Projet, ['nomProjet']: project.nom_Projet})) 
                        setSendToDb(sendToDb=> ({...sendToDb, ['projet']: project.nom_Projet}))
                        }}>{project.id_Projet}, {project.nom_Projet}</div>)}
                    </div>}
                </div>
                
                <button onClick={addWishes}>Ajouter</button>
            </div>}

            {addPurchase && 
            <table className="in-out-table">
                <thead>
                    <tr>
                        <td>Date</td>
                        <td>Code Article</td>
                        <td>Designation</td>
                        <td>Quantite en stock</td>
                        <td>Quantite demande</td>
                        <td>Code projet</td>
                        <td>Nom Projet</td>
                        <td>Etat de livraison</td>

                    </tr>
                </thead>

                <tbody>
                    
                    {entries.map(entry=> {
                        const keys = Object.keys(entry)
                        return <tr key={entry.codeProduit} id={entry.codeProduit}>
                            {keys.map(key => {
                                if(key == 'achat' || key == 'fournisseur')
                                    return
                                else
                                    return <td>{entry[key]}</td>
                            })}

                            <td><FaDeleteLeft className="icon" onClick={(e)=> handleDelete(e.currentTarget.parentElement.parentElement.id)}/></td>
                            
                        </tr>
                    })}

                    {/* {showTotal && <>
                        <tr className="total-title">
                            <td></td>
                            <td></td>
                            <td>Total Quantite</td>
                            <td>Total Prix Unitaire</td>
                            <td>Total Prix</td>
                        </tr>
                        <tr className="total-value">
                            <td></td>
                            <td></td>
                            <td>{quantity}</td>
                            <td>{unitprice}</td>
                            <td>{total}</td>
                        </tr>
                    </>} */}
                </tbody>
            </table>}

            {showOptions &&
                <div className="options">
                    <button onClick={handleSubmit}>Valider</button>
                </div>
            }

            

        </div>

    </div>
    
}

// export function Demande() {
//     const [livraison, setLivraison] = useState([]);
  
//     const handleLivraisonChange = (index) => {
//       const newLivraison = [...livraison];
//       newLivraison[index] = !newLivraison[index];
//       setLivraison(newLivraison);
//     };
  
//     const data = [
//       { date: '04/04/2024', code: 'ABB 501', desi: 'Clavier', stock: 55, projet: '20240088' },
//       { date: '', code: 'ABB 502', desi: 'Troùbone', stock: 1, projet: '20240089' },
//       { date: '', code: 'ABB 503', desi: 'Tele', stock: 2, projet: '20240090' },
//       { date: '', code: 'ABB 504', desi: '', stock: 5, projet: '20240091' },
//       { date: '', code: 'ABB 505', desi: '', stock: 67, projet: '20240092' },
//       { date: '', code: 'ABB 506', desi: '', stock: 186, projet: '20240093' },
//       { date: '', code: 'ABB 507', desi: '', stock: 16, projet: '20240094' },
//       { date: '', code: 'ABB 508', desi: '', stock: 7, projet: '20240095' },
//       { date: '', code: 'ABB 509', desi: '', stock: 15, projet: '20240096' },
//       { date: '', code: 'ABB 510', desi: '', stock: 7, projet: '20240097' },
//     ];
  
//     useState(() => {
//       setLivraison(Array(data.length).fill(false));
//     }, [data.length]);
  
//     return (
//       <div className="container mx-auto p-4">
//         <div className="text-center bg-yellow-500 text-white py-2 mb-4">
//           <h1 className="text-2xl font-bold">OPERATION MAGASINIER</h1>
//         </div>
//         <div className="bg-purple-600 text-white p-2 mb-4">
//           <h2 className="text-xl font-bold">ENTREE</h2>
//           <div className="flex justify-between bg-red-200 text-red-600 p-2 mt-2">
//             <span>Expression BESOIN / DDE ACHAT</span>
//             <span className="font-bold">1</span>
//             <span>Expression BESOIN / DDE ACHAT</span>
//           </div>
//         </div>
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr className="bg-green-600 text-white">
//               <th className="py-2 px-4 border">Date</th>
//               <th className="py-2 px-4 border">Code</th>
//               <th className="py-2 px-4 border">DESI</th>
//               <th className="py-2 px-4 border">Quat2 en Stock</th>
//               <th className="py-2 px-4 border">Qt2</th>
//               <th className="py-2 px-4 border">Projet (List)</th>
//               <th className="py-2 px-4 border">Non Projet</th>
//               <th className="py-2 px-4 border">Livraison</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((item, index) => (
//               <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
//                 <td className="py-2 px-4 border">{item.date}</td>
//                 <td className="py-2 px-4 border">{item.code}</td>
//                 <td className="py-2 px-4 border">{item.desi}</td>
//                 <td className="py-2 px-4 border">{item.stock}</td>
//                 <td className="py-2 px-4 border">{item.projet}</td>
//                 <td className="py-2 px-4 border"></td>
//                 <td className="py-2 px-4 border"></td>
//                 <td className="py-2 px-4 border">
//                   <input
//                     type="checkbox"
//                     checked={livraison[index]}
//                     onChange={() => handleLivraisonChange(index)}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="mt-4 flex justify-center">
//           <button className="bg-blue-500 text-white py-2 px-4 mx-2">Retour</button>
//           <button className="bg-blue-500 text-white py-2 px-4 mx-2">Imprimer</button>
//           <button className="bg-blue-500 text-white py-2 px-4 mx-2">Transformer</button>
//         </div>
//       </div>
//     );
//   };



