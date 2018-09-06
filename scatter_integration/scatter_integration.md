# Testing/developing Scatter and CyberMiles integration

## What is Scatter
[Scatter](https://github.com/GetScatter) is similar to MetaMask in that it allows you sign transactions securely locally on your machine. Scatter goes a couple of steps further by adding the following functionality over and above MetaMask.
Scatter:
- provides improved privacy by not just giving away information from your machine as you visit various applications
- includes a reputation system called RIDL which allows a user to give a +1 or a -1 to a blockchain application
- includes desktop version, browser plug-in version and also mobile version

The following instructions were performed in order to test CyberMiles with Scatter

## Step 1 - Get the CyberMiles Testnet up and runnning
Run the following commands in order to get a Docker instance of the CyberMiles Testnet running as quickly as possible
```
docker pull ywonline/travis
cd
sudo rm -rf .travis
git clone https://github.com/CyberMiles/testnet.git
cd testnet/travis
git pull
```
Open the config.toml file and change the moniker value from "local" to something new, also make sure the chain id is 19 (this value is found at the very bottom of the config.toml file). 19 is the chain id of the CyberMiles Testnet.
```
vi init/config/config.toml
```
Get Testnet ip
```
docker inspect -f '{{ .NetworkSettings.IPAddress }}' travis
```
Connect to Testnet command line tool
```
docker run --rm -it ywonline/travis attach http://172.17.0.2:8545
```

## Step 2 - Sync with the CyberMiles Testnet and fund some accounts

Check to see of the testnet is still syncing, you wont get any account (will not see any testnet tokens from the faucet until your node is synced)
```
cmt.syncing
```
//The following command will create a new account
```
personal.newAccount()
0x6d758d5d69af474c6d18b67f252ee39772960967
```
//Run this again so that we have two accounts to play with 
```
personal.newAccount()
0xc315cc572e9c9be6630d899fd3b6122b36eab253
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
personal.unlockAccount("0x6d758d5d69af474c6d18b67f252ee39772960967","PutPasswordHere")
true
personal.unlockAccount("0xc315cc572e9c9be6630d899fd3b6122b36eab253","PutPasswordHere")
true
```
Then we will check each balance
```
web3.fromWei(cmt.getBalance("0xc315cc572e9c9be6630d899fd3b6122b36eab253"), 'cmt');
1000
```
Notice how we are converting the denomination of token to a whole cmt unit (as apposed to using the smaller default denomination of wei.
```
web3.fromWei(cmt.getBalance("0x6d758d5d69af474c6d18b67f252ee39772960967"), 'cmt');
1000
```
Now that we have two accounts on the CyberMiles Testnet, let us perform a test transfer from one account to the other.

First, let's quickly create a variable to hold an amount of cmt (the following command converts 100 cmt to wie so that it can be accepted by the transaction).
```
amount = web3.toWei(100, 'cmt')
```
Now let's perform the transaction and pass in the amount variable which we just created. Notice how we also set the gas to zero. This is a CyberMiles specific feature; allows users to send legitimate transactions on the network at no cost.
```
cmt.sendTransaction({from:"0x6d758d5d69af474c6d18b67f252ee39772960967", to:"0xc315cc572e9c9be6630d899fd3b6122b36eab253", value:amount, gasPrice:0})
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
  from: "0x6d758d5d69af474c6d18b67f252ee39772960967",
  gas: 90000,
  gasPrice: 0,
  hash: "0x9881e8205f6114ae2a2a3ca038e655fd5883fd1a57729a6f7b58a07c3a0ade1d",
  input: "0x",
  nonce: 0,
  r: "0xa229e67a76dc204267a47782907d7e84f8de3990153dd1fb93c4184e6448908c",
  s: "0x547d185a780ef7f788bbdb9a908d0009f718baf831b5fc1a0878f5f070f49fda",
  to: "0xc315cc572e9c9be6630d899fd3b6122b36eab253",
  transactionIndex: 2,
  v: "0x49",
  value: 100000000000000000000
}
```
NOTICE: Notice how the value is in wie i.e. 100000000000000000000 wei is equal to 100 cmt.

If we check both account balances again, we will see that the 100 tokens have been transfered successfully.
web3.fromWei(cmt.getBalance("0xc315cc572e9c9be6630d899fd3b6122b36eab253"), 'cmt');
900
web3.fromWei(cmt.getBalance("0x6d758d5d69af474c6d18b67f252ee39772960967"), 'cmt');
1100

# Scatter

## Keys
This is where it gets interesting. In Ethereum, as part of the standard functionality, you are unable to export private keys. This is for safety reasons. There are other ways to retrieve private keys from the keystore file (offline) but these tools are beyond the scope of this document.

### Keys - Scatter can generate private key pair for you
Whilst Scatter allows you to put in your own private keys (for EOS and Ethereum). Scatter can also generate an Ethereum key pair for you. From this point onwards you are responsible for the private/public key pair (which you can download by clicking "copy" button in the Scatter software).

This is the key pair which Scatter created for me (via the Chrome extension). 
```
Private Key: 783a96d942c52dccaeac88dab556863d5f4c48ced6794270752a722d1cf5a87a 
Public Key: 0x357130c0ae600be06cd8d6f22d3ac8383078f78c
```
At present, this is a non existant Ethereum key pair as you can see from the Etherscan link below
```
https://etherscan.io/address/0x357130c0ae600be06cd8d6f22d3ac8383078f78c
```
### The state of the CyberMiles Testnet
At present the CyberMiles Testnet which I am working on via the Docker container has the following account state. The address of 0xc315cc572e9c9be6630d899fd3b6122b36eab253 has 1100 cmt tokens and the address of 0x6d758d5d69af474c6d18b67f252ee39772960967 has 900 cmt tokens.

### Key compatibility
Let's try and transfer 100 cmt tokens from our original address (which is currently holding 1100 cmt) to our newly generated address (which was created by allowing Scatter to generate a private/public key pair on our behalf).

First we unlock our account
```
personal.unlockAccount("0xc315cc572e9c9be6630d899fd3b6122b36eab253", "PutPasswordHere")
true
```
Then we create an amount variable (100 cmt) for our next transaction
```
amount = web3.toWei(100, 'cmt')
"100000000000000000000"
```
Then we transfer the funds
```
cmt.sendTransaction({from:"0xc315cc572e9c9be6630d899fd3b6122b36eab253", to:"0x357130c0ae600be06cd8d6f22d3ac8383078f78c", value:amount, gasPrice:0})

"0xb4e1bd41dff2001da2e70ffbeb84aca926e6e892e0f56aeade939e05a2f41ca3"
```
And finally, we check the transaction hash, which was returned by the sendTransaction function
```
cmt.getTransaction("0xb4e1bd41dff2001da2e70ffbeb84aca926e6e892e0f56aeade939e05a2f41ca3")
{
  blockHash: "0xeff76bf20a11b17591f592ed3244131d2e5ef907b8f035b54cf5e0ccffa445c9",
  blockNumber: 107167,
  from: "0xc315cc572e9c9be6630d899fd3b6122b36eab253",
  gas: 90000,
  gasPrice: 0,
  hash: "0xb4e1bd41dff2001da2e70ffbeb84aca926e6e892e0f56aeade939e05a2f41ca3",
  input: "0x",
  nonce: 0,
  r: "0xe1663950f0c8f2fcea026782aacd26c0cf57b6ea7ebf6986bf0c0c2f4f383a8d",
  s: "0x7baf4399a39373e744d1b71f41c27ec7b9543713d88278123acdf1eba1e79130",
  to: "0x357130c0ae600be06cd8d6f22d3ac8383078f78c",
  transactionIndex: 1,
  v: "0x49",
  value: 100000000000000000000
}
```
If we check the account balance of the from account, we will see that the 100 cmt has been moved on. There is only 1000 cmt in that account now. This is correct!
```
web3.fromWei(cmt.getBalance("0xc315cc572e9c9be6630d899fd3b6122b36eab253"), 'cmt')
1000
```
Believe it or not, we can even check the Scatter generated account on this testnet. We do not need the private keys to get the account balance of a public key on this blockchain. The following command, correctly returns the result of 100 cmt.
```
web3.fromWei(cmt.getBalance("0x357130c0ae600be06cd8d6f22d3ac8383078f78c"), 'cmt')
100
```
This confirms that the address space of Ethereum and CyberMiles are compatible with these addresses.

## Application
The following code is a the most simplistic of web applications. It is a prototype for research and development into Scatter / CyberMiles interoperability. I will be using nodejs (an open source server environment) for this web application. 

### Node.js Installation
I installed node.js from the following web site. I chose the latest version of node.js as it supports the import command (which Scatter uses).
```
https://nodejs.org/en/
```

The following file is a starting point to get Scatter connenting in the browser.

```
var http = require('http');
var dt = require('./myfirstmodule');
import ScatterJS from './scatter-js-2.5.1/dist/scatter.esm';

ScatterJS.scatter.connect('YOUR_APP_NAME').then(connected => {
    if(connected){
        this.scatter = ScatterJS.scatter;
        window.scatter = null;
    }
});

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Hello World!');
    res.write("The date and time are currently: " + dt.myDateTime());
    res.write(req.url);
    res.end();
}).listen(8080);


```


# Misc Info

## Accessing CyberMiles Testnet config, data and keystore, which are stored on local disk
Obviously I am running Docker here, so I want to browse the file system and locate the private keys which were created automatically in the previous steps. The following commands will provide access to the internal Docker container files system.

Firstly get the (CyberMiles Testnet) Docker container id (in our case 8d483d15eff2) by typing the following command
```
docker ps -q
```
Then run the following command which will launch a shell right inside the Docker container for you.
```
docker exec -it 8d483d15eff2 /bin/bash
```
If you change up and into the travis directory using the following command, you will have access to the keystore directory and more, for example
```
cd ../travis
ls
```
The above commands will return the following
```
config  data  geth.ipc  keystore  vm
```
### Installing a text editor inside the Docker instance
The CyberMiles Tesnet Docker instance is Ubuntu. The system does not have vim or emacs etc. I could use tail to access text inside files, however if I want to open files I will need to install a text editor in order to open and view the private keys of the accounts. This can be done as follows.
```
apt-get update
apt-get install vim
```





