# Reading Event Logs

## Server infrastructure

### Ubuntu 16.04LTS
For this demonstration I used an Amazon ec2 instance. I used the c5d.xlarge with an Ubuntu 16.04LTS Server instance. The [cost for this machine](https://aws.amazon.com/ec2/pricing/on-demand/), at the time of writing this was about 19 cents per hour. The c5d.xlarge instance has 8 GiB	RAM and a single 100Gb SSD drive. This is just the bare minimum spec for purposes of demonstrating event log harvesting. Feel free to increase specs as you wish.

### System housekeeping
#### Operating system and software
Log into your ec2 instance and perform the following tasks.

sudo apt-get update
sudo apt-get -y upgrade

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
I will now ensure that this drive is mounted each time the system is restarted. I add this line to the /etc/fstab file.
```bash
UUID=5bb95be7-3f67-4acf-936f-7ee5868a51a9 /media/nvme ext4 defaults 0 0
```








