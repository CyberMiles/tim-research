# Information purchasing
This page is broken into 3 sections:
- first principles - pertaining to Ethereum and NuCyper's pyUmbral proxy re-encryption software
- assumptions - pertaining to the same topic
- questions - creating some "what-if" ideas

The aim of the game is to establish what **could/should**:
- be processed on chain
- be processed off chain
- be stored on chain
- be stored off chain

For example, as computation in the EVM is done using a stack-based bytecode language (processing a seuence of predefined opcodes), is there any chance that a smart contract can perform tasks like the umbral.split_rekey? **or**
should the umbral.reencrypt(kfrag, capsule) function be an instance of a smart contract (in which Bob invites lots of decentralized Ursula's to create cfrags until Bob has m of n and can decrypt Alice's message)? 

# First principles about encapsulation

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

The following are items which in general I believe to be true but am not 100% sure about. I can just go and test these in the commandline (and probably will soon). If anyone has a quick answer, please feel free to do a PR.

1) The umbral.encrypt function returns the same ciphertext and capsule if performed by the same user using the same plaintext and public key?

2) A user gets a unique capsule and a unique ciphertext if they re-run the encrypt function with unique/new data? Or does the user get a unique ciphertext but an exact duplicate of their capsule if they re-run the encrypt function again and again with unique/new data (the new data being the only variable)?

# Questions

As computation in the EVM is done using a stack-based bytecode language (processing a seuence of predefined opcodes), is there any chance that a smart contract can perform tasks like the umbral.split_rekey?

What is to be performed and stored on-chain and what is to be performed and stored off-chain? It is my initial guess that because the capsules are just there to be modified so that the information purchaser can decrypt the ciphertext; capsules are disposable and do not need to be stored on-chain.

This is only the first draft, lots more to come, please feel free to contribute via issue or PR.

