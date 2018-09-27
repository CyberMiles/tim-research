//Run this next command separately because it has a delay in responding
accountA = personal.newAccount("asdf");
//Run this next command separately because it has a delay in responding
accountB = personal.newAccount("asdf");
//Run this next command separately because it has a delay in responding
personal.unlockAccount(cmt.coinbase, "1234", 600, function(error, result){if(!error){console.log(result)}else{console.log(error)}});
//Run this next command separately because it has a delay in responding
cmt.sendTransaction({"from": cmt.coinbase, "to": accountA, "value": web3.toWei(50, "cmt")}, function(error, result){if(!error){console.log(result)}else{console.log(error)}});
//Run this next command separately because it has a delay in responding
cmt.sendTransaction({"from": cmt.coinbase, "to": accountB, "value": web3.toWei(50, "cmt")}, function(error, result){if(!error){console.log(result)}else{console.log(error)}});
web3.fromWei(cmt.getBalance(cmt.coinbase), "cmt", function(error, result){if(!error){console.log(result)}else{console.log(error)}});
web3.fromWei(cmt.getBalance(accountA), "cmt", function(error, result){if(!error){console.log(result)}else{console.log(error)}});
web3.fromWei(cmt.getBalance(accountB), "cmt", function(error, result){if(!error){console.log(result)}else{console.log(error)}});
//Run this next command separately because it has a delay in responding
personal.unlockAccount(accountA , "asdf", 600, function(error, result){if(!error){console.log(result)}else{console.log(error)}});
//Run this next command separately because it has a delay in responding
personal.unlockAccount(accountB , "asdf", 600, function(error, result){if(!error){console.log(result)}else{console.log(error)}});
//Run this next command separately because it has a delay in responding
var abi = [{"constant":false,"inputs":[{"name":"_connectorToken","type":"address"},{"name":"_weight","type":"uint32"},{"name":"_enableVirtualBalance","type":"bool"},{"name":"_virtualBalance","type":"uint256"}],"name":"updateConnector","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"connectors","outputs":[{"name":"virtualBalance","type":"uint256"},{"name":"weight","type":"uint32"},{"name":"isVirtualBalanceEnabled","type":"bool"},{"name":"isPurchaseEnabled","type":"bool"},{"name":"isSet","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"connectorTokens","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_fromToken","type":"address"},{"name":"_toToken","type":"address"},{"name":"_amount","type":"uint256"}],"name":"getReturn","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferTokenOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_path","type":"address[]"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"},{"name":"_block","type":"uint256"},{"name":"_v","type":"uint8"},{"name":"_r","type":"bytes32"},{"name":"_s","type":"bytes32"}],"name":"quickConvertPrioritized","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_disable","type":"bool"}],"name":"disableConversions","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_fromToken","type":"address"},{"name":"_toToken","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"}],"name":"convertInternal","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"acceptTokenOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_amount","type":"uint256"},{"name":"_magnitude","type":"uint8"}],"name":"getFinalAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"converterType","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_token","type":"address"},{"name":"_weight","type":"uint32"},{"name":"_enableVirtualBalance","type":"bool"}],"name":"addConnector","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_token","type":"address"},{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"withdrawFromToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newManager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_whitelist","type":"address"}],"name":"setConversionWhitelist","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"clearQuickBuyPath","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_connectorToken","type":"address"},{"name":"_disable","type":"bool"}],"name":"disableConnectorPurchases","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"conversionFee","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"BANCOR_CONVERTER_FACTORY","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_token","type":"address"},{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"withdrawTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_fromToken","type":"address"},{"name":"_toToken","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"}],"name":"change","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"BANCOR_FORMULA","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"connectorTokenCount","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_connectorToken","type":"address"},{"name":"_sellAmount","type":"uint256"}],"name":"getSaleReturn","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_fromToken","type":"address"},{"name":"_toToken","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"}],"name":"convert","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"registry","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"CONTRACT_FEATURES","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_disable","type":"bool"}],"name":"disableTokenTransfers","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_fromConnectorToken","type":"address"},{"name":"_toConnectorToken","type":"address"},{"name":"_sellAmount","type":"uint256"}],"name":"getCrossConnectorReturn","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"BANCOR_NETWORK","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"BANCOR_GAS_PRICE_LIMIT","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"CONVERTER_CONVERSION_WHITELIST","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getQuickBuyPathLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxConversionFee","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_connectorToken","type":"address"},{"name":"_depositAmount","type":"uint256"}],"name":"getPurchaseReturn","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_registry","type":"address"}],"name":"setRegistry","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"conversionsEnabled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"conversionWhitelist","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptManagement","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_path","type":"address[]"}],"name":"setQuickBuyPath","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_connectorToken","type":"address"}],"name":"getConnectorBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newManager","type":"address"}],"name":"transferManagement","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"quickBuyPath","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_conversionFee","type":"uint32"}],"name":"setConversionFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_path","type":"address[]"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"}],"name":"quickConvert","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_token","type":"address"},{"name":"_registry","type":"address"},{"name":"_maxConversionFee","type":"uint32"},{"name":"_connectorToken","type":"address"},{"name":"_connectorWeight","type":"uint32"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_fromToken","type":"address"},{"indexed":true,"name":"_toToken","type":"address"},{"indexed":true,"name":"_trader","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"},{"indexed":false,"name":"_return","type":"uint256"},{"indexed":false,"name":"_conversionFee","type":"int256"}],"name":"Conversion","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_connectorToken","type":"address"},{"indexed":false,"name":"_tokenSupply","type":"uint256"},{"indexed":false,"name":"_connectorBalance","type":"uint256"},{"indexed":false,"name":"_connectorWeight","type":"uint32"}],"name":"PriceDataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_prevFee","type":"uint32"},{"indexed":false,"name":"_newFee","type":"uint32"}],"name":"ConversionFeeUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_prevManager","type":"address"},{"indexed":true,"name":"_newManager","type":"address"}],"name":"ManagerUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_prevOwner","type":"address"},{"indexed":true,"name":"_newOwner","type":"address"}],"name":"OwnerUpdate","type":"event"}];
//Run this next command separately because it has a delay in responding
var bytecode = "0x60806040526040805190810160405280600481526020017f302e313000000000000000000000000000000000000000000000000000000000815250600590805190602001906200005192919062000ac8565b506040805190810160405280600681526020017f62616e636f720000000000000000000000000000000000000000000000000000815250600690805190602001906200009f92919062000ac8565b506000600c60006101000a81548163ffffffff021916908363ffffffff1602179055506000600c60046101000a81548163ffffffff021916908363ffffffff1602179055506000600c60086101000a81548163ffffffff021916908363ffffffff1602179055506001600c806101000a81548160ff0219169083151502179055503480156200012d57600080fd5b5060405160a08062006b4e8339810180604052810190808051906020019092919080519060200190929190805190602001909291908051906020019092919080519060200190929190505050600085336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515620001fa57600080fd5b81600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505033600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555084600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515620002bc57600080fd5b8460008163ffffffff1610158015620002e85750620f424067ffffffffffffffff168163ffffffff1611155b1515620002f457600080fd5b86600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c7f436f6e74726163744665617475726573000000000000000000000000000000006040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b158015620003ef57600080fd5b505af115801562000404573d6000803e3d6000fd5b505050506040513d60208110156200041b57600080fd5b81019080805190602001909291905050509250600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141515620004fc578273ffffffffffffffffffffffffffffffffffffffff16632c7077c06001806040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018215151515815260200192505050600060405180830381600087803b158015620004e257600080fd5b505af1158015620004f7573d6000803e3d6000fd5b505050505b85600c60046101000a81548163ffffffff021916908363ffffffff160217905550600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff161415156200057257620005718585600062000580640100000000026401000000009004565b5b505050505050505062000b77565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515620005d957fe5b3073ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b1580156200067757600080fd5b505af11580156200068c573d6000803e3d6000fd5b505050506040513d6020811015620006a357600080fd5b810190808051906020019092919050505073ffffffffffffffffffffffffffffffffffffffff1614151515620006d557fe5b82600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515156200071357600080fd5b833073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515156200075057600080fd5b8360008163ffffffff16118015620007775750620f424063ffffffff168163ffffffff1611155b15156200078357600080fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff16141580156200082f5750600b60008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160069054906101000a900460ff16155b80156200085f5750620f424063ffffffff1685600c60009054906101000a900463ffffffff160163ffffffff1611155b15156200086b57600080fd5b6000600b60008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018190555084600b60008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160006101000a81548163ffffffff021916908363ffffffff16021790555083600b60008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160046101000a81548160ff0219169083151502179055506001600b60008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160056101000a81548160ff0219169083151502179055506001600b60008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160066101000a81548160ff02191690831515021790555060098690806001815401808255809150509060018203906000526020600020016000909192909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505084600c60008282829054906101000a900463ffffffff160192506101000a81548163ffffffff021916908363ffffffff160217905550505050505050565b82805460018160011615610100020d166002900490600052602060002090601f016020900481019282601f1062000b0b57805160ff191683800117855562000b3c565b8280016001018555821562000b3c579182015b8281111562000b3b57825182559160200191906001019062000b1e565b5b50905062000b4b919062000b4f565b5090565b62000b7491905b8082111562000b7057600081600090555060010162000b56565b5090565b90565b615fc78062000b876000396000f300608060405260043610610272576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630ca78923146103075780630e53aae91461037057806319b64015146103fb5780631e1401f81461046857806321e6b53d146104e9578063227425641461052c578063228d2820146105e05780632a2e2f0c1461060f57806338a5e0161461069a5780633aa0145a146106b15780633e8ff43f146106ff5780633f4d2fc21461078f57806341a5b33d146107ee578063429060291461085b578063481c6a75146108b25780634af80f0e146109095780634e2280c41461094c578063514385be1461096357806354fd4d50146109b2578063579cd3ca14610a425780635a46f06c14610a795780635e35359e14610aac5780635e5144eb14610b195780636d7bd3fc14610ba457806371f52bf314610bd757806372b44b2c14610c0a57806375892cf114610c6b57806379ba509714610cf65780637b10399914610d0d57806383315b6e14610d6457806385d5e63114610d975780638da5cb5b14610dc65780638e3047e014610e1d5780639232494e14610e9e5780639249993a14610ed157806392d1abb714610f045780639396a7f014610f2f57806394c275ad14610f5a578063a2c4c33614610f91578063a91ee0dc14610ff2578063bf75455814611035578063c45d3d9214611064578063c8c2fe6c146110bb578063d395ee0f146110d2578063d4ee1d9014611138578063d89595121461118f578063e4edf852146111e6578063e7ee85a514611229578063ecbca55d14611296578063f0843ba9146112c9578063f2fde38b1461134a578063fc0c546a1461138d575b610304600a8054806020026020016040519081016040528092919081815260200182805480156102f757602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190600101908083116102ad575b50505050503460016113e4565b50005b34801561031357600080fd5b5061036e600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803563ffffffff16906020019092919080351515906020019092919080359060200190929190505050611440565b005b34801561037c57600080fd5b506103b1600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061164c565b604051808681526020018563ffffffff1663ffffffff1681526020018415151515815260200183151515158152602001821515151581526020019550505050505060405180910390f35b34801561040757600080fd5b50610426600480360381019080803590602001909291905050506116b9565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561047457600080fd5b506104d3600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506116f7565b6040518082815260200191505060405180910390f35b3480156104f557600080fd5b5061052a600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611817565b005b6105ca60048036038101908080359060200190820180359060200190808060200260200160405190810160405280939291908181526020018383602002808284378201915050505050509192919290803590602001909291908035906020019092919080359060200190929190803560ff16906020019092919080356000191690602001909291908035600019169060200190929190505050611947565b6040518082815260200191505060405180910390f35b3480156105ec57600080fd5b5061060d600480360381019080803515159060200190929190505050611f45565b005b34801561061b57600080fd5b50610684600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190929190505050612015565b6040518082815260200191505060405180910390f35b3480156106a657600080fd5b506106af612861565b005b3480156106bd57600080fd5b506106e960048036038101908080359060200190929190803560ff169060200190929190505050612959565b6040518082815260200191505060405180910390f35b34801561070b57600080fd5b506107146129b6565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610754578082015181840152602081019050610739565b50505050905090810190601f1680156107815780820d805160018360200d6101000a0d1916815260200191505b509250505060405180910390f35b34801561079b57600080fd5b506107ec600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803563ffffffff169060200190929190803515159060200190929190505050612a54565b005b3480156107fa57600080fd5b50610859600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050612f90565b005b34801561086757600080fd5b506108706130fe565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156108be57600080fd5b506108c7613124565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561091557600080fd5b5061094a600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061314a565b005b34801561095857600080fd5b50610961613223565b005b34801561096f57600080fd5b506109b0600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080351515906020019092919050505061328d565b005b3480156109be57600080fd5b506109c76133a1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610a075780820151818401526020810190506109ec565b50505050905090810190601f168015610a345780820d805160018360200d6101000a0d1916815260200191505b509250505060405180910390f35b348015610a4e57600080fd5b50610a5761343f565b604051808263ffffffff1663ffffffff16815260200191505060405180910390f35b348015610a8557600080fd5b50610a8e613455565b60405180826000191660001916815260200191505060405180910390f35b348015610ab857600080fd5b50610b17600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050613479565b005b348015610b2557600080fd5b50610b8e600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190929190505050613675565b6040518082815260200191505060405180910390f35b348015610bb057600080fd5b50610bb961368d565b60405180826000191660001916815260200191505060405180910390f35b348015610be357600080fd5b50610bec6136b1565b604051808261ffff1661ffff16815260200191505060405180910390f35b348015610c1657600080fd5b50610c55600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506136be565b6040518082815260200191505060405180910390f35b348015610c7757600080fd5b50610ce0600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190929190505050613b1c565b6040518082815260200191505060405180910390f35b348015610d0257600080fd5b50610d0b613c8c565b005b348015610d1957600080fd5b50610d22613e2b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b348015610d7057600080fd5b50610d79613e51565b60405180826000191660001916815260200191505060405180910390f35b348015610da357600080fd5b50610dc4600480360381019080803515159060200190929190505050613e75565b005b348015610dd257600080fd5b50610ddb613f7d565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b348015610e2957600080fd5b50610e88600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050613fa2565b6040518082815260200191505060405180910390f35b348015610eaa57600080fd5b50610eb361442f565b60405180826000191660001916815260200191505060405180910390f35b348015610edd57600080fd5b50610ee6614453565b60405180826000191660001916815260200191505060405180910390f35b348015610f1057600080fd5b50610f19614477565b6040518082815260200191505060405180910390f35b348015610f3b57600080fd5b50610f4461447c565b6040518082815260200191505060405180910390f35b348015610f6657600080fd5b50610f6f614489565b604051808263ffffffff1663ffffffff16815260200191505060405180910390f35b348015610f9d57600080fd5b50610fdc600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061449f565b6040518082815260200191505060405180910390f35b348015610ffe57600080fd5b50611033600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061491a565b005b34801561104157600080fd5b5061104a614a31565b604051808215151515815260200191505060405180910390f35b34801561107057600080fd5b50611079614a43565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156110c757600080fd5b506110d0614a69565b005b3480156110de57600080fd5b5061113660048036038101908080359060200190820180359060200190808060200260200160405190810160405280939291908181526020018383602002808284378201915050505050509192919290505050614c0a565b005b34801561114457600080fd5b5061114d614cb5565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561119b57600080fd5b506111d0600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050614cdb565b6040518082815260200191505060405180910390f35b3480156111f257600080fd5b50611227600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050614e7b565b005b34801561123557600080fd5b5061125460048036038101908080359060200190929190505050614fcf565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156112a257600080fd5b506112c7600480360381019080803563ffffffff16906020019092919050505061500d565b005b6113346004803603810190808035906020019082018035906020019080806020026020016040519081016040528093929190818152602001838360200280828437820191505050505050919291929080359060200190929190803590602001909291905050506113e4565b6040518082815260200191505060405180910390f35b34801561135657600080fd5b5061138b600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061518f565b005b34801561139957600080fd5b506113a2615287565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600083600281511180156113fa57506015815111155b8015611413575060016002825181151561141057fe5b06145b151561141e57600080fd5b61143685858560008060006001026000600102611947565b9150509392505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561149a57fe5b84600b60008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160069054906101000a900460ff1615156114f657600080fd5b8460008163ffffffff1611801561151c5750620f424063ffffffff168163ffffffff1611155b151561152757600080fd5b600b60008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209250620f424063ffffffff16868460010160009054906101000a900463ffffffff16600c60009054906101000a900463ffffffff16030163ffffffff16111515156115b057600080fd5b858360010160009054906101000a900463ffffffff16600c60009054906101000a900463ffffffff160301600c60006101000a81548163ffffffff021916908363ffffffff160217905550858360010160006101000a81548163ffffffff021916908363ffffffff160217905550848360010160046101000a81548160ff02191690831515021790555083836000018190555050505050505050565b600b6020528060005260406000206000915090508060000154908060010160009054906101000a900463ffffffff16908060010160049054906101000a900460ff16908060010160059054906101000a900460ff16908060010160069054906101000a900460ff16905085565b6009818154811015156116c857fe5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415151561173457600080fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141561179b57611794848361449f565b9050611810565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415611802576117fb83836136be565b9050611810565b61180d848484613fa2565b90505b9392505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561186f57fe5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f2fde38b826040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b15801561192c57600080fd5b505af1158015611940573d6000803e3d6000fd5b5050505050565b6000806000896002815111801561196057506015815111155b8015611979575060016002825181151561197657fe5b06145b151561198457600080fd5b8a600081518110151561199357fe5b906020019060200201519250600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c7f42616e636f724e6574776f726b000000000000000000000000000000000000006040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b158015611a5857600080fd5b505af1158015611a6c573d6000803e3d6000fd5b505050506040513d6020811015611a8257600080fd5b810190808051906020019092919050505091506000341415611dcf57600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415611cb357600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a24835d1338c6040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050600060405180830381600087803b158015611bb957600080fd5b505af1158015611bcd573d6000803e3d6000fd5b50505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663867904b4838c6040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050600060405180830381600087803b158015611c9657600080fd5b505af1158015611caa573d6000803e3d6000fd5b50505050611dce565b8273ffffffffffffffffffffffffffffffffffffffff166323b872dd33848d6040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b158015611d8a57600080fd5b505af1158015611d9e573d6000803e3d6000fd5b505050506040513d6020811015611db457600080fd5b81019080805190602001909291905050501515611dcd57fe5b5b5b8173ffffffffffffffffffffffffffffffffffffffff16636b08f2ef348d8d8d338e8e8e8e6040518a63ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180806020018981526020018881526020018773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018681526020018560ff1660ff1681526020018460001916600019168152602001836000191660001916815260200182810382528a818151815260200191508051906020019060200280838360005b83811015611ece578082015181840152602081019050611eb3565b5050505090500199505050505050505050506020604051808303818588803b158015611ef957600080fd5b505af1158015611f0d573d6000803e3d6000fd5b50505050506040513d6020811015611f2457600080fd5b81019080805190602001909291905050509350505050979650505050505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161480611fed5750600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b1515611ff857600080fd5b8015600c806101000a81548160ff02191690831515021790555050565b6000806000806000806000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c7f42616e636f724e6574776f726b000000000000000000000000000000000000006040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b1580156120d957600080fd5b505af11580156120ed573d6000803e3d6000fd5b505050506040513d602081101561210357600080fd5b810190808051906020019092919050505090508073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561215057600080fd5b600c809054906101000a900460ff16151561216757fe5b8760008111151561217757600080fd5b8a73ffffffffffffffffffffffffffffffffffffffff168c73ffffffffffffffffffffffffffffffffffffffff16141515156121b257600080fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168b73ffffffffffffffffffffffffffffffffffffffff16141561221a576122138c8b8b6152ad565b9750612852565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168c73ffffffffffffffffffffffffffffffffffffffff1614156122825761227b8b8b8b6156d9565b9750612852565b61228d8c8c8c613fa2565b9650600087141580156122a05750888710155b15156122ab57600080fd5b600b60008d73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002095508560010160049054906101000a900460ff161561231a5761231186600001548b615cca565b86600001819055505b600b60008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002094508460010160049054906101000a900460ff161561238957612380856000015488615ce8565b85600001819055505b6123928b614cdb565b9350838710151561239f57fe5b8b73ffffffffffffffffffffffffffffffffffffffff166323b872dd33308d6040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b15801561247657600080fd5b505af115801561248a573d6000803e3d6000fd5b505050506040513d60208110156124a057600080fd5b810190808051906020019092919050505015156124b957fe5b8a73ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33896040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b15801561255c57600080fd5b505af1158015612570573d6000803e3d6000fd5b505050506040513d602081101561258657600080fd5b8101908080519060200190929190505050151561259f57fe5b6125b3876125ae896002612959565b615ce8565b92506125c28c8c8c8a87615d01565b8b73ffffffffffffffffffffffffffffffffffffffff167f8a6a7f53b3c8fa1dc4b83e3f1be668c1b251ff8d44cdcb83eb3acec3fec6a788600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b15801561268057600080fd5b505af1158015612694573d6000803e3d6000fd5b505050506040513d60208110156126aa57600080fd5b81019080805190602001909291905050506126c48f614cdb565b8960010160009054906101000a900463ffffffff16604051808481526020018381526020018263ffffffff1663ffffffff168152602001935050505060405180910390a28a73ffffffffffffffffffffffffffffffffffffffff167f8a6a7f53b3c8fa1dc4b83e3f1be668c1b251ff8d44cdcb83eb3acec3fec6a788600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b1580156127c657600080fd5b505af11580156127da573d6000803e3d6000fd5b505050506040513d60208110156127f057600080fd5b810190808051906020019092919050505061280a8e614cdb565b8860010160009054906101000a900463ffffffff16604051808481526020018381526020018263ffffffff1663ffffffff168152602001935050505060405180910390a28697505b50505050505050949350505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156128b957fe5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166379ba50976040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401600060405180830381600087803b15801561293f57600080fd5b505af1158015612953573d6000803e3d6000fd5b50505050565b60008160ff16620f42400a67ffffffffffffffff166129a4848460ff16600c60089054906101000a900463ffffffff1663ffffffff16620f4240030a67ffffffffffffffff16615dc0565b8115156129ad57fe5b04905092915050565b6006805460018160011615610100020d166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020d16600290048015612a4c5780601f10612a2157610100808354040283529160200191612a4c565b820191906000526020600020905b815481529060010190602001808311612a2f5782900d601f168201915b505050505081565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515612aac57fe5b3073ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b158015612b4957600080fd5b505af1158015612b5d573d6000803e3d6000fd5b505050506040513d6020811015612b7357600080fd5b810190808051906020019092919050505073ffffffffffffffffffffffffffffffffffffffff1614151515612ba457fe5b82600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515612be157600080fd5b833073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515612c1d57600080fd5b8360008163ffffffff16118015612c435750620f424063ffffffff168163ffffffff1611155b1515612c4e57600080fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff1614158015612cf95750600b60008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160069054906101000a900460ff16155b8015612d285750620f424063ffffffff1685600c60009054906101000a900463ffffffff160163ffffffff1611155b1515612d3357600080fd5b6000600b60008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018190555084600b60008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160006101000a81548163ffffffff021916908363ffffffff16021790555083600b60008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160046101000a81548160ff0219169083151502179055506001600b60008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160056101000a81548160ff0219169083151502179055506001600b60008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160066101000a81548160ff02191690831515021790555060098690806001815401808255809150509060018203906000526020600020016000909192909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505084600c60008282829054906101000a900463ffffffff160192506101000a81548163ffffffff021916908363ffffffff160217905550505050505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515612fe857fe5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16635e35359e8484846040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050600060405180830381600087803b1580156130e157600080fd5b505af11580156130f5573d6000803e3d6000fd5b50505050505050565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156131a257fe5b803073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515156131de57600080fd5b81600860006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561327b57fe5b6000600a8161328a9190615df3565b50565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156132e557fe5b81600b60008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160069054906101000a900460ff16151561334157600080fd5b8115600b60008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160056101000a81548160ff021916908315150217905550505050565b6005805460018160011615610100020d166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020d166002900480156134375780601f1061340c57610100808354040283529160200191613437565b820191906000526020600020905b81548152906001019060200180831161341a5782900d601f168201915b505050505081565b600c60089054906101000a900463ffffffff1681565b7f42616e636f72436f6e766572746572466163746f72790000000000000000000081565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156134d157fe5b82600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415151561350e57600080fd5b82600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415151561354b57600080fd5b833073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415151561358757600080fd5b8573ffffffffffffffffffffffffffffffffffffffff1663a9059cbb86866040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b15801561362a57600080fd5b505af115801561363e573d6000803e3d6000fd5b505050506040513d602081101561365457600080fd5b8101908080519060200190929190505050151561366d57fe5b505050505050565b600061368385858585612015565b9050949350505050565b7f42616e636f72466f726d756c610000000000000000000000000000000000000081565b6000600980549050905090565b6000806000806000803073ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b15801561376457600080fd5b505af1158015613778573d6000803e3d6000fd5b505050506040513d602081101561378e57600080fd5b810190808051906020019092919050505073ffffffffffffffffffffffffffffffffffffffff161415156137be57fe5b87600b60008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160069054906101000a900460ff16151561381a57600080fd5b600b60008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209550600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b1580156138e157600080fd5b505af11580156138f5573d6000803e3d6000fd5b505050506040513d602081101561390b57600080fd5b8101908080519060200190929190505050945061392789614cdb565b9350600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c7f42616e636f72466f726d756c61000000000000000000000000000000000000006040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b1580156139e257600080fd5b505af11580156139f6573d6000803e3d6000fd5b505050506040513d6020811015613a0c57600080fd5b810190808051906020019092919050505092508273ffffffffffffffffffffffffffffffffffffffff166349f9b0f786868960010160009054906101000a900463ffffffff168c6040518563ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808581526020018481526020018363ffffffff1663ffffffff168152602001828152602001945050505050602060405180830381600087803b158015613ac657600080fd5b505af1158015613ada573d6000803e3d6000fd5b505050506040513d6020811015613af057600080fd5b81019080805190602001909291905050509150613b0e826001612959565b965050505050505092915050565b60006060604051908101604052808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815250600d906003613bf0929190615e1f565b50613c82600d805480602002602001604051908101604052809291908181526020018280548015613c7657602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311613c2c575b505050505084846113e4565b9050949350505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515613ce857600080fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f343765429aea5a34b3ff6a3785a98a5abb2597aca87bfbb58632c173d585373a60405160405180910390a3600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b7f436f6e747261637446656174757265730000000000000000000000000000000081565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515613ecd57fe5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16631608f18f826040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082151515158152602001915050600060405180830381600087803b158015613f6257600080fd5b505af1158015613f76573d6000803e3d6000fd5b5050505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008060008060008060003073ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b15801561404a57600080fd5b505af115801561405e573d6000803e3d6000fd5b505050506040513d602081101561407457600080fd5b810190808051906020019092919050505073ffffffffffffffffffffffffffffffffffffffff161415156140a457fe5b89600b60008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160069054906101000a900460ff16151561410057600080fd5b89600b60008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160069054906101000a900460ff16151561415c57600080fd5b600b60008d73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209750600b60008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002096508660010160059054906101000a900460ff1615156141fb57600080fd5b6142048c614cdb565b955061420f8b614cdb565b9450600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c7f42616e636f72466f726d756c61000000000000000000000000000000000000006040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b1580156142ca57600080fd5b505af11580156142de573d6000803e3d6000fd5b505050506040513d60208110156142f457600080fd5b810190808051906020019092919050505093508373ffffffffffffffffffffffffffffffffffffffff166365098bb3878a60010160009054906101000a900463ffffffff16888b60010160009054906101000a900463ffffffff168f6040518663ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808681526020018563ffffffff1663ffffffff1681526020018481526020018363ffffffff1663ffffffff16815260200182815260200195505050505050602060405180830381600087803b1580156143d657600080fd5b505af11580156143ea573d6000803e3d6000fd5b505050506040513d602081101561440057600080fd5b8101908080519060200190929190505050925061441e836002612959565b985050505050505050509392505050565b7f42616e636f724e6574776f726b0000000000000000000000000000000000000081565b7f42616e636f7247617350726963654c696d69740000000000000000000000000081565b600181565b6000600a80549050905090565b600c60049054906101000a900463ffffffff1681565b6000806000806000803073ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b15801561454557600080fd5b505af1158015614559573d6000803e3d6000fd5b505050506040513d602081101561456f57600080fd5b810190808051906020019092919050505073ffffffffffffffffffffffffffffffffffffffff1614151561459f57fe5b87600b60008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160069054906101000a900460ff1615156145fb57600080fd5b600b60008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002095508560010160059054906101000a900460ff16151561465957600080fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b1580156146df57600080fd5b505af11580156146f3573d6000803e3d6000fd5b505050506040513d602081101561470957600080fd5b8101908080519060200190929190505050945061472589614cdb565b9350600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c7f42616e636f72466f726d756c61000000000000000000000000000000000000006040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b1580156147e057600080fd5b505af11580156147f4573d6000803e3d6000fd5b505050506040513d602081101561480a57600080fd5b810190808051906020019092919050505092508273ffffffffffffffffffffffffffffffffffffffff166329a00e7c86868960010160009054906101000a900463ffffffff168c6040518563ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808581526020018481526020018363ffffffff1663ffffffff168152602001828152602001945050505050602060405180830381600087803b1580156148c457600080fd5b505af11580156148d8573d6000803e3d6000fd5b505050506040513d60208110156148ee57600080fd5b8101908080519060200190929190505050915061490c826001612959565b965050505050505092915050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561497257fe5b80600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515156149af57600080fd5b813073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515156149eb57600080fd5b82600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505050565b600c809054906101000a900460ff1681565b600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515614ac557600080fd5b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fbe4cc281795971a471c980e842627a7f1ea3892ddfce8c5b6357cd2611c1973260405160405180910390a3600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515614c6257fe5b8060028151118015614c7657506015815111155b8015614c8f5750600160028251811515614c8c57fe5b06145b1515614c9a57600080fd5b81600a9080519060200190614cb0929190615ea9565b505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008082600b60008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160069054906101000a900460ff161515614d3a57600080fd5b600b60008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002091508160010160049054906101000a900460ff16614e6c578373ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b158015614e2c57600080fd5b505af1158015614e40573d6000803e3d6000fd5b505050506040513d6020811015614e5657600080fd5b8101908080519060200190929190505050614e72565b81600001545b92505050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161480614f235750600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b1515614f2e57600080fd5b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515614f8b57600080fd5b80600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600a81815481101515614fde57fe5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806150b55750600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b15156150c057600080fd5b8060008163ffffffff16101580156150f65750600c60049054906101000a900463ffffffff1663ffffffff168163ffffffff1611155b151561510157600080fd5b7f81cd2ffb37dd237c0e4e2a3de5265fcf9deb43d3e7801e80db9f1ccfba7ee600600c60089054906101000a900463ffffffff1683604051808363ffffffff1663ffffffff1681526020018263ffffffff1663ffffffff1681526020019250505060405180910390a181600c60086101000a81548163ffffffff021916908363ffffffff1602179055505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156151e757fe5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415151561524357600080fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000806000806152bd878761449f565b9250600083141580156152d05750848310155b15156152db57600080fd5b600b60008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002091508160010160049054906101000a900460ff161561534a57615341826000015487615cca565b82600001819055505b8673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330896040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b15801561542157600080fd5b505af1158015615435573d6000803e3d6000fd5b505050506040513d602081101561544b57600080fd5b8101908080519060200190929190505050151561546457fe5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663867904b433856040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050600060405180830381600087803b15801561552957600080fd5b505af115801561553d573d6000803e3d6000fd5b5050505061555583615550856001612959565b615ce8565b905061558687600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16888685615d01565b8673ffffffffffffffffffffffffffffffffffffffff167f8a6a7f53b3c8fa1dc4b83e3f1be668c1b251ff8d44cdcb83eb3acec3fec6a788600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b15801561564457600080fd5b505af1158015615658573d6000803e3d6000fd5b505050506040513d602081101561566e57600080fd5b81019080805190602001909291905050506156888a614cdb565b8560010160009054906101000a900463ffffffff16604051808481526020018381526020018263ffffffff1663ffffffff168152602001935050505060405180910390a28293505050509392505050565b600080600080600080600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b15801561579f57600080fd5b505af11580156157b3573d6000803e3d6000fd5b505050506040513d60208110156157c957600080fd5b810190808051906020019092919050505088111515156157e857600080fd5b6157f289896136be565b9450600085141580156158055750868510155b151561581057600080fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b15801561589657600080fd5b505af11580156158aa573d6000803e3d6000fd5b505050506040513d60208110156158c057600080fd5b810190808051906020019092919050505093506158dc89614cdb565b9250828510806158f6575082851480156158f557508388145b5b15156158fe57fe5b600b60008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002091508160010160049054906101000a900460ff161561596d57615964826000015486615ce8565b82600001819055505b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a24835d1338a6040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050600060405180830381600087803b158015615a3257600080fd5b505af1158015615a46573d6000803e3d6000fd5b505050508873ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33876040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b158015615aed57600080fd5b505af1158015615b01573d6000803e3d6000fd5b505050506040513d6020811015615b1757600080fd5b81019080805190602001909291905050501515615b3057fe5b615b4485615b3f876001612959565b615ce8565b9050615b75600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168a8a8885615d01565b8873ffffffffffffffffffffffffffffffffffffffff167f8a6a7f53b3c8fa1dc4b83e3f1be668c1b251ff8d44cdcb83eb3acec3fec6a788600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b158015615c3357600080fd5b505af1158015615c47573d6000803e3d6000fd5b505050506040513d6020811015615c5d57600080fd5b8101908080519060200190929190505050615c778c614cdb565b8560010160009054906101000a900463ffffffff16604051808481526020018381526020018263ffffffff1663ffffffff168152602001935050505060405180910390a284955050505050509392505050565b6000808284019050838110151515615cde57fe5b8091505092915050565b6000818310151515615cf657fe5b818303905092915050565b7f80000000000000000000000000000000000000000000000000000000000000008111151515615d2d57fe5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff167f276856b36cbc45526a0ba64f44611557a2a8b68662c5388e9fe6d72e86e1c8cb86868660405180848152602001838152602001828152602001935050505060405180910390a45050505050565b60008082840290506000841480615de15750828482811515615dde57fe5b04145b1515615de957fe5b8091505092915050565b815481835581811115615e1a57818360005260206000209182019101615e199190615f33565b5b505050565b828054828255906000526020600020908101928215615e98579160200282015b82811115615e975782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555091602001919060010190615e3f565b5b509050615ea59190615f58565b5090565b828054828255906000526020600020908101928215615f22579160200282015b82811115615f215782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555091602001919060010190615ec9565b5b509050615f2f9190615f58565b5090565b615f5591905b80821115615f51576000816000905550600101615f39565b5090565b90565b615f9891905b80821115615f9457600081816101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905550600101615f5e565b5090565b905600a165627a7a72305820935e9933e03c0277b32f109db91746f5028814266e3517447490ceeea163b70f0029";
var newContract = web3.cmt.contract(abi, function(error, result){if(!error){console.log(result)}else{console.log(error)}});
//Run this next command separately because it has a delay in responding
var deployedContract = newContract.new("_token","_registry","_maxConversionFee","_connectorToken","_connectorWeight",{from:accountA, data: bytecode, gas:"5000000"}, function(error, result){if(!error){console.log(result)}else{console.log(error)}});

