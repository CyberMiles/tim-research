# Object based unit testing for blockchains

## Why object based - Timing
This is a new idea built on the premise that unit testing against a blockchain using a non blocking asynchronious language such as Javascript is problematic. Problematic in the way that the calling code (used to perform the unit testing) executes very quickly. In contrast, the data (which is crutial to the testing) endures a round-trip (the journey of firstly becoming part of the blockchain's new state and then secondly being returned from the blockchain network to the calling code (which is performing the unit testing). The testing process in a non blocking asynchronous environment needs a lot of help to ensure that tests are carried out in context.

## Why object based - Live network
Smart contracts need to be deployed in order for us to call their functions. This means that (even if they are deployed on a test network) the testing data is live and unable to be easily "reset". On a traditional computer system, one could simply reset all variables back to zero or revert changes made by the test suite. This is not entirely possible with a blockchain network, so instead additional code would be employed to appropriately update the unit testing object to create a clean slate for testing to continue. A simple example of this would be testing the increase of tokenSupply. If the tokenSupply was increased by 100 (and could not be decreased due to the nature of the contract) then the new baseline for the second test would be 100 not zero. The result of this test being run again would obviously result in a tokenSupply of 200 (increased by 100); and so 200 would now become the new baseline and so forth.

Let's take a look at a unit testing object.

## The unit testing object
A single unit test object would be as follows.

```javascript
{
	"smartContract": {
		"name": "MySmartContract",
		"address": "0x12345",
		"abi": [{
			"constant": false,
			"inputs": [{
				"name": "account",
				"type": "address"
			}]
		}]
	},
	"testCases": [{
		"id": "test_1",
		"variablesConditions": [{
				"name": "totalSupply",
				"type": "uint",
				"preCondition": "0",
				"postCondition": "100"
			},
			{
				"name": "supplyChanged",
				"type": "uint",
				"preCondition": "false",
				"postCondition": "true"
			}

		],
		"data": "0x61309c56600035601c527401000",
		"functionName": "increaseTotalSupply",
		"functionParameters": {
			"from": "0x21303ca2C65B"
		}
	}]
}
```
The above unit testing object has enough information to instantiate an instance of the contract to interact with. It also contains the pre and post variable conditions (which are responsible for initiating that the test can go ahead and also facilitating the pass/fail grade after the test has taken place). The unit testing object also has the necessary data to execute the appropriate function in question.

## The code to execute the unit testing
I started out by creating [a design pattern](https://medium.com/@timmccallum/how-to-logically-stop-javascript-code-from-executing-d449d8e32a4b) which is capable of waiting for data to be available before execution commences. 

## The next iteration of code to execute the unit testing
The following code is a prototype (work in progress)
```javascript
window.addEventListener('load', function() {
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
        console.log("Connected to web3 - Success!")
    } else {
        // set the provider you want from Web3.providers
        console.log("Was unable to connect to web3. Trying localhost ...")
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

});

//TODO
//THIS HAS HAD SOME REDESIGN AND NOW REQUIRES OUTSIDE CODE TO INITIALIZE THE SMART CONTRACT
//AS WELL AS TEST ALL OF THE VARIABLES AND THEN EXECUTE THE APPROPRIATE FUNCTION
//SEE THE UNIT TESTING OBJECT BELOW FOR DIRECTION ON WHAT THE OUTSIDE CODE WILL DO
/*
{
    "smartContract": {
        "name": "MySmartContract",
        "address": "0x12345",
        "abi": [{
            "constant": false,
            "inputs": [{
                "name": "account",
                "type": "address"
            }]
        }]
    },
    "testCases": [{
        "id": "test_1",
        "variablesConditions": [{
                "name": "totalSupply",
                "type": "uint",
                "preCondition": "0",
                "postCondition": "100"
            },
            {
                "name": "supplyChanged",
                "type": "uint",
                "preCondition": "false",
                "postCondition": "true"
            }

        ],
        "data": "0x61309c56600035601c527401000",
        "functionName": "increaseTotalSupply",
        "functionParameters": {
            "from": "0x21303ca2C65B"
        }
    }]
}
*/


class JSTOP {
    constructor() {
        this.taskCompleted == false;
        this.readyToCommenceTask == false;
        //THIS IS THE STOPPER
        this.inProgress == false;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async driver() {
        console.log('Please wait to see if the critical data has been set. ');
        await this.sleep(5000);
        this.refreshGetterObjects();
        this.qualify();
        console.log("It has been 5 seconds, let us try all of that again.");
        this.conductTask();
    }

    conductTask() {
        if (this.taskCompleted == false) {
            console.log("Task has not yet been completed.");
            if (this.readyToCommenceTask == false) {
                console.log("We are not ready to commence the tasks just yet.");
                this.driver();
            } else {
                if (this.readyToCommenceTask == true) {
                    //TODO CONSIDER THIS FLAG BEING SET AND RESET
                    //this.inProgress == true;
                    console.log("Conducting the unit test ...");
                    this.taskCompleted = true;
                    console.log("Unit test is now complete!");
                    console.log("Success!");
                }
            }
        }
    }
    refreshGetterObjects() {
        for (var key in js.variableArray) {
            var singleEntry = js.variableArray[key];
            //TODO THIS NEEDS TO BE PART OF THE OUTSIDE CODE (A FUNCTION OR OBJECT CALLED QUALIFIER)
            //THE QUALIFIER CAN THEN SET THE readyToCommenceTask USING A PUBLIC FUNCTION
            //TODO CREATE setReadyToCommence PUBLIC FUNCTION
        }
    }
}

class Contract {

    constructor() {
        this.varContractVars = [];
        this.varContractVars.push({
            "contractAddress": false
        });
        this.varContractVars.push({
            "contractAbi": false
        });
        this.varContractVars.push({
            "deployedContract": false
        });

        this.varBaselineVars = [];
        this.varBaselineVars.push({
            "decimals": false
        });
        this.varBaselineVars.push({
            "totalSupply": false
        });
        this.varBaselineVars.push({
            "tokenName": false
        });
        this.varBaselineVars.push({
            "tokenSymbol": false
        });
        this.varBaselineVars.push({
            "paused": false
        });

        this.varOperationalVars = [];
        this.varOperationalVars.push({
            "taskCompleted": false
        });
        this.varOperationalVars.push({
            "readyToCommenceTask": false
        });
    }

    setContractAddress(_contractAddress) {
        //Passing in this value for automation purposes 0x721778b6622732c3af81c2f2ee785b4106ab81b6
        this.varContractVars["contractAddress"] = _contractAddress;
        console.log(this.varContractVars["contractAddress"]);
    }

    getContractAddress() {
        return this.varContractVars["contractAddress"];
    }

    getContractAbi() {
        return this.varContractVars["contractAbi"];
    }

    launchContract() {
        //Passing in this value for automation purposes 0x721778b6622732c3af81c2f2ee785b4106ab81b6

    }

    async setABI() {
        console.log("Loading ABI");
        var abi = [{
            "constant": false,
            "inputs": [{
                "name": "account",
                "type": "address"
            }],
            "name": "addMinter",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{
                "name": "account",
                "type": "address"
            }],
            "name": "addPauser",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{
                "name": "spender",
                "type": "address"
            }, {
                "name": "value",
                "type": "uint256"
            }],
            "name": "approve",
            "outputs": [{
                "name": "",
                "type": "bool"
            }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{
                "name": "value",
                "type": "uint256"
            }],
            "name": "burn",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{
                "name": "from",
                "type": "address"
            }, {
                "name": "value",
                "type": "uint256"
            }],
            "name": "burnFrom",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{
                "name": "spender",
                "type": "address"
            }, {
                "name": "subtractedValue",
                "type": "uint256"
            }],
            "name": "decreaseAllowance",
            "outputs": [{
                "name": "success",
                "type": "bool"
            }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{
                "name": "spender",
                "type": "address"
            }, {
                "name": "addedValue",
                "type": "uint256"
            }],
            "name": "increaseAllowance",
            "outputs": [{
                "name": "success",
                "type": "bool"
            }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{
                "name": "to",
                "type": "address"
            }, {
                "name": "value",
                "type": "uint256"
            }],
            "name": "mint",
            "outputs": [{
                "name": "",
                "type": "bool"
            }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [],
            "name": "pause",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [],
            "name": "renounceMinter",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [],
            "name": "renouncePauser",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{
                "name": "to",
                "type": "address"
            }, {
                "name": "value",
                "type": "uint256"
            }],
            "name": "transfer",
            "outputs": [{
                "name": "",
                "type": "bool"
            }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{
                "name": "from",
                "type": "address"
            }, {
                "name": "to",
                "type": "address"
            }, {
                "name": "value",
                "type": "uint256"
            }],
            "name": "transferFrom",
            "outputs": [{
                "name": "",
                "type": "bool"
            }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [],
            "name": "unpause",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": false,
                "name": "account",
                "type": "address"
            }],
            "name": "Paused",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": false,
                "name": "account",
                "type": "address"
            }],
            "name": "Unpaused",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": true,
                "name": "account",
                "type": "address"
            }],
            "name": "PauserAdded",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": true,
                "name": "account",
                "type": "address"
            }],
            "name": "PauserRemoved",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": true,
                "name": "account",
                "type": "address"
            }],
            "name": "MinterAdded",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": true,
                "name": "account",
                "type": "address"
            }],
            "name": "MinterRemoved",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": true,
                "name": "from",
                "type": "address"
            }, {
                "indexed": true,
                "name": "to",
                "type": "address"
            }, {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }],
            "name": "Transfer",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": true,
                "name": "owner",
                "type": "address"
            }, {
                "indexed": true,
                "name": "spender",
                "type": "address"
            }, {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }],
            "name": "Approval",
            "type": "event"
        }, {
            "constant": true,
            "inputs": [{
                "name": "owner",
                "type": "address"
            }, {
                "name": "spender",
                "type": "address"
            }],
            "name": "allowance",
            "outputs": [{
                "name": "",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{
                "name": "owner",
                "type": "address"
            }],
            "name": "balanceOf",
            "outputs": [{
                "name": "",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [{
                "name": "",
                "type": "uint8"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{
                "name": "account",
                "type": "address"
            }],
            "name": "isMinter",
            "outputs": [{
                "name": "",
                "type": "bool"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{
                "name": "account",
                "type": "address"
            }],
            "name": "isPauser",
            "outputs": [{
                "name": "",
                "type": "bool"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [{
                "name": "",
                "type": "string"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "paused",
            "outputs": [{
                "name": "",
                "type": "bool"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [{
                "name": "",
                "type": "string"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
            "outputs": [{
                "name": "",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }]
        console.log("Instantiating contract");
        try {
            this.varContractVars["contractAbi"] = await web3.eth.contract(abi);
            console.log("Loaded ABI: " + this.varContractVars["contractAbi"]);
        } catch (error) {
            console.log(error);
        }
    }

    async setContractInstance() {
        await this.sleep(5000);
        this.varContractVars["deployedContract"] = await this.varContractVars["contractAbi"].at(this.varContractVars["contractAddress"], function(error, result) {
            if (!error) {
                console.log("Deployed contract set.");
            } else {
                console.log(error);
            }
        });
    }

    async fetchDecimals() {
        await this.varContractVars["deployedContract"].decimals(function(error, result) {
            if (!error) {
                this.varBaselineVars["decimals"] = result;
                console.log("decimals: " + this.varBaselineVars["decimals"]);
            } else {
                console.log(error);
            }
        });
    }

    async fetchTotalSupply() {
        await this.varContractVars["deployedContract"].totalSupply(function(error, result) {
            if (!error) {
                this.varBaselineVars["totalSupply"] = result;
                console.log("totalSupply: " + this.varBaselineVars["totalSupply"]);
            } else {
                console.log(error);
            }
        });
    }

    async fetchName() {
        await this.varContractVars["deployedContract"].name(function(error, result) {
            if (!error) {
                this.varBaselineVars["tokenName"] = result;
                console.log("tokenName: " + this.varBaselineVars["tokenName"]);
            } else {
                console.log(error);
            }
        });
    }

    async fetchSymbol() {
        await this.varContractVars["deployedContract"].symbol(function(error, result) {
            if (!error) {
                this.varBaselineVars["tokenSymbol"] = result;
                console.log("tokenSymbol: " + this.varBaselineVars["tokenSymbol"]);
            } else {
                console.log(error);
            }
        });
    }

    async fetchPaused() {
        await this.varContractVars["deployedContract"].paused(function(error, result) {
            if (!error) {
                this.varBaselineVars["paused"] = result;
                console.log("Paused: " + this.varBaselineVars["paused"]);
            } else {
                console.log(error);
            }
        });
    }
}


/*
Calling the function of a smart contract via this code would be as follows.
var contractAbi = eth.contract(AbiOfContract);
var myContract = contractAbi.at(contractAddress);
var getData = myContract.myFunction.getData(function parameters);
web3.eth.sendTransaction({to:Contractaddress, from:Accountaddress, data: getData});


*/
```
