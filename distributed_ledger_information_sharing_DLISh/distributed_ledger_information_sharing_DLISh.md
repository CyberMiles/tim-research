# Distributed Ledger Information Sharing (DLISh)

![DLISh architecture](https://github.com/CyberMiles/tim-research/blob/master/distributed_ledger_information_sharing_DLISh/images/dlish_architecture.png)

## Overall architecture
This specific GitHub repository deals with the encoding and decoding of information. The diagram above shows a simplified overview of how NuCypher's pyUmbral and blockchain software can be used to complete the secure information sharing process.

DLISh aims to facilitate the storage and sharing of small to medium amounts of information on, and between, blockchains.

## Background
Decentralized systems are inherently bad at storing and sharing data. This is due, in part, to the fact that all parties (full nodes who run the base layer protocol of the blockchain software) store a redundant copy of all data. It has been proven that blockchain size in practice can exceed 150GB in a matter of years. To put this number into perspective, we are reminded that some of the latest mobile devices have only between 32 and 128 GB of **total** storage.

## The current situation
Blockchain systems send small to medium amounts of information inside transactions and smart contracts. 

Whilst **compression programs** exist for large data sets as well as documents, they are not at all useful in this space. For example using zip or tar to compress a customers name, address, post code and phone number would result in a bigger file than the original.

Note:Original text is smaller than compressed versions

![Compression Example](https://github.com/CyberMiles/tim-research/blob/master/distributed_ledger_information_sharing_DLISh/images/compress_example.png)

Whilst **decentralized storage protocols** exist, they require that a large reference key/URL (potentially larger than the DLISh encoding) is stored on the blockchain. 

![Swarm URL](https://github.com/CyberMiles/tim-research/blob/master/distributed_ledger_information_sharing_DLISh/images/url.png)

In addition storage on these systems is not free. Decentralized off-chain storage systems are brilliant and these advances will succeed in storing medium and larger amounts of data even digital media, pdf documents and so forth.

But what about **small data compression** in cases such as p2p e-commerce system which need to commission home deliveries via third-party delivery services and so forth? The details of a p2p e-commerce blockchain implementation need to be recorded on the blockchain. However, a customer address is too long to be stored in plain text on the blockchain. A zip of the data will be bigger than the original text. The blockchain reference key/URL used in a decentralized storage system (which may charge for storage) may also be greater than what DLISh can compress.

So how do we take the first step of compressing/encoding small to medium chunks of data?

Fortunately languages are all very repetative and traditional storage of data holds an incredible amount of redundancy (per item). For example, 9, 600 roads in North America alone are named "park" i.e. Park Rd. Many of us share first names or last names with others globally and so on. With this in mind, it should never be the case that a single word is stored in more than one place on the blockchain. Further, there are only about 1/2 million popular english words. Most of these words are longer than a few characters and can therefore be compressed using 4 character unique keys.

## How DLISh works
DLISh takes the entire corpus of data (including metadata) from an organisation and appends each set of unique/distinct characters (which are separated by a space) to a master list. In the list, each distinct set of characters is assigned a unique 4 character key. 

For example DLISh will turn the following 15 set of characters (**102** individual characters)

```

John Reginald Smith
Sixty Eight Cunningham Street
Southern Cross Junction
Sydney
New South Wales
Australia

```

into (**56** characters). **always hopeful for an average of ~2:1 compression**

```

aa01aa02aa03aa04aa05aa06aa07aa08aa09aa10aa11aa12aa13aa14aa15

```

Another example could be using product (snack food) names.

```

Super Crunchies
Smith's Crisps
The Smith's Snackfood Company
Tayto Fusion
Tudor Crisps
Twiglets
Twisties
Tyrrells
Tyrrells Apple Chips
Walkers Crisps
Walkers Cheese Heads
Walkers Lites
Walkers Potato Heads
Walkers Sensations
Walkers Shots
Whale Bones
Wheat Crunchies
Wickers
Wigwams
Wise Foods

```

Whilst the above 274 characters can be compressed to just 160 (using 4 character key assignment). One of the main advantages of creating a master list from a companies corpora of information is that **full length words will never be stored in plain text more than once**. As you can see from the above example the word Walkers appears 6 times in that short list. Now imagine an online market place which ships 3 million products per year and uses the word "Australia" on each consignment note. Compression of this one word will result in a saving of 30 million characters (stored on the blockchain) per year i.e. (Australia.length() * 3000000) - (au01.length() * 3000000))

## Available keys

It was hoped that further to using 4 character keys, additional compression (which could collapse duplicates i.e. aa22 -> a2) could take place. Unfortunately for that extra compression to exist the encoded data need to specify the start of a key. As it turns out when creating rules such as a key must start with 2 letters the potentially available keys (using 4 characters) is reduced to just 270 400 possibilities i.e. aa01 to ZZ99.

If sticking to the rule that each key is 4 characters long (no additional compression), the amount of permutations exceeds 6 million (6 196 528). [A Python file](https://github.com/CyberMiles/tim-research/blob/master/distributed_ledger_information_sharing_DLISh/python/key_generation_testing.py) has been created so that you can try this our for yourself.


```

[1] https://cosmos.network/
[2] https://github.com/nucypher/pyUmbral

```
