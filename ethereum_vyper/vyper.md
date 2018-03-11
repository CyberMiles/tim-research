Vyper is an experimental smart contract programming language for Ethereum which strives to be simple. As stated on Vyper's GitHub [1] page a) Vyper code should be maximally human-readable and b) it should be maximally difficult to write misleading Vyper code.

Unlike Solidity, in Vyper all pre-conditions, post-conditions and state changes are handled explicitly; there are no "modifiers" which allow the execution of code to jump around the file. Vyper programmers are advised to perform simple, linear, in-line asserts and checks.

An example of checkpoints within a Vyper function would/should include the following (in the order provided):
- 1 Conditions
#Check the condition (what is the current state of everything you can think of check/assert?). Log what you can.

#2. Effects
#What effects will the execution of the code in this function have on everything (that can be effected)?

#3. Interaction
#The actual execution of what ever code was deemed necessary to run. Again, log what you can.

[1] https://github.com/ethereum/vyper
