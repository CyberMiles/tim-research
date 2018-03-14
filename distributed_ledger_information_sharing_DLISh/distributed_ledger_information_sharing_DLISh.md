# Distributed Ledger Information Sharing (DLISh)

![DLISh architecture](https://github.com/CyberMiles/tim-research/blob/master/distributed_ledger_information_sharing_DLISh/images/dlish_architecture.png)

**UPDATE START 2018-03-13**

**Please read this first**

We can by pass all of the work previously suggested by simply creating the master file using explicit combinations of alphumeric characters (both upper case and lower case letters as well as double digit numbers starting at 01) in the following order 

```

letter, letter, number, number i.e. aa01, aa02 ... yz99, ... ZZ99

```
This way every word can be reduced to 4 characters. 

Further compression can be facilitated by compressing double characters to single characters.

```
aa11 becomes a1 or ab44 becomes ab4

```

This will work on the premis that the first occurrence of a letter like a or A is the start of a new cycle.

**UPDATE END**


## Overall architecture
This specific GitHub repository deals with the encoding and decoding of information. The diagram above shows a simplified overview of how NuCypher's pyUmbral and blockchain software can be used to complete the secure information sharing process.

## Diving into DLISh
DLISh is a ground level system which facilitates the storage and sharing of information on, and between, blockchains.

For example, DLISh will turn (72 characters)

```

John Smith
Sixty Cunningham Street
Southern Cross Junction
Sydney
Australia

```

into (28 characters)

```

a2a12b24b92a3a13b23a43a23b52

```

Once encoded, the DLISh string can be encrypted and stored or shared between users on one or more blockchains. The encryption [2] and internet of blockchains [1] is out of scope for this GitHub repository.

## Background
Decentralized systems are inherently bad at storing and sharing data. This is due, in part, to the fact that all parties store a redundant copy of all data. DLISh seeks to solve this problem. DLISh is a storage and communication system for decentralized ledger applications i.e. blockchains.

## Storage format
All data is exclusively UTF-8. The system comprises of a master list of key value pairs. The values are groups of letters (words) only. The keys are 4 UTF-8 characters (letter, letter, number, number); in that order. The keys are further compressed by removing any duplicates which exist between the character and its nearest (single neighbor). Monetary numbers for use in e-commerce settings are spelled out explicitly. For example one thousand and twenty six dollars and fourteen cents. All of the relevant words associated with storing numbers and currency etc. are stored in the master list of words i.e. hundred, thousand, million ... seventy, eighty, ninety etc.

Just as in traditional situations, an application should have data validation for every data entry field. Further, it is the job of the application to correctly read, write and provide display formatting. 

## Premis
Some say that the blockchain can be considered a world computer (which has promised to decentralize everything). A world computer needs to store the world's data. In the case of decentralization there is no single "server" to store the data for reference. Instead, in a decentralized architecture, all of the data must be stored only on the peers (which make up the peer to peer network). Simply mirroring the data (verbosely) as traditionally done in blockchains is not sustainable. For example, the bitcoin blockchain is over 150GB < https://blockchain.info/charts/blocks-size >. This means that each participating full node has to download and store more than 150GB of data to participate. As time goes on, blockchains will continue to grow. It is important to note that less users are using desktop PCs and servers and more users are using hand-held mobile devices. Mobile devices have limited storage. Some of the latest mobile devices have only between 32 and 128 GB of **total** storage.

Imagine a completely decentralized e-commerce ecosystem where all buyers, sellers, merchants, delivery services and so forth are registered and interacting in real time using handheld mobile devices. The sorts of information changing hands would include product Id's, product names, product prices, first names, last names, addresses, phone numbers, post codes, transactions and more.

Fortunately languages are all very repetative and traditional storage of data holds an incredible amount of redundancy (per item). For example, 9, 600 roads in North America alone are named "park" i.e. Park Rd. Many of us share first names or last names with others globally and so on. With this in mind, it should never be the case that a single word is stored in more than one place on the blockchain. To achieve this we create and store a master list of words for reference within each peer node of a blockchain. You might be surprized to learn that **a text file containing over 1/2 million words only consumes around 5MB**. That's 0.005 of a GB. 

Put simply, a master file containing over 1/2 million words **takes up 30 thousand times less space** (storage on computer hard drive) than the bitcoin blockchain.

If the encoded and encrypted address used at the start of this document is stored **5 million** times on the blockchain it will take up less than 1GB (156bytes x 5, 000 000 = 0.78GB)

## How DLISh works
DLISh takes the entire corpus of data (including metadata) from an organisation and adds/appends the data to a master list of unique/distinct individual words. Each word is mapped to a 4 character code (letter letter number number) i.e. aa01, aA01, Aa01, AA01 through to zz99, zZ99, Zz99, ZZ99. An additional round of compression occurs such that ZZ99 becomes Z9 or yD22 becomes yD2. A letter character, following a number character signals the start of a new encoded word.

If possible, all two letter words could be assigned to these keys with nearest neighbour compression (at the outset) so that in every instance a key would be either the same size as the word, or as in most cases considerably smaller. For example

a1 <- in

c1 <- by

d2 <- is 

ab23 <- australian

ab24 <- marketplaces

fj12 <- purchased

cv12 <- frequently

The partial product description phrase, "... **is** frequently purchased **in** australian marketplaces **by** ..."

Would be compressed to 

d2cv12fj12a1ab23ab24c1

Even with this very high frequency of 2 letter words. The above example phrase can be reduced from 53 characters (including whitespace) to 22 encoded characters. In this semmingly worst case scenario, that's over a 58% percent reduction.


## The algorithms

Initially, it was thought that the words could be encoded and compressed using advanced techniques. However, after commencing this work it became obvious that ultimately all words would hold a unique 4 digit key. It was decided that computation/work was not necessary. Each word can quickly and easily be mapped to an individual key (next in line). 

If we were to store and/or transmit a users full name and address our application would do so by performing the following steps:
- allow the user to enter data using the app
- validate and cleanse the data
- obtain the relevant 4 character key from the master list or append any new words to the end of the master list and obtain the newly created key
- perform additional compression (remove duplicates i.e. aa00 becomes a0)

```

John Smith
Sixty Cunningham Street
Southern Cross Junction
Sydney
Australia

```

Could become

```

a2a12b24b92a3a13b23a43a23b52

```


The above uncompressed text has 72 characters if you include the space character where appropriate. The fact that DLISh can encode the above into 28 UFT-8 characters is not the whole point. Of course sending a transaction with a 61% reduction is size is great. However the value of DLISh is also realized in that whenever a word like australia is recorded anywhere on the blockchain. It will only ever take up the space of 3 UTF-8 characters instead of 9. In a real world use case, it is very likely that an Australian e-commerce blockchain implementation would record the text "Australia" thousands if not millions of times as part of its ongoing business activities (product names, product descriptions, customer addresses and so forth). Consider the word "Australia" used for every delivery address for every online purchase in a company that ships 3 million purchases per year. 

## Formatting
At this early stage the default formatting may capitalize all words and allow for a special character to trigger lower case. There are opportunities in relation to formatting which have not been addressed yet. It is hoped that we could also have a default single space between words and allow for a special character to remove the space or replace the space with a hyphen etc. It is hoped that other formatting like $ signs will be implemented at each end of the data exchange (defined by what the application is trying to do). Just a point to remember DLISh only uses a-z and A-Z as we as 0-9 of the UTF-8 character set and therefore there are a range of special characters which could be implemented as part of the formatting solution.

### Atomic transactions
Firstly, information passing is request driven. A good analogy for this would be how we use the Internet. A user requests content and the content is delivered. To take this a step further, in this system it is mandatory for the receiver/requester to firstly decode the information and then immediately provide acknowledgement that the information is sound. If this does not occur no part of the transaction is recorded permanently. Put simply, the transaction is either completely successful in real-time (changing the blockchain state) or it is completely discarded on both ends. Hence the terminology "atomic".

### A brief example - a helicopter view
A delivery driver's mobile application requests the delivery address for an item (the prior steps in the supply chain which led to this point are also all request driven and more examples of this can be provided. However for simplicity sake, let's stick to just the delivery of an item for now). The delivery address is encoded and encrypted by the senders mobile application. The encrypted data is sent to the delivery driver's mobile application where it is unencrypted and decoded for immediate use. This successful transaction is recorded in the blockchain. 

