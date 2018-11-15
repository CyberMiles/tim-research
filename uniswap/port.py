#TODO write address.js json directoy to the very start of the file in src/ducks/address.js
#TODO write alternate config for start up scripts also

# Place and execute this file alongside the root uniswap Github directory
# This will clear up and issues where ETH, Eth and eth is hard-coded in the source code.
import os
import json
import subprocess

# CONFIG START # 
## Please set the following variables before running the script

## Prerequisites
## Deploy a Uniswap "Factory" contract and add the address below
## The bytecode and abi files are available at
## https://github.com/Uniswap/contracts-vyper/tree/master/abi and https://github.com/Uniswap/contracts-vyper/tree/master/bytecode
factoryAddress = "0x54ee54718e37fd2efd3521bf2ff2e1b55fe040a7"

## Deploy one or more ERC20 compliant token contracts and list them below
tokenAddresses = {
	'TIM': '0xdcb18351f968887ddda9ba1cb5901badde74ee54',
	'BOB': '0xa063a807c40a0664a87cbd08c6c7664bb9471e3c'
}

## Deploy one separate Uniswap "Exchange" contract for each of the tokenContracts above and then list them below
## The bytecode and abi files are available at
## https://github.com/Uniswap/contracts-vyper/tree/master/abi and https://github.com/Uniswap/contracts-vyper/tree/master/bytecode
exchangeAddresses = {
	'TIM': '0x490b49b11301cac7277245695944f7e7749e5a7d',
	'BOB': '0x8cf42dc5497d295f988dba7b55c0f5fdb388b4c8'
}

networkName = "TRAVIS"
networkId = "19"

### List any combination of text that you would like changed in the source code
replaceDict = {
    'ethereum': 'cybermiles',
    'Ethereum': 'CyberMiles',
    'eth': 'cmt',
    'ETH': 'CMT',
    'Eth': 'Cmt',
    }

# CONFIG END #

# FUNCTIONS

def buildAddresses(addressType):
    addressJsData[addressType] = {}
    addresses = []
    address = []
    for (k, v) in eval(addressType).items():
        address.append(k)
        address.append(v)
        addresses.append(address)
        address = []
    addressJsData[addressType]['address'] = addresses

def pairExchangeAndTokenAddresses():
    fromToken = {}
    for (k1, v1) in tokenAddresses.items():
        for (k2, v2) in exchangeAddresses.items():
            if k1 == k2:
                fromToken[v1] = v2
    addressJsData['exchangeAddresses']['fromToken'] = fromToken

# EXECUTION START #

addressJsData = {}
addressJsData['factoryAddress'] = factoryAddress

buildAddresses('exchangeAddresses')
buildAddresses('tokenAddresses')
pairExchangeAndTokenAddresses()

stringForAddressJsFile = ''
stringForAddressJsFile = stringForAddressJsFile + 'const ' \
    + networkName.upper() + ' = ' + json.dumps(addressJsData, indent=4) + ";"
print(stringForAddressJsFile)

'''
# Example output
const MYTESTNET = {
    "factoryAddress": "0x54ee54718e37fd2efd3521bf2ff2e1b55fe040a7",
    "exchangeAddresses": {
        "address": [
            [
                "TIM",
                "0x490b49b11301cac7277245695944f7e7749e5a7d"
            ],
            [
                "BOB",
                "0x8cf42dc5497d295f988dba7b55c0f5fdb388b4c8"
            ]
        ],
        "fromToken": {
            "0xdcb18351f968887ddda9ba1cb5901badde74ee54": "0x490b49b11301cac7277245695944f7e7749e5a7d",
            "0xa063a807c40a0664a87cbd08c6c7664bb9471e3c": "0x8cf42dc5497d295f988dba7b55c0f5fdb388b4c8"
        }
    },
    "tokenAddresses": {
        "address": [
            [
                "TIM",
                "0xdcb18351f968887ddda9ba1cb5901badde74ee54"
            ],
            [
                "BOB",
                "0xa063a807c40a0664a87cbd08c6c7664bb9471e3c"
            ]
        ]
    }
}

'''

# Write configuration

# Replace text

for (root, dirs, files) in os.walk(os.path.join(os.getcwd(),
                                   'uniswap-frontend', 'src')):
    for name in files:
        for (key, value) in replaceDict.items():
            sedCommandSingleQuotes = "s/\\\'" + key + "\\\'/\\\'" \
                + value + "\\\'/g"
            sedCommandDoubleQuotes = 's/\\"' + key + '\\"/\\"' + value \
                + '\\"/g'
            subprocess.call(['sed', '-i', '-e', sedCommandSingleQuotes,
                            os.path.join(root, name)])
            subprocess.call(['sed', '-i', '-e', sedCommandDoubleQuotes,
                            os.path.join(root, name)])
# EXECUTION END #
