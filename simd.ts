type Exports = {
    memory: WebAssembly.Memory;
    toUpperCase: (ptr: number, len: number) => number;
};

// WebAssembly モジュールの読み込みと初期化
const wasm: Exports = await(async () => {
    const { instance } = await WebAssembly.instantiate(
        await Deno.readFile("./simd.wasm")
    );
    return instance.exports as Exports;
})();

const memory = new Uint8Array(wasm.memory.buffer);
const encoder = new TextEncoder();
const decoder = new TextDecoder();

// 文字列をWasmメモリに書き込み、大文字変換を呼び出す関数
const toUpperCase = (str: string) => {
    if (!wasm.toUpperCase) return { result: str, count: -1 };

    const ptr = 0;
    const len = (() => {
        const { written } = encoder.encodeInto(str, memory.subarray(ptr));
        return written;
    })();

    const count = wasm.toUpperCase(ptr, len);
    const result = decoder.decode(memory.subarray(ptr, ptr + len));

    return { result, count };
};

// 実行（コマンドライン引数を連結して変換）
console.log(toUpperCase(Deno.args.join(" ")));