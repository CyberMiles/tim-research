# Distributed Ledger Information Sharing (DLISh)

![DLISh architecture](https://github.com/CyberMiles/tim-research/blob/master/distributed_ledger_information_sharing_DLISh/images/dlish_architecture.png)

## Overall architecture
This specific GitHub repository deals with the encoding and decoding of information. The diagram above shows a simplified overview of how NuCypher's pyUmbral and blockchain software can be used to complete the secure information sharing process.

DLISh aims to facilitate the storage and sharing of small to medium amounts of information on, and between, blockchains.

## Background
Decentralized systems are inherently bad at storing and sharing data. This is due, in part, to the fact that all parties (full nodes who run the base layer protocol of the blockchain software) store a redundant copy of all data. It has been proven that blockchain size in practice can exceed 150GB in a matter of years. To put this number into perspective, we are reminded that some of the latest mobile devices have only between 32 and 128 GB of **total** storage.

## The current situation
Blockchain systems send small to medium amounts of information inside transactions and smart contracts. 

Whilst compression programs exist for documents, they are not at all useful in this space. For example using zip or tar to compress a customers name, address, post code and phone number would result in a bigger file than the original.

[Compression Example](https://github.com/CyberMiles/tim-research/blob/master/distributed_ledger_information_sharing_DLISh/images/compress_example.png)

Whilst decentralized storage protocols exist, they require that a large reference key/URL be stored on the blockchain. Decentralized off-chain storage (which is married to the blockchain) is brilliant. These advances will succeed in storing large files such as digital media, documents and so forth.

What about the cases where a p2p e-commerce system wants to make a customer's delivery address available to a delivery company? The address is too long to be stored in plain text on the blockchain. A zip of the data will be bigger than the original text. The blockchain reference key/URL used in a decentralized storage system will also be greater than the plain text.

So how do we take the first step of compressing/encoding small to medium chunks of data?

Imagine a completely decentralized e-commerce ecosystem where all buyers, sellers, merchants, delivery services and so forth are registered and interacting in real time using handheld mobile devices. The sorts of information changing hands would include product Id's, product names, product prices, first names, last names, addresses, phone numbers, post codes, transactions and more.

Fortunately languages are all very repetative and traditional storage of data holds an incredible amount of redundancy (per item). For example, 9, 600 roads in North America alone are named "park" i.e. Park Rd. Many of us share first names or last names with others globally and so on. With this in mind, it should never be the case that a single word is stored in more than one place on the blockchain. 

## How DLISh works
DLISh takes the entire corpus of data (including metadata) from an organisation and appends each distinct word to a master list of unique corresponding keys. For example DLISh will turn the following 15 words (**102** characters)

```

John Reginald Smith
Sixty Eight Cunningham Street
Southern Cross Junction
Sydney
New South Wales
Australia

```

into (**56** characters). DLISh strives for ~2:1 compression

```

aa01aa02aa03aa04aa05aa06aa07aa08aa09aa10aa11aa12aa13aa14aa15

```

Once encoded/compressed, the DLISh string can then be encrypted and shared between users on one or more blockchains. See resources on encryption [2] and internet of blockchains [1] at the end of this document.


```

[1] https://cosmos.network/
[2] https://github.com/nucypher/pyUmbral
[3] https://github.com/google/leveldb
[4] https://github.com/facebook/rocksdb

```


