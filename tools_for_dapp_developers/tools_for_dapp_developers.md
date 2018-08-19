# Tools for DApp Developers

## User Interfaces
One key component of a decentralized application, is its user interface. User interfaces can take the form of native applications, web applications or low level command line implementations.

### Native Applcations (mobile and desktop)

Whilst native applications provide access to native device features like local storage, camera, accelerometer and so forth, they also require users to obtain the application via their phone's app store. Of course this also means that developers are required to submit the application as well as all future updates to the app store for each phone provider. For a developer it would be possible to only support a few platforms at the outset, and then work up to supporting more. For example, developers could support only iOS, Android, Windows (perhaps using Xamarin tools) at the outset and then move to support macOS (desktop by creating dmg installers) as well as Linux (desktop by creating deb packages etc). Finally, developers could perhaps branch out to native Linux mobile applications (by building for mobile operating systems such as Tizen etc) if/when required. It is unclear what sort of impact the Linux Foundation's Tizen project will have; it is currently being run on a range of Samsung and other mobile brands, which looks promising.

One advantage of the native decentralized application is that the security for accessing keys/authentication is safer; authentication can be done using biometric APIs and private keys are accessed privately as apposed to being pasted/accessed in a web browser. There are a variety of tools for creating native applications and whilst some (like Mircosoft's Xamarin) generate apps for Android, iOS and Windows they exclude all other operating systems and platforms, including the web. In short, native applications provide good functionality and security, but writing for each platform is more expensive and complicated.

TODO how native applications interact with the blockchain
Give Mist example (desktop, mobile?)
How much storage required full vs fast etc.

### Web Applcations (in-browser, cross-platform)
Web applications, unlike specific native applications, are able to be run on any device via a web browser. Web applications are accessed remotely via a URL. Web applications, in general, are not designed to access device hardware. For example a web application has very limited access to device storage. In some cases web applications can be allowed read-only access to a file system for the purpose of uploading pictures or files etc. This is quite different to native applications which are essentially an application installed directly on the device; able to harness device hardware (camera, accellerometer, GPS read-write storage).

Web applications are not able to access a blockchain directly. They can however access a blockchain via other services.
Bridges like [MetaMask](https://metamask.io/) allow Ethereum decentralized applications to be run inside a users web browser. This means that a user can interact with an Ethereum dApp without the need to install and run the entire base layer protocol. Of course by not running a full node, users are trusting the third-party MetaMask servers as part of their interaction with the blockchain.

The architecture of EOS is different to Ethereum, in that it logically separates the blockchain node software program (nodeos) from the key/wallet software program (keosd). An additional command line program (cleos) is used to perform interactions between the user, the key/wallet software and the blockchain node software.

EOS has a read-only application programming interface (API) called [eosjs-api](https://github.com/EOSIO/eosjs-api) for its EOS blockchain. In relation to cross-platform in-browser web application excecution, EOS also has a general purpose javascript library called [eosjs](https://github.com/EOSIO/eosjs). eosjs can create accounts, deploy smart contracts, call smart contrancts and even sign and broadcast transactions to the EOS blockchain.

### Command line (running a full node)

REFERENCE Ethereum mist and compiling full nodes etc

Running a full node of any blockchain implementation requires a considerable amount of work. Aside from downloading, compiling, configuring and so forth, there are also network, routing and security tasks to be performed when running a full node.

If rapid development of DApps is your focus then you should consider, as a first priority, setting up the tooling to rapidly spin up your own local blockchain infrastructure. In order to describe how this is best achieved, we should try and understand the various components of blockchain infrastructure.

When we refer to nodes in a given decentralized blockchain network, we are referring to individual computers, which all run the same blockchain software. This software is commonly referred to as the “base layer protocol”. Running a full node means not only downloading, compiling and running the base layer protocol software. A full node also needs to download and continually store the entire blockchain history. The Bitcoin blockchain is almost 180GB and the Ethereum blockchain is around 100GB. It is plain to see that if simply creating DApp prototypes or rapidly developing DApps for testing, running a full node is not ideal. Further, development and testing should never be carried out on a main blockchain network, this is costly and dangerous. Instead testing should firstly be performed on local blockchain instances and then eventually tested on public test instances and so forth.

Obviously when writing a DApp it would be ideal to have the most realistic representation of the various components of blockchain infrastructure. For example, it would be ideal if your locally developed DApp did not have to be modified to run on a public tesnet or on the mainnet. Fortunately, most components of blockchain infrastructure such as block production, transaction validation and so forth can be simulated on local blockchain instances. There are a few different ways to achieve this, so let us take a look at the various options.

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


