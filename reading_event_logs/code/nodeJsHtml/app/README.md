# System
```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install -y build-essential
```
# Java
```bash
sudo apt-get install default-jre
sudo apt-get install default-jdk
```
# Elasticsearch install
```bash
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-6.5.4.deb
sudo dpkg -i elasticsearch-6.5.4.deb 
```
# Elasticsearch config
Use ifconfig to get the address of the machine you are on.
Then open /etc/elasticsearch/elasticsearch.yml and uncomment the network.host setting add 0.0.0.0 and then also uncomment the http.port setting
```bash
ifconfig 
network.host: 0.0.0.0
http.port: 9200
```
Uncomment the cluster.name and node.name in the elasticsearch.yaml file and then add your own values
```bash
cluster.name: event_log_reader
node.name: node_1
```

# Start Elasticsearch
```bash
sudo chown -R elasticsearch:elasticsearch /var/lib/elasticsearch/
sudo systemctl start elasticsearch
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

