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
        web3.eth.getBlockNumber(function(error, content) {
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
    console.log("Getting events at " + theLastIndexedBlock);
    return new Promise(function(fulfill, reject) {
        theContract.getPastEvents(theKey, {
            filter: {},
            fromBlock: theLastIndexedBlock,
            toBlock: theBlockNumber
        }, function(error, content) {
            if (error) {
                console.log("We have an error with getting the events!");
                console.log(error);
                reject(error)
            } else {
                console.log("There don't seem to be any issues with getting the events, please wait ...");
                if (content.length > 0) {
                    var message1 = "We have content to write";
                    fulfill(message1);
                } else {
                    var message2 = "There is no content to write";
                    fulfill(message2);
                }
            }
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

//Attribution @olekon on GitHub < https://github.com/olekon/p1_eth_caching/blob/master/src/index.js >
const timeout = 10;

function sleep(milliseconds) {
    return new Promise(resolve =>
        setTimeout(resolve, milliseconds)
    );
}
async function poll(fn) {
    await fn();
    await sleep(timeout * 1000);
    await poll(fn);
}

async function writetheEventCollectionToElasticsearch(theEventCollection, _event) {
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
            theDocumentToIndex["name"] = _event;
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


async function cacheEvents(_contractInstance, _event, _fromBlock, _toBlock) {
    console.log("Looking for any " + _event.toString() + " events, between block " + _fromBlock + ", and block " + _toBlock);

    try {

        var events = _contractInstance.getPastEvents(_event.toString(), {
            filter: {},
            fromBlock: _fromBlock,
            toBlock: _toBlock
        });
        return events;    		

    } catch (err) {
        console.log("Error running cacheEvents");
        console.log(err);
    }

}

async function scan(_contractInstance, _currentBlock, _latestCachedBlock, _event) {
    const MaxBlockRange = 5000;
    console.log("Outside the scan functions await poll...........");
    await poll(async () => {
        try {
        	latestEthBlock = await web3.eth.getBlockNumber();
        	console.log("Running the scan function");
        	console.log("CurrentBlock before calc is " + latestEthBlock);
            var latestEthBlock = Math.min(
                latestEthBlock,
                _latestCachedBlock + MaxBlockRange
            );
            console.log("CurrentBlock AFTER calc is " + latestEthBlock);
            console.log("Current block is " + latestEthBlock + " and latest cached block is " + _latestCachedBlock);
            if (latestEthBlock > _latestCachedBlock) {
                console.log("Running the cacheEvents function");
                var events = await cacheEvents(_contractInstance, _event, _latestCachedBlock, latestEthBlock).then(console.log("Finished calling caheEvents from inside scan"));
                await writetheEventCollectionToElasticsearch(events, _event);
                console.log("Latest cached block was " + _latestCachedBlock);
                _latestCachedBlock = latestEthBlock + 1;
                console.log("*RESULT");
                console.log(events.length);
                console.log("Latest cached block is now " + _latestCachedBlock);

            } else {
                return;
            }

        } catch (e) {
            console.log("Error found");
            console.log(e);
        }
    });
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
        console.log("Creating a contract instance for the " + theItems.hits.hits[ii]._source.name + " contract, which is located at " + theItems.hits.hits[ii]._id);
        var aContract = new web3.eth.Contract(uniswapAbi, theItems.hits.hits[ii]._id);
        var theEvents = theItems.hits.hits[ii]._source.events;
        console.log("Events:");
        for (var key in theEvents) {
            if (theEvents.hasOwnProperty(key)) {
                scan(aContract, blockNumber, lastIndexedBlock, key).then(console.log("Performed a single scan of " + key));
                //For testing only
                console.log("Making an early exit");
                return;
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
