# Decentralized blockchain applications (dApps) - Draft in progress ...

## Background - Interfaces
One key component of a decentralized application, is its interface. An interfaces can take the form of a native application, a web application or command line program. These days most desktop, mobile and web applications offer responsive user-friendly interfaces with very good usability. 

But what about decentralized blockchain applications (dApps)?

dApps have the potential to provide functionality and usability which far outstrips the traditional blockchain command line. The dApp ecosystem still has many limitations and trade-offs. This document compares and contrasts the different dApp platforms, from a development perspective, and also dives into pressing issues of security, scalability and so forth.

### Native Applcations (mobile and desktop)

Native applications provide access to native device features like local storage, camera, accelerometer and so forth. Native applications require users to obtain the application in question, via their phone's app store. Developers are required to submit the native application, as well as all future updates, to this specific app store. The app store can be goverened by the phone manufacturer, as is the case with Apple. 

During the early stages of development, a developer may choose to only support a few platforms, and then work up to supporting more platforms. For example, developers could support only iOS, Android and Windows (perhaps using Xamarin tools) at the outset, and then move to supporting macOS (desktop via dmg installers) as well as Linux (desktop via deb packages etc). Finally, developers could perhaps branch out to native Linux mobile applications (by building for mobile operating systems such as Tizen etc) if/when required. It is unclear what sort of impact alternative platforms such as the Linux Foundation's Tizen project will have. Tizen is currently being run on a range of Samsung and other mobile brands and looks promising.

One advantage of the native decentralized application is that the security for accessing keys/authentication is safer; authentication can be done using biometric APIs and private keys are accessed privately via local disk, as apposed to being pasted into a web browser. There are a variety of tools for creating native applications and whilst some (like Mircosoft's Xamarin) generate apps for Android, iOS and Windows they exclude all other operating systems and platforms, including the general web. In short, native applications provide good functionality and security, but writing for each platform is more expensive and complicated.

It is important to remember that the core blockchain software (when running a full node) requires considerable amount of storage space. For example the Bitcoin blockchain is almost 180GB and the Ethereum blockchain is around 100GB. It is important to note that most mobile phones only provide between 32GB and 256GB in total storage. Mobile phones can not/will not run as full blockchain nodes. Mobile phones need to securely interact with the blockchain, without downloading and storing it, if native dApps are to succeed.

### Web Applcations (in-browser, cross-platform)

Web applications, unlike device specific native applications, are able to be run on any device via the user's web browser. Web applications are accessed remotely by simply visiting a URL. In general from a security standpoint, web applications are not designed to access device hardware. For example a web application has very limited access to device storage. In some cases web applications can be allowed read-only access to a file system, for the purpose of uploading pictures or files etc. This is quite different to native applications which are essentially an application installed directly on the device's local disk; able to harness device hardware (camera, accellerometer, GPS as well as read-write certain areas of storage etc).

Similarly to native applications, web applications are not able to access blockchain data directly. For this to occur, the device on which the dApp was running would need to store the entire blockchain. Web application dApps can however access a blockchain via another service.

Bridges like [MetaMask](https://metamask.io/) allow Ethereum decentralized applications to be run inside a web browser. This means that a user can operate their Ethereum dApp, which accesses the blockchain, without the need to store the blockchain. Of course by not running a full node, users are trusting the third-party MetaMask servers as part of their interaction with the blockchain.

[MyEther Wallet](https://www.myetherwallet.com/) is another interface which allows users to interact with the Ethereum blockchain. While MyEther Wallet states that no data leaves your computer/your browser, the site's disclaimer also declares that when using the service, there is always the possibility that funds could be lost if something unexpected happens.

TODO discuss how Infura is the Ethereum blockchain provider for MetaMask - discuss how infura works 

### TODO web3
[web3](https://web3js.readthedocs.io/en/1.0/)

TODO discuss how web3 works for local and remote blockchain interaction

### Command line (running a full node)

When we refer to nodes in a given decentralized blockchain network, we are referring to individual computers, which all run the same blockchain software. This software is commonly referred to as the “base layer protocol”. Running a full node means not only downloading, compiling and running the base layer protocol software. A full node also needs to download and continually store the entire blockchain history. The Bitcoin blockchain is almost 180GB and the Ethereum blockchain is around 100GB. Blockchain base layer protocols provide a command line which can perform every task associated with that particular blockchain implementation. Everything from creating accounts, creating wallets, creating transactions, broadcasting transactions as well as backup and restore features and more are provided. 

## Background - Trust

In a blockchain system, no single user is more (or less) trusted than any other single user. Blockchain user interfaces face an interesting challenge. The challenge stems from the fact that the devices which we will most likely use to run our dApps, are in-fact not equipped to store the entire blockchain. The question is, how do we ensure that dApps, without direct access to the blockchain, are not reliant on "trusted" third-party products and services?

## Background - Scalability
TODO trust -> scaling -> example of trust system stella, hashgraph etc.

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

[EOSJS](https://github.com/EOSIO/eosjs)

### React Native (Universal)
React Native allows you to put together the fundamental UI building blocks of iOS and Android using Javascript and React. Importantly, React Native supports WebSockets. Also, perhaps equally as important from an open source development perspective, React Native applications can be developed using any IDE on any platform. There is no need for xcode or other specific IDEs.

## Back-end

### Ganache (Ethereum based)
A personal blockchain allows you to execute commands, perform tests and inspect state at no cost. [Ganache](https://truffleframework.com/ganache) provides a framework for performing these tasks, and even controlling behaviour of a personal Ethereum style blockchain.

### Demux (EOS based)
[Demux](https://github.com/EOSIO/demux-js) is a queriable datastore which allows blockchain state to be queried by front-end clients without having to interact with the chain.

## Smart contracts

### Truffle (Ethereum based)
Perhaps the most popular development environment for blockchains using the Ethereum Virtual Machine (EVM) is [Truffle](https://truffleframework.com/truffle).

### EOS SDK (EOS based)
EOS smart contracts are written in C++, using tools from the [EOS Software Development Kit (SDK)](https://developers.eos.io/). EOS smart contracts are compiled into [WebAssembly](https://webassembly.org/) which allows them to be deployed on the web. For example, EOS smart contracts can be deployed and accessed using Chrome, Firefox, Internet Explorer, Safari and so forth. Remembering that in EOS, all smart contracts must be written using C++.

### Lity (CyberMiles based)


# Bringing it all together
We mentioned at the start of this document that Docker is able to encapsulate an entire software environment. The good news about this and other container tools is that you can select a variety of individual tools to suite your individual needs and then isolate them all into a container. This will allow you to have your own personalized blockchain DApp development and testing environment.

# Spare content and references for later use

## 1
The architecture of EOS is different to Ethereum, in that it logically separates the blockchain node software program (nodeos) from the key/wallet software program (keosd). An additional command line program (cleos) is used to perform interactions between the user, the key/wallet software and the blockchain node software. EOS also provides ways to interact with the blockchain through the use of Javascript in an HTML (web application) setting.

EOS has a read-only application programming interface (API) called [eosjs-api](https://github.com/EOSIO/eosjs-api) for its EOS blockchain. In relation to cross-platform in-browser web application excecution, EOS also has a general purpose javascript library called [eosjs](https://github.com/EOSIO/eosjs) which can create accounts, deploy smart contracts, call smart contracts and even sign and broadcast transactions to the EOS blockchain.

## 2

## 3



