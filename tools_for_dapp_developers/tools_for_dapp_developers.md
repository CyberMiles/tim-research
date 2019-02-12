# Decentralized blockchain applications (dApps) - Draft in progress ...
## [FYI Consensys definitive list](https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974)
## Background - Interfaces
One key component of a decentralized application, is its interface. An interfaces can take the form of a native application, a web application or command line program. These days most desktop, mobile and web applications offer responsive user-friendly interfaces with very good usability. 

But what about decentralized blockchain applications (dApps)?

dApps have the potential to provide functionality and usability which far outstrips the traditional blockchain command line. The dApp ecosystem still has many limitations and trade-offs. This document compares and contrasts the different dApp platforms, from a development perspective, and also dives into pressing issues of security, scalability and so forth.

### Command line (running a full node)

When we refer to nodes in a given decentralized blockchain network, we are referring to individual computers, which all run the same blockchain software. This software is commonly referred to as the “base layer protocol”. Running a full node means not only downloading, compiling and running the base layer protocol software. A full node also needs to download and continually store the entire blockchain history. The Bitcoin blockchain is almost 180GB and the Ethereum blockchain is around 100GB. Blockchain base layer protocols provide a command line which can perform every task associated with that particular blockchain implementation. Everything from creating accounts, creating wallets, creating transactions, broadcasting transactions as well as backup and restore features and more are provided. 

### Native Applications (mobile and desktop)

Native applications provide access to native device features like local storage, camera, accelerometer and so forth. Native mobile applications require users to obtain the application in question, via their phone's app store. Developers, of native mobile applications, are required to submit the initial native application, as well as all future updates, to the specific device manufacturer's app store. The app store is generally goverened by the manufacturing compant, as is the case with Apple. 

During the early stages of native application development, a developer may choose to only support a few platforms, and then work up to supporting more platforms. For example, developers could support only iOS, Android and Windows (perhaps using Xamarin tools) at the outset, and then move to supporting macOS (desktop via dmg installers) as well as Linux (desktop via deb packages etc). Finally, developers could perhaps branch out to native Linux mobile applications (by building for mobile operating systems such as Tizen etc) if/when required. It is unclear what sort of impact alternative platforms such as the Linux Foundation's Tizen project will have. Tizen is currently being run on a range of Samsung and other mobile brands and looks promising.

One advantage of the native decentralized application is that the security for accessing keys/authentication is safer; authentication can be done using biometric APIs. Private keys can be accessed via local disk, as apposed to being pasted into a web browser. There are a variety of tools for creating native applications, and whilst some like Mircosoft's Xamarin generate apps for Android, iOS and Windows they exclude all other operating systems and platforms, including the general web. In short, native applications provide good functionality and security, but separately writing native applications for each platform is more expensive and complicated.

It is important to remember that the core blockchain software (when running a full node) requires considerable amount of storage space. For example the Bitcoin blockchain is almost 180GB and the Ethereum blockchain is around 100GB. It is important to note that most mobile phones only provide between 32GB and 256GB in total storage. Mobile phones can not run as full blockchain nodes. Native mobile applications need to be able to quickly and safely interact with the blockchain in order to be useful.

### Web Applcations (in-browser, cross-platform)

Web applications, unlike device specific native applications, are able to be run on any device via the user's web browser. Web applications are accessed remotely by simply visiting a URL. In general from a security standpoint, web applications are not designed to access device hardware. For example a web application has very limited access to device storage. In some cases web applications can be allowed read-only access to a file system, for the purpose of uploading pictures or files etc. This is quite different to native applications which are essentially an application installed directly on the device's local disk; able to harness device hardware (camera, accellerometer, GPS as well as read-write certain areas of storage etc).

Similarly to native applications, web applications which run on smaller (handheld) devices are not able to access blockchain data directly. For this to occur, the device on which the dApp was running would need to store the entire blockchain. 

