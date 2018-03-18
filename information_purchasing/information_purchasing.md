# Information purchasing
This page is broken into 3 sections. 

Firstly a list of first principles pertaining to Ethereum and NuCyper's pyUmbral proxy re-encryption software. It is important to understand these known truths before we can build any smart contracts/dApps

Secondly, a list of assumptions pertaining to the same topic. These are statements which I believe to be true but am not 100% sure about. They need to be refined/reworded so that they can become known truths/first principles.

Thirdly, a set of questions. These questions raise the "what-if" ideas which could lead to a solution to decentralized information purchasing using blockchain softare.

# First principles
The following points are what I believe to be truths.

## Encapsulation

1) A data owner performs their own private_key and public_key generation
    a) because the user can never reveal their private key to anyone
   
2) A data owner performs their own umbral.encrypt
    a) because the user does not want to reveal their plaintext (which is passed into the umbral.encrypt function)
    
3) The umbral.encrypt function returns a ciphertext and a capsule

## Fragmentation

4) A data owner performs their own umbral.split_rekey function
    a) because the data owner does not want to reveal their private_key (which is passed into the umbral.split_rekey function)
    
5) A data owner needs the public key of the data purchaser before they can perform the umbral.split_rekey function

6) The output from the umbral.split_rekey function is a set of key fragments called kfrags

## Re-encryption

7) A third-party can modify the capsule from step 3 above if they have the kfrags from step 6 above

8) The capsule once modified in this way can be used (along with data owners public_key, the data purchaser's private key and the ciphertext) to reveal the plaintext to the data purchaser

# Assumptions

1) The umbral.encrypt function returns the same ciphertext and capsule if performed by the same user using the same plaintext and public key?

2) A user gets a unique capsule and a unique ciphertext if they re-run the encrypt function with unique/new data? Or does the user get a unique ciphertext but an exact duplicate of their capsule if they re-run the encrypt function again and again with unique/new data (the new data being the only variable)?

# Questions

As computation in the EVM is done using a stack-based bytecode language (processing a seuence of predefined opcodes), is there any chance that a smart contract can perform tasks like the umbral.split_rekey?

