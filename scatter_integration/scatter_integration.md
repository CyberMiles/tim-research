# Testing/developing Scatter and CyberMiles integration

## What is Scatter
[Scatter](https://github.com/GetScatter) is similar to MetaMask in that it allows you sign transactions securely locally on your machine. Scatter goes a couple of steps further by adding the following functionality over and above MetaMask.
Scatter:
- provides improved privacy by not just giving away information from your machine as you visit various applications
- includes a reputation system called RIDL which allows a user to give a +1 or a -1 to a blockchain application
- includes desktop version, browser plug-in version and also mobile version

The following instructions were performed in order to test CyberMiles with Scatter

## Step 1 - Get the CyberMiles Testnet up and runnning
```
docker pull ywonline/travis
cd
sudo rm -rf .travis
git clone https://github.com/CyberMiles/testnet.git
cd testnet/travis
git pull
```
Change the moniker value from local to something new, also make sure the chain id is 19 for tesnet
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
Check to see of the testnet is still syncing, you wont get any account (will not see any testnet tokens from the faucet until your node is synced)
```
cmt.syncing
```
//The following command will create a new account
```
personal.newAccount()
0x2bbf88c00e1133e3cacf88d4b5f2d9577018f1e7
```
//Run this again so that we have two accounts to play with 
```
personal.newAccount()
0xce570a2df884fae09f3c7e6ad2453b7d4eac2348
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
  to: "0x2bbf88c00e1133e3cacf88d4b5f2d9577018f1e7",
  transactionIndex: 0,
  v: "0x49",
  value: 1e+21
}
```
It is now time to check the balances of the two accounts which we created above. First we will unlock each account.
```
personal.unlockAccount("0x2bbf88c00e1133e3cacf88d4b5f2d9577018f1e7","PutPasswordHere")
true
personal.unlockAccount("0xce570a2df884fae09f3c7e6ad2453b7d4eac2348","PutPasswordHere")
true
```
Then we will check each balance
```
web3.fromWei(cmt.getBalance("0xce570a2df884fae09f3c7e6ad2453b7d4eac2348"), 'cmt');
1000
```
Notice how we are converting the denomination of token to a whole cmt unit (as apposed to using the smaller default denomination of wei.
```
web3.fromWei(cmt.getBalance("0x2bbf88c00e1133e3cacf88d4b5f2d9577018f1e7"), 'cmt');
1000
```
Now that we have two accounts on the CyberMiles Testnet, let us perform a test transfer from one account to the other.
```
cmt.sendTransaction({from:"0xce570a2df884fae09f3c7e6ad2453b7d4eac2348", to:"0x2bbf88c00e1133e3cacf88d4b5f2d9577018f1e7",value:999})
```
The above will return a transaction has like this "0x3bd0839327d0477fbe9d9a52190db8a73dc9d85d1d86bdc31ab382f83962466f". 
Again, we can go and check this transaction on the blockchain using the following command syntax.
```
cmt.getTransaction("0xInsertTheTransactionHashThatTheFaucetProvided")
```
For example, the following command returned the result below it.
```
cmt.getTransaction("0x3bd0839327d0477fbe9d9a52190db8a73dc9d85d1d86bdc31ab382f83962466f")

{
  blockHash: "0x65d8f0bf33db2934dd62565d0b0c1bd00bf23c9844bbc64bd3fa3909c4b09d85",
  blockNumber: 105753,
  from: "0xce570a2df884fae09f3c7e6ad2453b7d4eac2348",
  gas: 90000,
  gasPrice: 2000000000,
  hash: "0x3bd0839327d0477fbe9d9a52190db8a73dc9d85d1d86bdc31ab382f83962466f",
  input: "0x",
  nonce: 0,
  r: "0x3dc9f21eb3f6fd25990f731cd0f0461c3e00ba889df17f7f453f19fdc1fd7fff",
  s: "0x7978710ebb59daea43d32c5584155f0f2368471b2b9fe3fc65a4ae00757c8364",
  to: "0x2bbf88c00e1133e3cacf88d4b5f2d9577018f1e7",
  transactionIndex: 0,
  v: "0x4a",
  value: 999
}
```



