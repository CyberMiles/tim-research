#Safe remote purchase originally from https://github.com/ethereum/solidity/blob/develop/docs/solidity-by-example.rst which was then ported to vyper at https://github.com/ethereum/vyper/blob/master/examples/safe_remote_purchase/safe_remote_purchase.v.py

#Rundown of the transaction:
#1. Information seller posts a hash value of the information for sale and also posts safety deposit of double the information's advertised value.
# Balance is 2*value.
#(1.1. Information seller can reclaim deposit and close the sale as long as nothing was purchased.)
#2. Information purchaser, purchases the information for sale (at the advertised value) and then also posts an additional safety deposit (equal to the advertised value).
# Balance is 4*value.
#3. Information seller creates a ciphertext and a capsule to kick-off the proxy re-encryption process.

#TODO with reference to the following links, this section needs to be updated asap
#https://github.com/nucypher/pyUmbral/blob/master/README.rst
#https://github.com/CyberMiles/tim-research/blob/master/information_purchasing/information_purchasing.md

#4. Once the information is decrypted, the information purchaser can confirm the hash value (as advertised in step 1). 
#Buyer's deposit (value) is returned.
#Seller's deposit (2*value) + items value is returned. Balance is 0.

#TODO All code needs to be re-written/checked in relation to the above proposed work flow. 
#Warning This code is in no way ready for use!
value: public(wei_value) #Value of the item
seller: public(address)
buyer: public(address)
unlocked: public(bool)
#@constant
#def unlocked() -> bool: #Is a refund possible for the seller?
#    return (self.balance == self.value*2)

@public
@payable
def __init__():
    assert (msg.value % 2) == 0
    self.value = floor(msg.value / 2) #The seller initializes the contract by
        #posting a safety deposit of 2*value of the item up for sale.
    self.seller = msg.sender
    self.unlocked = true

@public
def abort():
    assert self.unlocked #Is the contract still refundable?
    assert msg.sender == self.seller #Only the seller can refund
        # his deposit before any buyer purchases the item.
    selfdestruct(self.seller) #Refunds the seller and deletes the contract.

@public
@payable
def purchase():
    assert self.unlocked #Is the contract still open (is the item still up for sale)?
    assert msg.value == (2*self.value) #Is the deposit the correct value?
    self.buyer = msg.sender
    self.unlocked = false

@public
def received():
    assert not self.unlocked #Is the item already purchased and pending confirmation
        # from the buyer?
    assert msg.sender == self.buyer
    send(self.buyer, self.value) #Return the buyer's deposit (=value) to the buyer.
    selfdestruct(self.seller) #Return the seller's deposit (=2*value)
        # and the purchase price (=value) to the seller.

