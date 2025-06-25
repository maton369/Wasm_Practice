(module
    (import "js" "result" (func $result (param i32)))
    (func (export "add") (param $a i32) (param $b i32)
        (i32.add (local.get $a) (local.get $b))
        call $result
    )
)