//This is an example of the output which is produced by the generate_tests.py file. The generate_tests.py file compiles the contract[s] in question and then provides all of the commands that are required to deploy and test the contracts functions.
//This is only to be used in a unit testing capacity (on a private network). 

accountA = personal.newAccount("asdf");
accountB = personal.newAccount("asdf");
personal.unlockAccount(cmt.coinbase, "1234", 600, function(error, result){if(!error){console.log(result)}else{console.log(error)}});
cmt.sendTransaction({"from": cmt.coinbase, "to": accountA, "value": web3.toWei(50, "cmt")}, function(error, result){if(!error){console.log(result)}else{console.log(error)}});
cmt.sendTransaction({"from": cmt.coinbase, "to": accountB, "value": web3.toWei(50, "cmt")}, function(error, result){if(!error){console.log(result)}else{console.log(error)}});
web3.fromWei(cmt.getBalance(cmt.coinbase), "cmt", function(error, result){if(!error){console.log(result)}else{console.log(error)}});
web3.fromWei(cmt.getBalance(accountA), "cmt", function(error, result){if(!error){console.log(result)}else{console.log(error)}});
web3.fromWei(cmt.getBalance(accountB), "cmt", function(error, result){if(!error){console.log(result)}else{console.log(error)}});
personal.unlockAccount(accountA , "asdf", 600, function(error, result){if(!error){console.log(result)}else{console.log(error)}});
personal.unlockAccount(accountB , "asdf", 600, function(error, result){if(!error){console.log(result)}else{console.log(error)}});
var abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_disable","type":"bool"}],"name":"disableTransfers","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_token","type":"address"},{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"withdrawTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_amount","type":"uint256"}],"name":"destroy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"transfersEnabled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_token","type":"address"}],"name":"NewSmartToken","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_amount","type":"uint256"}],"name":"Issuance","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_amount","type":"uint256"}],"name":"Destruction","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_prevOwner","type":"address"},{"indexed":true,"name":"_newOwner","type":"address"}],"name":"OwnerUpdate","type":"event"}];
var bytecode = "0x60806040526040805190810160405280600981526020017f546f6b656e20302e310000000000000000000000000000000000000000000000815250600290805190602001906200005192919062000295565b506020604051908101604052806000815250600390805190602001906200007a92919062000295565b50602060405190810160405280600081525060049080519060200190620000a392919062000295565b506000600560006101000a81548160ff021916908360ff16021790555060006006556040805190810160405280600381526020017f302e330000000000000000000000000000000000000000000000000000000000815250600990805190602001906200011292919062000295565b506001600a60006101000a81548160ff0219169083151502179055503480156200013b57600080fd5b5060405162001f1038038062001f10833981018060405281019080805182019291906020018051820192919060200180519060200190929190505050828282336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060008351118015620001cd575060008251115b1515620001d957600080fd5b8260039080519060200190620001f192919062000295565b5081600490805190602001906200020a92919062000295565b5080600560006101000a81548160ff021916908360ff1602179055505050507ff4cd1f8571e8d9c97ffcb81558807ab73f9803d54de5da6a0420593c82a4a9f030604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a150505062000344565b82805460018160011615610100020d166002900490600052602060002090601f016020900481019282601f10620002d857805160ff191683800117855562000309565b8280016001018555821562000309579182015b8281111562000308578251825591602001919060010190620002eb565b5b5090506200031891906200031c565b5090565b6200034191905b808211156200033d57600081600090555060010162000323565b5090565b90565b611bbc80620003546000396000f300608060405260043610610112576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde0314610117578063095ea7b3146101a75780631608f18f1461020c57806318160ddd1461023b57806323b872dd14610266578063313ce567146102eb57806354fd4d501461031c5780635a3b7e42146103ac5780635e35359e1461043c57806370a08231146104a957806379ba509714610500578063867904b4146105175780638da5cb5b1461056457806395d89b41146105bb578063a24835d11461064b578063a9059cbb14610698578063bef97c87146106fd578063d4ee1d901461072c578063dd62ed3e14610783578063f2fde38b146107fa575b600080fd5b34801561012357600080fd5b5061012c61083d565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561016c578082015181840152602081019050610151565b50505050905090810190601f1680156101995780820d805160018360200d6101000a0d1916815260200191505b509250505060405180910390f35b3480156101b357600080fd5b506101f2600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506108db565b604051808215151515815260200191505060405180910390f35b34801561021857600080fd5b50610239600480360381019080803515159060200190929190505050610aa1565b005b34801561024757600080fd5b50610250610b17565b6040518082815260200191505060405180910390f35b34801561027257600080fd5b506102d1600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610b1d565b604051808215151515815260200191505060405180910390f35b3480156102f757600080fd5b50610300610b55565b604051808260ff1660ff16815260200191505060405180910390f35b34801561032857600080fd5b50610331610b68565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610371578082015181840152602081019050610356565b50505050905090810190601f16801561039e5780820d805160018360200d6101000a0d1916815260200191505b509250505060405180910390f35b3480156103b857600080fd5b506103c1610c06565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156104015780820151818401526020810190506103e6565b50505050905090810190601f16801561042e5780820d805160018360200d6101000a0d1916815260200191505b509250505060405180910390f35b34801561044857600080fd5b506104a7600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610ca4565b005b3480156104b557600080fd5b506104ea600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610ea0565b6040518082815260200191505060405180910390f35b34801561050c57600080fd5b50610515610eb8565b005b34801561052357600080fd5b50610562600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611057565b005b34801561057057600080fd5b50610579611268565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156105c757600080fd5b506105d061128d565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156106105780820151818401526020810190506105f5565b50505050905090810190601f16801561063d5780820d805160018360200d6101000a0d1916815260200191505b509250505060405180910390f35b34801561065757600080fd5b50610696600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061132b565b005b3480156106a457600080fd5b506106e3600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506114fa565b604051808215151515815260200191505060405180910390f35b34801561070957600080fd5b50610712611530565b604051808215151515815260200191505060405180910390f35b34801561073857600080fd5b50610741611543565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561078f57600080fd5b506107e4600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611569565b6040518082815260200191505060405180910390f35b34801561080657600080fd5b5061083b600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061158e565b005b6003805460018160011615610100020d166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020d166002900480156108d35780601f106108a8576101008083540402835291602001916108d3565b820191906000526020600020905b8154815290600101906020018083116108b65782900d601f168201915b505050505081565b600082600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415151561091a57600080fd5b60008314806109a557506000600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054145b15156109b057600080fd5b82600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925856040518082815260200191505060405180910390a3600191505092915050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610af957fe5b8015600a60006101000a81548160ff02191690831515021790555050565b60065481565b6000600a60009054906101000a900460ff161515610b3757fe5b610b42848484611686565b1515610b4a57fe5b600190509392505050565b600560009054906101000a900460ff1681565b6009805460018160011615610100020d166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020d16600290048015610bfe5780601f10610bd357610100808354040283529160200191610bfe565b820191906000526020600020905b815481529060010190602001808311610be15782900d601f168201915b505050505081565b6002805460018160011615610100020d166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020d16600290048015610c9c5780601f10610c7157610100808354040283529160200191610c9c565b820191906000526020600020905b815481529060010190602001808311610c7f5782900d601f168201915b505050505081565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610cfc57fe5b82600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515610d3957600080fd5b82600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515610d7657600080fd5b833073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515610db257600080fd5b8573ffffffffffffffffffffffffffffffffffffffff1663a9059cbb86866040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b158015610e5557600080fd5b505af1158015610e69573d6000803e3d6000fd5b505050506040513d6020811015610e7f57600080fd5b81019080805190602001909291905050501515610e9857fe5b505050505050565b60076020528060005260406000206000915090505481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610f1457600080fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f343765429aea5a34b3ff6a3785a98a5abb2597aca87bfbb58632c173d585373a60405160405180910390a3600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156110af57fe5b81600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515156110ec57600080fd5b823073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415151561112857600080fd5b61113460065484611992565b600681905550611183600760008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205484611992565b600760008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055507f9386c90217c323f58030f9dadcbc938f807a940f4ff41cd4cead9562f5da7dc3836040518082815260200191505060405180910390a18373ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef856040518082815260200191505060405180910390a350505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6004805460018160011615610100020d166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020d166002900480156113235780601f106112f857610100808354040283529160200191611323565b820191906000526020600020905b8154815290600101906020018083116113065782900d601f168201915b505050505081565b8173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806113b157506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b15156113bc57600080fd5b611405600760008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054826119b0565b600760008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550611454600654826119b0565b6006819055503073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a37f9a1b418bc061a5d80270261562e6986a35d995f8051145f277be16103abd3453816040518082815260200191505060405180910390a15050565b6000600a60009054906101000a900460ff16151561151457fe5b61151e83836119c9565b151561152657fe5b6001905092915050565b600a60009054906101000a900460ff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6008602052816000526040600020602052806000526040600020600091509150505481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156115e657fe5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415151561164257600080fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600083600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515156116c557600080fd5b83600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415151561170257600080fd5b611788600860008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054856119b0565b600860008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550611851600760008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054856119b0565b600760008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506118dd600760008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205485611992565b600760008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef866040518082815260200191505060405180910390a36001925050509392505050565b60008082840190508381101515156119a657fe5b8091505092915050565b60008183101515156119be57fe5b818303905092915050565b600082600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515611a0857600080fd5b611a51600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054846119b0565b600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550611add600760008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205484611992565b600760008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef856040518082815260200191505060405180910390a36001915050929150505600a165627a7a72305820256c3ac58a589dc8895f0b38f888fa130f5b111f613fc462bee58badefe49f9e0029";
var newContract = web3.cmt.contract(abi, function(error, result){if(!error){console.log(result)}else{console.log(error)}});
var deployedContract = newContract.new("timtoken","tim","8",{from:accountA, data: bytecode, gas:"5000000"}, function(error, result){if(!error){console.log(result)}else{console.log(error)}});

