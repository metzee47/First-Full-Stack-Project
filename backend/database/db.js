// dependencies export


const dbConnexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'fadtestdb'
})

module.exports = dbConnexion