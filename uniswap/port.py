# Place and execute this file alongside the uniswap source directory
# This will clear up and issues where ETH, Eth and eth is hard-coded in the source code.
import os
import subprocess
for root, dirs, files in os.walk(os.path.join(os.getcwd(), "uniswap-frontend/src")):
    for name in files:
    	subprocess.call(["sed", "-i", "-e",  's/eth/cmt/g', os.path.join(root, name)])
    	subprocess.call(["sed", "-i", "-e",  's/ETH/CMT/g', os.path.join(root, name)])
    	subprocess.call(["sed", "-i", "-e",  's/Eth/Cmt/g', os.path.join(root, name)])
