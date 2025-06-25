(module
  (import "wasm" "add" (func $add (param i32 i32) (result i32)))
  (import "js" "result" (func $result (param i32)))

  (func (export "calc") (param $a i32) (param $b i32)
    (local.get $a)
    (local.get $b)
    (call $add)
    (call $result)
  )
)