In cases where it is possible to store the entire blockchain on disk, [web3](https://web3js.readthedocs.io/en/1.0/), or more specifically, the [web3.js](https://github.com/ethereum/web3.js) library can be used to access the blockchain via Javascript, providing the localblockchain implementation is exposing an RPC layer.

In cases where it is NOT possible to store the entire blockchain, the web application dApps can instead access the blockchain via third-party services. We cover these in the next section.

# Tools (other than base layer protocol command line) for accessing the blockchain 

## MetaMask

Bridges like [MetaMask](https://metamask.io/) allow Ethereum decentralized applications to be run inside a web browser. This means that a user can operate their Ethereum dApp, which accesses the blockchain, without the need to store the blockchain. Of course by not running a full node, users are trusting the third-party MetaMask servers as part of their interaction with the blockchain.

## MyEther Wallet

[MyEther Wallet](https://www.myetherwallet.com/) is another interface which allows users to interact with the Ethereum blockchain. While MyEther Wallet states that no data leaves your computer/your browser, the site's disclaimer also declares that when using the service, there is always the possibility that funds could be lost if something unexpected happens.

## Infura

Infura, is an Infrastructure-as-a-Service (Iaas) product which allows developers of dApps to interact with the Ethereum blockchain through a collection of third-party nodes in a load balanced environment. This is in contrast with developers of dApp having to run their own single full node. Interestingly, Infura is the IaaS which makes bridges like MetaMask possible. MetaMask and other blockchain projects utilize the Infura IaaS via Infura's APIs.

Infura provides JSON-RPC, web socket and REST endpoints over TLS.

# Tools for building decentralized blockchain applications (dApps)

This section is about protoyping and building dApps and as such let's put the entire argument for running a full blockchain node aside. 

If simply creating DApp prototypes or rapidly developing DApps for testing, running a full node is not ideal. Development and testing should never be carried out on a main blockchain network as this is would be costly and dangerous. Instead testing should firstly be performed on local blockchain instances and then eventually tested on public test instances and so forth.

Obviously when writing a DApp it would be ideal to have the most realistic representation of the various components of blockchain infrastructure. For example, it would be ideal if your locally developed DApp did not have to be modified to run on a public tesnet or on the mainnet. Fortunately, most components of blockchain infrastructure such as block production, transaction validation and so forth can be simulated on local blockchain instances. There are a few different ways to achieve this, so let us take a look at the various options.

If rapid development of DApps is your focus then you should consider, as a first priority, setting up the tooling to rapidly spin up your own local blockchain infrastructure. In order to describe how this is best achieved, we should try and understand the various components of blockchain infrastructure.

# System level (container) tools

System-wide containers encapsulate an entire software environment so that it can be run on a host computer. This next section introduces Docker, a system-wide container tool. You will notice that the following sections discuss (from an application level) both blockchain specific tools and also universal tools. The point being, any combination of individual tools (at the application level) can be combined into a single Docker container for use. 

## Docker

For example [Docker](https://www.docker.com/) allows you to run an entire pre-assembled blockchain implementation on your local computer with very little fuss. Pre-assembled Docker containers are ephemeral; they can be started and stopped over and over without the need to repeatedly perform traditional installation, compilation and configuration tasks. When using Docker containers, the entire application, as well as all of its dependencies and configuration are all stored in its isolated container.

Docker is available as both a Community Edition (CE) and an Enterprise Edition (EE). Docker CE can be installed on [Linux](https://docs.docker.com/install/linux/docker-ce/ubuntu/), [MacOS](https://docs.docker.com/docker-for-mac/install/) and [Windows](https://docs.docker.com/docker-for-windows/install/).

### CyberMiles node via Docker

CyberMiles provides a tutorial of how to run a [CyberMiles node using Docker](https://www.litylang.org/getting_started/#start-a-cybermiles-node). 

# Application level tools

As previously mentioned, there are various components of blockchain infrastructure. There are tools which cater for your DApps front-end development as well as back-end development and smart contract development. In all good software designs, components are logically separated and then made available in a modular fashion. This allows developers to work on each separate component without side-effects in code, or overlapping in physical efforts. In addition, modularity allows for developers to trial, develop and test new tools independantly for the various components of blockchain infrastructure. We will now 

## Front-end 

### Drizzle (Ethereum based)

Your DApps front-end user interface(UI) and its usability are a key component of its success. There are products like [Drizzle](https://truffleframework.com/drizzle) which provide a host of front-end libraries which can make writing DApp UIs a lot easier and more reliable.

### Xamarin (Universal)

Xamarin allows you to write applications for Windows, iOS and Android. Xamarin separates UI code from business code. The UI can be defined in one location using XAML. The Xamarin IDE takes care of the UI for iOS 6.1+, Android 4.0.3+, Windows Phone (and store) 8.1 as well as Windows 10 operating system.

[Xamarin is entirely open source](https://github.com/xamarin) under MIT License.

Interestingly, whilst Xamarin allows you to display HTML inside the app, Xamarin does not allow you to write a web application which can simply run in any web browser. Xamarin only writes applications for Windows, iOS and Android; ruling out all other users i.e. Linux and other operating systems.

### EOSJS (EOS based)

The architecture of EOS is different to Ethereum, in that it logically separates the blockchain node software program (nodeos) from the key/wallet software program (keosd). An additional command line program (cleos) is used to perform interactions between the user, the key/wallet software and the blockchain node software. EOS also provides ways to interact with the blockchain through the use of Javascript in an HTML (web application) setting.

EOS has a read-only application programming interface (API) called [eosjs-api](https://github.com/EOSIO/eosjs-api) for its EOS blockchain. In relation to cross-platform in-browser web application excecution, EOS also has a general purpose javascript library called [eosjs](https://github.com/EOSIO/eosjs) which can create accounts, deploy smart contracts, call smart contracts and even sign and broadcast transactions to the EOS blockchain.

If the device running the dApp is able to store the blockchain locally, then these sorts of Javascript libraries like EOSJS (for EOS) and web3.js (for Ethereum based blockchains) can be used in conjunction with HTML. Even better, they can be used inside React Native applications.

### React Native (Universal)

React Native allows you to put together the fundamental UI building blocks of iOS and Android using Javascript and React. React Native is like React, but it uses native components instead of web components as building blocks.

Importantly, React Native supports WebSockets. Also, perhaps equally as important from an open source development perspective, React Native applications can be developed using any IDE on any platform. There is no need for xcode or other specific IDEs.



## Back-end

### Ganache (Ethereum based)

A personal blockchain allows you to execute commands, perform tests and inspect state at no cost. [Ganache](https://truffleframework.com/ganache) provides a framework for performing these tasks, and even controlling behaviour of a personal Ethereum style blockchain.

### Demux (EOS based)

[Demux](https://github.com/EOSIO/demux-js) is a queriable datastore which allows blockchain state to be queried by front-end clients without having to interact with the chain.

## Smart contracts

### Truffle (Ethereum based)

Perhaps the most popular development environment for blockchains using the Ethereum Virtual Machine (EVM) is [Truffle](https://truffleframework.com/truffle).

### Populus (Ethereum based)
[Populus](https://populus.readthedocs.io/en/latest/quickstart.html) is an Ethereum based development environment which provides a test blockchain. Developers can create and deploy smart contracts. Populus can also be set up in a virtual environment (using Python virtualenv). Running a virtual environment allows you to use specific versions of Populus dependencies without being concerned about clashes with broader global system dependencies.

### EOS SDK (EOS based)

EOS smart contracts are written in C++, using tools from the [EOS Software Development Kit (SDK)](https://developers.eos.io/). EOS smart contracts are compiled into [WebAssembly](https://webassembly.org/) which allows them to be deployed on the web. For example, EOS smart contracts can be deployed and accessed using Chrome, Firefox, Internet Explorer, Safari and so forth. Remembering that in EOS, all smart contracts must be written using C++.

### Lity (CyberMiles based)


# Bringing it all together

We mentioned at the start of this document that Docker is able to encapsulate an entire software environment. The good news about this and other container tools is that you can select a variety of individual tools to suite your individual needs and then isolate them all into a container. This will allow you to have your own personalized blockchain DApp development and testing environment.

## Trust

In a blockchain system, no single user is more (or less) trusted than any other single user. Blockchain user interfaces face an interesting challenge. The challenge stems from the fact that the devices which we will most likely use to run our dApps, are in-fact not equipped to store the entire blockchain. The question is, how do we ensure that dApps, without direct access to the blockchain, are not reliant on "trusted" third-party products and services?

## Scalability

When developing a decentralized application it is very important to logically separate what needs to occur on the blockchain and what can occur off-chain. For example there is no doubt that transferring value for a purchase needs to happen on chain. However, if a customer is just browsing, viewing hundreds of items, and not making a purchase why not take this activity off-chain. One of the solutions to the cryptokitties problem was to take activity like browsing and upvoting off-chain.

The creators of CryptoKitties offer a smart contract analysis tool which tracks user interaction with particular smart contracts. The project called [Rufflet](http://rufflet.cryptokitties.co/) uses a combination of MongoDB and React to take information from the Ethereum blockchain and make it available, in a read-only capacity, to dApp developers. The visual interface provides valuable information about which smart contract functions are being called when and by whom.

# Misc - draft points which may apply to some areas of the document above once it has matured

## On-chain vs off-chain

# TODO 
discuss PoS vs PoW in the context of finality
# TODO 
explain that whilst Merkle Proofs provide a quick way to prove whether a transaction was included (or not), they do not provide up-to-date state when used in a PoW situation. 
# TODO 
explain that PoS has much faster finality and can provide a "last irreversible block" much faster than PoW systems.
Explain how products like Demux can be configured to only scan from the last irreversible block and then provide off-chain (read-only) browsing as well as watchers and triggers which can then execute on-chain transactions (based on near real-time activity).

# Scatter - in progress
[Scatter](https://github.com/GetScatter) is similar to MetaMask in that it allows you sign transactions securely locally on your machine. Scatter goes a couple of steps further by adding the following functionality over and above MetaMask.
Scatter:
- provides improved privacy by not just giving away information from your machine as you visit various applications
- includes a reputation system called RIDL which allows a user to give a +1 or a -1 to a blockchain application
- includes desktop version, browser plug-in version and also mobile version
- TODO more bullet points

## RIDL - Scatter's Reputation and Identity Layer 
RIDL is a reputation and identity layer for Scatter. RIDL provides a unique identity name which a user can apply community reputation to. Users and Applications can give each other reputation (+1 or -1). In RIDL a user can not give another user a +1 or -1 of reputation. Similarly, an application can not give another application reputation.

## RIDL - State
RIDL tokens exist in two different states. The states are reputing and trading. When in the reputing state, RIDL tokens are able to be transferred in order to provide reputation. When in the trading state, RIDL tokens are able to be traded. The minimum allowable time spent in each state is 24 hours. For example if tokens enter a trading state, they can not be used for providing reputation until a full 24 hours has passed; at which stage the tokens have to be converted back to the reputing state, so that reputing can commence.

## Using RIDL
Reputation is not based on the amount of tokens which a user has OR the amount of tokens a user has spent. Reputation is reflected in two ways:
- firstly reputation is a reflection of how many tokens have been spent on a particular user
- secondly, over and above the first point, reputation is ultimately governed by the amount of tokens flowing through that same particular user or application. Just recieving tokens is not enough. Users and applications must interact with oneanother to create the continous flow which will ultimately result in reputation (allbeit good or bad i.e. +1 or -1).

Remembering that a user can not send another user reputation and an application can send an application reputation. Reputation can however be sent between applications and users in both directions. An example of an application which gives RIDL may be a web site which requires a monthly payment. As the user pays their monthly subscription the application gives the user a +1 for paying their money on time. In reverse, the user can give the application a single +1 (this is capped) when the application works as intended. The +1's or -1's can occur periodically every 24 hours (not multiples at once).

## Distribution of tokens, and prevention of scamming
The Scatter system drops a set amount of tokens to single EOS account addresses. If the system detects that disparate amounts of EOS, Scatter or RIDL tokens are being converged to one account after the airdrop, it will know that this was an attempt to game the system. The result is that the system will lower the reputation score for this and associated accounts. For example, before the airdrop, a user might be enticed to create lots of small accounts to receive an increased amount of tokens via the airdrops.

## Token cap
It was initially planned that a token cap of 100 tokens per account was to be fixed. This was to provide users with enough tokens to use on a daily basis, without allowing users to HODL tokens. As it turns out there was no way to prevent sybil attacks where people just create many eos accounts, to receive many sets of 100 tokens.

## Using Scatter for permission management
https://steemit.com/eos/@genereos/eos-how-to-quickly-and-safely-change-your-public-private-keys

# TODO
Text from my Telegram
What part of the Scatter ecosystem (if any) is a full node? i.e are there dedicated 3rd party servers that Scatter talks to remotely or can it talk to the EOS BPs?

Scatter doesn't run a node at all, it simply provides signatures. The dapp itself either runs the node or connects to an existing one. As far as some internal Scatter functions are concerned, Scatter operates a load balancer of a few vetted mainnet nodes that it uses for its internal functions. Overall, individual apps must run a node or specify which endpoint/api node scatter should use when signing transactions for that app; when pushing transactions to the network

all scatter really cares about is what is the current tapos from the network, and the chain id for example tapos+chainid+expiry+private key = signed transaction

last irreversible block would be more of "state" feature for browsing (read-only) i.e. whether a given action is irreversible or not

In EOS you can set the reference block num or block id used for TAPOS (Transaction as Proof-of-Stake) as part of a transaction.

## How to suggest a node to a user of Scatter
Networks are used to connect to blockchain nodes and reference blockchain accounts. This can be statically set in the dApp code i.e. in the following example which I wrote up whereby the Scatter instance is initialized in the HTML->head->script


```
<script>
		document.addEventListener("scatterLoaded", scatterExtension => { const scatter = window.scatter; })
		const Blockchains = {
		EOS: {
			blockchain: "eos",
			host: "localhost",
			port: 1234,
			protocol: "https",
			chainId: "abcdefg"
			},
		Ethereum: {
			blockchain: "eth",
			host: "localhost",
			port: 1234,
			protocol: "https",
			chainId: "1"
			}
		};
		
		function chooseEOSBlockchain(){
			const blockchain = Blockchains.EOS.blockchain;
			console.log(blockchain);
		}

		function chooseEthereumBlockchain() {
			const blockchain = Blockchains.Ethereum.blockchain;
			console.log(blockchain);
		}

	</script>
  ```
  From there, the user can simply select which network they wish to interact with. I have written some code for the HTML->body and have used buttons to demonstrate this.
  
  ```
  <body>
	<h1>Heading one</h1>
	<p id="demo">Hello World!</p>
	<button type="button" id="ethButton" onclick='chooseEthereumBlockchain()'>Choose Ethereum</button>
	<button type="button" id="eosButton" onclick='chooseEOSBlockchain()'>Choose EOS</button>
</body>
```

If the dApp wants to allow the user to select their own network, the dApp can use one of the Scatter APIs to suggest a network to the user. The user can verify that the network is legit and when promted with the question, the user can agree by clicking on the suggested network.








