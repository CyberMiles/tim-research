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
