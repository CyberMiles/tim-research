# Reading Event Logs

## Server infrastructure

### Ubuntu 16.04LTS
For this demonstration I used an Amazon ec2 instance. I used the c5d.xlarge with an Ubuntu 16.04LTS Server instance. The [cost for this machine](https://aws.amazon.com/ec2/pricing/on-demand/), at the time of writing this was about 19 cents per hour. The c5d.xlarge instance has 8 GiB	RAM and a single 100Gb SSD drive. This is just the bare minimum spec for purposes of demonstrating event log harvesting. Feel free to increase specs as you wish.

### System housekeeping
#### Operating system software
Log into your ec2 instance and perform the following tasks.
```bash
sudo apt-get update
sudo apt-get -y upgrade
sudo apt-get install -y build-essential
```
#### Storage
Elasticsearch requires the fast disk i/o. A Solid State Drive (SSD) is recommended. The c5d.xlarge instance that I am using for this demonstration has a "non-volatile memory express" (NVMe) SSD. This is how I set it up.
List the NVMe devices (make sure that the NVMe is registered)

```bash
lspci
```
The above command returned the following for me
```bash
00:00.0 Host bridge: Intel Corporation 440FX - 82441FX PMC [Natoma]
00:01.0 ISA bridge: Intel Corporation 82371SB PIIX3 ISA [Natoma/Triton II]
00:01.3 Non-VGA unclassified device: Intel Corporation 82371AB/EB/MB PIIX4 ACPI (rev 08)
00:03.0 VGA compatible controller: Device 1d0f:1111
00:04.0 Non-Volatile memory controller: Device 1d0f:8061
00:05.0 Ethernet controller: Device 1d0f:ec20
00:1f.0 Non-Volatile memory controller: Device 1d0f:cd01
```
The following command lists all of the mounted (usable) drives in a human readable format.
```bash
df -h
```
The following output (produced by the above df command) shows that I only have a single ~8Gb drive mounted and ready to use. This is where the operating system resides.
```bash
/dev/nvme0n1p1  7.7G  1.2G  6.6G  16% /
```
If I want to see my NVMe volume (which is not yet mounted/mapped/formatted) then I can use the following command.
```bash
lsblk
```
Here I can see that there is a ~100Gb drive with the name of nvme1n1
```bash
nvme1n1     259:0    0 93.1G  0 disk
```
I will now create a file system
```bash
sudo mkfs -t ext4 /dev/nvme1n1 
```
Part of the output from the above mkfs command will include the Filesystem UUID. Cut and paste this UUID because it will be used in an upcoming command.
```bash
Filesystem UUID: 5bb95be7-3f67-4acf-936f-7ee5868a51a9
```
I will not create an easily accesible mount point on the main drive (where the operating system runs) and then set the permissions of this mount point to the ubuntu user.
```bash
sudo mkdir /media/nvme
sudo chown -R ubuntu:ubuntu /media/nvme/
```
I will now ensure that this drive is mounted each time the system is restarted. I add this line to the /etc/fstab file (remember I suggested to store the UUID, this is where it is needed).
```bash
UUID=5bb95be7-3f67-4acf-936f-7ee5868a51a9 /media/nvme ext4 defaults 0 0
```
The UUID can also be found, fresh, by using the following command.
```bash
sudo blkid
```
Once the above commands have succeeded, I reboot the instance.
```bash
sudo shutdown -r now
```
After the reboot, I can see the mounted ~100Gb NVMe SSD using the df command once more
```bash
df -h
```
```bash
/dev/nvme1n1     92G   60M   87G   1% /media/nvme
```
I can also go ahead and change to the /media/nvme directory and create files and folders in there. For some reason I had to rerun the chown command again. All works as intended now.
```bash
#ensure that the /media/nvme directory is owned by ubuntu by typing ls -la /media/nvme If it is not then type the following command
sudo chown -R ubuntu:ubuntu /media/nvme/
```
I now create two directories, one for the elasticsearch data and one for the elasticsearch logs
```bash
cd /media/nvme/
mkdir event_log_data
mkdir event_log_logs
```
I now recursively change the ownership of the mount point to elasticsearch because it will exclusively use this area now. I can interact with the logs and the data via the HTTP API and there is no need for the ubuntu user to access this dir directly.
```bash
sudo chown -R elasticsearch:elasticsearch /media/nvme/event_log_data/
```
A final point/warning. The SSD file system will be terminated, along with the c5d.xlarge instance, if it is terminated. It would be a good idea to perform application level backups of the data on the SSD. For example use application software to export data and then store that in S3 or wherever is suitable. 

#### Application specific software

##### Node
```bash
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
```

##### Java
```bash
sudo apt-get -y install default-jre

sudo apt-get -y install default-jdk
```
##### Elasticsearch install
```bash
cd ~
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-6.5.4.deb
sudo dpkg -i elasticsearch-6.5.4.deb 
```
##### Elasticsearch config - elasticsearch.yml
Open /etc/elasticsearch/elasticsearch.yml 
```bash
sudo vi /etc/elasticsearch/elasticsearch.yml 
```
Perform the following tasks.

Uncomment the network.host (ensuring it is sett to 0.0.0.0) and then also uncomment the http.port setting (leaving it at 9200)
```bash
ifconfig 
network.host: 0.0.0.0
http.port: 9200
```
Change the path to the data and the logs to the new ~100Gb NVMe SSD drive
```bash
path.data: /media/nvme/event_log_data
path.logs: /media/nvme/event_log_logs
```
Uncomment the cluster.name and node.name in the elasticsearch.yaml file and then add your own values
```bash
cluster.name: event_log_reader
node.name: event_log_node_1
```

##### Elasticsearch start
The following commands will start Elasticsearch. Most of the future interaction with Elasticsearch will be done via its RESTful HTTP API (including reading data, writing data and also changes to config and more).
```bash
sudo chown -R elasticsearch:elasticsearch /var/lib/elasticsearch/
sudo systemctl start elasticsearch
```
If future the following command can be run to restart Elasticsearch if required
```bash
sudo systemctl restart elasticsearch
```
##### Elasticsearch test
The following command can be used to ensure that Elasticsearch is running
```bash
curl -XGET 'localhost:9200'
```
The above command will return the following JSON object
```javascript
{
  "name" : "event_log_node_1",
  "cluster_name" : "event_log_reader",
  "cluster_uuid" : "We2AMkruSIyNWO5fbwAYIA",
  "version" : {
    "number" : "6.5.4",
    "build_flavor" : "default",
    "build_type" : "deb",
    "build_hash" : "d2ef93d",
    "build_date" : "2018-12-17T21:17:40.758843Z",
    "build_snapshot" : false,
    "lucene_version" : "7.5.0",
    "minimum_wire_compatibility_version" : "5.6.0",
    "minimum_index_compatibility_version" : "5.0.0"
  },
  "tagline" : "You Know, for Search"
}
```

# Using the application
## Fetch the source code
Fetch the source code from [GitHub](https://github.com/CyberMiles/tim-research/tree/master/reading_event_logs/code/nodeJsHtml/app)
```bash
cd app/
npm install
```

# Contracts to harvest
Each contract has source code which is compiled into bytecode and an abi.json file. Once deployed each instance of a contract has an address on the network. In order to harvest the logs of a particular contract instance, this application requires the abi of the contract as well as the address of the contract. I have created a folder structure as follows to allow for flexibility.
Go to the app directory
```bash
cd /home/ubuntu/reading_event_logs/code/nodeJsHtml/app
Create a directory to store all of the contracts
```bash
mkdir contracts
cd contracts
```
Create a directory to house one specific contract (which has 1 abi file and one to many deployed addresses)
```bash
mkdir uniswap_exchange_contract
```
Paste in the abi of the contract
```bash
vi abi.json
```
I also like to clean up the abi, because they have a lot of redundant characters. I clean an abi like this
```python
python3
>>>import re
>>>abi = '''PasteTheAbiInsideTripleSingleQuotes'''
>>>abi = re.sub(' +|\n|\t', '', abi)
```
Paste in a valid json file containing all of the addresses where the above abi is deployed (this can be one or many)
```bash
vi addresses.json
```
For example
```javascript
{
	"ANT": "0x077d52B047735976dfdA76feF74d4d988AC25196"
}
```
or
```javascript
{
	"ANT": "0x077d52B047735976dfdA76feF74d4d988AC25196",
	"BAT": "0x2E642b8D59B45a1D8c5aEf716A84FF44ea665914",
	"CVC": "0x1C6c712b1F4a7c263B1DBd8F97fb447c945d3b9a"
}
```










