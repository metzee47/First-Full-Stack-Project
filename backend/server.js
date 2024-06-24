// dependencies export

const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

// run express
const app = express()

// enable all routes via app
app.use(cors())
app.use(express.json())

const dbConnexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'fadtestdb'
})



// connect database to backend
app.get('/', (req, res)=> res.json({message: 'from backend side'})
)

// connect user in the database from login page
app.post('/', (req, res)=>{

    const sql = 'SELECT * FROM user WHERE `login_User` = ? and `password_User` = ?'
    const {email, password} = req.body

    dbConnexion.query(sql, [email, password], (err, data)=>{
        if (err) {
            // Gérer les erreurs de requête SQL
            console.error(err);
            return res.status(500).json({ message: 'Erreur de base de données' });
        }
        
        // Vérifier si des données ont été renvoyées
        console.log(data)

        if (data.length > 0) {
            // Si des données ont été trouvées, renvoyer les données de l'utilisateur
            return res.json(data[0]); // Supposons qu'il n'y a qu'un seul utilisateur avec cet email/mot de passe
        } else {
            // Si aucun utilisateur correspondant n'a été trouvé, renvoyer une erreur
            return res.status(401).json({ message: 'Identifiants de connexion incorrects' });
        }


    })
})

// add user in database from sign-up page
app.post('/sign-up', (req, res) =>{

    const generateId = () => Math.floor(Math.random() * 10001)
    const userType = 'User'
    const sql = "INSERT INTO user (`id_User`, `login_User`, `password_User`, `nom_User`, `prenom_User`, `tel_User`, `note_User`, `type_User`) VALUES (?)"
    const values = [
        generateId(),
        req.body.email,
        req.body.password,
        req.body.name,
        req.body.prename,
        req.body.tel,
        0,
        userType,

        
    ]

    dbConnexion.query(sql, [values],(err, data)=>{
        if(err) console.log(err)
        return res.json(data)
    })

    
    
})


