#!/bin/bash

#OmiseGo Plasma installation

#Housekeeping
sudo apt-get update -y
sudo apt-get upgrade -y

#Install vcpkg
sudo apt-get install g++-7 -y
git clone https://github.com/Microsoft/vcpkg
cd vcpkg
./bootstrap-vcpkg.sh
./vcpkg integrate install

#Install leveldb
vcpkg install leveldb



