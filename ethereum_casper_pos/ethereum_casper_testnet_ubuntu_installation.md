# Installing Casper on Ubuntu 16.04 LTS

## Housekeeping

`
sudo apt-get update
`
`
sudo apt-get upgrade
`
`
sudo apt-get install curl
`

## Docker

`
curl -fsSL get.docker.com -o get-docker.sh
`
`
sudo sh get-docker.sh
`
`
sudo usermod -aG docker $USER
`
`
sudo shutdown -r now
`

## Git

`
sudo apt-get install git
`
## PIP

`
sudo apt-get install python3-pip
`

## Web3 

Please use the -H (home) argument for sudo

`
sudo -H pip3 install web3
`

## Ethereum

Fetch casper docker containers from karlfloersch on github

`
git clone https://github.com/karlfloersch/docker-pyeth-dev.git
`
`
cd docker-pyeth-dev
`

Create a new Ethereum Account.

`
make new-account
`

Please note, the above step of creating a new account only has to be performed once. The newly created account details are stored in the following directory and will remain even after terminating docker processes or even rebooting the operating system.

`
/home/casper/docker-pyeth-dev/validator/data/config/keystore
`

# Running

There are a few different modalities to running the Casper FFG node.

## Connecting only

The syntax to connect to the public testnet is as follows

`
make run-node bootstrap_node=$enode@$serverIp:$serverPort
`

For example

`
make run-node bootstrap_node=enode://d3260a710a752b926bb3328ebe29bfb568e4fb3b4c7ff59450738661113fb21f5efbdf42904c706a9f152275890840345a5bc990745919eeb2dfc2c481d778ee@54.167.247.63:30303
`

## Running a validating node

The syntax to run a validating node is as follows

`
make run-node validate=$boolValidate deposit=$ethDeposit bootstrap_node=$enode@$serverIp:$serverPort
`

For example

`
make run-node validate=true deposit=2000 bootstrap_node=enode://d3260a710a752b926bb3328ebe29bfb568e4fb3b4c7ff59450738661113fb21f5efbdf42904c706a9f152275890840345a5bc990745919eeb2dfc2c481d778ee@54.167.247.63:30303
`

Please note: Before you can run a validator you need to have at least 1500 Casper FFG testnet ETH. Whilst a "faucet may be available soon" [1] you could try asking for ETH by providing an address or try earning ETH by mining the Casper FFG testnet.

## Mining

The syntax to mine on the public tesnet is as follows

`
make run-node mine_percent=$percent bootstrap_node=$enode@$serverIp:$serverPort
`

For example

`
make run-node mine_percent=90 bootstrap_node=enode://d3260a710a752b926bb3328ebe29bfb568e4fb3b4c7ff59450738661113fb21f5efbdf42904c706a9f152275890840345a5bc990745919eeb2dfc2c481d778ee@54.167.247.63:30303
`

# Interacting with your running node using Web3

Open a new terminal 

`
ctrl + shift + t 
`

Get your local unique casper docker container id by typing

`
docker ps
`

Place your docker "CONTAINER ID" from the previous command's output into the next command

`
docker exec -it replaceMeWithCONTAINERID python
`

Type these commands at the Python prompt

`
from web3 import Web3, HTTPProvider
`
`
web3 = Web3(HTTPProvider('http://localhost:8545'))
`
`
web3.eth.getBlock('latest')
`


## Checking accounts and account balances

You can list all of your accounts by using the following commands

`
web3.eth.accounts
`

The above command produces an array in the following format

`
web3.eth.accounts
['0x33b5f0e0013da8C20c6521A645843b22c1947B23', '0x33b5f0e0013da8C20c6521A645843b22c1947B23']
`

You can view the balance of each account in the array by specifying the index. For example

`
web3.eth.getBalance(web3.eth.accounts[0])
`


# Clarifying the Ethereum testnets

The https://testnet.etherscan.io/ site shows 3 distinct Ethereum testnets. 
1. ROPSTEN (Revived) - Proof Of Work
2. KOVAN - Proof Of Authority (Parity only)
3. RINKEBY - Clique Consensus (Geth only)

The Casper FFG testnet is entirely separate from the above tesnets, for obvious resons. 
You can view the active listed nodes at the following IP address < http://34.203.42.208:3000/ > 

# Faucet
Whilst I am currently mining to earn testnet ETH, I would appreciate 1, 500 Casper FFG tesnet ETH at 0x33b5f0e0013da8C20c6521A645843b22c1947B23

# Feedback
If help is required building a faucet for Casper FFG please point me in the right direction to make a start.

Also please feel free to create a pull request of this file if you have any updates/corrections/additional useful information and/or links.

# Cleaning up
The following section outlines how to clean up in the event that you would like to change modalities i.e. connecting, mining, validating and so on.

To see what docker processes you have running use the following command

`
docker ps
`

If you want to clean up your environment, you can remove docker processes (by name) using the rm command

`
docker rm validator
`

However, if the docker processes are still running you will receive an error message like this 

`
docker rm miner
Error response from daemon: You cannot remove a running container d8fb8927fce53dfb9e23d1a6f819899fdf1afd7aa22cf6168c4dadddc3d11750. Stop the container before attempting removal or force remove
`

In this instance you can stop the docker process (before using the rm command, as mentioned above) by passing the container ID into the stop command like this

`
docker stop d8fb8927fce53dfb9e23d1a6f819899fdf1afd7aa22cf6168c4dadddc3d11750
`

[1] http://notes.eth.sg/MYEwhswJwMzAtADgCwEYBM9kAYBGJ4wBTETKdGZdXAVmRvUQDYg=?view#

