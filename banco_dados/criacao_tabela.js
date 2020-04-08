const mysql      = require('mysql');
//const criacaoTabelaCadastro = require('./schemaCadastro')

const connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : 'admin',
  database : 'rateiocloud',
  insecureAuth : true
});

connection.connect(function(err){
    if(err) return console.log(err);
    console.log('conectou!');
    createTable(connection);
  })
  
  function createTable(conn){

    const sql = "CREATE TABLE IF NOT EXISTS cadastro_produto (\n"+
                "id int unique auto_increment,\n"+
                "resource_id varchar(255) NOT NULL,\n"+
                "resource_type varchar(255) NOT NULL,\n"+
                "resource_name varchar(255) NOT NULL,\n"+
                "projeto varchar(300) NOT NULL,\n"+
                "funcao varchar(300) NOT NULL,\n"+
                "owner_ varchar(300) NOT NULL,\n"+
                "PRIMARY KEY (resource_id)\n"+
                ");";
    
    conn.query(sql, function (error, results, fields){
        if(error) return console.log(error);
        console.log('criou a tabela!');
    });
};