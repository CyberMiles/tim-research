# Hello World

#The following contract has been deployed on the Ethereum main net at address 0x6cbbf7258a39cdffa802b3eed325f4a888229057

#Global variables
helloMessage: public(bytes32)
owner: public(address)

#Constructor
@public
def __init__(_message: bytes32):
	#Sets the message which is passed in at execution
    self.helloMessage = _message
    #Sets the owner at excecution
    self.owner = msg.sender

@public
def updateMessage(newMsg: bytes32):
#TODO write extra code for conditions, effects and interaction as suggested by the official documentation
#1. Conditions
#Check if new message is the same as old message

#2. Effects
#Let the user know that the message already exists and log this activity

#3. Interaction
#Go ahead and change the message and then log this activity
    self.helloMessage = newMsg

@public
@constant
def sayHello() -> bytes32:
#TODO write extra code for conditions, effects and interaction as suggested by the official documentation
#1. Conditions
#Check if a message actually exists

#2. Effects
#Log this activity

#3. Interaction
#Return the message and log this activity
    return self.helloMessage

@public
def kill():
#TODO write extra code for conditions, effects and interaction as suggested by the official documentation
#1. Conditions
#

#2. Effects
#

#3. Interaction
#Self destruct
    if msg.sender == self.owner:
        selfdestruct(self.owner)

