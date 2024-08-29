const mysql = require('mysql2');
const app = express;
const dotenv = require('dotenv');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'azerty~$',
    database:'LIVELY',
});

connection.connect((err)=> {
    if (err) throw err;
    console.log('COnnected to the datadabse');
});

module.exports = connection;

app.listen(port, console.log(`server is listening on port ${port}...`));