// get all data from database
const getDataFromDB = (table, res) => {
    const sql = `SELECT * FROM ${table}`
    dbConnexion.query(sql,(err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
}

const addDataInDB = (sql, values, res) => {
    dbConnexion.query(sql, [values],(err, data)=>{
        if(err) console.log(err)
        return res.json(data)
    })
}

const deleteDataInDB = (sql, id, res) => {

    dbConnexion.query(sql, [id],(err, data)=>{
        if(err) console.log(err)
        res.send('Donnees supprimes')
    })
}



// Pages User from SuperAdmin

// get all users from database
app.get('/users', (req, res)=>{
    getDataFromDB('user', res)
    
})

// add user from superadmin
app.post('/superadmin/users/new-user', (req,res) =>{    

    const generateId = () => Math.floor(Math.random() * 10001)
    const sql = "INSERT INTO user (`id_User`, `login_User`, `password_User`, `nom_User`, `prenom_User`, `tel_User`, `note_User`, `type_User`) VALUES (?)"
    const values = [
        generateId(),
        req.body.email,
        req.body.password,
        req.body.nom,
        req.body.prenom,
        req.body.telephone,
        req.body.note,
        req.body.usertype,
        
    ]

    addDataInDB(sql, values, res)
            
    
})

// delete user from superadmin
app.delete(`/superadmin/users/:id`, (req,res)=>{

    const sql = 'DELETE FROM user WHERE `user`.`id_User` = ?'
    
    deleteDataInDB(sql, req.params.id, res)
})

// edit and update user data from superadmin
app.put(`/superadmin/users/update-:id`, (req,res)=>{

    const sql = 'UPDATE user SET `login_User` = ?, `password_User` = ?, `nom_User` = ?, `prenom_User` = ?, `tel_User` = ?, `note_User` = ?, `type_User` = ? WHERE id_User = ?';
    
    dbConnexion.query(sql, [req.body.email,req.body.password,
        req.body.nom,req.body.prenom,req.body.telephone,
        req.body.note,req.body.usertype,req.params.id], 
        (err, result) => {
        if (err) console.error('Erreur lors de la mise à jour des données :', err);
        
        res.status(200).send (result);
    });
      
})





// Pages Product from SuperAdmin

// get all products from database
app.get('/products', (req, res)=>{
    getDataFromDB('produit', res)
})

// edit and update product data
app.put(`/superadmin/products/update-:id`, (req,res)=>{

    const sql = 'UPDATE produit SET `pu_Produit` = ?, `type_Produit` = ?, `prix_Vente` = ?, `note_Produit` = ?, `code_Barre` = ?, `numero_Serie` = ?, `unite` = ?, `statut` = ? WHERE id_Produit = ?';
    
    dbConnexion.query(sql, [req.body.pu,req.body.type,
        req.body.prix,req.body.note,req.body.codeBarre,
        req.body.numSerie,req.body.unite,req.body.statut,req.params.id], 
        (err, result) => {
        if (err) console.error('Erreur lors de la mise à jour des données :', err);
        
        res.status(200).send (result);
    });
      
})

// add user from superadmin
app.post('/superadmin/products/new-product', (req,res) =>{    

    const generateId = () => Math.floor(Math.random() * 10001)
    const sql = "INSERT INTO produit (`id_Produit`, `pu_Produit`, `type_Produit`, `prix_Vente`, `note_Produit`, `code_Barre`, `numero_Serie`, `unite`, `statut`) VALUES (?)"
    const values = [
        generateId(),
        req.body.pu,
        req.body.type,
        req.body.prix,
        req.body.note,
        req.body.codeBarre,
        req.body.numSerie,
        req.body.unite,
        req.body.statut,
        
    ]

    addDataInDB(sql, values, res)
            
    
})

// delete product from superadmin
app.delete(`/superadmin/products/:id`, (req,res)=>{

    const sql = 'DELETE FROM produit WHERE `produit`.`id_Produit` = ?'
    deleteDataInDB(sql, req.params.id, res)
    
})



// Pages Supplier from SuperAdmin

// get all fournisseur from database
app.get('/suppliers', (req, res)=>{
    getDataFromDB('fournisseur', res)
})

// edit and update fournisseur data
app.put(`/superadmin/suppliers/update-:id`, (req,res)=>{

    const sql = 'UPDATE fournisseur SET `nom_Fournisseur` = ?, `adresse_Fournisseur` = ?, `tel_Fournisseur` = ? WHERE id_Fournisseur = ?';
    
    dbConnexion.query(sql, [req.body.nom,req.body.adresse,req.body.telephone,req.params.id], 
        (err, result) => {
        if (err) console.error('Erreur lors de la mise à jour des données :', err);
        
        res.status(200).send (result);
    });
      
})

// add fournisseur from superadmin
app.post('/superadmin/suppliers/new-supplier', (req,res) =>{    

    const generateId = () => Math.floor(Math.random() * 10001)
    const sql = "INSERT INTO fournisseur (`id_Fournisseur`, `nom_Fournisseur`, `adresse_Fournisseur`, `tel_Fournisseur`) VALUES (?)"
    const values = [
        generateId(),
        req.body.nom,
        req.body.adresse,
        req.body.telephone
        
    ]

    addDataInDB(sql, values, res)
            
    
})

// delete fournisseur from superadmin
app.delete(`/superadmin/suppliers/:id`, (req,res)=>{

    const sql = 'DELETE FROM fournisseur WHERE `fournisseur`.`id_Fournisseur` = ?'
    deleteDataInDB(sql, req.params.id, res)

})




// Pages Clients from SuperAdmin

// get all client from database
app.get('/clients', (req, res)=>{
    getDataFromDB('client', res)
})

// edit and update client data
app.put(`/superadmin/clients/update-:id`, (req,res)=>{

    const sql = 'UPDATE client SET `nom_Client` = ?, `adresse_Client` = ?, `tel_Client` = ? WHERE id_Client = ?';
    
    dbConnexion.query(sql, [req.body.nom,req.body.adresse,req.body.telephone,req.params.id], 
        (err, result) => {
        if (err) console.error('Erreur lors de la mise à jour des données :', err);
        
        res.status(200).send (result);
    });
      
})

// add client from superadmin
app.post('/superadmin/clients/new-client', (req,res) =>{    

    const generateId = () => Math.floor(Math.random() * 10001)
    const sql = "INSERT INTO client (`id_Client`, `nom_Client`, `adresse_Client`, `tel_Client`) VALUES (?)"
    const values = [
        generateId(),
        req.body.nom,
        req.body.adresse,
        req.body.telephone
        
    ]

    addDataInDB(sql, values, res)
            
    
})

// delete client from superadmin
app.delete(`/superadmin/clients/:id`, (req,res)=>{

    const sql = 'DELETE FROM client WHERE `client`.`id_Client` = ?'
    deleteDataInDB(sql, req.params.id, res)
})




// Pages Achat from SuperAdmin

// get all Achat from database
app.get('/purchases', (req, res)=>{
    getDataFromDB('achat', res)
})

app.put(`/superadmin/purchases/update-:id`, (req,res)=>{

    const sql = 'UPDATE achat SET `statut`= ? WHERE id_Achat = ?';
    
    dbConnexion.query(sql, ['Livrée', req.params.id], 
        (err, result) => {
        if (err) console.error('Erreur lors de la mise à jour des données :', err);
        
        res.status(200).send (result);
    });
      
})

// add Achat from superadmin
app.post('/superadmin/purchases/new-purchase', (req,res) =>{    

    const sql = "INSERT INTO achat (`id_Achat`, `date_Achat`, `qte_Achat`, `id_User`, `id_Fournisseur`, `note_Achat`, `statut`) VALUES (?)"
    const values = [
        req.body.id,
        req.body.date,
        req.body.qte,
        req.body.user,
        req.body.fournisseur,
        req.body.note,    
        req.body.statut,
    ]

    addDataInDB(sql, values, res)
            
    
})

// add product to achat 
// app.post('/superadmin/purchases/new-purchase/:id-:idF', (req,res) =>{    

//     const sql = "INSERT INTO achatFournisseur (`id_Achat`, `id_Fournisseur`, `id_Produit`, `nom_Produit`, `quantite`, `id_Projet`, `nom_Projet`, `statut`) VALUES (?)"
//     const values = [
//         req.params.id,
//         req.params.idF,
//         req.body.codeProduit,
//         req.body.nomProduit,
//         req.body.neededQte,
//         req.body.codeProjet,
//         req.body.nomProjet,
//         req.body.deliveryStatut,
//     ]

//     addDataInDB(sql, values, res)
            
    
// })

// delete Achat from superadmin
app.delete(`/superadmin/purchases/:id`, (req,res)=>{

    const sql = 'DELETE FROM achat WHERE `achat`.`id_Achat` = ?'
    
    deleteDataInDB(sql, req.params.id, res)
})

// app.put(`/superadmin/purchase-supplier:idP-:idA`, (req,res)=>{

//     const sql = 'UPDATE achatFournisseur SET `statut` = ? WHERE id_Achat = ? AND id_Produit = ?';
    
//     dbConnexion.query(sql, ["Livré(e)", req.params.idA, req.params.idP], 
//         (err, result) => {
//         if (err) console.error('Erreur lors de la mise à jour des données :', err);
        
//         res.status(200).send (result);
//     });
      
// })

// edit and update Achat data from superadmin
app.put(`/superadmin/purchases/update-:id`, (req,res)=>{

    const sql = 'UPDATE achat SET `date_Achat` = ?, `qte_Achat` = ?, `id_Produit` = ?, `id_Fournisseur` = ?, `id_User` = ?, `note_Achat` = ? WHERE id_Achat = ?';
    
    dbConnexion.query(sql, [req.body.date,req.body.qte,
        req.body.produit,req.body.fournisseur,req.body.user,
        req.body.note,req.params.id], 
        (err, result) => {
        if (err) console.error('Erreur lors de la mise à jour des données :', err);
        
        res.status(200).send (result);
    });
      
})




// Pages Achat from SuperAdmin

// get all Achat from database
app.get('/sellings', (req, res)=>{
    getDataFromDB('vente', res)
})

// add Achat from superadmin
app.post('/superadmin/sellings/new-selling', (req,res) =>{    

    const generateId = () => Math.floor(Math.random() * 10001)
    const sql = "INSERT INTO vente (`id_Vente`, `date_Vente`, `qte_Vente`, `pu_Vente`, `pu_Achat`, `id_Produit`, `id_User`, `id_Client`, `note_Vente`) VALUES (?)"
    const values = [
        generateId(),
        req.body.date,
        req.body.qte,
        req.body.puV,
        req.body.puA,
        req.body.produit,
        req.body.user,
        req.body.client,
        req.body.note,        
    ]

    addDataInDB(sql, values, res)
            
    
})

// delete Achat from superadmin
app.delete(`/superadmin/sellings/:id`, (req,res)=>{

    const sql = 'DELETE FROM vente WHERE `vente`.`id_Vente` = ?'
    
    deleteDataInDB(sql, req.params.id, res)
})

// edit and update Achat data from superadmin
app.put(`/superadmin/sellings/update-:id`, (req,res)=>{

    const sql = 'UPDATE vente SET `date_Vente` = ?, `qte_Vente` = ?, `pu_Vente` = ?, `pu_Achat` = ?, `id_Produit` = ?, `id_User` = ?, `id_Client` = ?, `note_Vente` = ? WHERE id_Vente = ?';
    
    dbConnexion.query(sql, [req.body.date,req.body.qte,req.body.puV,
        req.body.puA,req.body.produit,req.body.user,req.body.client,
        req.body.note,req.params.id], 
        (err, result) => {
        if (err) console.error('Erreur lors de la mise à jour des données :', err);
        
        res.status(200).send (result);
    });
      
})


// get all users from database
app.get('/projects', (req, res)=>{
    getDataFromDB('projet', res)
    
})


app.listen(5050, ()=> console.log('Here we go'))