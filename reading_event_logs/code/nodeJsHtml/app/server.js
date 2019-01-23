console.log('Server-side code running');

const express = require('express');
var fs = require('fs');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
var Web3 = require('web3');
node = 'https://mainnet.infura.io/v3/46d1afae8b55464585222887f55eab6a';
const web3 = new Web3(new Web3.providers.HttpProvider(node));

// Dealing with promises
var Promise = require('bluebird');

// Uniswap ABI
var uniswapAbi = require("./public/contracts/uniswap_exchange_contract/abi.json");
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

getCurrentBlock().then(value => blockNumber = value);

async function getCurrentBlockOrig() {
    let response = await web3.eth.getBlockNumber();
    return response;
}

function getCurrentBlock() {
    return new Promise(function(fulfill, reject) {
        web3.eth.getBlockNumber( function(error, content) {
            if (error) reject(error)
            else fulfill(content);
        })
    })
}

async function getEventsOrig(theKey, theContract, theLastIndexedBlock, theBlockNumber) {
    let theEvents = await theContract.getPastEvents(theKey, {
        filter: {},
        fromBlock: theLastIndexedBlock,
        toBlock: theBlockNumber
    });
    return theEvents;
}

function getEvents(theKey, theContract, theLastIndexedBlock, theBlockNumber) {
    return new Promise(function(fulfill, reject) {
        theContract.getPastEvents(theKey, {
            filter: {},
            fromBlock: theLastIndexedBlock,
            toBlock: theBlockNumber
        }, function(error, content) {
            if (error) reject(error)
            else fulfill(content);
        })
    })
}

function checkIfItemExists(theUrl) {
    request = new XMLHttpRequest();
    console.log("Checking URL: " + theUrl);
    request.open('GET', theUrl, /* async = */ false);
    request.send();
    console.log('status code: ' + request.status);
    if (request.status === 404) {
        return false;
    } else {
        return true;
    }
}

function getAllItemsInIndex(theUrl) {
    theRequest = new XMLHttpRequest();
    theUrl = theUrl + "?size=1000"
    console.log("Checking URL: " + theUrl);
    theRequest.open('GET', theUrl, /* async = */ false);
    theRequest.send();
    if (theRequest.status >= 200 && theRequest.status < 300) {
        console.log(theRequest.responseText);
        console.log("Fetched all of the items!")
        return theRequest.responseText;
    } else {
        console.log(theRequest.status);
    }
}


function bulkIngest(bulkData) {
    client.bulk(bulkData, function(error, response) {
        if (error) {
            console.error(error);
            return;
        } else {
            console.log(response); //  I don't recommend this but I like having my console flooded with stuff.  It looks cool.  Like I'm compiling a kernel really fast.
        }
    });

}

function loadContracts(uniswapAbi) {
    //TODO, find out if this needs to be dynamic i.e. do users upload abi's in the browser or do we loop over folder and read abi's and addresses dynamically
    //Not sure of end design goals at this early stage
    var dataToLoad = {};
    var eventsToLoad = {};
    url = "http://localhost:9200/uniswap_exchange_register/_all/";
    for (var key in uniswapAbi) {
        if (uniswapAbi[key]["type"] === "event") {
            eventsToLoad[uniswapAbi[key].name] = uniswapAbi[key]
        }
    }

    var uniswapAddresses = require("./public/contracts/uniswap_exchange_contract/addresses.json");
    //console.log(JSON.stringify(uniswapAddresses));
    var bulkData = {};
    var theBodyArray = [];
    for (var key in uniswapAddresses) {
        if (uniswapAddresses.hasOwnProperty(key)) {
            console.log("Processing: " + uniswapAddresses[key]);
            theUrlWithKey = url + uniswapAddresses[key];
            var contractExists = checkIfItemExists(theUrlWithKey);
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
                // The block when Uniswap was deployed on the mainnet
                theDocumentToIndex["lastIndexedBlock"] = 6627917;
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

function harvestContracts(uniswapAbi) {
    console.log("Harvesting contracts...");

    console.log("Current block number = " + blockNumber);
    url = "http://localhost:9200/uniswap_exchange_register/_search";
    var theItems = JSON.parse(getAllItemsInIndex(url));
    console.log("These are the items as seen in the harvest contracts function!")
    for (var ii = 0; ii < theItems.hits.hits.length; ii++) {
        console.log("Processing: " + theItems.hits.hits[ii]._source.name + " at address: " + theItems.hits.hits[ii]._id);
        var lastIndexedBlock = theItems.hits.hits[ii]._source.lastIndexedBlock;
        console.log("The last indexed block for " + theItems.hits.hits[ii]._source.name + " is " + lastIndexedBlock);
        var aContract = new web3.eth.Contract(uniswapAbi, theItems.hits.hits[ii]._id);
        console.log(lastIndexedBlock);
        console.log(blockNumber);
        var theEvents = theItems.hits.hits[ii]._source.events;
        console.log("Events:");
        for (var key in theEvents) {
            if (theEvents.hasOwnProperty(key)) {
                if (lastIndexedBlock == 0 || lastIndexedBlock < blockNumber) {
                    console.log("We have some harvesting to do ...");
                    console.log("Harvesting " + key);
                    getEvents(key, aContract, lastIndexedBlock, blockNumber).then(value => theEvents = value);
                    //Orig
                    //var theEvents = getEvents(key, aContract, lastIndexedBlock, blockNumber);
                    console.log(JSON.stringify(theEvents));
                    //theItems.hits.hits[ii]._source.events

                }
            }

        }

    }
}



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
    loadContracts(uniswapAbi);
    res.sendStatus(201);
});


app.post('/clicked2', (req, res) => {
    console.log("Clicked2");
    harvestContracts(uniswapAbi)
    res.sendStatus(201)
});
