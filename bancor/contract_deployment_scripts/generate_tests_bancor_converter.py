import os
import ast
# This script will assist in writing unit tests for smart contract functions
# This script is only for testing and should never be used on a production network or in conjunction with anything of value. Testing only!

# This python script compiles your smart contract, and then automatically generates a javascript file filled with prewritten function calls to the contract so that you can deploy and test your contract without having to do everything by hand. 
# This is useful if you want to change the smart contract code, recompile and quickly test, again and again.

# 1. Install Lity using the following commands

#cd ~
#git clone https://github.com/CyberMiles/lity.git
#cd lity
#mkdir build
#cd build
#cmake ..
#make

# 2. Create an output directory i.e. lity/build/output

# 3. Copy this script to the lity/build directory i.e. lity/build/generate_tests.py

# 4. Paste your absolute path to contract's directory as well as the contract's name, type, and the contract's file extension below.
absolutePathToContractDir = "~/contracts/solidity/contracts/converter/"
sc = "BancorConverter"
contractType = "ERC20"
fileExtension = ".sol"

# 5. Type the arguments for your smart contract's constructor in the list below
constructorList = ["_token", "_registry", "_maxConversionFee", "_connectorToken", "_connectorWeight"]
constructor = ""
for item in constructorList:
    constructor = constructor + "\"" + item + "\"" + ","

# 6. Run this Python file i.e. cd lity/build and then python3 generate_tests.py

# Working directory
wd = os.getcwd()

# Output directory
od = os.path.join(wd, "output",)

# Compile contract to the output directory
os.chdir(wd)
compileContract = "./lityc/lityc --contract-standard " + contractType + " --overwrite --allow-paths ../, --abi --bin -o output/ " + absolutePathToContractDir + sc + fileExtension

os.system(compileContract)

# Writing Javascript style syntax
# Create the js file endpoint
file = open(os.path.join(wd, "output",  sc + "_test.js"), 'w')

# Load the variables with data from the abi and bin files
os.chdir(od)
abi = open(sc + ".abi", 'r').read()
bytecode = open(sc + ".bin",'r').read()
# Perform some operations on the abi so that we can parse it into a Python dictionary later
parsedAbiPre3 = abi.replace("true", "\"true\"")
parsedAbiPre2 = parsedAbiPre3.replace("false", "\"false\"")
parsedAbiPre1 = parsedAbiPre2[:-1]
parsedAbi0 = parsedAbiPre1[1:]
abiDict = ast.literal_eval(parsedAbi0)

