# Tools for DApp Developers - IN PROGRESS ...

Running a full node of any blockchain implementation requires a considerable amount of work. Aside from downloading, compiling, configuring and so forth, there are also network, routing and security tasks to be performed when running a full node.

If rapid development of DApps is your focus then you should consider, as a first priority, setting up the tooling to rapidly spin up your own local blockchain infrastructure. In order to describe how this is best achieved, we should try and understand the various components of blockchain infrastructure.

When we refer to nodes in a given decentralized blockchain network, we are referring to individual computers, which all run the same blockchain software. This software is commonly referred to as the “base layer protocol”. Running a full node means not only downloading, compiling and running the base layer protocol software. A full node also needs to download and continually store the entire blockchain history. The Bitcoin blockchain is almost 180GB and the Ethereum blockchain is around 100GB. It is plain to see that if simply creating DApp prototypes or rapidly developing DApps for testing, running a full node is not ideal. Further, development and testing should never be carried out on a main blockchain network, this is costly and dangerous. Instead testing should firstly be performed on local blockchain instances and then eventually tested on public test instances and so forth.

Obviously when writing a DApp it would be ideal to have the most realistic representation of the various components of blockchain infrastructure. For example, it would be ideal if your locally developed DApp did not have to be modified to run on a public tesnet or on the mainnet. Fortunately, most components of blockchain infrastructure such as block production, transaction validation and so forth can be simulated on local blockchain instances. There are a few different ways to achieve this, so let us take a look at the various options.

# System-wide container tools
System-wide containers encapsulate an entire software environment so that it can be run on a host computer. This next section introduces Docker, a system-wide container tool. You will notice that the following sections discuss (from an application level) both blockchain specific tools and also universal tools. The point being, any combination of individual tools (at the application level) can be combined into a single Docker container for use. 

## Docker
For example [Docker](https://www.docker.com/) allows you to run an entire pre-assembled blockchain implementation on your local computer with very little fuss. Pre-assembled Docker containers are ephemeral; they can be started and stopped over and over without the need to repeatedly perform traditional installation, compilation and configuration tasks. When using Docker containers, the entire application, as well as all of its dependencies and configuration are all stored in its isolated container.

Docker is available as both a Community Edition (CE) and an Enterprise Edition (EE). Docker CE can be installed on [Linux](https://docs.docker.com/install/linux/docker-ce/ubuntu/), [MacOS](https://docs.docker.com/docker-for-mac/install/) and [Windows](https://docs.docker.com/docker-for-windows/install/).

### CyberMiles node via Docker
CyberMiles provides a tutorial of how to run a [CyberMiles node using Docker](https://www.litylang.org/getting_started/#start-a-cybermiles-node). 

# Blockchain specific tools
As previously mentioned, there are various components of blockchain infrastructure. There are tools which cater for your DApps front-end, back-end and smart contract development.

In all good software design, separate components are logically separated and made available in a modular fashion. This allows developers to work on the separate components without side-effects or overlapping efforts. In addition, modularity allows for developers to trial, develop and test new tools independantly for the various components of blockchain infrastructure. Here are some Ethereum-specific tools.

## Front-end - Ethereum
Your DApps front-end user interface(UI) and its usability are a key component of its success. There are products like [Drizzle](https://truffleframework.com/drizzle) which provide a host of front-end libraries which can make writing DApp UIs a lot easier and more reliable.

## Smart contracts - Ethereum
Perhaps the most popular development environment for blockchains using the Ethereum Virtual Machine (EVM) is [Truffle](https://truffleframework.com/truffle).

## Back-end - Ethereum
A personal blockchain allows you to execute commands, perform tests and inspect state at no cost. [Ganache](https://truffleframework.com/ganache) provides a framework for performing these tasks, and even controlling behaviour of a personal Ethereum style blockchain.

## Front-end - EOS
[EOSJS](https://github.com/EOSIO/eosjs)

## Back-end - EOS
[Demux](https://github.com/EOSIO/demux-js) is a queriable datastore which allows blockchain state to be queried by front-end clients without having to interact with the chain.

# Universal tools
Mobile and web applications 

## Front-end

### React Native
React Native supports WebSockets.

## Smart contracts

## Back-end


# Bringing it all together
We mentioned at the start of this document that Docker is able to encapsulate an entire software environment. The good news about this and other container tools is that you can select a variety of individual tools to suite your individual needs and then isolate them all into a container. This will allow you to have your own personalized blockchain DApp development and testing environment.