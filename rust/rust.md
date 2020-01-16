# Rust
Why Rust - WebAssembly (Wasm) is a technology that has the chance to reshape how we build DApps for the browser. There are [many reasons for choosing](https://rustwasm.github.io/docs/book/why-rust-and-webassembly.html) and [using Rust in WebAssembly](https://opensource.com/article/19/2/why-use-rust-webassembly). This page is a quick reference for the Rust programming language.

## Quick reference

### Installation
```
curl https://sh.rustup.rs -sSf | sh
```
### Update
```
rustup update
```
### Code formatter
Installation
```
rustup component add rustfmt
```
Usage
```
rustfmt hello_world.rs
```
### Project
Create a new project
```
cargo new hello_cargo
```
Build project
```
cargo build
```
Run the executable
```
./target/debug/hello_cargo
```
Build and run in one step
```
cargo run
```
Check the project
```
cargo check
```
Deploy the project as a production release
```
cargo build --release
```
Execute the release
```
./target/release/hello_cargo
```
### Enable diagnosis / Backtrace
```
export RUST_BACKTRACE=1
```
Usage
```
./target/debug/hello_cargo
```
### Syntax
Rust code uses snake case as the conventional style for function and variable names.

Statements are instructions that perform some action and do not return (evaluate to) a value!

Expressions are instructions that evaluate to a resulting value!
Calling a function is an expression.
Calling a macro is an expression.
```
fn main() {
    let x = plus_one(5);
    println!("The value of x is: {}", x);
}

fn plus_one(x: i32) -> i32 {
    x + 1 // This Expression evaluates to (returns) a value of type i32
    x + 1; // This (with the added ;) is a Statement which does not evaluate (return to) a value. This will result in an error
}
```

#### Macro

Calling a Macro (requires !)
```
myMacro!
```

#### Assert
A very useful macro is `assert!`
Assert is a macro invocation that tests if its arguments are true. Rust always checks assertions regarless of how the application was compiled. Here is an example.

`assert!(_var_a != 0 && _var_b !=0)`

This checks that variable a and variable b are both not equal to zero. If the arguments of the assert are not true then the application will terminate with a message every time (and provide a useful message).

#### Unit testing
You can write unit tests along side your code. The tests are not managed as part of the standard compilation process. They are actioned when you run the specific test command like this `cargo test`. Here is an example.

```
#[test]
fn test_add_two_numbers(){
    assert_eq!(add_two_numbers(1, 1), 2);
}

#[no_mangle]
pub extern fn add_two_numbers(_x: i32, _y: i32) -> i32{
_x + _y
}
```

The application above can be tested using the following command

```
cargo test
   Compiling libc v0.2.66
   Compiling works v0.1.0 (/home/ubuntu/works)
   Finished test [unoptimized + debuginfo] target(s) in 1.78s
   Running target/debug/deps/works_lib-9ac9330896f928e7

running 1 test
test test_add_two_numbers ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out
```


#### Function
Rust doesn’t care where you define your functions, only that they’re defined somewhere. In other words, unlike Python, Rust has hoisting.

Lines execute in the order in which they appear in the main function.

```
fn main() {
    let a: i32 = 5;
    another_function(a);
}

fn another_function(_a: i32) { //you must declare the type of each parameter
    println!("The value of _a is: {}", _a);
}
```

Function arguments

Use & to make argument "by reference", 
```
another_function(&a);
```
Remember though that another_function can not alter _a because it is only being borrowed (by reference). Variables are immutable by default, so are references.

Use **&mut a** and **_a: &mut i32** as shown below, if you want to make _a (the reference to a) mutable i.e. allow another_function to change _a's contents inside another_function.
```
fn main() {
    let a: i32 = 5;
    another_function(&mut a);
}

fn another_function(_a: &mut i32) { //you must declare the type of each parameter
    println!("The value of _a is: {}", _a);
}
```
#### Variable mutability
You can not reference a variable mutably more than once i.e. you can't do this
```
let mut s = String::from("hello");
let r1 = &mut s; //notice we are using &mut
let r2 = &mut s; //notice we are using &mut - this will fail because Rust is protecting you from a data race
```
You can reference a variable immutably more than once like this 
```
let mut s = String::from("hello");
let r1 = &s; // no problem because we are not using &mut
let r2 = &s; // no problem because we are not using &mut
```
Rust is great at preventing potential issues with pointers, here is another example. Rust will ensure that the data will not go out of scope before the reference to the data does.

```
fn dangle() -> &String { // dangle returns a reference to a String
    let s = String::from("hello"); // s is a new String
    &s // we return a reference to the String, s but this function is about to be deallocated; &s will not point to anything 
} 
```
Instead you have to return the string and in doing so are transferring ownership
```
fn no_dangle() -> String {
    let s = String::from("hello");
    s
}
```

##### Immutable
Variables are immutable by default.
```
let foo = 5; // Immutable
```
##### Mutable
Create a mutable variable using mut
```
let mut bar = 5;
```
Now that the variable is mutable, we can change its value like this (NOT using the let keyword).
```
bar = 10;
```
#### Variable shadowing
A variable can be shadowed; creating a new variable (even using a different type) whilst using the same variable name. You can't just use mut and change the type of a variable with the same name, you must shadow. This reduces the amount of names that you have to create in your code i.e. _spaces_string vs _spaces_lenth.
```
let _spaces = "   ";
let _spaces = _spaces.len();
```

#### Printing
Print variable (string literal)
```
println!("{}", foo); // Prints 5
```
Print more than one
```
println!("Foo is {} and bar is {}", foo, bar);
```
#### Strings on the heap
Use the following which creates a mutable String which can manage memory on the heap. The ```String::from``` syntax is that of an "associated function" we cover this in the next section.
```
let s = String::from("initial contents");
println!("{}", s);
```
For example, doing the following (which would be considered a copy in other languages) actually moves. After this code s1 is gone and s2 is active. When s2 goes out of scope the memory is freed. This is memory safe because s1 and s2 can not create a double free error if only s2 exists.
```
let s1 = String::from("hello");
let s2 = s1;
```
If you actually want to copy s1 to s2 then do it properly using the following code
```
let s2 = s1.clone();
```
Variables on the heap act completely differently
```
fn main() {
    let s = String::from("hello");  // s comes into scope
    takes_ownership(s);             // s's value moves into the function...
                                    // s is no longer valid here
    let x = 5;                      // x comes into scope
    makes_copy(x);                  // x would move into the function,
                                    // x is still valid here
} // Here, x goes out of scope, then s. But because s's value was moved, nothing
  // special happens.
fn takes_ownership(some_string: String) { // some_string comes into scope
    println!("{}", some_string);
} // Here, some_string goes out of scope and `drop` is called. The backing
  // memory is freed.
fn makes_copy(some_integer: i32) { // some_integer comes into scope
    println!("{}", some_integer);
} // Here, some_integer goes out of scope. Nothing special happens.
```
The reason is that types such as integers that **have a known size at compile time** are stored entirely on the stack, so copies of the actual values are quick to make. Mutable string do not have a known size and are stored on the heap.

#### Associated Functions
Associated functions are called using the :: syntax and in general return an instance (commonly used in constructors). In the case below, the function fn square returns an instance of the Rectangle struct.
```
// Create this impl in a file where we have Rectangle Struct declared
impl Rectangle {
    fn square(size: u32) -> Rectangle {
        Rectangle { width: size, height: size }
    }
}
// Then call this in the main
let sq = Rectangle::square(3)
```
#### Slices 
```
let s = String::from("hello world");
let hello = &s[0..5]; // slice of the string from char 0 to 5 (but not including 5)
let hello = &s[0..=4]; // slice of the string from char 0 to 4 (inclusive of 4 i.e. =4)
```
#### Vectors
Create a vector and push values
```
let mut v = Vec::new();
for x in 0..100000{
	   v.push(x);
	   println!("Adding {}", x);
}
```
Read the values of the vector
```
for i in &v {
    println!("Reading {}", i)
}
```
#### Structs
Declare the struct
```
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}
```
Write a function to build (and return) the struct. 
Please note: If argument name exactly matches struct key then you can take the shorthand (i.e. email and username below).
Please note: If the argument name does not match the struct key then you have to explicitly declare using the key:value notation (i.e. active: the_boolean).
```
fn build_user(email: String, username: String, the_boolean: bool) -> User {
    User {
        email,
        username,
        active: the_boolean,
        sign_in_count: 1,
    }
```
Call the function which builds (and returns) the Struct
```
let user1 = build_user(String::from("mistermac@asdf.asdf"),String::from("tpmccallum"), true);
```
You can also declare a new struct modelled from an existing one, using shorthand like this
```
struct A {
    a: bool,
    b: bool, 
    c: bool,
    d:bool,
}
```
a has a, b, c and d booleans set
```
let a = A {a: true, b: true, c:false, d:false};
```
b only has a and b but uses the rest of a's key:values as part of this awesome shorthand (i.e. ..a)
```
let b = A {a: false, b:false, ..a};
```
Print the results
```
println!("\na is {}\nb is {}\nc is {}\nd is {}\n", a.a, a.b, a.c, a.d);
println!("\na is {}\nb is {}\nc is {}\nd is {}\n", b.a, b.b, b.c, b.d);
```
```
a is true
b is true
c is false
d is false


a is false
b is false
c is false
d is false
```
#### Tuple Struct (without named fields i.e. accessed by index)
```
struct Color(i32, i32, i32);
let black = Color(0, 0, 0);
println!("black.0 is equal to {},\nblack.1 is equal to {},\nblack.2 is equal to {}\n", black.0, black.1, black.2);
```
Prints the results
```
black.0 is equal to 0,
black.1 is equal to 0,
black.2 is equal to 0
```

#### How to find and then print the type of a Rust variable
The following function will print the variable type
```
fn print_type_of<T>(_: &T) {
    println!("{}", std::any::type_name::<T>())
}
```
An example of usage is as follows (given that you have a few directories inside a directory called next_dir)
```
fn main() -> io::Result<()> {
    let mut entries = fs::read_dir("./next_dir")?
        .map(|res| res.map(|e| e.path()))
        .collect::<Result<Vec<_>, io::Error>>()?;
    print_type_of(&entries);
    // alloc::vec::Vec<std::path::PathBuf>
    print_type_of(&entries[entries.len()-1]);
    // std::path::PathBuf
    Ok(())
}

```
#### Methods 
Methods are diffferent to functions. They are indeed declared using the fn keyword however their first argument is always (&self). This is the giveaway.

Here is an example of a method which uses mutability to instantiate and then alter a Struct.

Methods allow us to expose all of the logic available inside the ```impl``` code block. This is great so that developers can see what the capabilities area.
```
struct Rectangle {
    width: u32,
    height: u32,
    area: u32,
}

impl Rectangle {
    fn calculate_area(&mut self) {
        self.area = self.width * self.height;
    }
}

fn main() {
    let rect1 = &mut Rectangle { width: 30, height: 50, area: 0 };
    rect1.calculate_area();
    println!(
        "The area of the rectangle is {} square pixels.",
        rect1.area
    );
}
```
Here is an example of a method which does not use mutability but achieves the same result to the output (just does not change the state of the struct).
```
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };

    println!(
        "The area of the rectangle is {} square pixels.",
        rect1.area()
    );
}
```
#### Enums (storing things of kind)
An IP address is a great example of an Enum. It must always be an IP address but may be either ipv4 or ipv6.

You declare an enum like this ...
```
enum IpAddrKind {
    V4,
    V6,
}
```

You assign enums to variables like this ...
```
let four = IpAddrKind::V4;
let six = IpAddrKind::V6;
```

You create a function which accepts enums as arguments like this ...
```
fn route(ip_type: IpAddrKind) {
    //do stuff
}
```

You call that function like this ... 
```
route(IpAddrKind::V4);
```

#### Option<T>
Rust does not have nulls!
It does however have an enum that can encode the concept of a value being present or absent. Option<T> is especially defined in the standard library (to solve the expensive issues of null). Option<T> is useful because it does not even have to be brought into scope and you don't even have to use the Option:: prefix to use it.
	
```
enum Option<T> {
    Some(T),
    None,
}
```
Here is an example of how it would be used
```
fn main(){
    let name = String::from("Timothy");
    println!("Character at index 7 is {}", match name.chars().nth(7){ // Character at index 6 is y and 7 "No character"
        Some(c) => c.to_string(),
        None => "No character".to_string()
    });
}
```
The above return the following
```
Character at index 7 is No character
```

#### Generic Type Parameter
 <T> means the Some variant of the Option enum can hold one piece of data of any type.
	
#### Constants
Constants are there to provide information to the developer who is auditing the code (explicit). You might think that a constant is just like a standard variable which is immutable but constants have to have their type declared explicitly and also they can be all caps by convention to help programmers understand what the code is doing.
```
const MAX_POINTS: u32 = 100000;
```
#### Tuples (are fixed size at declaration)
##### Destructuring
```
let tup = (500, 6.4, 1);
let (x, y, z) = tup;
println!("The value of y is: {}", y); // prints The value of y is: 6.4
```
##### Dot notation
```
let x: (i32, f64, u8) = (500, 6.4, 1);
let five_hundred = x.0; // First element is zero 0 which holds the value of 500
```

#### Arrays - (are fixed size at declaration)
Useful when you want your data allocated on the stack rather than the heap.
Useful when your data is of a fized size like the following months of the year.
```
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
```
All elements have the same type and so you explicitly define type once like this
```
let a: [i32; 5] = [1, 2, 3, 4, 5];
let first = a[0]; // First element in the a array will have the value of 1
let out = a[10] // This will not produce undefined behaviour, instead it will panic at runtime (which other languages don't offer).
```

#### Vectors (are dynamic at runtime) TODO test if you can still access removed element using bracket notation (as is the case with c++ i.e. a.[3] when 3 does not exist)

### Crates

Crates are libraries which you can import into your application. Obviously you will not know what functions are available for each crate. You can use the following command to generate documentation specific to your programs crates and their installed dependencies.
```
cargo doc --open
```
Once youe browser displays the documentation, go ahead and click on the crate in the left side bar i.e. rand

#### Library crate

Library crate is a crate that contains code which is intended to be used in other programs.

Library crates are added to the Cargo.toml file using Semantic Versioning (major.minor.patch)
```
rand = "0.3.14"
```
All you need to do is compile your program and rand will be fetched from the Rust Package Registry at https://crates.io/ and it will also resolve any dependencies.

#### Updating a library crate

The rand = "0.3.14" in the Cargo.toml file is really ^0.3.14 as per Rust's Semantic Versioning. The Cargo.lock file will ensure that your program will always use only 0.3.14. If you run the upgrade command it will update up to but NOT including the next minor release. For example it can go from 0.3.14 to 0.3.15 or 0.3.16 but never 0.4.x

Cargo.lock file's rand package entry which looks like this
```
[[package]]
name = "rand"
version = "0.3.23"
source = "registry+https://github.com/rust-lang/crates.io-index"
dependencies = [
 "libc 0.2.48 (registry+https://github.com/rust-lang/crates.io-index)",
 "rand 0.4.6 (registry+https://github.com/rust-lang/crates.io-index)",
]
```
Will be updated to when you run the following command

```
cargo update
```

The Cargo.toml file will not update. You can update it yourself if you want to break through the ceiling of Semantic Versioning and update to the next minor release onwards i.e.
```
rand = "0.4.0" // Now the cargo update will upgrade and resolve all dependencies from 0.4.0 to but NOT including 0.5.x
```

The above change to the Cargo.toml file and the execution of the cargo update command produced the following result in the Cargo.lock file. Note the **version = "0.4.6"**
```
[[package]]
name = "rand"
version = "0.4.6"
source = "registry+https://github.com/rust-lang/crates.io-index"
dependencies = [
 "fuchsia-cprng 0.1.1 (registry+https://github.com/rust-lang/crates.io-index)",
 "libc 0.2.48 (registry+https://github.com/rust-lang/crates.io-index)",
 "rand_core 0.3.1 (registry+https://github.com/rust-lang/crates.io-index)",
 "rdrand 0.4.0 (registry+https://github.com/rust-lang/crates.io-index)",
 "winapi 0.3.6 (registry+https://github.com/rust-lang/crates.io-index)",
]
```

#### Binary crate

A binary crate is an executable, like the hello_cargo application which you wrote

### The stack (TODO)

### The heap (TODO)

## Coding for blockchain interoperability (Web3 using Rust)
```
extern crate web3;
use web3::futures::Future;
use web3::types::{Address, U256};

fn main() {
    // Connect to the blockchain
    let (_eloop, transport) = web3::transports::Http::new(
        "https://mainnet.infura.io/v3/46d1afae8b55464585222887f55eab6a",
    )
    .unwrap();
    let web3 = web3::Web3::new(transport);

    // Declare and print account 1
    let my_account_1: Address = "5bd1b43b599f4f6b5ca993375fa4a1ea05221f04".parse().unwrap();
    println!("Account 1: {:?}\n", my_account_1);

    // Declare and print account 2
    let my_account_2: Address = "497A49648885f7aaC3d761817F191ee1AFAF399C".parse().unwrap();
    println!("Account 2: {:?}\n", my_account_2);

    // Get and print the balance of account 1
    let balance_of_1: U256 = web3.eth().balance(my_account_1, None).wait().unwrap();
    println!("Balance 1: {:?}\n", balance_of_1);

    // Get and print the balance of account 2
    let balance_of_2: U256 = web3.eth().balance(my_account_2, None).wait().unwrap();
    println!("Balance 2: {:?}\n", balance_of_2);
}
```
Produces the following output
```
tpmccallum$ cargo run
Compiling hello_cargo v0.1.0 (/Users/tpmccallum/projects/hello_cargo)
Finished dev [unoptimized + debuginfo] target(s) in 3.44s
Running `target/debug/hello_cargo`

Account 1: 0x5bd1b43b599f4f6b5ca993375fa4a1ea05221f04

Account 2: 0x497a49648885f7aac3d761817f191ee1afaf399c

Balance 1: 0

Balance 2: 2029697268026803386

```

# Other reading
I have also written [an article on HackerNoon which covers integer overflows](https://hackernoon.com/exploding-rockets-millions-of-free-tokens-lets-take-a-good-look-at-integer-overflows-2800794e48d9) in Rust. 
