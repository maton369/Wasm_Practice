#!/bin/bash

# cat <<EOF >> minimal.wat 
# (module) 
# EOF
# wat2wasm -o minimal.wasm minimal.wat
xxd minimal.wasm | tee output.log