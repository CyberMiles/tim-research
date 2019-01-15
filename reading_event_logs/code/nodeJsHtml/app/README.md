# System
```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install -y build-essential
```
# Elasticsearch
```bash
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-6.5.4.deb
sudo apt-get install default-jre
sudo apt-get install default-jdk
```
# Install node
```bash
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
```
# Using the application
## Fetch the source code
```bash
cd app/
npm install
```
## Optional get sql data snapshot and import

# Start 
```bash
nodemon server.js
```

