#!/bin/bash

# cat <<EOF >> minimal.wat 
# (module) 
# EOF
# wat2wasm -o minimal.wasm minimal.wat
# xxd minimal.wasm | tee output.log
# wasm2wat minimal.wasm | tee output.log
# wat2wasm -o simple.wasm simple.wat
python3 -m http.server | tee output.log