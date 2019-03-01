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
    another_function(5);
}

fn another_function(x: i32) { //you must declare the type of each parameter
    println!("The value of x is: {}", x);
}
```

Function arguments
Use & to make argument by reference, use &mut to make the reference mutable i.e. allow function change foo's contents.
Note: References are immutable by default!
```
doSomething(&mut foo)
```
#### Variable mutability
##### Immutable
Variables are immutable by default
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
#### Strings
Probably don't use
```
let s = String::new();
let data = "initial contents";
let s = data.to_string();
```
Or, probably don't use
```
let _s = String::new();
let _s = "initial contents".to_string();
println!("{}",_s);
```
Instead, use 
```
let s = String::from("initial contents");
println!("{}", s);
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
