We need you!

Are you a thriving mathematician who loves a challenge?

There are 50 algorithms waiting to be claimed.

# The challenge
Create an algorithm which can reversibly reduce a set of numbers (within the range of 100 to 9 999 999) to a single numerical digit.

For example: 
- reducing a number like 65536 to the number 2 (by finding the square root 4 times over)

Your algorithm will be assigned a single aphabetic character like "a"

Your encoding algorith is allowed to create a single **helper** digit as part of its output. The **helper** digit will be passed into your decode function.

For example:
- if your algorithm is called "a" and it encodes (reduces) the number 65536 into 2 by finding the square root 4 times, the reduced number will be 2 (65536 -> 256 -> 16 -> 4 -> 2) and the helper number will be 4. The final encoding would be a24.

When your decode algorithm is run it will receive both the number 2 and the helper number 4. The decode algorithm will reverse the finding of the square root (shown above) 4 times i.e. 2x2=4 4x4=16 16x16=256 256x256=65536

If you would like to take care of reducing a set of numbers please complete the following and create a pull request.

## Name of applicant and/or organization

example start

John Smith

example end

## Name of algorithm

example start

Smith's reduction using division

example end

## Set of numbers the algorithm will be catering for

example start

I will be catering for all numbers which start with any single digit and end with only zeros 

example end

## Regular expression qualifier for my set of numbers

example start

```

^[1-9]0+

```

example end

## The theory behind how the numbers are reduced to one digit


example start

### Overview

The initial number (to be encoded) is divided by ten. The result of the previous division is used to perform the next division until we are left with a single digit.

### Resulting number after reduction

For example 

1) 40000/10=4000 then 

2) 4000/10=400 then 

3) 400/10=40 then 

4) 40/10=4

The reduced number is 4

## Resulting helper number after reduction

As shown above the algorithm performs the division a total of 4 times in order for the key (in this case 40000) to be reduced to a single digit. 

The helper is therefore 4.

example end

## Letter which I would like to reserve for my function/algorithm

example start

This algorithm will be assigned to the lower case letter "a" and therefore the above example of reducing the number 40000 will have the overall output of "a44"

example end

## Encoding psuedo code

example start

```

counter = 0
function a_encode(numberToEncode)
    while numberToEncode.length() => 2
    counter = counter + 1
    numberToEncode = numberToEncode / 10
return [numberToEncode, counter]   

```

example end

## Decoding psuedo code

example start

```

function a_encode(number, argument)
    for i in argument
        number = number * 10
    return number
    
```

example end
