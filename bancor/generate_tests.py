import os
import ast
# This script will assist in writing unit tests for smart contract functions
# This script is only for testing and should never be used on a production network or in conjunction with anything of value. Testing only!

# This python script compiles your smart contract, and then automatically generates a javascript file filled with prewritten function calls to the contract so that you can deploy and test your contract without having to do everything by hand. This is useful if you want to change the smart contract code, recompile and quickly test, again and again.

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

# 4. Paste your contract's name and file extension below.
sc = "SmartToken"
fileExtension = ".sol"

# 5. Type the arguments for your smart contract's constructor in the list below
constructorList = ["timtoken", "tim", "8"]
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
compileContract = "./lityc/lityc --overwrite --allow-paths ../, --abi --bin -o output/ ~/contracts/solidity/contracts/token/" + sc + fileExtension

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
# Write some data to the output file
## Create two new accounts to test with
file.write("accountA = personal.newAccount(\"asdf\");\n")
file.write("accountB = personal.newAccount(\"asdf\");\n")
## Unlock the coinbase account that ships with the CyberMiles Docker private network (https://travis.readthedocs.io/en/latest/getting-started.html#use-docker)
file.write("personal.unlockAccount(cmt.coinbase" + ", " + "\"" + "1234" + "\"" + ");\n")
## Send some funds to the two new accounts
file.write("cmt.sendTransaction({\"from\": cmt.coinbase" + ", " + "\"to\": accountA" + ", " + "\"value\": web3.toWei(50, \"cmt\")});\n")
file.write("cmt.sendTransaction({\"from\": cmt.coinbase" + ", " + "\"to\": accountB" + ", " + "\"value\": web3.toWei(50, \"cmt\")});\n")
## Check all 3 account balances
file.write("web3.fromWei(cmt.getBalance(cmt.coinbase), \"cmt\");\n")
file.write("web3.fromWei(cmt.getBalance(accountA), \"cmt\");\n")
file.write("web3.fromWei(cmt.getBalance(accountB), \"cmt\");\n")
## Unlock the two new accounts
file.write("personal.unlockAccount(accountA " + ", " + "\"" + "asdf" + "\"" + ");\n")
file.write("personal.unlockAccount(accountB " + ", " + "\"" + "asdf" + "\"" + ");\n")
## Save the abi from the compiled contract to a variable
file.write("var abi = " + abi + ";\n")
## Save the bytecode from the compiled contract to a variable
file.write("var bytecode = " + "\"" + "0x" + bytecode + "\";\n")
## Instantiate a new contract
file.write("var newContract = web3.cmt.contract(abi);\n")
## Deploy the new contract from account A
file.write("var deployedContract = newContract.new(" + constructor + "{from:accountA, data: bytecode, gas:" + "\"" + "5000000" + "\"" + "});\n")

## Loop through all of the read only functions in the abi 
for item in abiDict:
    if item["type"] == "function":
        print("Processing " + item["name"])
        if len(item["inputs"]) == 0:
        	## Call the function
            file.write("deployedContract." + item["name"] + "();\n")

# So now we have a single Javascript file which has a list of all of the commands you will need to deploy your contract. In addition the file has the correct syntax to execute the contrac's read only functions. More to come also...
# The only thing left to do is to cut and paste the Javascript commands into web3 console. You can cut and paste commands one at a time, or if you are on a Mac you can pipe the whole output of the Javascript file to clipboard and run everything using a single paste action.
print("Please copy the following command and then paste it into your MacOS command line. This will copy the javascript commands for use inside web3\n")

print("cat " + os.path.join(wd, "output",  sc + "_test.js") + " | pbcopy")
