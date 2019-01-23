console.log('Server-side code running');

const express = require('express');
var fs = require('fs');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

function checkIfItemExists(theIndex, theType, theId) {
    request = new XMLHttpRequest();
    const url = "http://127.0.0.1:9200" + "/" + theIndex + "/" + theType + "/" + theId;
    request.open('GET', url, /* async = */ false);
    request.send();
    console.log('status code: ' + request.status);
    if (request.status === 404) {
        return false;
    } else {
        return true;
    }
}

function bulkIngest(bulkData) {
    client.bulk(bulkData, function(error, response) {
        if (error) {
            console.error(error);
            return;
        } else {
            console.log(response);
        }
    });

}

function loadContracts() {
    //TODO, find out if this needs to be dynamic i.e. do users upload abi's in the browser or do we loop over folder and read abi's and addresses dynamically
    //Not sure of end design goals at this early stage
    var dataToLoad = {};
    var eventsToLoad = {};
    var uniswapAbi = require("./public/contracts/uniswap_exchange_contract/abi.json");
    for (var key in uniswapAbi) {
        if (uniswapAbi[key]["type"] === "event") {
            eventsToLoad[uniswapAbi[key].name] = uniswapAbi[key]
        }
    }

    var uniswapAddresses = require("./public/contracts/uniswap_exchange_contract/addresses.json");
    var bulkData = {};
    var theBodyArray = [];
    for (var key in uniswapAddresses) {
        if (uniswapAddresses.hasOwnProperty(key)) {
            console.log("Processing: " + uniswapAddresses[key]);
            var contractExists = checkIfItemExists('uniswap_exchange_register', '_all', uniswapAddresses[key]);
            if (contractExists == false) {
                console.log("Item does not exist, let's add it ...")
                theId = {};
                actionDescription = {};
                theId["_id"] = uniswapAddresses[key];
                theId["_type"] = "exchange";
                theId["_index"] = 'uniswap_exchange_register';
                actionDescription["index"] = theId;
                theBodyArray.push(actionDescription);
                theDocumentToIndex = {};
                theDocumentToIndex["name"] = key;
                theDocumentToIndex["lastIndexedBlock"] = -1;
                theDocumentToIndex["beingHarvested"] = false;
                theDocumentToIndex["events"] = eventsToLoad;
                theBodyArray.push(theDocumentToIndex);

            }
        }
    }
    if (theBodyArray.length > 0) {
        bulkData["body"] = theBodyArray;
        console.log("Adding the following data to the uniswap_exchange_register")
        console.log(JSON.stringify(bulkData));
        bulkIngest(bulkData);
    }

}


var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

const app = express();

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
    console.log("Loading contracts");
    loadContracts();
    res.sendStatus(201);
});


app.post('/clicked2', (req, res) => {
    console.log("Clicked2");
    res.sendStatus(201)
});
