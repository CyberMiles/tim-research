# Rust

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
Use the following which creates a mutable String which can manage memory on the heap 
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
