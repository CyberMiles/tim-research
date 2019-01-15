# System
```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install -y build-essential
```
# MySQL
```bash
sudo apt-get install mysql-server
sudo ufw allow mysql
sudo systemctl start mysql
sudo systemctl enable mysql
```
```bash
sudo mysql -u root -p
CREATE USER 'ubuntu'@'localhost' IDENTIFIED BY 'asdfasdfasdf';
GRANT ALL PRIVILEGES ON * . * TO 'ubuntu'@'localhost';
FLUSH PRIVILEGES;
exit
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

