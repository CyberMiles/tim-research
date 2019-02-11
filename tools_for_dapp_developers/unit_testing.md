# Object based unit testing for blockchains

This is a new idea built on the premise that unit testing against a blockchain using a non blocking asynchronious language such as Javascript is problematic.

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
