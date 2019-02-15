# The world’s blockchain data

There are numerous production blockchain networks which are transacting real-value. Examples of these exciting projects include [Bitcoin](https://bitcoin.org/en/), [Ethereum](https://ethereum.org/) and [CyberMiles](https://www.cybermiles.io/en-us/).

CyberMiles is a public e-commerce blockchain which supports a global community of buyers and sellers. The CyberMiles mainnet was launched in October 2018 and since then the global CyberMiles community have been invited to create and deploy their own smart contracts and decentralized blockchain applications (DApps), on the CyberMiles blockchain.

As we will discover shortly, smart contracts and DApps generate a lot of immutable blockchain data. Unsurprisingly, the volume of this data is set to increase, as Information Technology (IT) infrastructure moves away from traditional centralized models, and towards the new and emerging decentralised blockchain architectures.

A [new wave of blockchain data](https://medium.com/cybermiles/the-next-wave-in-blockchain-data-36e45bab246) is rising and, right now, there are big opportunities for holistic off-chain search and analytics engines such as Elasticsearch to thrive in the blockchain space. Products, like Elasticsearch, which can assist in the areas of blockchain data-harvesting, data-interpretation, machine-learning and data-visualization will play a vital role in acheving the grand vision of the serverless internet and the decentralised web. 

In this article we will demonstrate how Elasticsearch can effortlessly harvest and process blockchain data; providing the appropriate information to blockchain DApps, in real-time, and at scale. 

Our research and development concludes by revealing one single, yet essential, element of Elasticsearch which can be extended in order to accomplish impeccable blockchain interoperability.

# Background

## Decentralisation

Blockchain networks do not have a central authority. Instead, they are decentralized.

![decentralisation diagram](./images/decentralized.jpeg)

(Aleixmateuc[CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0)],from Wikimedia Commons)

All individual nodes in a decentralized blockchain network are equal. Every individual node in a blockchain runs the exact same software, and in addition, stores the exact same data.

## Data

As an individual blockchain grows, each node is expected to store the entire history of the blockchain. 

To put this into perspective, a new Bitcoin Core node needs to perform a one-time download of about 210GB (known as syncing) and from that point onwards, must sustain a further storage overhead of approximately 5-10GB per month [1].

## Mobile first

The aforementioned data requirement of a full node obviously make it impractical for smaller devices like mobile phones and handheld devices to participate as equal nodes in a given blockchain network. 

Smartphones and tablets overtook Personal Computers (PCs), in terms of web traffic, for the first time in mid 2016 [2] and have since then maintained unprecedented growth and adoption. Given the affinity between unstructured p2p networks and decentralized blockchain architectures, it seems obvious that the current and ongoing domination of mobile and handheld devices in the e-commerce space is inevitable.

![Mobile Phone User](https://github.com/CyberMiles/tim-research/blob/master/reading_event_logs/images/email-2056028_640.jpg)

Mobile blockchain DApps will rely heavily on indexing services which can provide trustworthy responses to DApp queries.

Having reliable information means that end-users will not just be blindly broadcasting transactions to the blockchain. The more information which can be provided to DApps the better.

Here is the simplest example of how a software application can provide insights into underlying blockchain data. Insights which are critical to the end-user's next move; in this case, transferring value on the Bitcoin network.

You may be surprised to learn that the Bitcoin blockchain does not actually store an end-user’s account balance. “The concept of a balance is created by the wallet application. The wallet calculates the user’s balance **by scanning the blockchain** and aggregating the value of any UTXO the wallet can spend with the keys it controls”[3]. Once the user is made aware of how much value they are in control of, they can go ahead and make decisions and execute transactions.

![Bitcoin Core Wallet](./images/bitcoin_core_wallet.png)

We have seen many advances in wallet applications in recent times. Nowadays, end-users can access a variety of lightweight wallet solutions, which come in the form of [hardware wallets](https://trezor.io/), [browser extensions](https://chrome.google.com/webstore/detail/metamask-for-cmt/hmiddckbbijmdkamphkgkelnjjdkicck) and [desktop applications](https://get-scatter.com/).

## Smart contracts
Smart contracts and DApps take blockchain functionality to the next level, this is where blockchain data gets very interesting. 

At present, and it is only early days, there are DApps which allow end-users to [create token exchanges](https://www.stateofthedapps.com/dapps/uniswap), [trade prediction markets](https://www.stateofthedapps.com/dapps/augur), [contribute to a blockchain encyclopedia](https://www.stateofthedapps.com/dapps/everipedia), play [Texas Hold’em poker](https://www.stateofthedapps.com/dapps/pokerking-texas-holdem) and even [collect and breed digital cats](https://www.stateofthedapps.com/dapps/cryptokitties). Smart contract developers are free to capture and store many different data types in accordance with their DApps operation. The most efficient (cheapest) way to record immutable data is to emit events to the blockchain's logs.

Let's take a look at how a smart contract developer declares an event inside their smart contract.

## Declaring events
The following is a list of events which have been declared in one of the Uniswap Exchange Protocol’s smart contracts. 

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

## Emitting events

Each of a smart contract’s functions can emit one or more of the smart contract's declared events. Let's take a look at how an event is emitted.

```
@private
def ethToTokenInput(eth_sold: uint256(wei), min_tokens: uint256, deadline: timestamp, buyer: address, recipient: address) -> uint256:
    assert deadline >= block.timestamp and (eth_sold > 0 and min_tokens > 0)
    token_reserve: uint256 = self.token.balanceOf(self)
    tokens_bought: uint256 = self.getInputPrice(as_unitless_number(eth_sold), as_unitless_number(self.balance - eth_sold), token_reserve)
    assert tokens_bought >= min_tokens
    assert self.token.transfer(recipient, tokens_bought)
    log.TokenPurchase(buyer, eth_sold, tokens_bought)
    return tokens_bought
```

As you can see, in the second last line of the ethToTokenInput function, this smart contract is emitting the TokenPurchase event. Specifically, writing the buyer's address, amount of eth_sold and the amount of tokens_bought.


## Reading events from the blockchain

Event logs can be read from the blockchain using pre-built libraries such as [web3js](https://github.com/CyberMiles/tim-research/blob/85b40f7bac1750db53f98344515baf833cb78d77/reading_event_logs/code/nodeJsHtml/app/server.js#L166) and [web3py](https://github.com/CyberMiles/tim-research/blob/85b40f7bac1750db53f98344515baf833cb78d77/reading_event_logs/code/python3/reading_ethereum_mainnet_event_logs.py#L25). 

The following is an example of a single blockchain event log object, called "TokenPurchase", which is ready for importing into Elasticsearch. You will notice that this event object is a valid JSON object.

```
{
    "_index": "uniswap_exchange_events",
    "_type": "event",
    "_id": "0x9bea54018a37303ae44a2024ce0e31249f25a7be30deebb6042a0c89ce1b4369",
    "_score": 1,
    "_source": {
        "name": "TokenPurchase",
        "jsonEventObject": {
            "address": "0xA2881A90Bf33F03E7a3f803765Cd2ED5c8928dFb",
            "blockHash": "0x480f5544d9b69bd7e691af3b7df710301f6fae1683b71a20b027d63f23182932",
            "blockNumber": 6899858,
            "logIndex": 16,
            "removed": false,
            "transactionHash": "0xc5511f1e30d2a4f9298810c842bd547c6d3bdf66501e4c891e1be7f643aa2b3b",
            "transactionIndex": 23,
            "id": "log_791f598c",
            "returnValues": {
                "buyer": "0x918453d249A22b6A8535c81e21F7530CD6Ab59F1",
                "eth_sold": "400000000000000000000",
                "tokens_bought": "11601187230900000000000"
            },
            "event": "TokenPurchase",
            "signature": "0xcd60aa75dea3072fbc07ae6d7d856b5dc5f4eee88854f5b4abf7b680ef8bc50f",
            "raw": {
                "data": "0x",
                "topics": [
                    "0xcd60aa75dea3072fbc07ae6d7d856b5dc5f4eee88854f5b4abf7b680ef8bc50f",
                    "0x000000000000000000000000918453d249a22b6a8535c81e21f7530cd6ab59f1",
                    "0x000000000000000000000000000000000000000000000000000aa87bee538000",
                    "0x000000000000000000000000000000000000000000000000000bc046a8dcfcd3"
                ]
            }
        }
    }
}
```
## Loading the event logs into Elasticsearch

Elasticsearch is a very well established and mature product. Harvesting blockchain data using Elasticsearch is trivial. Bulk event log objects can be created programmatically, thanks to the consistency of the blockchain data. Here is an example of how we upload blockchain event logs using the Elasticsearch client’s bulk upload feature.

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


Elasticsearch can autodetect data field types; a feature which is highly suitable to blockchain data. 

If you look closely, at the data which we read from the blockchain in the previous section called "Reading events from the blockchain" you will notice the nested "returnValues" object where the buyer, eth_sold and tokens_bought data is stored. You will notice that this is also valid JSON in itself. Perfectly formed key:value pairs, exactly what Elasticsearch loves.

```
{
	"buyer": "0x918453d249A22b6A8535c81e21F7530CD6Ab59F1",
	"eth_sold": "400000000000000000000",
	"tokens_bought": "11601187230900000000000"
}
```
## Elasticsearch data types

It is only at this depth and level of detail that we can see the incompatability between the blockchain's data and Elasticsearch's integer data types. The largest numerical data type available in Elasticsearch is "long". Long is a signed 64-bit integer with a minimum value of -2 ^ 63 and a maximum value of 2 ^ 63 -1. These upper and lower bounds can be represented as whole numbers like this -9,223,372,036,854,775,808 through to 9,223,372,036,854,775,807.

We mentioned just before that Elasticsearch is capable of autodetecting data types. What we discovered is that Elasticsearch indexes blockchain unsigned integers as strings. This is because the blockchain integer values can exceed the length of all available Elasticsearch integer types.

## Blockchain data types

"Ether is subdivided into smaller units, down to the smallest unit possible, which is named wei. One ether is 1 quintillion wei (1 * 1018 or 1,000,000,000,000,000,000)"[5]. Although DApps and wallet software may represent network tokens in a more human readable format the actual value is **always** represented internally as an unsigned integer value with 18 decimal places. For example, when you transact 1 unit, the transaction encodes 1000000000000000000 as the value which is stored in the blockchain. As another example, if you transact 400 units the transaction encodes 400000000000000000000; again, this is the actual value which is stored in the blockchain.

The largest integer which a blockchain stores is an unsigned integer uint256. An unsigned integer with a maximum value of 2 ^ 256 -1. This upper bound can be represented by the following while number 115792089237316195423570985008687907853269984665640564039457584007913129639935.

## The issue at hand

Essentially, [the issue](https://github.com/elastic/elasticsearch/issues/38242) is more of a feature request; one which will enable Elasticsearch to support blockchain data types. Without this feature being implemented it is not possible to perform logical operations on blockchain data. This is because, the all important integer values can only be stored as strings inside Elasticsearch. More specifically, these important numerical values which represent immense value to end-users, do not respond to basic arithmetic operators such as addition (+), subtraction (-) or comparison operators such as equal-to (=), greater-than (>), less-than (<) and so forth.

This is also an issue when using data visualization software such as Kibana. For example, we are unable to create filters based on basic arithmetic and comparison operators.

## Conclusion

Blockchain DApps can launch with, and sustain, explosive growth. In some cases turning over millions of dollars per month [4]. There are only a very limited amount of software applications which are designed to support the DApps of the future. [The Graph](https://thegraph.com/) is one such project, however it is specifically designed to only work with the Ethereum blockchain. [Demux](https://github.com/EOSIO/demux-js) is another project which is similar in operation (backend infrastructure for sourcing blockchain events), however Demux is also blockchain exclusive, built specifically for the EOS blockchain.

Elasticsearch is a flexible, fast and scalable solution which is strongly positioned to provide the ultimate data ecosystem for all blockchain DApps. Before we conclude it is important to note that blockchain data is completely open and public. This removes the need to implement any authentication and/or access control when creating a public facing software solution (API) for future DApp builders.

# References

[1] https://bitcoincore.org/en/download/

[2] https://www.theguardian.com/technology/2016/nov/02/mobile-web-browsing-desktop-smartphones-tablets

[3] Antonopoulos, A. (2017). Mastering Bitcoin. 2nd ed. O’Reilly Media, Inc.

[4] https://www.stateofthedapps.com/dapps/makerdao

[5] Antonopoulos, A. and Wood, G. (2018). Mastering Ethereum. 1st ed. O'Reilly Media, Incorporated, p.p 13.
