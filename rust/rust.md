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

#### Macro

Calling a Macro (requires !)
```
myMacro!
```

#### Function

Calling a function (no !)
```
myFunction()
```
Function arguments
Use & to make argument by reference, use &mut to make the reference mutable i.e. allow function change foo's contents.
Note: References are immutable by default!
```
doSomething(&mut foo)
```
#### Variables

Variables are immutable by default
```
let foo = 5; // Immutable
```
Create a mutable variable using mut
```
let mut bar = 5;
```
Create a mutable variable which is bound to new, but empty, instance of String
```
let mut emptyString = String::new();
```
Print variable (string literal)
```
println!("{}", foo); // Prints 5
```
Print more than one
```
println!("Foo is {} and bar is {}", foo, bar);
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

