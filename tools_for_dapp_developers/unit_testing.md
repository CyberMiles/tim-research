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
