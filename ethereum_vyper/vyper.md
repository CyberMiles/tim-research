# Vyper

Vyper is an experimental smart contract programming language for Ethereum which strives to be simple. As stated on Vyper's GitHub [1] page:

- Vyper code should be maximally human-readable
- It should be maximally difficult to write misleading Vyper code

In essence, due to past errors in code creation and execution; resulting in large scale economic losses, Vyper limits developer choices for their own good.

Vyper strives to simplify commands. For example in solidity a user can transfer value in two ways (receiver.transfer and receiver.send), whereas in Vyper there is only one way to transfer value. Vyper uses the following send method to transfer value.

```

send(receiver, amount)

```
Similarly, variable type conversion has been standardized in Vyper.

Unlike Solidity, in Vyper, all pre-conditions as well as post-conditions and state changes are handled explicitly; there are no "modifiers" which allow the execution of code to jump around the file. Vyper programmers are advised to perform simple, linear, in-line asserts and checks.

An example of checkpoints within a Vyper function would/should include the following (in the order provided):
- 1 Conditions

#Check the condition (what is the current state of everything you can think of check/assert?). Log what you can.

- 2 Effects

#What effects will the execution of the code in this function have on everything (that can be effected)?

- 3 Interaction

#The actual execution of what ever code was deemed necessary to run. Again, log what you can.

Vyper is anti class inheritance because inheritance requires the programmer and/or security auditor to fully understand the given rules of precedence. Vyper will be written with more repetition due to this design decision. However, Vyper will be much more readable (code can be more easily audited).

Vyper is anti operator overloading because the programmer might think that an operator is doing one thing (like adding) whereas in reality they are oblivious to the fact that it has been overloaded to do something completely different like sum all funds for sending.

Vyper has fixed loops (unlike Solidity which has dynamic loops). Vyper's fixed iteration requires that the developer specifies how many times to loop up-front. This provides an element of safety, and also makes the estimation of gas easier. Vyper does not support recursion.

# Installing Vyper on Ubuntu 16.04LTS

It is highly recommended that you create and use a Python virtual environment. Also make sure that you are downloading the current version of Vyper from the GitHub repository, as it is quite regularly updated.

```

sudo apt-get update
sudo apt-get -y upgrade
sudo apt-get install build-essential libssl-dev libffi-dev
wget https://www.python.org/ftp/python/3.6.2/Python-3.6.2.tgz
tar xfz Python-3.6.2.tgz
cd Python-3.6.2/
./configure --prefix /usr/local/lib/python3.6
sudo -H make
sudo -H make install

cd Python-3.6.2/
virtualenv -p /usr/local/lib/python3.6/bin/python3.6 --no-site-packages ~/vyper-venv-3-6-2
source ~/vyper-venv-3-6-2/bin/activate

cd ~/vyper-venv-3-6-2/
git clone https://github.com/ethereum/vyper.git
cd vyper
make
make test

```
# Writing your Vyper smart contract
There is a hello world example of what we are about to discuss below available at [this link](https://github.com/CyberMiles/tim-research/blob/master/ethereum_vyper/hello_world.v.py)

## Global variables

State variables can be set (at the top of your file) like this. Notice that we created a public getter for both of these state variables.

```

#State variables
helloMessage: public(bytes32)
owner: public(address)

```

## Constructor

This constructor takes a message and sets the two global variables.

```

#Constructor
@public
def __init__(_message: bytes32):
    #Sets the message which is passed in at execution
    self.helloMessage = _message
    #Sets the owner at excecution
    self.owner = msg.sender
    
```

## Functions

As you can see below, the sayHello function takes no arguments and returns the global helloMessage of type bytes32.

Importantly, Vyper functions default to private (if not specified otherwise) and can not transfer value (unless specified). To make a function public the developer must specify the @public decorator. To allow a function to transact value the developer must specify @payable decorator. 

```

@public
@constant
def sayHello() -> bytes32:
    return self.helloMessage
    
```

You will notice that the @constant decorator is just above the sayHello function. This lets the compiler know that this function does not change the state of the blockchain. This is another safety feature which will result in the following compiler error (if you try and change state variables in the sayHello function "vyper.exceptions.ConstancyViolationException: Cannot modify storage inside a constant function".

If you would like to know more about blockchain state you can read this [Medium article](https://medium.com/cybermiles/diving-into-ethereums-world-state-c893102030ed).

The official documentation for Vyper can be found at [this link](https://vyper.readthedocs.io/en/latest/index.html).

# Compiling your Vyper smart contract - Generating your bytecode

Vyper is not an officially supported langage (within IDEs) and therefore it is advised that you use the Python extension ".py" Interestingly, the Vyper compiler is actually written in Python. As apposed to the Solidity compiler which is written in C++.

Once you have saved your file with the v.py extention you can compile it by running the following command.

```

vyper ~/hello_world.v.py 

```

The above command will produce the necessary bytecode which we can run in the Ethereum command line.

# Compiling your Vyper smart contract - Generating your ABI

This section shows you how to automatically create the human and machine readable reference. We are again doing to run the hello_world.v.py file, but this time with additional arguments.

```
vyper -f json ~/hello_world.v.py

```


# Running your Vyper smart contract

Make sure that you can [connect to the Ethereum command line](https://www.ethereum.org/cli) and then run the following commands.

Establishing who the owner of the smart contract is

```

> var owner = eth.accounts[0]

```

Storing the ABI as a variable (use the output from the command above)

```
> var abi = [{"name": ... function"}]

```
Storing the bytecode as a variable

```
> var bytecode = "0x60003501c...000...f3"

```

Creating a contract instance

```
> hello_world_contract = eth.contract(abi)

```

Unlocking our Ethereum account so that we can execute the transaction

```
> personal.unlockAccount(eth.accounts[0])

```

Executing the contract into a variable for further checking

```

> var deployed_contract = hello_world_contract.new(message, {from: eth.accounts[0], data: bytecode, gas: 400000})


```


[1] https://github.com/ethereum/vyper
