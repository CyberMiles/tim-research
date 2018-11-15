# Place and execute this file alongside the root uniswap Github directory
# This will clear up and issues where ETH, Eth and eth is hard-coded in the source code.
#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
import subprocess

replaceDict = {
    'ethereum': 'cybermiles',
    'Ethereum': 'CyberMiles',
    'eth': 'cmt',
    'ETH': 'CMT',
    'Eth': 'Cmt',
    }

for (root, dirs, files) in os.walk(os.path.join(os.getcwd(),
                                   'uniswap-frontend', 'src')):
    for name in files:
        for (key, value) in replaceDict.items():
            sedCommandSingleQuotes = "s/\\\'" + key + "\\\'/\\\'" \
                + value + "\\\'/g"
            sedCommandDoubleQuotes = 's/\\"' + key + '\\"/\\"' + value \
                + '\\"/g'
            print(sedCommandSingleQuotes)
            print(sedCommandDoubleQuotes)
            subprocess.call(['sed', '-i', '-e', sedCommandSingleQuotes,
                            os.path.join(root, name)])
            subprocess.call(['sed', '-i', '-e', sedCommandDoubleQuotes,
                            os.path.join(root, name)])
