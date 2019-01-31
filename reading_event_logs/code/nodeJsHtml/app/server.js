console.log('Server-side code running');
const express = require('express');

// XMLHTTPRequest
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();


//Web3
var Web3 = require('web3');
node = 'https://mainnet.infura.io/v3/46d1afae8b55464585222887f55eab6a';
const web3 = new Web3(new Web3.providers.HttpProvider(node));

// Uniswap ABI
var uniswapAbi = require("./public/contracts/uniswap_exchange_contract/abi.json");

// Elasticsearch
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});


// Current block
// Call the get current block function
getCurrentBlock().then(value => blockNumber = value);


// Get the current block
function getCurrentBlock() {
    return new Promise(function(fulfill, reject) {
        web3.eth.getBlockNumber(function(error, content) {
            if (error) reject(error)
            else fulfill(content);
        })
    })
}

// Pushes a bulk data object into Elasticsearch using the .bulk feature
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

// Check to see if a single item exists in Elasticsearch
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

// Call this function like this
// await wait(500);
function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// Loads in all of the contract addresses and abi, creates a bulk json object and then calls bulkIngest function
function loadContracts(uniswapAbi) {
    url = "http://localhost:9200/uniswap_exchange_register/_all/";
    for (var key in uniswapAbi) {
        if (uniswapAbi[key]["type"] === "event") {
        	var eventName =  uniswapAbi[key]["name"];
        	var eventInputs = uniswapAbi[key]["inputs"];
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
                        theId["_id"] = web3.utils.sha3(uniswapAddresses[key] + eventName);
                        theId["_type"] = "exchange";
                        theId["_index"] = 'uniswap_exchange_register';
                        actionDescription["index"] = theId;
                        theBodyArray.push(actionDescription);
                        theDocumentToIndex = {};
                        theDocumentToIndex["contractName"] = key;
                        theDocumentToIndex["contractAddress"] = uniswapAddresses[key];
                        theDocumentToIndex["lastIndexedBlock"] = 6627917;
                        theDocumentToIndex["eventName"] = eventName;
						theDocumentToIndex["eventInputs"] = eventInputs;

                        theBodyArray.push(theDocumentToIndex);
                    }
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
}

function getRequestWithOnlyUrl(theUrl) {
    theRequest = new XMLHttpRequest();
    theUrl = theUrl;
    console.log("Checking URL: " + theUrl);
    theRequest.open('GET', theUrl, /* async = */ false);
    theRequest.send();
    if (theRequest.status >= 200 && theRequest.status < 300) {
        return theRequest.responseText;
    } else {
        console.log(theRequest.status);
    }
}

function harvestContracts(){
	var theGetHitsUrl = "http://localhost:9200/uniswap_exchange_register/_search/?filter_path=hits.total";
	var theTotalHits = JSON.parse(getRequestWithOnlyUrl(theGetHitsUrl));
	var registerLength = theTotalHits["hits"]["total"];
	console.log(registerLength);
	for(var i = 0; i < registerLength; i++){
		console.log("Processing " + i + " of " + registerLength);
		// Fetch every combination of "contract" and "event type" and process one by one 
		theGetSingleEventUrl = "http://localhost:9200/uniswap_exchange_register/_search/?from=" + i + "&size=1&filter_path=hits.hits._source";
		singleEventFromRegister = JSON.parse(getRequestWithOnlyUrl(theGetSingleEventUrl));
		// Instantiate variables which hold the key values for the web3 harvesting
		lastIndexedBlock = singleEventFromRegister["hits"].hits[0]._source.lastIndexedBlock;
		eventName = singleEventFromRegister["hits"].hits[0]._source.eventName;
		// Instantiate web3 contract instance
		var web3ContractInstance = new web3.eth.Contract(uniswapAbi, singleEventFromRegister["hits"].hits[0]._source.contractAddress);
		harvestSingleInstanceOfContractEvent(web3ContractInstance, eventName, lastIndexedBlock, blockNumber);

	}
}

async function harvestSingleInstanceOfContractEvent(web3ContractInstance, eventName, lastIndexedBlock, blockNumber) {
    console.log("Looking for any " + eventName + " events, between block " + lastIndexedBlock + ", and block " + blockNumber);
    try {
        var events = await web3ContractInstance.getPastEvents(eventName, {
            filter: {},
            fromBlock: lastIndexedBlock,
            toBlock: blockNumber
        });
        writetheEventCollectionToElasticsearch(events, eventName)  		

    } catch (err) {
        console.log("Error running cacheEvents");
        console.log(err);
    }

}

async function writetheEventCollectionToElasticsearch(theEventCollection, eventName) {
    console.log("Found theEventCollection = " + theEventCollection.length);
    if (theEventCollection.length > 0) {
        var bulkData = {};
        var theBodyArray = [];
        theEventCollection.forEach(function(obj) {
            eventHash = web3.utils.sha3(obj.transactionHash, obj.logIndex);
            theId = {};
            actionDescription = {};
            theId["_id"] = eventHash;
            theId["_type"] = "event";
            theId["_index"] = 'uniswap_exchange_events';
            actionDescription["index"] = theId;
            theBodyArray.push(actionDescription);
            theDocumentToIndex = {};
            theDocumentToIndex["name"] = eventName;
            theDocumentToIndex["jsonEventObject"] = obj;
            theBodyArray.push(theDocumentToIndex);
        });
        if (theBodyArray.length > 0) {
            bulkData["body"] = theBodyArray;
            console.log("Adding the following data to the uniswap_exchange_events")
            console.log(JSON.stringify(bulkData));
            bulkIngest(bulkData);
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



// scan as many blocks as possible and create one bulk import (one event from one contract only)

// hash contract address and event name and store the last indexed block against that


