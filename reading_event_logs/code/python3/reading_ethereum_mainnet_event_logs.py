# This is just a quick test to see how a node like Infura can be used to read event logs from the mainnet.
import web3
#INFURA
node = 'https://mainnet.infura.io/v3/46d1afae8b55464585222887f55eab6a';
w3 = web3.Web3(web3.HTTPProvider(node))
currentBlock = w3.eth.blockNumber
print("Current block " + str(currentBlock))
# loop through blocks
for b in range(5555555, 5555556):
	print("\n")
	print("Processing block " + str(b))
	transactionCount = w3.eth.getBlockTransactionCount(b)
	print("Transaction count: " + str(transactionCount))
	if(transactionCount >= 1):
		print("Transaction count is " + str(transactionCount))
		# hone in on a single block
		for singleTransactionInt in range(0, transactionCount):
			print("\n")
			print("Processing transaction " + str(singleTransactionInt)+ " of block " + str(b))
			transaction = w3.eth.getTransactionByBlock(b, singleTransactionInt)
			#print("Transaction: ")
			#print(transaction)
			transactionHash = transaction.hash
			print("Transaction hash: " + str(transactionHash))
			transactionReceipt = w3.eth.getTransactionReceipt(transaction.hash)
			print("\nTransaction Receipt: ")
			print(transactionReceipt)
			print("\n")
			transactionLogs = transactionReceipt.logs
			if (len(transactionLogs) >= 1):
				print("Block " + str(b) + "\'s transaction log[s] are below.")
				print(transactionLogs)
			else:
				print("Block " + str(b) + "has no logs")
	else:
		print("Transaction count is 0")

