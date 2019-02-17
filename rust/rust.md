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