### Encryption
Whilst the encoding and decoding is trivial (at the base layer of the application) the encryption is a bit more complicated. This is due to the fact that a user should never be asked to share their secret keys. The information being passed through the public blockchain must be encrypted after encoding (on the senders end) and decrypted before decoding can take place on the receiving end. 

### Implementation
Blockchain technologies (Cosmos Zones) [1] now offer consistently fast finality and as such proxy re-encryption could be performed in a peer to peer environment by sending the necessary (lightweight) data in blockchain transaction (Tx) wrapped messages (Msg). NuCyphers pyUmbral [2] facilitates proxy re-encryption whereby a user can share their encrypted data with a genuine recipient (user) without revealing their private key. As part of the decentralized encryption/decryption process, the pyUmbral system creates a capsule which can be modified by a third untrusted party (who never sees the data) in readiness for the genuine recipient to decrypt the data as intended. The pyUmbral component of this implementation has been tested in a closed environment and was successful. The execution of a transaction between 2 blockchains (using the Cosmos network) has not been tested as yet. The encoding/decoding as described above will need to be coded. The key value containers could be constructed using either Google's LevelDB [3] or Facebook's RocksDB [4].


```

[1] https://cosmos.network/
[2] https://github.com/nucypher/pyUmbral
[3] https://github.com/google/leveldb
[4] https://github.com/facebook/rocksdb

```