/*
Listing the functions that have no arguments

Function: name
Takes no arguments
Returns a string
*/
deployedContract.name();
/*

Function: totalSupply
Takes no arguments
Returns a uint256
*/
deployedContract.totalSupply();
/*

Function: decimals
Takes no arguments
Returns a uint8
*/
deployedContract.decimals();
/*

Function: version
Takes no arguments
Returns a string
*/
deployedContract.version();
/*

Function: standard
Takes no arguments
Returns a string
*/
deployedContract.standard();
/*

Function: acceptOwnership
Takes no arguments
Returns nothing
*/
deployedContract.acceptOwnership();
/*

Function: owner
Takes no arguments
Returns a address
*/
deployedContract.owner();
/*

Function: symbol
Takes no arguments
Returns a string
*/
deployedContract.symbol();
/*

Function: transfersEnabled
Takes no arguments
Returns a bool
*/
deployedContract.transfersEnabled();
/*

Function: newOwner
Takes no arguments
Returns a address
*/
deployedContract.newOwner();
/*
Listing the functions that take arguments

Function: approve
Takes 2 arguments
Argument name: _spender
Argument type: address
Argument name: _value
Argument type: uint256
Returns a bool
*/
deployedContract.approve(_spender address, _value uint256);
/*

Function: disableTransfers
Takes 1 arguments
Argument name: _disable
Argument type: bool
Returns nothing!
*/
deployedContract.disableTransfers(_disable bool);
/*

Function: transferFrom
Takes 3 arguments
Argument name: _from
Argument type: address
Argument name: _to
Argument type: address
Argument name: _value
Argument type: uint256
Returns a bool
*/
deployedContract.transferFrom(_from address, _to address, _value uint256);
/*

Function: withdrawTokens
Takes 3 arguments
Argument name: _token
Argument type: address
Argument name: _to
Argument type: address
Argument name: _amount
Argument type: uint256
Returns nothing!
*/
deployedContract.withdrawTokens(_token address, _to address, _amount uint256);
/*

Function: balanceOf
Takes 1 arguments
Argument name: 
Argument type: address
Returns a uint256
*/
deployedContract.balanceOf( address);
/*

Function: issue
Takes 2 arguments
Argument name: _to
Argument type: address
Argument name: _amount
Argument type: uint256
Returns nothing!
*/
deployedContract.issue(_to address, _amount uint256);
/*

Function: destroy
Takes 2 arguments
Argument name: _from
Argument type: address
Argument name: _amount
Argument type: uint256
Returns nothing!
*/
deployedContract.destroy(_from address, _amount uint256);
/*

Function: transfer
Takes 2 arguments
Argument name: _to
Argument type: address
Argument name: _value
Argument type: uint256
Returns a bool
*/
deployedContract.transfer(_to address, _value uint256);
/*

Function: allowance
Takes 2 arguments
Argument name: 
Argument type: address
Argument name: 
Argument type: address
Returns a uint256
*/
deployedContract.allowance( address,  address);
/*

Function: transferOwnership
Takes 1 arguments
Argument name: _newOwner
Argument type: address
Returns nothing!
*/
deployedContract.transferOwnership(_newOwner address);
/*

/*
