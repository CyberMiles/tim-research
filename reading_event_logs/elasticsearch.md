# The world’s blockchain data

Our world has numerous production blockchain networks which are transacting real-value in real-time. Examples of these exciting projects include [Bitcoin](https://bitcoin.org/en/), [Ethereum](https://ethereum.org/) and [CyberMiles](https://www.cybermiles.io/en-us/).

CyberMiles is a public e-commerce blockchain which supports a global community of buyers and sellers. The CyberMiles mainnet was launched in October 2018 and since then the global CyberMiles community have been invited to create and deploy their own smart contracts and decentralized blockchain applications (DApps) on the CyberMiles blockchain.

As we will discover shortly, smart contracts and DApps generate a lot of immutable blockchain data. Unsurprisingly, the volume of this data is set to increase, as Information Technology (IT) infrastructure moves away from a traditional centralized model, and towards new and emerging decentralised blockchain architectures.

A [new wave of blockchain data](https://medium.com/cybermiles/the-next-wave-in-blockchain-data-36e45bab246) is rising and, right now, there are big opportunities for holistic off-chain search and analytics engines such as Elasticsearch to thrive in the blockchain space. Specifically, in the areas of blockchain data-harvesting, data-interpretation, machine-learning and data-visualization.

This is extremely exciting but as we will soon discover, there is a minor challenge to overcome before Elasticsearch can provide all of the aforementioned benefits to existing blockchain smart contracts and DApps.

# Background

## Decentralisation

Blockchain networks do not have a central authority. Instead, they are decentralized.

![decentralisation diagram](./images/decentralized.jpeg)

(Aleixmateuc[CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0)],from Wikimedia Commons)

All individual nodes in a decentralized blockchain network are equal. Every individual node in a blockchain runs the exact same software, and in addition, stores the exact same data.

## Data

As an individual blockchain grows, each node is expected to store the entire history of the blockchain. To put this into perspective, a new Bitcoin Core node needs to perform a one-time download of about 210GB (known as syncing) and from that point onwards, must sustain a further storage overhead of approximately 5-10GB per month [1].

## Mobile first

The aforementioned data requirement of a full node obviously make it impractical for smaller devices like mobile phones and handheld devices to participate as equal nodes in a given blockchain network. 

Smartphones and tablets overtook traditional desktop Personal Computers (PCs), in terms of web traffic, for the first time in mid 2016 [2]. Given the affinity between unstructured p2p networks and decentralized blockchain architectures, it seems obvious that the current and ongoing domination of smaller personal devices in the e-commerce space is inevitable.

So how can these smaller devices interact with the blockchain? Interestingly the only real prerequisite to “spending” on a blockchain network is possessing a key that can sign a transaction [3]. Nowadays, end-users can access a variety of lightweight wallet solutions, which not only store and protect end-users private keys but make it possible for these users to broadcast transaction to the blockchain network. Whilst, these [hardware wallets](https://trezor.io/), [browser extensions](https://chrome.google.com/webstore/detail/metamask-for-cmt/hmiddckbbijmdkamphkgkelnjjdkicck) and [desktop applications](https://get-scatter.com/) provide a mechanism to manage externally owned accounts (EOAs) and broadcast transactions to the blockchain, they essentially only allow end-users to transact value. 

## Scanning the blockchain

It seems obvious that an end user would need to know, at the very least, how much they can spend in a given transaction. This introduces the notion of additional software applications that can provide insights into underlying blockchain data. One excellent example of such software is the original Bitcoin Core Wallet.

![Bitcoin Core Wallet](./images/bitcoin_core_wallet.png)

You may be surprised to learn that the Bitcoin blockchain does not actually store an end-user’s account balance. “The concept of a balance is created by the wallet application. The wallet calculates the user’s balance by scanning the blockchain and aggregating the value of any UTXO the wallet can spend with the keys it controls”[3]. This is the simplest example of how an application can augment a blockchain network.

## Smart contracts
Smart contracts and DApps take blockchain functionality to the next level, providing functionality far beyond merely transferring value. At present, and it is only early days, there are DApps which allow end-users to [create token exchanges](https://www.stateofthedapps.com/dapps/uniswap), [trade prediction markets](https://www.stateofthedapps.com/dapps/augur), [contribute to a blockchain encyclopedia](https://www.stateofthedapps.com/dapps/everipedia), play [Texas Hold’em poker](https://www.stateofthedapps.com/dapps/pokerking-texas-holdem) and even [collect and breed digital cats](https://www.stateofthedapps.com/dapps/cryptokitties). Smart contracts can generate a variety of data types including strings, booleans, integers and more. Let’s take a look at how a smart contract declares and then emits event log data.

## Event log data
The following is a list of event logs which are declared in one of the Uniswap Exchange Protocol’s smart contracts. 

```
TokenPurchase: event({buyer: indexed(address), eth_sold: indexed(uint256(wei)), tokens_bought: indexed(uint256)})
EthPurchase: event({buyer: indexed(address), tokens_sold: indexed(uint256), eth_bought: indexed(uint256(wei))})
AddLiquidity: event({provider: indexed(address), eth_amount: indexed(uint256(wei)), token_amount: indexed(uint256)})
RemoveLiquidity: event({provider: indexed(address), eth_amount: indexed(uint256(wei)), token_amount: indexed(uint256)})
Transfer: event({_from: indexed(address), _to: indexed(address), _value: uint256})
Approval: event({_owner: indexed(address), _spender: indexed(address), _value: uint256})
```

Users interact with the [Uniswap smart contract code](https://github.com/Uniswap/contracts-vyper/blob/master/contracts/uniswap_exchange.vy), pictured above, by clicking buttons inside [Uniswap’s frontend DApp](https://github.com/Uniswap/uniswap-frontend), pictured below.

![Uniswap DApp](./images/uniswap_cmt_screenshot%20(1).png)

Each of a smart contract’s functions can write one or more event logs to the blockchain. In this case, the [TokenPurchase](https://github.com/Uniswap/contracts-vyper/blob/c10c08d81d6114f694baa8bd32f555a40f6264da/contracts/uniswap_exchange.vy#L133) event is emitted.

This DApp which only 3 months old, at the time of writing, has approximately 130 daily active users, who perform almost 400 daily trades which results in a monthly turnover of approximately USD$1.5 Million [4]. 

As one could imagine, being able to access all of the event log data for this DApp would be incredibly useful. Taking it a step further being able to access monitoring, alerting, reporting, graph exploration and machine learning features would be invaluable. This is where Elasticsearch comes in!

## Elasticsearch

Harvesting blockchain data using Elasticsearch is trivial. Bulk objects can be created programmatically, thanks to the consistency of the blockchain data. Here is an example of how we upload blockchain event logs using the Elasticsearch client’s bulk upload feature.

```
async function writeTheEventCollectionToElasticsearch(theEventCollection, eventName) {
    console.log("Found theEventCollection = " + theEventCollection.length);
    if (theEventCollection.length > 0) {
        var bulkData = {};
        var theBodyArray = [];
        theEventCollection.forEach(function(obj) {
            eventHash = web3.utils.sha3(obj.transactionHash, obj.logIndex);
            theId = {};
            actionDescription = {};
            theId["_id"] = eventHash;
            theId["_type"] = "event";
            theId["_index"] = 'events';
            actionDescription["index"] = theId;
            theBodyArray.push(actionDescription);
            theDocumentToIndex = {};
            theDocumentToIndex["name"] = eventName;
            theDocumentToIndex["jsonEventObject"] = obj;
            theBodyArray.push(theDocumentToIndex);
        });
        if (theBodyArray.length > 0) {
            bulkData["body"] = theBodyArray;
            console.log("Adding the following data to the events")
            console.log(JSON.stringify(bulkData));
            bulkIngest(bulkData);
        }
    }
}

function bulkIngest(bulkData) {
    client.bulk(bulkData, function(error, response) {
        if (error) {
            console.error(error);
            return;
        } else {
            console.log(response);
        }
    });

}

```

# References

[1] https://bitcoincore.org/en/download/

[2] https://www.theguardian.com/technology/2016/nov/02/mobile-web-browsing-desktop-smartphones-tablets

[3] Antonopoulos, A. (2017). Mastering Bitcoin. 2nd ed. O’Reilly Media, Inc.

[4] https://www.stateofthedapps.com/dapps/uniswap


