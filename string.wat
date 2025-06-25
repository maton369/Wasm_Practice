(module
  (memory (export "memory") 1)

  (func (export "toUpperCase") (param $ptr i32) (param $len i32) (result i32)
    (local $count i32)
    (local $end i32)

    ;; $end = $ptr + $len
    (local.set $end
      (i32.add
        (local.get $ptr)
        (local.get $len)
      )
    )

    ;; ループ：$ptr < $end
    (loop $loop
      (if
        (i32.lt_u
          (local.get $ptr)
          (local.get $end)
        )
        (then
          (i32.store8
            (local.get $ptr)
            (call $charToUpperCase
              (i32.load8_u (local.get $ptr))
            )
          )
          (local.set $ptr
            (i32.add
              (local.get $ptr)
              (i32.const 1)
            )
          )
          (local.set $count
            (i32.add
              (local.get $count)
              (i32.const 1)
            )
          )
          (br $loop)
        )
      )
    )

    (local.get $count)
  )

  (func $charToUpperCase (param $char i32) (result i32)
    (if (result i32)
      (i32.and
        (i32.ge_u (local.get $char) (i32.const 97))
        (i32.le_u (local.get $char) (i32.const 122))
      )
      (then
        (i32.xor (local.get $char) (i32.const 32))
      )
      (else
        (local.get $char)
      )
    )
  )
)