/*
Listing the functions that have no arguments

Function: acceptTokenOwnership
Takes no arguments
Returns nothing
*/
deployedContract.acceptTokenOwnership({from:accountA});
/*

Function: converterType
Takes no arguments
Returns a string
*/
deployedContract.converterType({from:accountA});
/*

Function: newManager
Takes no arguments
Returns a address
*/
deployedContract.newManager({from:accountA});
/*

Function: manager
Takes no arguments
Returns a address
*/
deployedContract.manager({from:accountA});
/*

Function: clearQuickBuyPath
Takes no arguments
Returns nothing
*/
deployedContract.clearQuickBuyPath({from:accountA});
/*

Function: version
Takes no arguments
Returns a string
*/
deployedContract.version({from:accountA});
/*

Function: conversionFee
Takes no arguments
Returns a uint32
*/
deployedContract.conversionFee({from:accountA});
/*

Function: BANCOR_CONVERTER_FACTORY
Takes no arguments
Returns a bytes32
*/
deployedContract.BANCOR_CONVERTER_FACTORY({from:accountA});
/*

Function: BANCOR_FORMULA
Takes no arguments
Returns a bytes32
*/
deployedContract.BANCOR_FORMULA({from:accountA});
/*

Function: connectorTokenCount
Takes no arguments
Returns a uint16
*/
deployedContract.connectorTokenCount({from:accountA});
/*

Function: acceptOwnership
Takes no arguments
Returns nothing
*/
deployedContract.acceptOwnership({from:accountA});
/*

Function: registry
Takes no arguments
Returns a address
*/
deployedContract.registry({from:accountA});
/*

Function: CONTRACT_FEATURES
Takes no arguments
Returns a bytes32
*/
deployedContract.CONTRACT_FEATURES({from:accountA});
/*

Function: owner
Takes no arguments
Returns a address
*/
deployedContract.owner({from:accountA});
/*

Function: BANCOR_NETWORK
Takes no arguments
Returns a bytes32
*/
deployedContract.BANCOR_NETWORK({from:accountA});
/*

Function: BANCOR_GAS_PRICE_LIMIT
Takes no arguments
Returns a bytes32
*/
deployedContract.BANCOR_GAS_PRICE_LIMIT({from:accountA});
/*

Function: CONVERTER_CONVERSION_WHITELIST
Takes no arguments
Returns a uint256
*/
deployedContract.CONVERTER_CONVERSION_WHITELIST({from:accountA});
/*

Function: getQuickBuyPathLength
Takes no arguments
Returns a uint256
*/
deployedContract.getQuickBuyPathLength({from:accountA});
/*

Function: maxConversionFee
Takes no arguments
Returns a uint32
*/
deployedContract.maxConversionFee({from:accountA});
/*

Function: conversionsEnabled
Takes no arguments
Returns a bool
*/
deployedContract.conversionsEnabled({from:accountA});
/*

Function: conversionWhitelist
Takes no arguments
Returns a address
*/
deployedContract.conversionWhitelist({from:accountA});
/*

Function: acceptManagement
Takes no arguments
Returns nothing
*/
deployedContract.acceptManagement({from:accountA});
/*

Function: newOwner
Takes no arguments
Returns a address
*/
deployedContract.newOwner({from:accountA});
/*

Function: token
Takes no arguments
Returns a address
*/
deployedContract.token({from:accountA});
/*
Listing the functions that take arguments

Function: updateConnector
Takes 4 arguments
Argument name: _connectorToken
Argument type: address
Argument name: _weight
Argument type: uint32
Argument name: _enableVirtualBalance
Argument type: bool
Argument name: _virtualBalance
Argument type: uint256
Returns nothing!
*/
deployedContract.updateConnector(_connectorToken address, _weight uint32, _enableVirtualBalance bool, _virtualBalance uint256,  {from:accountA});
/*

Function: connectors
Takes 1 arguments
Argument name: 
Argument type: address
Returns a uint256
*/
deployedContract.connectors( address,  {from:accountA});
/*

Function: connectorTokens
Takes 1 arguments
Argument name: 
Argument type: uint256
Returns a address
*/
deployedContract.connectorTokens( uint256,  {from:accountA});
/*

Function: getReturn
Takes 3 arguments
Argument name: _fromToken
Argument type: address
Argument name: _toToken
Argument type: address
Argument name: _amount
Argument type: uint256
Returns a uint256
*/
deployedContract.getReturn(_fromToken address, _toToken address, _amount uint256,  {from:accountA});
/*

Function: transferTokenOwnership
Takes 1 arguments
Argument name: _newOwner
Argument type: address
Returns nothing!
*/
deployedContract.transferTokenOwnership(_newOwner address,  {from:accountA});
/*

Function: quickConvertPrioritized
Takes 7 arguments
Argument name: _path
Argument type: address[]
Argument name: _amount
Argument type: uint256
Argument name: _minReturn
Argument type: uint256
Argument name: _block
Argument type: uint256
Argument name: _v
Argument type: uint8
Argument name: _r
Argument type: bytes32
Argument name: _s
Argument type: bytes32
Returns a uint256
*/
deployedContract.quickConvertPrioritized(_path address[], _amount uint256, _minReturn uint256, _block uint256, _v uint8, _r bytes32, _s bytes32,  {from:accountA});
/*

Function: disableConversions
Takes 1 arguments
Argument name: _disable
Argument type: bool
Returns nothing!
*/
deployedContract.disableConversions(_disable bool,  {from:accountA});
/*

Function: convertInternal
Takes 4 arguments
Argument name: _fromToken
Argument type: address
Argument name: _toToken
Argument type: address
Argument name: _amount
Argument type: uint256
Argument name: _minReturn
Argument type: uint256
Returns a uint256
*/
deployedContract.convertInternal(_fromToken address, _toToken address, _amount uint256, _minReturn uint256,  {from:accountA});
/*

Function: getFinalAmount
Takes 2 arguments
Argument name: _amount
Argument type: uint256
Argument name: _magnitude
Argument type: uint8
Returns a uint256
*/
deployedContract.getFinalAmount(_amount uint256, _magnitude uint8,  {from:accountA});
/*

Function: addConnector
Takes 3 arguments
Argument name: _token
Argument type: address
Argument name: _weight
Argument type: uint32
Argument name: _enableVirtualBalance
Argument type: bool
Returns nothing!
*/
deployedContract.addConnector(_token address, _weight uint32, _enableVirtualBalance bool,  {from:accountA});
/*

Function: withdrawFromToken
Takes 3 arguments
Argument name: _token
Argument type: address
Argument name: _to
Argument type: address
Argument name: _amount
Argument type: uint256
Returns nothing!
*/
deployedContract.withdrawFromToken(_token address, _to address, _amount uint256,  {from:accountA});
/*

Function: setConversionWhitelist
Takes 1 arguments
Argument name: _whitelist
Argument type: address
Returns nothing!
*/
deployedContract.setConversionWhitelist(_whitelist address,  {from:accountA});
/*

Function: disableConnectorPurchases
Takes 2 arguments
Argument name: _connectorToken
Argument type: address
Argument name: _disable
Argument type: bool
Returns nothing!
*/
deployedContract.disableConnectorPurchases(_connectorToken address, _disable bool,  {from:accountA});
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
deployedContract.withdrawTokens(_token address, _to address, _amount uint256,  {from:accountA});
/*

Function: change
Takes 4 arguments
Argument name: _fromToken
Argument type: address
Argument name: _toToken
Argument type: address
Argument name: _amount
Argument type: uint256
Argument name: _minReturn
Argument type: uint256
Returns a uint256
*/
deployedContract.change(_fromToken address, _toToken address, _amount uint256, _minReturn uint256,  {from:accountA});
/*

Function: getSaleReturn
Takes 2 arguments
Argument name: _connectorToken
Argument type: address
Argument name: _sellAmount
Argument type: uint256
Returns a uint256
*/
deployedContract.getSaleReturn(_connectorToken address, _sellAmount uint256,  {from:accountA});
/*

Function: convert
Takes 4 arguments
Argument name: _fromToken
Argument type: address
Argument name: _toToken
Argument type: address
Argument name: _amount
Argument type: uint256
Argument name: _minReturn
Argument type: uint256
Returns a uint256
*/
deployedContract.convert(_fromToken address, _toToken address, _amount uint256, _minReturn uint256,  {from:accountA});
/*

Function: disableTokenTransfers
Takes 1 arguments
Argument name: _disable
Argument type: bool
Returns nothing!
*/
deployedContract.disableTokenTransfers(_disable bool,  {from:accountA});
/*

Function: getCrossConnectorReturn
Takes 3 arguments
Argument name: _fromConnectorToken
Argument type: address
Argument name: _toConnectorToken
Argument type: address
Argument name: _sellAmount
Argument type: uint256
Returns a uint256
*/
deployedContract.getCrossConnectorReturn(_fromConnectorToken address, _toConnectorToken address, _sellAmount uint256,  {from:accountA});
/*

Function: getPurchaseReturn
Takes 2 arguments
Argument name: _connectorToken
Argument type: address
Argument name: _depositAmount
Argument type: uint256
Returns a uint256
*/
deployedContract.getPurchaseReturn(_connectorToken address, _depositAmount uint256,  {from:accountA});
/*

Function: setRegistry
Takes 1 arguments
Argument name: _registry
Argument type: address
Returns nothing!
*/
deployedContract.setRegistry(_registry address,  {from:accountA});
/*

Function: setQuickBuyPath
Takes 1 arguments
Argument name: _path
Argument type: address[]
Returns nothing!
*/
deployedContract.setQuickBuyPath(_path address[],  {from:accountA});
/*

Function: getConnectorBalance
Takes 1 arguments
Argument name: _connectorToken
Argument type: address
Returns a uint256
*/
deployedContract.getConnectorBalance(_connectorToken address,  {from:accountA});
/*

Function: transferManagement
Takes 1 arguments
Argument name: _newManager
Argument type: address
Returns nothing!
*/
deployedContract.transferManagement(_newManager address,  {from:accountA});
/*

Function: quickBuyPath
Takes 1 arguments
Argument name: 
Argument type: uint256
Returns a address
*/
deployedContract.quickBuyPath( uint256,  {from:accountA});
/*

Function: setConversionFee
Takes 1 arguments
Argument name: _conversionFee
Argument type: uint32
Returns nothing!
*/
deployedContract.setConversionFee(_conversionFee uint32,  {from:accountA});
/*

Function: quickConvert
Takes 3 arguments
Argument name: _path
Argument type: address[]
Argument name: _amount
Argument type: uint256
Argument name: _minReturn
Argument type: uint256
Returns a uint256
*/
deployedContract.quickConvert(_path address[], _amount uint256, _minReturn uint256,  {from:accountA});
/*

Function: transferOwnership
Takes 1 arguments
Argument name: _newOwner
Argument type: address
Returns nothing!
*/
deployedContract.transferOwnership(_newOwner address,  {from:accountA});
/*

/*
