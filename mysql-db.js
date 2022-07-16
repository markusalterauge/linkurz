const geheim = require('./geheim/geheim.json');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: geheim.mysql_connection,
    user: geheim.mysql_username,
    password: geheim.mysql_password,
    database : geheim.mysql_database
});

connection.connect((error) => {
    if(error){
        console.log('Error connecting to the MySQL Database');
        return;
    }
    console.log('Connection established sucessfully');
});

var getAllUrls = function(callback) {
    connection.query(`SELECT * FROM urls`, (err, result) =>{
        if(err){
            callback(err, null)
        }
        callback(null, result);
    });
};

var insertUrl = function(id, url, callback) {
    connection.query(`INSERT INTO urls (id, url) VALUES ('${id}', '${url}');`, (err, result) =>{
        console.log(id +" : "+url);
        if(err){
            callback(err, null)
        }
        callback(null, result);
    });
};

var getURL = function (url, callback) {
    connection.query(`SELECT * FROM urls WHERE id = '${url}'`, (err, result) =>{
        if(err){
            callback(err, null)
        }
        callback(null, result);
    });
};
module.exports.getAllUrls = getAllUrls;
module.exports.insertUrl = insertUrl;
module.exports.getURL = getURL;