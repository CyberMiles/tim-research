#!/bin/bash

#OmiseGo Plasma installation on Ubuntu 

#Housekeeping
sudo apt-get update -y
sudo apt-get upgrade -y
sudo apy-get autoremove -y
sudo update-ca-certificates

#Install Solidity
cd ~
wget https://github.com/ethereum/solidity/releases/download/v0.4.18/solc-static-linux
chmod +x ./solc-static-linux
sudo mv solc-static-linux /usr/bin/solc


#Install Plasma
git clone https://github.com/omisego/plasma-mvp.git
cd plasma-mvp
virtualenv env -p python3
sudo -H make








