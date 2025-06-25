type Exports = {
    add(a: bigint, b: bigint): bigint;
};

// WebAssembly モジュールの読み込みとインスタンス化
const wasm = await(async () => {
    const { instance } = await WebAssembly.instantiate(
        await Deno.readFile("./target/wasm32-unknown-unknown/release/hello_rust.wasm")
    );
    return instance.exports as Exports;
})();

// コマンドライン引数の取得と変換（BigIntにキャスト）
const a = BigInt(Deno.args[0] || 0);
const b = BigInt(Deno.args[1] || 0);

// 呼び出しと出力
console.log(`${a} + ${b} = ${wasm.add(a, b)}`);