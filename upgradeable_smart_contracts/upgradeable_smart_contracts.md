# Upgradeable smart contracts

##  Existing upgradeable smart contracts

A short while ago, we explored the [Gemini Dollar's smart contract layout](https://github.com/CyberMiles/tim-research/blob/master/gemini_dollar/gemini_dollar.asciidoc#gemini-dollar).

## CyberMiles upgradeable smart contracts

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

Consider the following example of an upgraded contract. As you can see the templateLogic1 function now multiplies a by 2 (instead of just increasing a by 1).

```
// Contract Template
contract Template {
    event LogA(safeuint valueOfA);
    safeuint a;
    function templateLogic1(){
        a = a * 2;
        emit LogA(a);
    }
}
```

We now have the original contract deployed at [this address 0x522a498d1ca7fa277f605110929393eba04f772d](https://testnet.cmttracking.io/address/0x522a498d1ca7fa277f605110929393eba04f772d)

We also have the upgraded contract deployed at [this address 0x5b7f986aae23b4741cdea6df624f3a26e65521be](https://testnet.cmttracking.io/address/0x5b7f986aae23b4741cdea6df624f3a26e65521be)

