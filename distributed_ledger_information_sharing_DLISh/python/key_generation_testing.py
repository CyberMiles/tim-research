letterList = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
numberList = ["0","1","2","3","4","5","6","7","8","9"]

counter = 0
for ll in letterList:
    for ll2 in letterList:
        for nl in numberList:
            for nl2 in numberList:
                string = ll + ll2 + nl + nl2
                counter = counter + 1
                print(string)
                string = ""
print(str(counter))

# The above gives 270 400 possibilities aa01 to ZZ99

# To increase this we need to increase the possible permutations, this can be achieved by insisting that all keys are fixed to length 4
letterList = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
letterList2 = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9"]
counter2 = 0
for ll in letterList:
    for ll2 in letterList2:
        for ll3 in letterList2:
            for ll4 in letterList2:
                string = ll + ll2 + ll3 + ll4
                counter2 = counter2 + 1
                print(string)
                string = ""
print(str(counter2))

print("First try resulted in " + str(counter))
print("Second try resulted in " + str(counter2))

# The second try above gives us the following 
#First try resulted in 270 400
#Second try resulted in 6 196 528

# If we try something different like variable length keys we would need to create a new rule such as all keys must start with a letter which is immediately followed by a number.
# The first attempt at this produced over 1 million (1 406 080). This can be improved and is where I will return next - code below under progress.


# Below is just experimental example

letterList = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9"]
numList = ["!","@","#","$","%","^","&","*","(",")"]
counter3 = 0
for ll in letterList:
    for ll2 in numList:
        for ll3 in letterList:
            for ll4 in letterList:
                string = ll + ll2 + ll3 + ll4
                counter3 = counter3 + 1
                print(string)
                string = ""
print(str(counter3))

print("First try resulted in " + str(counter))
print("Second try resulted in " + str(counter2))
print("Third try resulted in " + str(counter3))
