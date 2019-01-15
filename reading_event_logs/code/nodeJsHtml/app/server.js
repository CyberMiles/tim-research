console.log('Server-side code running');

const express = require('express');

const app = express();

//Mysql
const mysql = require('mysql');
// Mysql connection object with credentials
const con = mysql.createConnection({
    host: "localhost",
    user: "ubuntu",
    password: "asdfasdfasdf",
    database: "uniswap_events"
});
// Connedto to Mysql
con.connect(function(err) {
    if (err) {
        console.log("Unable to connect to Mysql!");
        throw err;
    } else {
        console.log("Connected!");
    }
});

// serve files from the public directory
app.use(express.static('public'));

// start the express web server listening on 8080
app.listen(8080, () => {
    console.log('listening on 8080');
});

// serve the homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//A button
app.post('/clicked', (req, res) => {
    console.log("Loading ");
    // Do this dynamically in future (by looping through the public folder looking for directories starting with 0x which contain abi files)
    // Also must clean up the json files using regex like this python example '''cleanAbi = re.sub(' +|\n|\t', '', dirtyAbi)'''
    const uniswap_exchange_contract_address = '0xaf1a51fdca46190e7703b6cf97470efc92ec6498';
    const uniswap_exchange_contract_abi = require('./public/0xaf1a51fdca46190e7703b6cf97470efc92ec6498/abi.json');
    var testQuery = "SELECT id, abi FROM uniswap_exchange_contracts where id = " + "'" + uniswap_exchange_contract_address + "'" + ";"
    console.log(testQuery);
    con.query(testQuery, function(err, result, fields) {
    	console.log(result);
        console.log(result.length);
        if (result.length < 1) {
        	// Adding the new contract and its abi to the contracts table
            console.log("That contract does not exist yet.");
            var insertContractQuery = "INSERT INTO uniswap_exchange_contracts(id, abi) VALUES ( "+ "'" + uniswap_exchange_contract_address + "'" + ", " + "'" + JSON.stringify(uniswap_exchange_contract_abi) + "'" + ");"
            console.log(insertContractQuery);
            con.query(insertContractQuery, function(err2, result2, fields2) {
                console.log(result2 + "\n" + err2 + "\n", + fields2);
            });
            // Finding this contract's events and adding them to the events table
			var i;
			var length = uniswap_exchange_contract_abi.length;
			for (i = 0; i < length; i++) {
				individualItem = uniswap_exchange_contract_abi[i];
				if (individualItem["type"] == "event") {
					console.log("\nEvent found - adding it to database ...");
					var insertEventQuery = "INSERT INTO uniswap_exchange_events(event) VALUES ("+ "'" + JSON.stringify(individualItem) + "'" + ");"
					console.log(insertEventQuery);
					con.query(insertEventQuery, function(err3, result3, fields3) {
                		console.log(result3 + "\n" + err3 + "\n", + fields3);
            		});
				}
			}

        } else {
            console.log("Contract already exists!");
        }

    });

    res.sendStatus(201);
});


app.post('/clicked2', (req, res) => {
    console.log("Loading ");
query1 = "DROP DATABASE uniswap_events;"
query2 = "CREATE DATABASE uniswap_events;"
query3 = "USE uniswap_events"
query4 = "CREATE TABLE uniswap_exchange_contracts (id CHAR(42) NOT NULL, abi JSON NOT NULL, PRIMARY KEY (id));"
query5 = "CREATE TABLE uniswap_exchange_events (id CHAR(66) NOT NULL, event JSON NOT NULL, PRIMARY KEY (id));"
query5 = "CREATE TABLE blockchain_log_events (contractId CHAR(42) NOT NULL, eventId CHAR(66) NOT NULL, logIndexAndTxHashed CHAR(66) NOT NULL, logEventObject JSON NOT NULL, PRIMARY KEY (contractId, eventId), FOREIGN KEY(contractId) REFERENCES uniswap_exchange_contracts(id), FOREIGN KEY(eventId) REFERENCES uniswap_exchange_events(id));"
query6 = "ALTER TABLE uniswap_exchange_contracts ADD UNIQUE INDEX contract_address_unique (id ASC);"
query7 = "ALTER TABLE uniswap_exchange_events ADD UNIQUE INDEX event_hash (id ASC);"
query8 = "ALTER TABLE blockchain_log_events ADD UNIQUE INDEX log_index_and_tx_hashed (logIndexAndTxHashed ASC);"

con.query(query1, function(err, result, fields) {
	console.log(query1);
	console.log(err + "\n" + result + "\n", + fields);
});
con.query(query2, function(err, result, fields) {
	console.log(query2);
	console.log(err + "\n" + result + "\n", + fields);
});
con.query(query3, function(err, result, fields) {
	console.log(query3);
	console.log(err + "\n" + result + "\n", + fields);
});
con.query(query4, function(err, result, fields) {
	console.log(query4);
	console.log(err + "\n" + result + "\n", + fields);
});
con.query(query5, function(err, result, fields) {
	console.log(query5);
	console.log(err + "\n" + result + "\n", + fields);
});
con.query(query6, function(err, result, fields) {
	console.log(query6);
	console.log(err + "\n" + result + "\n", + fields);
});
con.query(query7, function(err, result, fields) {
	console.log(query7);
	console.log(err + "\n" + result + "\n", + fields);
});
con.query(query8, function(err, result, fields) {
	console.log(query8);
	console.log(err + "\n" + result + "\n", + fields);
});

});



