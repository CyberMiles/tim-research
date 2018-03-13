# Distributed Ledger Information Sharing (DLISh)

![DLISh architecture](https://github.com/CyberMiles/tim-research/blob/master/distributed_ledger_information_sharing_DLISh/images/dlish_architecture.png)

**UPDATE 2018-03-13**
We can by pass all of the work by simply creating a master file which uses combinations of alphumeric characters in the following explicit order 

```

letter, letter, number, number i.e. aa01, aa02 ... zz99

```

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
All data is exclusively UTF-8. The system comprises of a master list of key value pairs. The values are groups of letters (words) only. The keys are numbers (sequentially allocated as values are added) only. All numbers for use in e-commerce setting are spelled out explicitly. For example one thousand and twenty six dollars and fourteen cents. All of the relevant words associated with storing numbers and currency etc. are stored in the master list of words i.e. hundred, thousand, million ... seventy, eighty, ninety etc.

## Premis
Some say that the blockchain can be considered a world computer (which has promised to decentralize everything). A world computer needs to store the world's data. In the case of decentralization there is no single "server" to store the data for reference. Instead, in a decentralized architecture, all of the data must be stored only on the peers (which make up the peer to peer network). Simply mirroring the data (verbosely) as traditionally done in blockchains is not sustainable. For example, the bitcoin blockchain is over 150GB < https://blockchain.info/charts/blocks-size >. This means that each participating full node has to download and store more than 150GB of data to participate. As time goes on, blockchains will continue to grow. It is important to note that less users are using desktop PCs and servers and more users are using hand-held mobile devices. Mobile devices have limited storage. Some of the latest mobile devices have only between 32 and 128 GB of **total** storage.

Imagine a completely decentralized e-commerce ecosystem where all buyers, sellers, merchants, delivery services and so forth are registered and interacting in real time using handheld mobile devices. The sorts of information changing hands would include product Id's, product names, product prices, first names, last names, addresses, phone numbers, post codes, transactions and more.

Fortunately languages are all very repetative and traditional storage of data holds an incredible amount of redundancy (per item). For example, 9, 600 roads in North America alone are named "park" i.e. Park Rd. Many of us share first names or last names with others globally and so on. With this in mind, it should never be the case that a single word is stored in more than one place on the blockchain. To achieve this we create and store a master list of words for reference within each peer node of a blockchain. You might be surprized to learn that **a text file containing over 1/2 million words only consumes around 5MB**. That's 0.005 of a GB. 

Put simply, a master file containing over 1/2 million words **takes up 30 thousand times less space** (storage on computer hard drive) than the bitcoin blockchain.

If the encoded and encrypted address used at the start of this document is stored **5 million** times on the blockchain it will take up less than 1GB (156bytes x 5, 000 000 = 0.78GB)

## How DLISh works
Imagine now, that each of the words stored in the master file can be compressed to 2 UTF-8 numbers. DLISh works by looking up a word, finding the corresponding numerical key, then performing a mathematical operation on that key in order to reduce the key to the size of 2 UTF-8 numerical characters.

## The algorithms

The algorithms in this system are all predefined. 

This is an open source project. If you would like to claim one of the 50 available algorithms, please add your information to the following file and create a pull request.

https://github.com/CyberMiles/tim-research/blob/master/distributed_ledger_information_sharing_DLISh/create_your_own_algorithm.md

As you will see in the above file, all of the algorithms are called using a single UTF-8 alphabetic character as the prefix i.e. a_encode, a_decode. The encoding algorithms have a qualifier which the number/key, to be encoded, must pass. Once qualified, the key is passed to the appropriate encoding algorithm. The encoding algorithm returns two single digit numbers. The first digit returned is the reduced number. The second number returned is a "helper" which can be passed to the decode function when decoding takes place. The "helper" is created dynamically by the encode function and is stored so that it can be later passed to the decode function as an argument. This way the decoding function can learn how many times the encoding function operated on the original number i.e. how many times the encoding function performed, say, the square root function on the number. 

Once encoded, DLISh allows for information to be encrypted and transmitted inside blockchain transactions. The encryption and decryption can be performed between two peers on the blockchain using proxy re-encryption. The proxy re-encryption component (provided by NuCypher [2]) has been successfully tested. It is hoped that the encoded and encrypted data can be sent across blockchains using the Cosmos [1] (internet of blockchains). That part is out of scope for this document. Please follow the links at the base of this document.

Now, let's consider the following hypothetical master list.

![master table](https://github.com/CyberMiles/tim-research/blob/master/distributed_ledger_information_sharing_DLISh/images/master_table.png)

If we were to store and/or transmit a users full name and address our application would do so by performing the following steps:
- allow the user to enter data using the app
- validate and cleanse the data
- obtain the relevant sequential numerical key from the master list or append any new words to the end of the master list and obtain the newly created key
- select the appropriate mathematical function to perform on the key (number to be encoded must pass a series of predefined tests such as is the number divisable by 10 and so forth)
- reveal the encoded string for storage and/or transmission


```

John Smith
Sixty Cunningham Street
Southern Cross Junction
Sydney
Australia

```

If we break this data up into individual keys we will have the following

```

100 (smith)
200 (john)
256 (cross)
625 (australia)
1000 (southern)
2000 (sydney)
3000 (street)
4000 (junction)
6561 (cunningham)
7000 (hundred)
65536 (sixty)
70000 (cents)
1048576 (dollars)
1048577	(thousand)

```

The above text has 72 characters if you include the space character where appropriate. 

The fact that DLISh can encode the above into 28 UFT-8 characters is not the whole point. Of course sending a transaction with a 61% reduction is size is great. However the value of DLISh is also realized in that whenever a word like australia is recorded anywhere on the blockchain. It will only ever take up the space of 3 UTF-8 characters instead of 9. In a real world use case, it is very likely that an Australian e-commerce blockchain implementation would record the text "Australia" thousands if not millions of times as part of its ongoing business activities (product names, product descriptions, customer addresses and so forth). Consider the word "Australia" used for every delivery address for every online purchase in a company that ships 3 million purchases per year. 

## The maths behind the algorithms
DLISh has the potential to store 52 different mathematical equations/algorithms which are capable of compressing the large numbers. Each mathematical equation is signaled through the use of a single UTF-8 letter such as "a" or "A". The letters range from the UTF-8 representation of (lower case) a through z as well as from (capital) A through Z (26 letters in the alphabet and therefore a total of 52 equation possibilities). The creator of an algorithm gets assigned a letter forever. 

This document only demonstrates two simple algorithms ("a" and "b"). The global software development community and global scholarly community can define many more algorithms (another 50 infact). Once an algorithm is perfected and tested it can be added to the base layer protocol permanently. The creator of the algorithm gets to create a new file which the system will use. The creator also gets the opportunity to describe how and why their algorithm works and also record their personal or organisational contact information. The creators can be individuals or even whole schools, colleges, businesses or companies.

## More on the algorithms
**The first 100 numbers 0 through 99 are not used for the initial encoding** 
It is not yet known if (when assigning keys to words) some numbers will be left out on purpose. We want it to be as easy as possible for the algorithms to reduce a key (number) to a single digit. It is feasible to skip difficult numbers. For example if there are say less than 2 million words in the master file it will make no difference to the key length if a word is assigned 1, 000 101 or 1, 514 101. Theoretically we can use numbers as high as 9, 999 999 and still stay under the 8 digit length.

All encoded data is represented by a single letter (the name of the function) and two numbers. The first number is the encoded value and the second number is an argument (a helper number which was created in the encode algorithm which can be passed to the decode algorithm). Each encoding algorith must take the key and reduce it to a single number i.e. take 65536 and reduce it to 2 (we just mentioned the helper number which in this case is 4). Each decoding algorithm must recreate the original key starting with the encoded value (the helper number is utilized as an argument to the decode function as you will see shortly).

Let's encode our hypothetical first and last name which have the values of 200 and 100 respectively. Remember these are just examples to demonstrate how encoding and decoding functions work. Obviously with some numbers there will be a degree of difficulty reducing the number to a single digit. But remember there are 52 different algorithm/function place-holders available and each one can have an additional single digit argument to help things along. It may also be the case that if some numbers are problematic/impossible to reduce, the system could be hard coded to be leave out those numbers when assigning key values.

### a
The first hypothetical function divides the number by 10 until the key is reduced to a single number. The qualifier for using the "a" algorithm might look something like this 
```
if numberToEncode.regexMatch(^[1-9]0+)

```

(where a number can start with any single digit (between 1 and 9) but must end in one or more trailing zero digits)

Let's encode!
```

#encode
counter = 0
function a_encode(numberToEncode)
    while numberToEncode.length() => 2
    counter = counter + 1
    numberToEncode = numberToEncode / 10
return [numberToEncode, counter]   

```

Below is an example of the decode

```
#decode
function a_encode(number, argument)
    for i in argument
        number = number * 10
    return number

```

The above algorithm "a" creates the following for the first and last name respectively; a22 a12. As you can see with the first name the function used was called "a" the reduced number was 2 (first operation was 200/10=20 then second operation was 20/10=2) and the amount of operations performed in the encoding was 2. Similarly with the last name the function used was "a" and the number was reduced to 1 by performing the divide by 10 operation 2 times (100/10=10 and then 10/10=1) hence the result of a12 

### b

Next we have 65536 which needs to be encoded. 
Let's encode!

```

#encode
function b_encode(numberToEncode)
    import math
    tempNumber = 0
    counter = 0
    while numberToEncode.length() > 1:
        counter = counter + 1
        tempNumber = math.findSquareRoot(numberToEncode)
        numberToEncode = tempNumber
    return [tempNumber, counter]  
     
```

The above code will return 24 (the square root function was performed four times and resulted in the single digit 2). As the above encoding function is labelled with "c" the complete encoding would be c24

```

#decode
function b_decode(number, multiplier)
    for i in multiplier:
        number = number * number
    return number
    
```

The above function b, when called with signature (2, 4) will return 65536 (the original number 2 was transformed each time it was multiplied by itself and this operation was performed 4 times) i.e. 2x2=4, 4x4=16, 16x16=256, 256x256=65536.

At this stage we have john (200), smith (100) and sixty (655536) which have been encoded into a22a12b24.

If we encode the rest of the data we get the final encoding of 

a**22**a12b24b92a**33**a13b23a43a23b52

If we find double digits, we simply collapse them to a single digit (when encoding) and then expand the single digit back to a double digit during decoding. For example the above encoded string ends up like the following.

a**2**a12b24b92a**3**a13b23a43a23b52

## Performance tuning
As we discussed earlier the first one hundred numbers are reserved. These numbers 0 through 99 are used at a later dynamic learning stage. It is predicted that, due to the algorithms being generic/generalized, repetition will occur. For example it is possible that either the repeated use of particular words and/or the coincidental output from algorithms will occur. The system will store a temporary count of repeated sets of encoded data. When a particular set of encoded data is repeated often enough the system will automatically allocate one of the reserved numbers to that pattern. Further compressing the encoded string. 

To realize this the system will always parse the encoded string in chunks (expecting a letter followed by one or two single digits - one chunk). When the system sees a number from 10 to 99 on its own (**without an alphabetic prefix**)it will refer to the master compression table to obtain the full length encoded string. Once this has been resolved, the system will continue biting off chunks of characters (letter, number,[number]).

You will notice that the second number is optional in the parsing (when initially decoding), this is because double digits are converted to single digits i.e. 22 (e22) becomes just 2 (e2) and 44 (a44) becomes just 4 (a4).

Essentially, the system will eventually learn about the most frequently used (top 90) patterns, no matter how short or long they are. There will always be some sort of pattern for a given ecosystem. These patterns will be shortened by assigning them one of the values between 10 and 99. 

An example of the master compression table is below.

![Compression table](https://github.com/CyberMiles/tim-research/blob/master/distributed_ledger_information_sharing_DLISh/images/compression_table.png)

## Formatting
At this early stage the default formatting may capitalize all words and allow for a special character to trigger lower case. It is hoped that we could also have a default single space between words and allow for a special character to remove the space or replace the space with a hyphen. It is hoped that other formatting like $ signs will be implemented at each end of the data exchange (defined by what the application is trying to do). Just a point to remember DLISh only uses a-z and A-Z as we as 0-9 of the UTF-8 character set and therefore there are a range of special characters which could be implemented as part of the solution.

### Atomic transactions
Firstly, information passing is request driven. A good analogy for this would be how we use the Internet. A user requests content and the content is delivered. To take this a step further, in this system it is mandatory for the receiver/requester to firstly decode the information and then immediately provide acknowledgement that the information is sound. If this does not occur no part of the transaction is recorded permanently. Put simply, the transaction is either completely successful in real-time or it is completely discarded on both ends. Hence the terminology "atomic". The reason for this, is again to do with performance tuning.

### A brief example - a helicopter view
A delivery driver's mobile application requests the delivery address for an item (the prior steps in the supply chain which led to this point are also all request driven and more examples of this can be provided. However for simplicity sake, let's stick to just the delivery of an item for now). The delivery address is encoded and encrypted by the senders mobile application. The encrypted data is sent to the delivery drivers mobile application where it is unencrypted and decoded for immediate use. This successful transaction is recorded in the blockchain. 

### Encryption
Whilst the encoding and decoding is trivial (at the base layer of the application) the encryption is a bit more complicated. This is due to the fact that a user should never be asked to share their secret keys. The information being passed through the public blockchain must be encrypted after encoding (on the senders end) and decrypted before decoding can take place on the receiving end. 

### Implementation
Blockchain technologies (Cosmos Zones) [1] now offer consistently fast finality and as such proxy re-encryption could be performed in a peer to peer environment by sending the necessary (lightweight) data in blockchain transaction (Tx) wrapped messages (Msg). NuCyphers pyUmbral [2] facilitates proxy re-encryption whereby a user can share their encrypted data with genuine recipient user without revealing their private key. As part of the decentralized encryption/decryption process, the pyUmbral system creates a capsule which can be modified by a third untrusted party (who never sees the data) in readiness for the genuine recipient to decrypt the data as intended. The pyUmbral component of this implementation has been tested in a closed environment and was successful. The execution of a transaction between 2 blockchains (using the Cosmos network) has not been tested as yet. The encoding/decoding as described above will need to be coded. The key value containers could be constructed using either Google's LevelDB [3] or Facebook's RocksDB [4].


```

[1] https://cosmos.network/
[2] https://github.com/nucypher/pyUmbral
[3] https://github.com/google/leveldb
[4] https://github.com/facebook/rocksdb

```


