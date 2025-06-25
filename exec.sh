#!/bin/bash

# cat <<EOF >> minimal.wat 
# (module) 
# EOF
# wat2wasm -o minimal.wasm minimal.wat
# xxd minimal.wasm | tee output.log
# wasm2wat minimal.wasm | tee output.log
# wat2wasm -o simple.wasm simple.wat
# python3 -m http.server | tee output.log
# wat2wasm -o alert.wasm alert.wat
# python3 -m http.server
# wat2wasm -o calc.wasm calc.wat
# wat2wasm -o import.wasm import.wat
# python3 -m http.server
# wat2wasm -o string.wasm string.wat
# wat2wasm -o simd.wasm simd.wat
# # cargo -v build --release --target wasm32-unknown-unknown
# wasm2wat target/wasm32-unknown-unknown/release/hello_rust.wasm | tee output.log
cargo -v build --release --target wasm32-unknown-unknown