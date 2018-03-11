import re
counter = 0
p = re.compile('[12345679]')
for num in range(100, 9999999):
    a = p.search(str(num))
    if a is None:
	    print str(num)
	    counter = counter + 1
print str(counter)