os.chdir(wd)
runInstruction = "//Run this next command separately because it has a delay in responding\n"
# Write some data to the output file
## Create two new accounts to test with
file.write(runInstruction)
file.write("accountA = personal.newAccount(\"asdf\");\n")
file.write(runInstruction)
file.write("accountB = personal.newAccount(\"asdf\");\n")
## Unlock the coinbase account that ships with the CyberMiles Docker private network (https://travis.readthedocs.io/en/latest/getting-started.html#use-docker)
file.write(runInstruction)
file.write("personal.unlockAccount(cmt.coinbase" + ", " + "\"" + "1234" + "\"" + ", 600, function(error, result){if(!error){console.log(result)}else{console.log(error)}});\n")
## Send some funds to the two new accounts
file.write(runInstruction)
file.write("cmt.sendTransaction({\"from\": cmt.coinbase" + ", " + "\"to\": accountA" + ", " + "\"value\": web3.toWei(50, \"cmt\")}, function(error, result){if(!error){console.log(result)}else{console.log(error)}});\n")
file.write(runInstruction)
file.write("cmt.sendTransaction({\"from\": cmt.coinbase" + ", " + "\"to\": accountB" + ", " + "\"value\": web3.toWei(50, \"cmt\")}, function(error, result){if(!error){console.log(result)}else{console.log(error)}});\n")
## Check all 3 account balances
file.write("web3.fromWei(cmt.getBalance(cmt.coinbase), \"cmt\", function(error, result){if(!error){console.log(result)}else{console.log(error)}});\n")
file.write("web3.fromWei(cmt.getBalance(accountA), \"cmt\", function(error, result){if(!error){console.log(result)}else{console.log(error)}});\n")
file.write("web3.fromWei(cmt.getBalance(accountB), \"cmt\", function(error, result){if(!error){console.log(result)}else{console.log(error)}});\n")
## Unlock the two new accounts
file.write(runInstruction)
file.write("personal.unlockAccount(accountA " + ", " + "\"" + "asdf" + "\"" + ", 600, function(error, result){if(!error){console.log(result)}else{console.log(error)}});\n")
file.write(runInstruction)
file.write("personal.unlockAccount(accountB " + ", " + "\"" + "asdf" + "\"" + ", 600, function(error, result){if(!error){console.log(result)}else{console.log(error)}});\n")
## Save the abi from the compiled contract to a variable
file.write(runInstruction)
file.write("var abi = " + abi + ";\n")
## Save the bytecode from the compiled contract to a variable
file.write(runInstruction)
file.write("var bytecode = " + "\"" + "0x" + bytecode + "\";\n")
## Instantiate a new contract
file.write("var newContract = web3.cmt.contract(abi, function(error, result){if(!error){console.log(result)}else{console.log(error)}});\n")
## Deploy the new contract from account A
file.write(runInstruction)
deployedContract = "deployed" + sc + "Contract"
file.write("var " + deployedContract + " = newContract.new(" + constructor + "{from:accountA, data: bytecode, gas:" + "\"" + "5000000" + "\"" + "}, function(error, result){if(!error){console.log(result)}else{console.log(error)}});\n")

## Loop through all of the read only functions in the abi 
file.write("\n/*\n")
file.write("Listing the functions that have no arguments\n")
for item in abiDict:
	if item["type"] == "function":
		print("Processing " + item["name"])
		if len(item["inputs"]) == 0:
			file.write("\nFunction: " + item["name"] + "\n")
			file.write("Takes no arguments\n")
			if len(item["outputs"]) > 0:
				file.write("Returns a " + item["outputs"][0]["type"] + "\n")
			else:
				file.write("Returns nothing\n")
			stringCall = deployedContract + "." + item["name"] + "({from:accountA});"
			file.write("*/\n" + stringCall + "\n/*\n")
			stringCall = ""

## Loop through all of the functions that take arguments
file.write("Listing the functions that take arguments\n")
for item in abiDict:
	if item["type"] == "function":
		stringCall = deployedContract + "."
		print("Processing " + item["name"] + "\n")
		stringCall = stringCall + item["name"] + "("
		if len(item["inputs"]) >= 1:
			file.write("\nFunction: " + item["name"] + "\n")
			file.write("Takes " + str(len(item["inputs"])) + " arguments\n")
			i = 1
			for theInput in item["inputs"]:
				file.write("Argument name: " + theInput["name"] + "\n")
				file.write("Argument type: " + theInput["type"] + "\n")
				stringCall = stringCall + theInput["name"] + " " + theInput["type"]
				if i < len(item["inputs"]):
					stringCall = stringCall + ", "
				i = i + 1
			if len(item["outputs"]) > 0:
				file.write("Returns a " + item["outputs"][0]["type"] + "\n")
			else:
				file.write("Returns nothing!\n")
			stringCall = stringCall + ",  {from:accountA});"
			file.write("*/\n" + stringCall + "\n/*\n")
			stringCall = ""
file.write("\n/*\n")


# So now we have a single Javascript file which has a list of all of the commands you will need to deploy your contract. In addition the file has the correct syntax to execute the contrac's read only functions. More to come also...
# The only thing left to do is to cut and paste the Javascript commands into web3 console. You can cut and paste commands one at a time, or if you are on a Mac you can pipe the whole output of the Javascript file to clipboard and run everything using a single paste action.
print("The output of this script is at the following file location" + os.path.join(wd, "output",  sc + "_test.js"))

pbcopyCommand = "cat " + os.path.join(wd, "output",  sc + "_test.js") + " | pbcopy"
print(pbcopyCommand)


#END
