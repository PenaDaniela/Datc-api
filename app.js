var express = require('express');
var bodyParser = require('body-parser');
var sql = require('mssql');
var app = express();

var db = {
    user: 'adminDatc',
    password: 'Mov12345',
    server: 'adminserverdatc.database.windows.net',
    database: 'AdminDataBase',
    options: {
        encrypt: 'true'
    }
}

app.use(bodyParser.json());

app.get('/', function(req, res) {
    sql.close();
    sql.connect(db, function(err){
        if( err ){
            return res.send('error');
        }
        else{
            var request = new sql.Request();
            var reqString = "SELECT * FROM Resources";
            //var reqString = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE'";

            request.query(reqString, function(err, recordset) {
                if (err) {
                    return res.json({
                        error: err,
                        message: "There is an error :(."
                    });
                }
                else{
                    console.log(recordset);
                    return res.json({
                        recordset
                    });
                }
            });
        }
    });
    //return res.send('works...');
});

app.listen(process.env.PORT || 3000, function(){
    console.log("App is live!");
});