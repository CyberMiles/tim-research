# Testing/developing Scatter and CyberMiles integration

## What is Scatter
[Scatter](https://github.com/GetScatter) is similar to MetaMask in that it allows you sign transactions securely locally on your machine. Scatter goes a couple of steps further by adding the following functionality over and above MetaMask.
Scatter:
- provides improved privacy by not just giving away information from your machine as you visit various applications
- includes a reputation system called RIDL which allows a user to give a +1 or a -1 to a blockchain application
- includes desktop version, browser plug-in version and also mobile version

The following instructions were performed in order to test CyberMiles with Scatter

## Step 1 - Get the CyberMiles Testnet up and runnning
### Single local node
There are instructions on how to use a single node local node (I have listed the link below). In reality the single local node is super fast to set up and deals with CORS by default.
```
https://travis.readthedocs.io/en/latest/getting-started.html
```
Alternatively, I have also used Docker to connect to the actual Testnet for a Scatter Test Case. The following URL has instructions on getting the official CyberMiles Testnet node up and running using Docker.
```
https://travis.readthedocs.io/en/latest/connect-testnet.html#docker
```
Here are some details on how I did this.
```
sudo usermod -a -G docker $USER

docker pull ywonline/travis
cd ~
sudo rm -rf $HOME/.travis
git clone https://github.com/CyberMiles/testnet.git
cd testnet/travis
git pull

```
Open the config.toml file and change the moniker value from "local" to something new, also make sure the chain id is 19 (this value is found at the very bottom of the config.toml file). 19 is the chain id of the CyberMiles Testnet.
```
vi init/config/config.toml
```
Copy the config to the right area
```
cd ~
cd testnet/travis
cp -r init $HOME/.travis
```
Start Docker instance
```
docker run --publish-all=true --name travis -v $HOME/.travis:/travis -p 26657:26657 -p 8545:8545 -t ywonline/travis node start --home /travis
```
Get Testnet ip
```
docker inspect -f '{{ .NetworkSettings.IPAddress }}' travis
```
Connect to Testnet command line tool
```
docker run --rm -it ywonline/travis attach http://172.17.0.2:8545
```

## Step 2 - Sync with the CyberMiles Testnet 

Check to see of the testnet is still syncing, you wont get any account (will not see any testnet tokens from the faucet until your node is synced)
```
cmt.syncing
```
## Step 3 - Funding some accounts
//The following command will create a new account
```
personal.newAccount()
0x8e91cd2b624882a46380bcea561fa5aa2d768755
```
//Run this again so that we have two accounts to play with 
```
personal.newAccount()
0x3e06c3f127aaa3d93bb22b13fd59dc5257a52d5a
```

Once you have synced the Tesnet (running cmt.syncing returns false for catching_up), visit the Travis Testnet faucet to grab some free Testnet tokens.
```
> cmt.syncing
{
  catching_up: false,
  latest_app_hash: "B376053146D5A12C8ADAE71261811D2AC3668C07",
  latest_block_hash: "297BD6DF3BE6C47CB4C1E952545DAF8DD334112C",
  latest_block_height: 105537,
  latest_block_time: "2018-09-05T00:08:51.831965507Z"
}
```
The Travis Testnet faucet URL is as follows
```
http://travis-faucet.cybermiles.io/
```
The faucet will give you a transaction hash, you can confirm that the transaction was successful by using the following command
```
cmt.getTransaction("0xInsertTheTransactionHashThatTheFaucetProvided")
```
It will return something like this for each grab which you performed
```
{
  blockHash: "0xfc633d0d761f2b37ca60e485ea0bd857c7884d2ddfd4a8ea1df32a8397071e65",
  blockNumber: 105544,
  from: "0x7eff122b94897ea5b0e2a9abf47b86337fafebdc",
  gas: 90000,
  gasPrice: 2000000000,
  hash: "0xb45750cd13d2d6ad63f0c3a4242a68260caeb3f98799f22c88c240d82f7ce371",
  input: "0x",
  nonce: 303,
  r: "0x9d9165b9b60f31b646d6e83a573c9a7655792628322db499b2eabc1a51bcbee0",
  s: "0x23e2b697bc7eecdee937f6921344db40c87acfc0e2ec4ab0d80fdfc990eabf2d",
  to: "0x6d758d5d69af474c6d18b67f252ee39772960967",
  transactionIndex: 0,
  v: "0x49",
  value: 1e+21
}
```
It is now time to check the balances of the two accounts which we created above. First we will unlock each account.
```
personal.unlockAccount("0x8e91cd2b624882a46380bcea561fa5aa2d768755","PutPasswordHere")
true
personal.unlockAccount("0x3e06c3f127aaa3d93bb22b13fd59dc5257a52d5a","PutPasswordHere")
true
```
Then we will check each balance
```
web3.fromWei(cmt.getBalance("0x8e91cd2b624882a46380bcea561fa5aa2d768755"), 'cmt');
1000
```
Notice how we are converting the denomination of token to a whole cmt unit (as apposed to using the smaller default denomination of wei.
```
web3.fromWei(cmt.getBalance("0x3e06c3f127aaa3d93bb22b13fd59dc5257a52d5a"), 'cmt');
1000
```
Now that we have two accounts on the CyberMiles Testnet, let us perform a test transfer from one account to the other.

First, let's quickly create a variable to hold an amount of cmt (the following command converts 100 cmt to wie so that it can be accepted by the transaction).
```
amount = web3.toWei(100, 'cmt')
```
Now let's perform the transaction and pass in the amount variable which we just created. Notice how we also set the gas to zero. This is a CyberMiles specific feature; allows users to send legitimate transactions on the network at no cost.
```
cmt.sendTransaction({from:"0x8e91cd2b624882a46380bcea561fa5aa2d768755", to:"0x3e06c3f127aaa3d93bb22b13fd59dc5257a52d5a", value:amount, gasPrice:0})
```
The above will return a transaction hash, like this, "0x3bd0839327d0477fbe9d9a52190db8a73dc9d85d1d86bdc31ab382f83962466f". 
Again, we can go and check this transaction on the blockchain using the following command syntax.
```
cmt.getTransaction("0xInsertTheTransactionHashThatTheFaucetProvided")
```
For example, the following command returned the result below it.
```
cmt.getTransaction("0x3bd0839327d0477fbe9d9a52190db8a73dc9d85d1d86bdc31ab382f83962466f")

{
  blockHash: "0x7871c3e853de78504facdb19a891be921951161866df9db75fca56d8f1740b63",
  blockNumber: 106385,
  from: "0x8e91cd2b624882a46380bcea561fa5aa2d768755",
  gas: 90000,
  gasPrice: 0,
  hash: "0x9881e8205f6114ae2a2a3ca038e655fd5883fd1a57729a6f7b58a07c3a0ade1d",
  input: "0x",
  nonce: 0,
  r: "0xa229e67a76dc204267a47782907d7e84f8de3990153dd1fb93c4184e6448908c",
  s: "0x547d185a780ef7f788bbdb9a908d0009f718baf831b5fc1a0878f5f070f49fda",
  to: "0x3e06c3f127aaa3d93bb22b13fd59dc5257a52d5a",
  transactionIndex: 2,
  v: "0x49",
  value: 100000000000000000000
}
```
NOTICE: Notice how the value is in wie i.e. 100000000000000000000 wei is equal to 100 cmt.

If we check both account balances again, we will see that the 100 tokens have been transfered successfully.
web3.fromWei(cmt.getBalance("0x8e91cd2b624882a46380bcea561fa5aa2d768755"), 'cmt');
900
web3.fromWei(cmt.getBalance("0x3e06c3f127aaa3d93bb22b13fd59dc5257a52d5a"), 'cmt');
1100

# Scatter

## Keys
This is where it gets interesting. In Ethereum, as part of the standard functionality, you are unable to export private keys. This is for safety reasons. There are other ways to retrieve private keys from the keystore file (offline) but these tools are beyond the scope of this document.

### Keys - Scatter can generate private key pair for you
Whilst Scatter allows you to put in your own private keys (for EOS and Ethereum). Scatter can also generate an Ethereum key pair for you. From this point onwards you are responsible for the private/public key pair (which you can download by clicking "copy" button in the Scatter software).

This is the public key which Scatter Desktop created for me
```
Public Key: 0xb2da22ab2404a2b008105217293d3db54b0f9a2c
```
At present, this is a non existant Ethereum key pair as you can see from the Etherscan link below
```
https://etherscan.io/address/0xb2da22ab2404a2b008105217293d3db54b0f9a2c
```
### Our current accounts on the CyberMiles Testnet
At present the CyberMiles Testnet which I am working on via the Docker container has the following account state. The address of 0x3e06c3f127aaa3d93bb22b13fd59dc5257a52d5a has 1100 cmt tokens and the address of 0x8e91cd2b624882a46380bcea561fa5aa2d768755 has 900 cmt tokens.

### Transferring value using Geth (command line - no scatter at this stage)
Let's try and transfer 100 cmt tokens from our original address (which is currently holding 1100 cmt) to our newly generated address (which was created by allowing Scatter to generate a private/public key pair on our behalf).

First we unlock our account
```
personal.unlockAccount("0x3e06c3f127aaa3d93bb22b13fd59dc5257a52d5a", "PutPasswordHere")
true
```
Then we create an amount variable (100 cmt) for our next transaction
```
amount = web3.toWei(100, 'cmt')
"100000000000000000000"
```
Then we transfer the funds
```
cmt.sendTransaction({from:"0x3e06c3f127aaa3d93bb22b13fd59dc5257a52d5a", to:"0xb2da22ab2404a2b008105217293d3db54b0f9a2c", value:amount, gasPrice:0})

"0xb4e1bd41dff2001da2e70ffbeb84aca926e6e892e0f56aeade939e05a2f41ca3"
```
And finally, we check the transaction hash, which was returned by the sendTransaction function
```
cmt.getTransaction("0xb4e1bd41dff2001da2e70ffbeb84aca926e6e892e0f56aeade939e05a2f41ca3")
{
  blockHash: "0xeff76bf20a11b17591f592ed3244131d2e5ef907b8f035b54cf5e0ccffa445c9",
  blockNumber: 107167,
  from: "0x3e06c3f127aaa3d93bb22b13fd59dc5257a52d5a",
  gas: 90000,
  gasPrice: 0,
  hash: "0xb4e1bd41dff2001da2e70ffbeb84aca926e6e892e0f56aeade939e05a2f41ca3",
  input: "0x",
  nonce: 0,
  r: "0xe1663950f0c8f2fcea026782aacd26c0cf57b6ea7ebf6986bf0c0c2f4f383a8d",
  s: "0x7baf4399a39373e744d1b71f41c27ec7b9543713d88278123acdf1eba1e79130",
  to: "0xb2da22ab2404a2b008105217293d3db54b0f9a2c",
  transactionIndex: 1,
  v: "0x49",
  value: 100000000000000000000
}
```
If we check the account balance of the from account, we will see that the 100 cmt has been moved on. There is only 1000 cmt in that account now. This is correct!
```
web3.fromWei(cmt.getBalance("0x3e06c3f127aaa3d93bb22b13fd59dc5257a52d5a"), 'cmt')
1000
```
Believe it or not, we can even check the Scatter generated account on this testnet. We do not need the private keys to get the account balance of a public key on this blockchain. The following command, correctly returns the result of 100 cmt.
```
web3.fromWei(cmt.getBalance("0xb2da22ab2404a2b008105217293d3db54b0f9a2c"), 'cmt')
100
```
This confirms that the address space of Ethereum and CyberMiles are compatible with these addresses.

## Transferring value using Scatter (by clicking a button in our one page HTML/JS application)
The following code is a the most simplistic of web applications. It is a prototype for research and development into Scatter / CyberMiles interoperability, written using only HTML and inline Javascript. This is for ease of use and understanding.

### Dependencies
I created a folder for the project. I then downloaded scatter-js (from https://github.com/GetScatter/scatter-js/tree/2.5.1) and web3.js from (https://github.com/ethereum/web3.js/) and stored them both inside a folder called modules. Here is a simple diagram. You will see the actual relative paths which I used in the head->script->src of the HTML file below.

```
               /home/html
	        |   |
          modules   theHTMLFile.html
  	 |      |
   scatter      web3
         |      |
      dist      dist
         |      |
scatter.js      web3.js

```

### Server container
Here I am installing the simplest of server containers. The idea here is to keep things as simple as possible; using the http-server functionality of node (similar to using a python simple server etc.) to host the single HTML/Javascript page. This minimalistic node usage is just to satisfy the Javascript execution of the single HTML/Javascript page which I created. Of course I learned that opening the HTML/Javascript page from the file system (file:///home/html/theHTMLFile.html) does not satisfy the application's full and proper execution and Javascript context. I typed the following in order to install the server container.
```
npm i -g http-server
```
I then created an HTML file (as shown below) and ran the following command (from within the directory where the HTML file is kept) in order to serve the HTML page on http://127.0.0.1:8080/theHTMLFile.html
```
http-server .
```

The following file is a starting point to get Scatter connecting in the browser.

```

<!DOCTYPE html>
<html>
	<head>
		<script type="text/javascript" src="modules/scatter-js-2.5.1/dist/scatter.min.js"></script>
		<script type="text/javascript" src="modules/web3.js/dist/web3.min.js"></script>
		<script>
				//Connecting to Scatter
				console.log("Setting up blockchain configuration variables");
				const Blockchains = {
						Ethereum: {
						blockchain: "ethO",
						host: "1.1.1.1",
						port: 8545,
						protocol: "https",
						chainId: "1"
					},
						CyberMiles: {
						blockchain: "cmt",
						//host: "172.17.0.2",
						host: "127.0.0.1",
						port: 8545,
						protocol: "http",
						//rpccorsdomain: "*",
						chainId: "19"
					}
				};
				//Setting network to a CyberMiles Testnet full node
				network = Blockchains.CyberMiles;
				//Output the network config to console
				console.log(network);

				scatter.connect("c2").then(function(connected){
		    		if(!connected) {
		        		// User does not have Scatter Desktop or Classic installed. 
		        		console.log("User does not have Scatter installed.");
		        		return false;
		    		} 
			    		console.log("Scatter IS connected");
				        this.scatter = scatter;
				        window.scatter = null;
				});

				function getBlock48(){
					const protocol = 'http' || 'ws';
					console.log(protocol);
					const web3 = this.scatter.eth(network, Web3, protocol);
					web3.eth.getBlock(48, function(error, result){
						if(!error)
							console.log(JSON.stringify(result));
						else
							console.error(error);
					})
				}
				
				function transferFunds() {
					//Set protocol
					const protocol = 'http' || 'ws';
					console.log(protocol);
					const web3 = this.scatter.eth(network, Web3, protocol);
					//Fire off a transaction (sends funds from a Scatter created key pair to a CyberMiles Testnet created key pair)
					//Getting the following error 
					//Uncaught Error: Web3ProviderEngine does not support synchronous requests.
					amount = web3.toWei(100, 'ether');
					web3.eth.sendTransaction({from:"0x357130c0ae600be06cd8d6f22d3ac8383078f78c",to:"0xc315cc572e9c9be6630d899fd3b6122b36eab253",value: amount});
				}
				
			// Background of this file's purpose can be found at https://github.com/CyberMiles/tim-research/blob/master/scatter_integration/scatter_integration.md
		</script>
	</head>
	<body>
		<h1>Check the console output</h1>

		<button type="button" id="cmtGetBlock" onclick='getBlock48()'>Get 48th block</button>
		<button type="button" id="cmtButton" onclick='transferFunds()'>Transfer Funds</button>

	</body>	
</html>


```
## Transfer of funds
The above code (minus the transferFunds function) connects to Scatter and makes the scatter object available. 

Once the page has loaded, clicking on the "Transfer Funds" button will execute the transfer of funds (on the Travis Tesnet via Scatter). 

## Issues to be resolved
At present, there are two issues which prevent the transfering of the funds (as shown in the transferFunds function). These are as follows.

### CORS & same-origin policy issue
#### UPDATE issue fixed 20180916
Fixed this by adding --rpccorsdomain="*" to the bottom of the ~/.travis/config/config.toml file
#### UPDATE END

Running the transferFunds function returns the following error, in relation to security restrictions of cross origin resource sharig (CORS).
```
Failed to load http://myTravisTestNet:8545/: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://127.0.0.1:8080' is therefore not allowed access.
```

Ethereum allows external applications to interact with Geth and the Ethereum network, as apposed to manually having to go through the Geth console. Some extra setup is required in relation to the --rpccorsdomain flag as per the information directly below this paragraph.

There is [official Ethereum documentation which relates to the rpccorsdomain](https://github.com/ethereum/go-ethereum/blob/master/README.md#programatically-interfacing-geth-nodes) setting

### Synchronous execution issue
#### UPDATE - issue fixed 20180916
Function can be re-written using the following Ethereum reference
https://github.com/ethereum/wiki/wiki/JavaScript-API#using-callbacks
This has been resolved for all functions except the transferFunds function, this is the next task
#### UPDATE END

Running the transferFunds function returns the following error

```
Web3ProviderEngine does not support synchronous requests.
```

This looks like an issue in relation to how the web3.eth.sendTransaction command is written inside the application (HTML/JS page). 

```
amount = web3.toWei(100, 'ether');				web3.eth.sendTransaction({from:"0x357130c0ae600be06cd8d6f22d3ac8383078f78c",to:"0xc315cc572e9c9be6630d899fd3b6122b36eab253",value: amount});
```
