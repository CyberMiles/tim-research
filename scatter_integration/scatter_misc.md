
# Misc Info

## Accessing CyberMiles Testnet config, data and keystore, which are stored on local disk
Obviously I am running Docker here, so I want to browse the file system and locate the private keys which were created automatically in the previous steps. The following commands will provide access to the internal Docker container files system.

Firstly get the (CyberMiles Testnet) Docker container id (in our case 8d483d15eff2) by typing the following command
```
docker ps -q
```
Then run the following command which will launch a shell right inside the Docker container for you.
```
docker exec -it 8d483d15eff2 /bin/bash
```
If you change up and into the travis directory using the following command, you will have access to the keystore directory and more, for example
```
cd ../travis
ls
```
The above commands will return the following
```
config  data  geth.ipc  keystore  vm
```
### Installing a text editor inside the Docker instance
The CyberMiles Tesnet Docker instance is Ubuntu. The system does not have vim or emacs etc. I could use tail to access text inside files, however if I want to open files I will need to install a text editor in order to open and view the private keys of the accounts. This can be done as follows.
```
apt-get update
apt-get install vim
```

### Cleaning up old Docker containers
https://zaiste.net/removing_docker_containers/
List all exited containers
```
docker ps -aq -f status=exited
```
Remove stopped containers
```
docker ps -aq --no-trunc -f status=exited | xargs docker rm
```
