# Upgradeable smart contracts

## Background - why upgradeable smart contracts?

Here is a simple demonstration to consider.

```
pragma lity ^1.2.3;

// Contract Template
contract Template {
    event LogA(safeuint valueOfA);
    safeuint a;
    function templateLogic1() public{
        a = a + 1;
        emit LogA(a);
    }
}
```
If we deploy this "Template" contract and call the "templateLogic1" function twice, we will see the following results emitted to the logs; a increases by 1 each time.
```
"valueOfA": "1"

"valueOfA": "2"
```

Let's say that we wanted to keep that contract deployed (because it was being called by frontend DApps), but we also needed to change the logic of Template's function. 

Consider the following example where we want to now modify the templateLogic1 function so that it multiplies a by 2 (instead of just increasing a by 1).

```
pragma lity ^1.2.3;

// Contract Template
contract Template {
    event LogA(safeuint valueOfA);
    safeuint a = 1;
    function templateLogic1() public{
        a = a * 2;
        emit LogA(a);
    }
}
```
We can easily modify and then redeploy. If we interact with the new contract will will see that the new logic has been implemented.
```
"valueOfA": "2",

"valueOfA": "4",
```
## Problem - why upgradeable smart contracts?

The problem with deploying a second contract is that we now just have two individual contracts (that don't know about each other) deployed at two different addresses.

We now have the original contract deployed at [this address 0x522a498d1ca7fa277f605110929393eba04f772d](https://testnet.cmttracking.io/address/0x522a498d1ca7fa277f605110929393eba04f772d)

We also have the upgraded contract deployed at [this address 0x81f463598b4f9805d472a7a595f77ad9225fcaed](https://testnet.cmttracking.io/address/0x81f463598b4f9805d472a7a595f77ad9225fcaed)

## How to modify an existing smart contract
In theory, it is correct to say that, a smart contract can not access the data of other smart contracts. However, technically speaking one smart contract can definitely write and read, to and from, another smart contract. There are a couple of conditions to adhere to though. Firstly a contract has to provide sufficient access to other contracts (this is done by creating public functions which are available everywhere). Secondly, a contract has to ensure, for security purposes, that not just any other contract, or externally owned account, can execute these public functions. Here is an example of how we could access the data of an existing contract.
```
//Contract B
contract ContractB {
    mapping(address => uint256) public balances;

    function setBalance(address _owner, uint256 _newBalance) public {
        balances[_owner] = _newBalance;
    }
}
```

```
// Contract A
contract ContractA {
    // CONSTRUCTOR
    function ContractA(address _contractB) {
        contractB = ContractB(_contractB);
    }

    function changeContractBsData() public returns(bool success) {
        contractB.setBalance(msg.sender, theNewValue);
        return true;
    }
}
```

## How to replace an existing smart contract
Instead of only modifying another contract's data, we could deploy an entirely new contract. There are quite a few conditions to adhere to though. Firstly, the outward facing interface has to remain the same (and also remain at the same address). 

### Data

### Interface
If the outward facing interface "contract" remains at the same address and offers the equivalent of [pure virtual functions](https://en.wikipedia.org/wiki/Virtual_function) then the other contracts which have a different role can be changed. For example if there is a contract that only performs the logic for a particular function, that contract could be retired and replaced as long as the interface contract knew where to find the new contract, and as long as the interface was able to make the exact same calls (as it did with the old contract). 

### Upgrade operation

### Security

## CyberMiles Upgradeable smart contracts

### Data layout

### Interface

### Upgrade Operation

### Security

##  Other existing upgradeable smart contracts

A short while ago, we explored the [Gemini Dollar's smart contract layout](https://github.com/CyberMiles/tim-research/blob/master/gemini_dollar/gemini_dollar.asciidoc#gemini-dollar). We inspected [the code](https://etherscan.io/address/0x056fd409e1d7a124bd7017459dfea2f387b6d5cd#code) that was published on Etherscan and learned that Gemini consists of 3 separate contracts ERC20Proxy, ERC20Impl and ERC20Store.


