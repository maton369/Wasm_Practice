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

    ;; ループ開始
    (loop $loop
      ;; if ($ptr < $end)
      (if
        (i32.lt_u (local.get $ptr) (local.get $end))
        (then
          ;; v128.store($ptr, charToUpperCase(v128.load($ptr)))
          (v128.store
            (local.get $ptr)
            (call $charToUpperCase
              (v128.load (local.get $ptr))
            )
          )

          ;; $ptr += 16
          (local.set $ptr
            (i32.add (local.get $ptr) (i32.const 16))
          )

          ;; $count += 1
          (local.set $count
            (i32.add (local.get $count) (i32.const 1))
          )

          ;; ループ継続
          (br $loop)
        )
      )
    )

    ;; return $count
    (local.get $count)
  )

  (func $charToUpperCase (param $chars v128) (result v128)
    ;; 計算式：
    ;; mask = (($chars >= 'a') & ($chars <= 'z')) & 0x20
    (local $mask v128)

    (local.set $mask
      (v128.and
        (v128.and
          (i8x16.ge_u (local.get $chars) (i8x16.splat (i32.const 97)))
          (i8x16.le_u (local.get $chars) (i8x16.splat (i32.const 122)))
        )
        (i8x16.splat (i32.const 32))
      )
    )

    ;; return $chars ^ mask
    (v128.xor
      (local.get $chars)
      (local.get $mask)
    )
  )
)