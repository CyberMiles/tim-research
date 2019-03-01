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
If we deploy this "Template" contract and call the "templateLogic1" function twice, we will see the following results emitted to the logs.
```
"valueOfA": "1"

"valueOfA": "2"
```

